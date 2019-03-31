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
  getNextLine(msId, nextPage, nextLine) {
    return new Promise((resolve, reject) => {
      StoreDB.collection(`manuscripts/${msId}/lines`)
        .where('page', '==', nextPage)
        .where('line', '==', nextLine)
        .limit(1)
        .get()
        .then(res => {
          const lineSnap = res.docs[0];
          resolve({ data: lineSnap.data(), id: lineSnap.id })
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
