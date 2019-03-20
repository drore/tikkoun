import { StoreDB } from '~/plugins/firebase.js'
export default () => {
  return new Promise(function(resolve) {
    const translations = {}
    const lang = 'he-IL'
    const colRef = StoreDB.collection('translations')
    const translationsPromise = colRef.where('lang', '==', lang).get()
    translationsPromise.then(snaps => {
      snaps.docs.forEach(d => {
        const data = d.data()
        // break it down
        const levelsArr = data.token.split('__').reverse()
        let currentLevel = translations
        let token
        while (levelsArr.length) {
          token = levelsArr.pop()
          if (levelsArr.length) {
            // initiate
            currentLevel[token] = currentLevel[token] || {}
            // Go deeper
            currentLevel = currentLevel[token]
          } else {
            // Assign value
            currentLevel[token] = data.value
          }
        }
      })
      resolve(translations)
    })
  })
}
