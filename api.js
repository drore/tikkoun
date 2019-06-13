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
  getUserDailyMSStats(uid) {
    return new Promise(async (resolve, reject) => {
      const dailyStats = {}
      const userMSCollection = await StoreDB.collection(`users/${uid}/manuscripts`).get()
      const promises = []
      userMSCollection.docs.forEach(ms => {
        promises.push(new Promise(async (res, rej) => {
          const userMSDoc = await StoreDB.doc(`users/${uid}/manuscripts/${ms.id}`).get()
          res({ id: ms.id, dailyStats: userMSDoc.exists && userMSDoc.data() && userMSDoc.data().dailyStats })
        }))
      })
      Promise.all(promises).then(res => {
        res.forEach(msStats => {
          if (msStats.dailyStats) {
            dailyStats[msStats.id] = msStats.dailyStats
          }
        })

        resolve(dailyStats)
      })
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
  async updateUserParam(uid, updateParams) {
    return StoreDB.doc(`users/${uid}`).set(updateParams, { merge: true })
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
  async getActiveTask() {
    return new Promise(async (resolve, reject) => {
      const tasks = await StoreDB.collection('tasks')
        .where('active', '==', true)
        .get()
      const activeTask = tasks.size && Object.assign(tasks.docs[0].data(), { id: tasks.docs[0].id })
      const rangesSnap = await StoreDB.collection(`tasks/${activeTask.id}/ranges`).get();
      const ranges = rangesSnap.docs.map(r => {
        return Object.assign(r.data(), { id: r.id })
      })

      const returnObj = Object.assign(activeTask, { ranges: ranges })

      resolve(returnObj)
    })
  },
  async getLeaderBoard() {
    return new Promise(async (resolve, reject) => {
      const leadersSnap = await StoreDB.collection('users').orderBy('linesTranscribed', 'desc').limit(10).get()
      const leaders = leadersSnap.docs.map((l, i) => {
        const leaderObj = {
          rank: i + 1,
          linesTranscribed: l.data().linesTranscribed
        }
        return leaderObj
      })
      resolve(leaders)
    })
  },
  getManuscript(name) {
    let query = null
    if (!name) {
      //query = StoreDB.collection('manuscripts').limit(1)
      name = 'geneva'
    }
    // First look in the 
    query = StoreDB.collection('manuscripts')
      .where('name', '==', name)
      .limit(1)

    return query.get()
  },
  async addConversationMessage(params) {
    return new Promise(async (resolve, reject) => {
      params.createdOn = ServerTimestamp()

      if (params.replyTo) {
        const num_replies = params.num_replies ? params.num_replies + 1 : 1
        delete params.num_replies
        await StoreDB.doc(params.replyTo).set({ num_replies: num_replies }, { merge: true })
      }

      const newMessage = await this.updateDocument(`messages`, null, params)

      resolve(newMessage)
    })
  },

  // Manuscript content
  getManuscriptContent(lang, manuscriptName) {
    return new Promise((resolve, reject) => {
      // Try to read from local cache

      let content = localStorage.getItem(`manuscript_content_${manuscriptName}_${lang}`)
      if (!content) {
        StoreDB.collection('manuscript_content')
          .where('manuscript', '==', manuscriptName)
          .where('lang', '==', lang)
          .get()
          .then(res => {
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
            localStorage.setItem(
              `manuscript_content_${manuscriptName}_${lang}`,
              JSON.stringify(content)
            )
            resolve(content)
          })
      } else {
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

  async getManuscripts() {
    return new Promise(async (resolve, reject) => {
      const manuscriptsQuerySnapshot = await StoreDB.collection('manuscripts').get()
      const manuscripts = manuscriptsQuerySnapshot.docs.map(snap => {
        const msData = snap.data()
        return Object.assign(msData, { id: snap.id })
      })

      resolve(manuscripts)
    })
  },

  async getUserTemperament(uid) {
    return new Promise(async (resolve, reject) => {
      const userTemperament = await StoreDB.doc(`research/umap/users/${uid}`).get()
      let temperament = null
      if (userTemperament.exists) {
        const traits = userTemperament.data();
        temperament = `${traits.openness}${traits.conscientiousness}`
      }

      resolve(temperament)
    })
  },

  async updateUserTemperament(params) {
    return new Promise(async (resolve, reject) => {
      await StoreDB.doc(`research/umap/users/${params.uid}`).set(params.userTraits, { merge: true })
    })
  },

  async addTranscription(params) {
    // Write to the user obj
    const updateParams = Object.assign({}, params)
    updateParams.uid = updateParams.isAnonymous ? 'guest' : updateParams.uid
    delete updateParams.generalIndex
    ///
    await this.updateDocument(`transcriptions`, null, updateParams)

    if (!updateParams.isAnonymous) {
      if (params.task) {
        
        //Update the task record on the user profile - point to the next line in the task
        const userTaskDoc = await StoreDB.doc(`users/${updateParams.uid}/tasks/${updateParams.task}`).get()
        const userTaskDocData = userTaskDoc.data();
        const userTaskLines = (userTaskDocData && userTaskDocData.lines) || [];
        const lineUID = `${params.manuscript}_${params.lineId}`
        if (userTaskLines.indexOf(lineUID) == -1) {
          userTaskLines.push(lineUID)
        }

        const next_general_index = userTaskDocData.next_general_index
        next_general_index[params.rangeId] = params.generalIndex + 1
        await userTaskDoc.ref.set({ next_general_index: next_general_index, lines: userTaskLines }, { merge: true })
      }

      // Update the manuscript record on the user profile - point to the next line in the manuscript - this progresses even if the line was skipped
      await StoreDB.doc(`users/${updateParams.uid}/manuscripts/${updateParams.manuscript}`)
        .set({ next_general_index: params.generalIndex + 1 }, { merge: true })

      // Add another line to the user lines collection and mark the action
      await StoreDB.doc(`users/${updateParams.uid}/lines/${updateParams.lineId}`).set(
        {
          action: updateParams.skipped ? 'skip' : 'done'
        },
        { merge: true }
      )

      return false
    } else {
      return false
    }
  },
  updateTranslation(translation) {
    return this.updateDocument('translations', translation.id, translation)
  },
  async getReplies(path) {
    return new Promise(async (resolve, reject) => {
      const repliesSnap = await StoreDB.collection('messages').where('replyTo', '==', path).get()
      const replies = repliesSnap.docs.map(m => {
        return Object.assign(m.data(), { id: m.id, showReplyLine: false, path: m.ref.path })
      })

      resolve(replies)
    })
  },
  /**
   * path - single message
   */
  async getMessages(params) {
    return new Promise(async (resolve, reject) => {
      const path = params.path;
      const context = params.context;
      const snap = path ? await StoreDB.doc(path).get() :
        context ? await StoreDB.collection('messages').where('replyTo', '==', null).where('context', '==', context).orderBy('createdOn', 'desc').get() :
          await StoreDB.collection('messages').where('replyTo', '==', null).orderBy('createdOn', 'desc').get()
      let messages;
      if (path) {
        messages = [Object.assign(snap.data(), { id: snap.id, showReplyLine: false, path: snap.ref.path })]
      }
      else {
        messages = snap.docs.map(m => {
          return Object.assign(m.data(), { id: m.id, showReplyLine: false, path: m.ref.path })
        })
      }

      resolve(messages)
    })
  },
  getUserLines(uid) {
    return StoreDB.collection('transcriptions')
      .where('uid', '==', uid)
      .get()
  },
  async getUserTask(taskId, uid) {
    return new Promise(async (resolve, reject) => {
      const userTask = await StoreDB.doc(`users/${uid}/tasks/${taskId}`).get()
      resolve(userTask.data())
    })

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
