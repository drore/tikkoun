import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const cors = require('cors')({
  origin: true
})
admin.initializeApp()
exports.last_day_lines = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!')
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)

    const db = admin.firestore()
    db.collection('transcriptions')
      .where('createdOn', '>', date)
      .get()
      .then(snapshot => {
        const lines = snapshot.docs.map(d => d.data())
        res.status(200).send(lines)
        return ''
      })
      .catch(reason => {
        res.status(500).send(reason)
      })

    // [END sendResponse]
  })
})

exports.last_day_lines_count = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!')
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)

    const db = admin.firestore()
    db.collection('transcriptions')
      .where('createdOn', '>', date)
      .get()
      .then(snapshot => {
        res.status(200).send(snapshot.size.toString())
        return ''
      })
      .catch(reason => {
        res.status(500).send(reason)
      })

    // [END sendResponse]
  })
})

exports.last_hour_lines_count = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!')
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    const date = new Date()
    date.setHours(date.getHours() - 1)

    const db = admin.firestore()
    db.collection('transcriptions')
      .where('createdOn', '>', date)
      .get()
      .then(snapshot => {
        res.status(200).send(snapshot.size.toString())
        return ''
      })
      .catch(reason => {
        res.send(reason)
      })

    // [END sendResponse]
  })
})

exports.last_hour_lines = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!')
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    const date = new Date()
    date.setHours(date.getHours() - 1)

    const db = admin.firestore()
    db.collection('transcriptions')
      .where('createdOn', '>', date)
      .get()
      .then(snapshot => {
        const lines = snapshot.docs.map(d => d.data())
        res.status(200).send(lines)
        return ''
      })
      .catch(reason => {
        res.send(reason)
      })

    // [END sendResponse]
  })
})

export const onLineViewUpdated = functions.firestore
  .document('manuscripts/{msId}/lines/{lineId}')
  .onUpdate((change, context) => {
    const after = change.after.data()

    if (after) {
      // If this is the line that is marked on the ms as the next line and page check if it has exceeded the number of view allowed
      if (after.views > 20) {
        const msRef = admin
          .firestore()
          .doc(`manuscripts/${context.params.msId}`)
        return msRef
          .get()
          .then(msSnap => {
            const ms = msSnap.data()
            if (ms) {
              if (after.page === ms.next_page && after.next_line === ms.line) {
                // Next
                admin
                  .firestore()
                  .collection(`manuscripts/${context.params.msId}/lines`)
                  .where('general_index', '==', after.general_index + 1)
                  .limit(1)
                  .get()
                  .then(linesSnap => {
                    let newLineParams = { next_line: 1, next_page: 1 }
                    if (linesSnap.size) {
                      const line = linesSnap.docs[0].data()
                      newLineParams = {
                        next_line: line.line,
                        next_page: line.page
                      }
                    }

                    return msRef.update(newLineParams).catch(err => {
                      console.log(err)
                    })
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
            }
            return null
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    return null
  })
