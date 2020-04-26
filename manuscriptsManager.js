import api from './api'

export default {
  getLine(msId, page, line, uid) {
    return api.getLine(msId,page,line, uid)
  },
  getNextLine(msId, current_index) {
    return api.getNextLine(msId, current_index)
  },
  getPrevLine(msId, current_index) {
    return api.getPrevLine(msId, current_index)
  }
}
