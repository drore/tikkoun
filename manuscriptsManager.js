import api from './api'

export default {
  getLine(msId, page, line, uid) {
    return api.getLine(msId,page,line, uid)
  },
  getNextLine(msId, current_index, uid) {
    return api.getNextLine(msId, current_index, uid)
  },
  getPrevLine(msId, current_index, uid) {
    return api.getPrevLine(msId, current_index, uid)
  }
}
