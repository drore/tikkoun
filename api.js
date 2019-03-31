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
  // General content
  getContent(lang) {
    return StoreDB.collection('content')
      .where('lang', '==', lang)
      .get()
  },
  updateContentItem(contentItem) {
    return this.updateDocument('content', contentItem.id, contentItem)
  },
  getManuscript(name) {
    let query = null
    if (!name) {
      query = StoreDB.collection('manuscripts').limit(1)
    } else {
      query = StoreDB.collection('manuscripts')
        .where('name', '==', name)
        .limit(1)
    }
    return query.get()
  },
  // Manuscript content
  getManuscriptContent(lang, manuscriptName) {
    return StoreDB.collection('manuscript_content')
      .where('manuscript', '==', manuscriptName)
      .where('lang', '==', lang)
      .get()
  },
  updateMSContentItem(msContentItem) {
    return this.updateDocument(
      'manuscript_content',
      msContentItem.id,
      msContentItem
    )
  },
  updateLineViewing(manuscriptId, params) {
    return StoreDB.doc(
      `manuscripts/${manuscriptId}/lines/${params.lineId}`
    ).update({ views: params.viewCounter + 1 })
  },
  addTranscription(params) {
    return this.updateDocument(`transcriptions`, null, params)
  },
  updateTranslation(translation) {
    return this.updateDocument('translations', translation.id, translation)
  },
  getUserLines(uid) {
    return StoreDB.collection('transcriptions')
      .where('uid', '==', uid)
      .get()
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
