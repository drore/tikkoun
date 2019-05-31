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

exports.user_lines_csv = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!')
  }
  if (!req.query.uid) {
    return res.status(400).send(JSON.stringify(req.query))
  }
  // [END sendError]
  const uid = req.query.uid
  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    const db = admin.firestore()
    db.collection('transcriptions')
      .where('uid', '==', uid)
      .get()
      .then(snapshot => {
        let lines = snapshot.docs.map(d => d.data())
        lines = lines.map(l => {
          const date = l.start
            ? new Date(l.start._seconds * 1000)
            : new Date(l.createdOn._seconds * 1000)
          return Object.assign({ date: date }, l)
        })

        const csv = jsonToCSV(lines)
        res.setHeader(
          'Content-disposition',
          `filename; filename=lines_${uid}.csv`
        )
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
        res.set('Content-Type', 'text/csv;charset=utf-8')
        res.status(200).send(csv)
      })
      .catch(reason => {
        return res.status(500).send(reason)
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
  if (!req.query.from || !req.query.to) {
    return res.status(400).send(JSON.stringify(req.query))
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  const cache = {
    manuscript: null,
    lines: {},
    users: {}
  }

  return cors(req, res, () => {
    const from = new Date(req.query.from)
    const to = new Date(req.query.to)

    const db = admin.firestore()
    db.collection('transcriptions')
      .where('createdOn', '>=', from)
      .where('createdOn', '<=', to)
      .get()

      .then(snapshot => {
        const lines = snapshot.docs.map(d => d.data())
        const promises: Array<any> = []

        lines.forEach(l => promises.push(formatLine(l, cache)))

        Promise.all(promises).then(
          values => {
            const csv = jsonToCSV(values)
            res.setHeader(
              'Content-disposition',
              `filename; filename=lines_${from.toString()}_${to.toString()}.csv`
            )
            res.setHeader(
              'Access-Control-Expose-Headers',
              'Content-Disposition'
            )
            res.set('Content-Type', 'text/csv;charset=utf-8')
            res.status(200).send(csv)
          },
          function (err) {
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

function formatLine(line: any, cache: any) {
  return new Promise(async function (resolve, reject) {

    if (!cache.manuscript) {
      const _manuscript = await admin
        .firestore()
        .doc(`manuscripts/${line.manuscript}`)
        .get()

      cache.manuscript =
        _manuscript && _manuscript.data && _manuscript.data()
    }

    const manuscript = cache.manuscript
      ? cache.manuscript.official_name
      : line.manuscript

    if (!cache.users[line.uid]) {
      const _user = await admin
        .firestore()
        .doc(`users/${line.uid}`)
        .get()

      cache.users[line.uid] = _user && _user.data && _user.data()
    }

    const userid = cache.users[line.uid] ? cache.users[line.uid].userid || cache.users[line.uid].uid : line.uid

    if (!cache.lines[`${line.manuscript}_${line.page}_${line.line}`]) {
      const krakenLine = await admin
        .firestore()
        .collection(`manuscripts/${line.manuscript}/lines`)
        .where('page', '==', line.page)
        .where('line', '==', line.line)
        .get()

      cache.lines[`${line.manuscript}_${line.page}_${line.line}`] =
        (krakenLine.size &&
          krakenLine.docs[0] &&
          krakenLine.docs[0].data &&
          krakenLine.docs[0].data()) ||
        {}
    }
    console.log(cache)

    const krakenLineData = cache.lines[`${line.manuscript}_${line.page}_${line.line}`]

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
      automatictranscription: krakenLineData.AT,
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

/**
 * When a new transcrition is added
 * This function will point to the next needed location
 */
export const updateManuscriptNextLine = functions.firestore
  .document('transcriptions/{id}')
  .onCreate(async transcriptionSnap => {
    console.log('updateManuscriptNextLine', 'updating next line and page')
    const transcriptionData = transcriptionSnap && transcriptionSnap.data()

    if (transcriptionData && !transcriptionData.skipped) {
      const manuscript_id = transcriptionData.manuscript

      const msDoc = await admin
        .firestore()
        .doc(`manuscripts/${manuscript_id}`).get()

      const msDocData = msDoc && msDoc.data()
      const transcriptions_threshold = msDocData && msDocData.transcriptions_threshold || 1

      let lineSnap = await admin
        .firestore()
        .collection(`manuscripts/${manuscript_id}/lines`)
        .where('transcriptions', '<', transcriptions_threshold)
        .limit(1)
        .get()

      // If not even one is returned, probably we are done with this threshold
      const needToBumpThreshold = !!!lineSnap.size;
      if (needToBumpThreshold) {
        const newThreshold = transcriptions_threshold + 1
        await msDoc.ref.set({ transcriptions_threshold: newThreshold }, { merge: true })

        // This will serve as the next "go-to" line
        lineSnap = await admin
          .firestore()
          .collection(`manuscripts/${manuscript_id}/lines`)
          .where('transcriptions', '<', newThreshold)
          .limit(1)
          .get()
      }

      const lineData = lineSnap.size && lineSnap.docs[0].data()
      if (lineData) {
        msDoc.ref.update({
          next_line: lineData.line,
          next_page: lineData.page
        })
          .catch(() => {
            return null
          })

        return null
      } else {
        return null
      }
    } else {
      return null
    }
  })

/**
 * When a transcription is added, update all statistics 
 */
export const onLineTranscriptionAdded = functions.firestore
  .document('transcriptions/{id}')
  .onCreate(async transcriptionSnap => {
    const transcriptionData = transcriptionSnap.data()
    if (transcriptionData) {
      const manuscript_id = transcriptionData.manuscript
      if (!transcriptionData.skipped) {
        // Update the number of transcriptions on the line obj
        const linesSnap = await admin
          .firestore()
          .collection(`manuscripts/${manuscript_id}/lines`)
          .where('page', '==', transcriptionData.page)
          .where('line', '==', transcriptionData.line)
          .limit(1)
          .get()

        if (linesSnap.size) {
          const lineData = linesSnap.docs[0].data()
          const transcriptions = (lineData && lineData.transcriptions) || 0
          await linesSnap.docs[0].ref.update({
            transcriptions: transcriptions + 1
          })
        }

        // Update the number of lines transcribed on the user
        await updateUserStatsIfExists(transcriptionData);
        return null
      } else {
        return null
      }
    } else {
      return null
    }
  })

async function updateUserStatsIfExists(transcriptionData: FirebaseFirestore.DocumentData) {
  const uid = transcriptionData.uid
  const manuscript_id = transcriptionData.manuscript

  // Update total lines transcribed
  await updateUserGeneralStats(uid);

  // Update manuscript lines transcribed
  await updateUserManuscriptStats(uid, manuscript_id);
}

async function updateUserGeneralStats(uid: any) {
  const userSnap = await admin
    .firestore()
    .doc(`users/${uid}`)
    .get();

  if (userSnap.exists) {
    const userData = userSnap.exists && userSnap.data();
    if (userData) {

      if (userData.linesTranscribed) {
        await userSnap.ref.update({
          linesTranscribed: userData.linesTranscribed + 1
        });
      }
      else {
        // update the init num of lines per user
        await updateInitUserGeneralLinesStats(uid);
      }
    }
  }
}
/**
 * This function calculates the initial "lines_transcribed" variable on the user obj - this function is costly in potential (gets all lines done by the user)
 * @param uid The user id
 */
async function updateInitUserGeneralLinesStats(uid: any) {
  // Get all the user transcriptions
  const userTranscriptionsSnap = await admin
    .firestore()
    .collection('transcriptions')
    .where('uid', '==', uid)
    .get();

  // Update
  await admin.firestore().doc(`users/${uid}`).update({
    linesTranscribed: userTranscriptionsSnap.size
  });
}

/**
 * This function updates the statistics for this specific ms for this specific user
 * In this function we also update the daily stats
 * @param uid The user id
 * @param manuscript_id The manuscript id
 */
async function updateUserManuscriptStats(uid: any, manuscript_id: any) {
  // The user-manuscript obj
  const userManuscriptDoc = await admin
    .firestore()
    .doc(`users/${uid}/manuscripts/${manuscript_id}`)
    .get();

  const userManuscriptData = userManuscriptDoc.exists && userManuscriptDoc.data();
  const msLinesTranscribedByNow = userManuscriptData && userManuscriptData.linesTranscribed;

  // If the lines were already calculated once
  let msLines, linesTranscribed;
  // If the user had already transcribed we can use the data to infer other vars and optimize the db usage
  if (msLinesTranscribedByNow) {
    const msDonePercentage = userManuscriptData && userManuscriptData.done_percentage;
    // The percentage is used here to reverse calc the ms lines num
    msLines = await getMSLines(manuscript_id, msDonePercentage, msLinesTranscribedByNow);
    // Plus this one
    linesTranscribed = msLinesTranscribedByNow + 1
  }
  else {
    // If not, we need to calculate it all
    // First we get it (all the user transcriptions for this ms)
    const msLinesTranscribedRef = await admin.firestore().collection(`transcriptions`).where('manuscript', '==', manuscript_id).where('uid', '==', uid).get();

    // Not the ms doc itself (for total_lines)
    const msDoc = await admin.firestore().doc(`manuscripts/${manuscript_id}`).get();
    const msDocData = msDoc.data();

    // Update it all - there is no need to advance the result by one because we query the collection after the addition of the last transcription
    msLines = msDocData && msDocData.total_lines;
    linesTranscribed = msLinesTranscribedRef.size
  }

  await makeTheActualUpdate(linesTranscribed, msLines, userManuscriptDoc);
  await updateDailyUserMSStats(userManuscriptDoc, uid, manuscript_id);
}

async function updateDailyUserMSStats(userManuscriptDoc: FirebaseFirestore.DocumentSnapshot, uid: any, manuscript_id: any) {
  const userManuscriptData = userManuscriptDoc.data()
  let dailyStats = userManuscriptData && userManuscriptData.dailyStats
  if (!dailyStats) {
    // Init daily stats
    dailyStats = await initUserMSDailyMSStats(uid, manuscript_id)
  }
  else {
    // Add one for today
    const dateString = new Date().toDateString();
    const dayCount = dailyStats[dateString] || 0
    dailyStats[dateString] = dayCount + 1
  }

  await userManuscriptDoc.ref.set({ dailyStats: dailyStats }, { merge: true });

}

async function initUserMSDailyMSStats(uid: any, manuscript_id: any) {
  // Get all user lines
  const userMSLines = await getUserMSLines(uid, manuscript_id)

  // Sort by date, count
  const dailyStats: any = {}
  userMSLines.docs.forEach(d => {
    const dateString = new Date(d.data().createdOn.seconds * 1000).toDateString();
    const dayCount = dailyStats[dateString] || 0
    dailyStats[dateString] = dayCount + 1
  })

  // Return dailyStats obj
  return dailyStats
}

async function getUserMSLines(uid: any, manuscript_id: any) {
  const userMSLines = await admin
    .firestore()
    .collection('transcriptions')
    .where('uid', '==', uid)
    .where('manuscript', '==', manuscript_id)
    .get();

  return userMSLines;
}

async function makeTheActualUpdate(linesTranscribed: number, msLines: any, userManuscriptDoc: FirebaseFirestore.DocumentSnapshot) {
  const percentage = (linesTranscribed / msLines) * 100;
  await userManuscriptDoc.ref.set({ linesTranscribed: linesTranscribed, done_percentage: percentage }, { merge: true });
}

/**
 * This function calculates the number of lines in the ms from the percentage and the lines transcribed by now (reverse calc)
 * This is to optimize the db usage
 * 
 * @param manuscript_id The manuscript id
 * @param msDonePercentage The percetage done thus far
 * @param msLinesTranscribedByNow Lines transcribed by now
 */
async function getMSLines(manuscript_id: any, msDonePercentage: number, msLinesTranscribedByNow: number) {
  let msLines;
  if (msDonePercentage) {
    msLines = msLinesTranscribedByNow / (msDonePercentage / 100);
  }
  else {
    const msDoc = await admin.firestore().doc(`manuscripts/${manuscript_id}`).get();
    const msDocData = msDoc.data();
    msLines = msDocData && msDocData.total_lines;
  }

  return msLines;
}
