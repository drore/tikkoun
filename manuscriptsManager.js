import axios from 'axios'
import { StoreDB } from '~/plugins/firebase.js'
export default {
  getRandomLine(msId) {
    return new Promise((resolve, reject) => {
      StoreDB.collection(`manuscripts/${msId}/lines`)
        .where('views', '<', 21)
        .where('transcriptions', '<', 6)
        .get()
        .then(res => {
          const totalLines = res.size
          const randomLineIndex = Math.floor(Math.random() * totalLines)
          const randomLineSnap = res.docs[randomLineIndex]
          resolve({ data: randomLineSnap.data(), id: randomLineSnap.id })
        })
    })
  },
  getLine(msId, page, line) {
    // Unforuntelly, BNF has line 0 lines... quick fix
    if(line == 0){
      line++
    }

    return new Promise((resolve, reject) => {
      StoreDB.collection(`manuscripts/${msId}/lines`)
        .where('page', '==', page)
        .where('line', '==', line)
        .limit(1)
        .get()
        .then(res => {
          const lineSnap = res.docs[0]
          resolve({ data: lineSnap.data(), id: lineSnap.id })
        }).catch(err => {
        })
    })
  },
  getNextLine(msId, current_index) {
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
  getPrevLine(msId, current_index) {
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
  getManuscriptJSON(filename) {
    return axios.get(`/manuscripts/${filename}.json`)
  },
  async getManuscriptTSV(filename) {
    return new Promise((resolve, reject) => {
      axios.get(`/manuscripts/${filename}.tsv`).then(res => {
        resolve(res.data)
      })
    })
  }
}
