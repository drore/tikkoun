import axios from 'axios'
export default {
  getRandomLine(filename) {
    return new Promise((resolve, reject) => {
      axios.get(`/manuscripts/${filename}.json`).then(res => {
        const totalLines = res.data.length
        const randomLineIndex = Math.floor(Math.random() * totalLines)
        resolve(res.data[randomLineIndex])
      })
    })
  },
  async getManuscriptTSV(filename) {
    return new Promise((resolve, reject) => {
      axios.get(`/manuscripts/${filename}.tsv`).then(res => {
        resolve(res.data)
      })
    })
  }
}
