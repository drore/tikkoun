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
      const userMSCollection = await StoreDB.collection(
        `users/${uid}/manuscripts`
      ).get()
      const promises = []
      userMSCollection.docs.forEach(ms => {
        promises.push(
          new Promise(async (res, rej) => {
            const userMSDoc = await StoreDB.doc(
              `users/${uid}/manuscripts/${ms.id}`
            ).get()
            res({
              id: ms.id,
              dailyStats:
                userMSDoc.exists &&
                userMSDoc.data() &&
                userMSDoc.data().dailyStats
            })
          })
        )
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
  getManuscriptName(msId) {
    const manuscriptsJSON = localStorage.getItem('manuscripts')
    const manuscripts = manuscriptsJSON && JSON.parse(manuscriptsJSON)
    const manuscript = manuscripts.find(m => m.id === msId)

    return (manuscript && manuscript.official_name) || '***'
  },
  async getActiveTask() {
    return new Promise(async (resolve, reject) => {
      const tasks = await StoreDB.collection('tasks')
        .where('active', '==', true)
        .get()

      const activeTask =
        tasks.size &&
        Object.assign(tasks.docs[0].data(), { id: tasks.docs[0].id })
      let returnObj = null
      if (activeTask) {
        const rangesSnap = await StoreDB.collection(
          `tasks/${activeTask.id}/ranges`
        ).get()
        const ranges = rangesSnap.docs.map(r => {
          return Object.assign(r.data(), {
            id: r.id,
            msName: this.getManuscriptName(r.data().msId)
          })
        })

        returnObj = Object.assign(activeTask, { ranges: ranges })
      }

      resolve(returnObj)
    })
  },
  async getLeaderBoard(params) {
    return new Promise(async (resolve, reject) => {
      const count = (params && params.count) || 10
      const leadersSnap = await StoreDB.collection('users')
        .orderBy('linesTranscribed', 'desc')
        .limit(count)
        .get()
      const leaders = leadersSnap.docs.map((l, i) => {
        let leaderObj = {
          rank: i + 1,
          linesTranscribed: l.data().linesTranscribed
        }
        if (params && params.return_full) {
          leaderObj = Object.assign(l.data(), leaderObj)
        }

        return leaderObj
      })
      resolve(leaders)
    })
  },
  async getManuscriptById(id) {
    return new Promise(async (resolve, reject) => {
      const manuscript = await StoreDB.doc(`manuscripts/${id}`).get()

      const msObj = Object.assign(
        {
          id: id
        },
        manuscript.data()
      )
      resolve(msObj)
    })
  },
  async getManuscript(name) {
    return new Promise(async (resolve, reject) => {
      let query = null
      if (!name) {
        //query = StoreDB.collection('manuscripts').limit(1)
        name = 'bnf150'
      }
      // First look in the
      query = StoreDB.collection('manuscripts')
        .where('name', '==', name)
        .limit(1)

      const manuscripts = await query.get()
      const manuscriptDoc = manuscripts.docs[0]
      const manuscriptData = manuscriptDoc.data()
      const msObj = Object.assign(
        {
          id: manuscriptDoc.id
        },
        manuscriptData
      )
      resolve(msObj)
    })
  },
  async addConversationMessage(params) {
    return new Promise(async (resolve, reject) => {
      params.createdOn = ServerTimestamp()

      if (params.replyTo) {
        const num_replies = params.num_replies ? params.num_replies + 1 : 1
        delete params.num_replies
        await StoreDB.doc(params.replyTo).set(
          { num_replies: num_replies },
          { merge: true }
        )

        if (params.replyToUID) {
          // Update notifications on the original message sender
          await this.updateDocument(`users/${params.uid}/notifications`, null, {
            href: params.replyTo,
            createdOn: params.createdOn,
            displayName: params.displayName
          })
        }
      }

      const newMessage = await this.updateDocument(`messages`, null, params)

      resolve(newMessage)
    })
  },

  async getUserNotifications(uid) {
    return new Promise(async (resolve, reject) => {
      const userNotificationsSnap = await StoreDB.collection(
        `users/${uid}/notifications`
      ).get()
      const userNotifications = userNotificationsSnap.docs.map(d => {
        return Object.assign(d.data(), { id: d.id })
      })
      resolve(userNotifications)
    })
  },

  async removeNotification(uid, notification) {
    return new Promise(async (resolve, reject) => {
      await StoreDB.doc(
        `users/${uid}/notifications/${notification.id}`
      ).delete()
      resolve(notification)
    })
  },

  // Manuscript content
  getManuscriptContent(lang, manuscriptName) {
    return new Promise((resolve, reject) => {
      // Try to read from local cache

      let content = localStorage.getItem(
        `manuscript_content_${manuscriptName}_${lang}`
      )
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

  async getUserLineTranscription(uid, lineDocId) {
    return new Promise((resolve, reject) => {
      StoreDB.doc(`users/${uid}/lines/${lineDocId}`)
        .get()
        .then(res => {
          resolve(res.data())
        })
    })
  },

  async markUserTranscription(transcriptionId, correct){
    return new Promise((resolve, reject) => {
      StoreDB.doc(`transcriptions/${transcriptionId}`).update({correct:correct}).then(res => {
        resolve(res)
      })
    })
  },

  async getLineUserTranscriptions(params) {
    return new Promise((resolve, reject) => {
      StoreDB.collection('transcriptions')
        .where('manuscript', '==', params.manuscript)
        .where('page', '==', params.page)
        .where('line', '==', params.line)
        .get()
        .then(res => {
          const lines = res.docs.map(d => Object.assign(d.data(),{id:d.id}))
          resolve(lines)
        })
    })
  },

  async getLine(msId, page, line, uid) {
    // Unforuntelly, BNF has line 0 lines... quick fix
    if (line == 0) {
      line++
    }

    return new Promise((resolve, reject) => {
      StoreDB.collection(`manuscripts/${msId}/lines/`)
        .where('page', '==', page)
        .where('line', '==', line)
        .limit(1)
        .get()
        .then(async res => {
          if (res.size) {
            const lineSnap = res.docs[0]
            const lineData = lineSnap.data()
            const userLineStatus = await this.getUserLineTranscription(
              uid,
              lineSnap.id
            )
            resolve({
              data: Object.assign(lineData, { userLineStatus }),
              id: lineSnap.id
            })
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
      const manuscriptsQuerySnapshot = await StoreDB.collection(
        'manuscripts'
      ).get()
      const manuscripts = manuscriptsQuerySnapshot.docs.map(snap => {
        const msData = snap.data()
        return Object.assign(msData, { id: snap.id })
      })

      resolve(manuscripts)
    })
  },

  async getUserTemperament(uid) {
    return new Promise(async (resolve, reject) => {
      const userTemperament = await StoreDB.doc(
        `research/umap/users/${uid}`
      ).get()
      let temperament = null
      if (userTemperament.exists) {
        const traits = userTemperament.data()
        temperament = `${traits.openness}${traits.conscientiousness}`
      }

      resolve(temperament)
    })
  },

  async updateUserTemperament(params) {
    return new Promise(async (resolve, reject) => {
      await StoreDB.doc(`research/umap/users/${params.uid}`).set(
        params.userTraits,
        { merge: true }
      )
    })
  },

  async addTranscription(params) {
    // Write to the user obj
    const updateParams = Object.assign({}, params)
    updateParams.uid = updateParams.isAnonymous ? 'guest' : updateParams.uid
    delete updateParams.generalIndex
    ///
    await this.updateDocument(`transcriptions`, null, updateParams)

    // // Update the task lines
    // const taskSnap = await StoreDB.doc(`tasks/${updateParams.task}/ranges/${updateParams.rangeId}`).get()
    // const task = taskSnap.data()
    // const taskLines = task && task.taskLines || {}
    // const totalLinesMade = task && task.totalLinesMade || 0
    // const lineCount = taskLines[params.generalIndex] || 0
    // taskLines[params.generalIndex] = lineCount + 1
    // await taskSnap.ref.set({ taskLines: taskLines, totalLinesMade: totalLinesMade + 1 }, { merge: true })

    if (params.task) {
      const taskRangesSnap = await StoreDB.collection(
        `tasks/${params.task}/ranges`
      ).get()
      const taskRanges = taskRangesSnap.docs.map(rs => {
        return Object.assign(rs.data(), { id: rs.id })
      })

      //Update the task record on the user profile - point to the next line in the task
      const userTaskDoc =
        !updateParams.isAnonymous &&
        (await StoreDB.doc(
          `users/${updateParams.uid}/tasks/${updateParams.task}`
        ).get())

      let userTaskDocData = userTaskDoc && userTaskDoc.data()

      if (!userTaskDocData) {
        const userTaskDocDataJSON = localStorage.getItem(
          `task_${updateParams.task}`
        )
        userTaskDocData = userTaskDocDataJSON && JSON.parse(userTaskDocDataJSON)
      }
      const userTaskLines = (userTaskDocData && userTaskDocData.lines) || []
      const lineUID = `${params.manuscript}_${params.lineId}`
      if (userTaskLines.indexOf(lineUID) == -1) {
        userTaskLines.push(lineUID)
      }

      const next_general_index =
        (userTaskDocData && userTaskDocData.next_general_index) || {}
      const userNextGeneralIndexForRange = params.generalIndex + 1
      next_general_index[params.rangeId] = userNextGeneralIndexForRange

      // Are we done?
      let totalremainingLines = 0

      taskRanges.forEach(range => {
        let remainingLines = !isNaN(next_general_index[range.id])
          ? range.end_general_index - next_general_index[range.id]
          : range.end_general_index - range.start_general_index

        remainingLines = Math.max(remainingLines, 0)
        totalremainingLines += remainingLines
      })

      const taskObj = {
        next_general_index: next_general_index,
        lines: userTaskLines,
        remainingLines: totalremainingLines
      }
      if (!updateParams.isAnonymous) {
        await userTaskDoc.ref.set(taskObj, { merge: true })
      } else {
        localStorage.setItem(
          `task_${updateParams.task}`,
          JSON.stringify(taskObj)
        )
      }
    }

    if (!updateParams.isAnonymous) {
      // Update the manuscript record on the user profile - point to the next line in the manuscript - this progresses even if the line was skipped
      await StoreDB.doc(
        `users/${updateParams.uid}/manuscripts/${updateParams.manuscript}`
      ).set({ next_general_index: params.generalIndex + 1 }, { merge: true })

      // Add another line to the user lines collection and mark the action
      await StoreDB.doc(
        `users/${updateParams.uid}/lines/${updateParams.lineId}`
      ).set(
        {
          action: updateParams.skipped ? 'skip' : 'done'
        },
        { merge: true }
      )
    }

    return false
  },
  updateTranslation(translation) {
    return this.updateDocument('translations', translation.id, translation)
  },
  async getReplies(path) {
    return new Promise(async (resolve, reject) => {
      const repliesSnap = await StoreDB.collection('messages')
        .where('replyTo', '==', path)
        .get()
      const replies = repliesSnap.docs.map(m => {
        return Object.assign(m.data(), {
          id: m.id,
          showReplyLine: false,
          path: m.ref.path
        })
      })

      resolve(replies)
    })
  },
  /**
   * path - single message
   */
  async getMessages(params) {
    return new Promise(async (resolve, reject) => {
      const path = params.path
      const context = params.context
      const snap = path
        ? await StoreDB.doc(path).get()
        : context
          ? await StoreDB.collection('messages')
              .where('replyTo', '==', null)
              .where('context', '==', context)
              .orderBy('createdOn', 'desc')
              .get()
          : await StoreDB.collection('messages')
              .where('replyTo', '==', null)
              .orderBy('createdOn', 'desc')
              .get()
      let messages
      if (path) {
        messages = [
          Object.assign(snap.data(), {
            id: snap.id,
            showReplyLine: false,
            path: snap.ref.path
          })
        ]
      } else {
        messages = snap.docs.map(m => {
          return Object.assign(m.data(), {
            id: m.id,
            showReplyLine: false,
            path: m.ref.path
          })
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
  async getUserTask(taskId, uid, isAnonymous) {
    return new Promise(async (resolve, reject) => {
      let userTask

      if (!isAnonymous) {
        const userTaskDoc = await StoreDB.doc(
          `users/${uid}/tasks/${taskId}`
        ).get()
        userTask = userTaskDoc && userTaskDoc.data()
      } else {
        const userTaskJSON = localStorage.getItem(`task_${taskId}`)
        userTask = userTaskJSON && JSON.parse(userTaskJSON)
      }

      resolve(userTask)
    })
  },
  getPrevLine(msId, current_index, userId) {
    return new Promise((resolve, reject) => {
      StoreDB.collection(`manuscripts/${msId}/lines`)
        .where('general_index', '<', current_index)
        .limit(1)
        .get()
        .then(res => {
          if (res.docs.length) {
            const lineSnap = res.docs[0]
            return resolve({ data: lineSnap.data(), id: lineSnap.id })
          }
        })
    })
  },
  getNextLine(msId, current_index, userId) {
    return new Promise((resolve, reject) => {
      StoreDB.collection(`manuscripts/${msId}/lines`)
        .where('general_index', '>', current_index)
        .limit(1)
        .get()
        .then(res => {
          if (res.docs.length) {
            const lineSnap = res.docs[0]
            return resolve({ data: lineSnap.data(), id: lineSnap.id })
          } else {
            return resolve(this.getLine(msId, 1, 1))
          }
        })
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
