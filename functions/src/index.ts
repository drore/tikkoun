import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

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
