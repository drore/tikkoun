import { ServerTimestamp, StoreDB, auth } from '~/plugins/firebase.js'

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
  sendResetPasswordMail(emailAddress) {
    return auth.sendPasswordResetEmail(emailAddress)
  },
  updateContentItem(contentItem) {
    return this.updateDocument('content', contentItem.id, contentItem)
  },
  getUser(uid) {
    return StoreDB.doc(`users/${uid}`).get()
  },
  updateUser(user) {
    return new Promise((resolve, reject) => {
      if (!user.isAnonymous) {
        let obj = Object.assign({ lastLogin: ServerTimestamp() }, user)
        if (user.isNewUser) {
          obj.createdOn = ServerTimestamp()
        }
        const userObj = {
          displayName: obj.displayName,
          email: obj.email,
          uid: obj.uid,
          photoURL: obj.photoURL,
          isAnonymous: obj.isAnonymous
        }
        StoreDB.doc(`users/${user.uid}`)
          .get()
          .then(userSnap => {
            userSnap.ref.set(userObj, { merge: true })
            resolve(userSnap.data())
          })
          .catch(() => {
            resolve()
          })
      } else {
        resolve()
      }
    })
  },
  getManuscript(name) {
    let query = null
    if (!name) {
      //query = StoreDB.collection('manuscripts').limit(1)
      name = 'geneva'
    }
    query = StoreDB.collection('manuscripts')
      .where('name', '==', name)
      .limit(1)

    return query.get()
  },
  // Manuscript content
  getManuscriptContent(lang, manuscriptName) {
    return new Promise ((resolve, reject) => {
      // Try to read from local cache
      let content = localStorage.getItem(`manuscript_content_${manuscriptName}`)
      if(!content){
        StoreDB.collection('manuscript_content')
        .where('manuscript', '==', manuscriptName)
        .where('lang', '==', lang)
        .get().then(res => {
          content = res.docs.map(d => {
            const data = d.data()
            return {
              id: d.id,
              token: data.token,
              lang: data.lang,
              manuscript: data.manuscript,
              value: data.value
            }
          })
          // cache locally
          localStorage.setItem(`manuscript_content_${manuscriptName}`, JSON.stringify(content))
          resolve(content)
        })
      }
      else{
        resolve(JSON.parse(content))
      }
      
    })
    
  },
  getEmailForUserId(userid) {
    return new Promise((resolve, reject) => {
      StoreDB.collection('users')
        .where('userid', '==', userid)
        .get()
        .then(res => {
          if (res.size) {
            resolve(res.docs[0].data().email)
          } else {
            reject()
          }
        })
    })
  },
  updateMSContentItem(msContentItem) {
    return this.updateDocument(
      'manuscript_content',
      msContentItem.id,
      msContentItem
    )
  },
  async getLine(msId, page, line) {
    return new Promise((resolve, reject) => {
      StoreDB.collection(`manuscripts/${msId}/lines/`)
        .where('page', '==', page)
        .where('line', '==', line)
        .limit(1)
        .get()
        .then(res => {
          if (res.size) {
            resolve(res.docs[0].data())
          } else {
            reject()
          }
        })
    })
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
  async getUserLastLine(msId, uid) {
    return new Promise((resolve, reject) => {
      StoreDB.collection(`transcriptions`)
        .where('manuscript', '==', msId)
        .where('uid', '==', uid)
        .orderBy('createdOn', 'desc')
        .limit(1)
        .get()
        .then(res => {
          if (res.size) {
            resolve(res.docs[0].data())
          } else {
            resolve()
          }
        })
        .catch(err => {
          resolve()
        })
    })
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
  addTranscription(params) {
    // Write to the user obj
    if (!params.isAnonymous) {
      return StoreDB.doc(`users/${params.uid}/manuscripts/${params.manuscript}`)
        .set({ next_general_index: params.generalIndex + 1 }, { merge: true })
        .then(res => {
          StoreDB.doc(`users/${params.uid}/lines/${params.lineId}`)
            .set(
              {
                action: params.skipped ? 'skip' : 'done'
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
