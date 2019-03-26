import { StoreDB } from '~/plugins/firebase.js'
export default {
  getCollection(collection) {
    return StoreDB.collection(collection).get()
  },
  getTranslations(lang) {
    return StoreDB.collection('translations')
      .where('lang', '==', lang)
      .get()
  },
  getManuscriptContent() {
    return StoreDB.collection('manuscript_contents')
      .where('manuscript', '==', 'geneva')
      .get()
  },
  updateMSContentItem(msContentItem) {
    return this.updateDocument(
      'manuscript_contents',
      msContentItem.id,
      msContentItem
    )
  },
  updateTranslation(translation) {
    return this.updateDocument('translations', translation.id, translation)
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
