import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const { Parser } = require('json2csv')

const cors = require('cors')({
  origin: true
})
admin.initializeApp()

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

exports.lines_since_date_csv = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!')
  }
  if(!req.query.date){
    return res.status(400).send(JSON.stringify(req.query))
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    const date = new Date(req.query.date)

    const db = admin.firestore()
    db.collection('transcriptions')
      .where('createdOn', '>', date)
      .limit(5000)
      .get()
      .then(snapshot => {
        const lines = snapshot.docs.map(d => d.data())
        const promises: Array<any> = []

        lines.forEach(l => promises.push(formatLine(l)))

        Promise.all(promises).then(
          values => {
            
            const csv = jsonToCSV(values)
            res.setHeader(
              'Content-disposition',
              `filename; filename=lines_${date.toString()}.csv`
            )
            res.setHeader(
              'Access-Control-Expose-Headers',
              'Content-Disposition'
            )
            res.set('Content-Type', 'text/csv;charset=utf-8')
            res.status(200).send(csv)
          },
          function(err) {
            return res.status(500).send(err)
          }
        )
      })
      .catch(reason => {
        return res.status(500).send(reason)
      })

    // [END sendResponse]
  })
})

function formatLine(line: any) {
  return new Promise(async function(resolve, reject) {
    const _manuscript = await admin
      .firestore()
      .doc(`manuscripts/${line.manuscript}`)
      .get()
    const _manuscriptData =
      _manuscript && _manuscript.data && _manuscript.data()
    const manuscript = _manuscriptData
      ? _manuscriptData.official_name
      : line.manuscript

    const _user = await admin
      .firestore()
      .doc(`users/${line.uid}`)
      .get()
    const _userData = _user && _user.data && _user.data()
    const userid = _userData ? _userData.userid || _userData.uid : line.uid

    const createdOn = new Date(line.createdOn._seconds * 1000)
    const start = line.start
      ? new Date(line.start._seconds * 1000)
      : new Date(line.createdOn._seconds * 1000)
    const obj = {
      date: createdOn,
      userid: userid,
      manuscript: manuscript || line.manuscript,
      page: line.page,
      line: line.line,
      status: line.skipped ? 0 : 3,
      transcriptionversion: '',
      automatictranscription: '',
      usertranscription: line.transcription,
      start: start,
      host: ''
    }

    resolve(obj)
  })
}

function jsonToCSV(json: Array<object>, fields?: Array<string>) {
  const _fields = fields || Object.keys(json[0])
  const opts = { _fields }

  const parser = new Parser(opts)
  const csv = parser.parse(json)
  const BOM = '\uFEFF'
  return BOM + csv
}

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
