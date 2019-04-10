import { ServerTimestamp, StoreDB, auth } from '~/plugins/firebase.js'
import { Store } from 'vuex'

export default {
  getCollection(collection) {
    return StoreDB.collection(collection).get()
  },
  getTranslations(lang) {
    return StoreDB.collection('translations')
      .where('lang', '==', lang)
      .get()
  },
  createUser(userData) {
    return auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .catch(err => {
        console.error(userData.email)
      })
  },
  // General content
  getContent(lang) {
    return StoreDB.collection('content')
      .where('lang', '==', lang)
      .get()
  },
  updateContentItem(contentItem) {
    return this.updateDocument('content', contentItem.id, contentItem)
  },
  updateUser(user) {
    if (!user.isAnonymous) {
      let obj = Object.assign({ lastLogin: ServerTimestamp() }, user)
      if (user.isNewUser) {
        obj.createAt = ServerTimestamp()
      }
      const usersRef = StoreDB.collection('users')
      usersRef.doc(user.uid).set(obj, { merge: true })
    }
  },
  getManuscript(name) {
    let query = null
    if (!name) {
      query = StoreDB.collection('manuscripts').limit(1)
    } else {
      query = StoreDB.collection('manuscripts')
        .where('name', '==', name)
        .limit(1)
    }
    return query.get()
  },
  // Manuscript content
  getManuscriptContent(lang, manuscriptName) {
    return StoreDB.collection('manuscript_content')
      .where('manuscript', '==', manuscriptName)
      .where('lang', '==', lang)
      .get()
  },
  updateMSContentItem(msContentItem) {
    return this.updateDocument(
      'manuscript_content',
      msContentItem.id,
      msContentItem
    )
  },
  // General index is the index in the array, roughly the order in the ms
  // TODO: move to manuscript manager
  async getLineByGeneralIndex(msId, generalIndex) {
    const lineRef = await StoreDB.collection(`manuscripts/${msId}/lines`)
      .where('general_index', '==', generalIndex)
      .limit(1)
      .get()
    if (lineRef.size) {
      const lineDocRef = lineRef.docs[0]
      return { data: lineDocRef.data(), id: lineDocRef.id }
    } else {
      return null
    }
  },
  async getUserNextLine(msId, uid) {
    const userMSRef = await this.getDoc(`users/${uid}/manuscripts/${msId}`)
    if (userMSRef.exists) {
      return userMSRef.data().next_general_index
    } else {
      return null
    }
  },
  getDoc(path) {
    return StoreDB.doc(path).get()
  },
  async updateLineViewing(manuscriptId, params) {
    const userLine = await this.getDoc(
      `users/${params.uid}/lines/${params.lineId}`
    )

    let lineViews = 0
    if (userLine.exists) {
      lineViews = userLine.data().views
    }
    // Advance the view count by 1
    lineViews++

    // Write to the user obj
    userLine.ref.set(
      {
        views: lineViews
      },
      { merge: true }
    )

    return StoreDB.doc(
      `manuscripts/${manuscriptId}/lines/${params.lineId}`
    ).update({ views: params.viewCounter + 1 })
  },
  markLineAsSkipped(params) {
    // Write to the user obj
    if (!params.isAnonymous) {
      return StoreDB.doc(`users/${params.uid}/manuscripts/${params.manuscript}`)
        .set({ next_general_index: params.generalIndex + 1 }, { merge: true })
        .then(res => {
          StoreDB.doc(`users/${params.uid}/lines/${params.lineId}`).set(
            {
              action: 'skip'
            },
            { merge: true }
          )
        })
    } else {
      return false
    }
  },
  addTranscription(params) {
    // Write to the user obj
    if (!params.isAnonymous) {
      return StoreDB.doc(`users/${params.uid}/manuscripts/${params.manuscript}`)
        .set({ next_general_index: params.generalIndex + 1 }, { merge: true })
        .then(res => {
          StoreDB.doc(`users/${params.uid}/lines/${params.lineId}`)
            .set(
              {
                action: 'done'
              },
              { merge: true }
            )
            .then(res => {
              this.updateDocument(`transcriptions`, null, params)
            })
        })
    } else {
      return false
    }
  },
  updateTranslation(translation) {
    return this.updateDocument('translations', translation.id, translation)
  },
  getUserLines(uid) {
    return StoreDB.collection('transcriptions')
      .where('uid', '==', uid)
      .get()
  },
  updateDocument(collection, docId, doc) {
    if (!docId) {
      return StoreDB.collection(collection).add(doc)
    } else {
      return StoreDB.collection(collection)
        .doc(docId)
        .update(doc)
    }
  }
}
