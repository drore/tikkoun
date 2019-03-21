import axios from 'axios'
export default {
  getRandomLine() {
    return new Promise((resolve, reject) => {
      axios.get('/manuscripts/geneva.json').then(res => {
        const totalLines = res.data.length
        const randomLineIndex = Math.floor(Math.random() * totalLines)
        resolve(res.data[randomLineIndex])
      })
    })
  }
}
