
import api from '@/api.js'

export const state = () => ({
  current_message: {},
  messages: []
})

export const mutations = {
  messageUpdated(state, payload) {
    state.messages.push(Object.assign(payload, { createdOn: { seconds: 123 } }))
    state.current_message = {}
  },
  currentMessageContentUpdated(state, payload) {
    state.current_message.content = payload
  },
  currentMessageTitleUpdated(state, payload) {
    state.current_message.title = payload
  },
  gotMessages(state, payload) {
    state.messages = payload
  },
  gotReplies(state, payload) {
    state.messages = state.messages.concat(payload)
  },
  showReplyLine(state, payload) {
    state.messages.find(m => m.id === payload).showReplyLine = true;
  },
  hideReplyLine(state, payload) {
    state.messages.find(m => m.id === payload).showReplyLine = false;
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) { },
  // General content
  updateCurrentMessageContent({ commit, dispatch }, content) {
    commit('currentMessageContentUpdated', content)
  },
  updateCurrentMessageTitle({ commit, dispatch }, title) {
    commit('currentMessageTitleUpdated', title)
  },
  async addMessage({ commit, state }, params) {
    await api.addConversationMessage(params)
    commit('messageUpdated', params)
  },
  async getMessages({ commit, dispatch }, path) {
    const messages = await api.getMessages(path)
    commit('gotMessages', messages)
    if (path) {
      dispatch('getReplies', path)
    }
  },
  
  hideReplyLine({ commit }, messageId) {
    commit('hideReplyLine', messageId)
  },
  showReplyLine({ commit }, messageId) {
    commit('showReplyLine', messageId)
  },
  async getReplies({ commit }, path) {
    const messages = await api.getReplies(path)
    commit('gotReplies', messages)
  }
}