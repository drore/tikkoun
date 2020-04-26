<template>
<div>
  <h4>{{$t('nav.conversation')}}</h4>
  <div class="pt-2 mt-2">
    <div class="buttons">
      <button
        name="new"
        class="btn btn-tikkoun"
        type="submit"
        @click="showNewMessageBox = true"
      >{{$t('conversation.new')}}</button>
    </div>
    <AddMessage v-if="showNewMessageBox" :context="context"></AddMessage>

    <div class="messages">
      <MessageBox v-for="message in messages" :key="message.id" :message="message" :main="true"></MessageBox>
      <span v-if="!messages.length">{{$t('conversation.add_first_message')}}</span>
    </div>
  </div>
  </div>
</template>
<script>
import MessageBox from '~/components/MessageBox'
import AddMessage from '~/components/AddMessage'
export default {
  data() {
    return {
      path: '',
      showNewMessageBox: false
    }
  },
  props: {
    context: String
  },
  components: {
    MessageBox,
    AddMessage
  },
  beforeDestroy() {
    this.$store.dispatch('conversation/clear')
  },
  mounted() {
    const routeParams = this.$route.params
    if (!this.context && (routeParams.manuscript && routeParams.page && routeParams.line)) {
      this.context = `${routeParams.manuscript}_${routeParams.page}_${
        routeParams.line
      }`
    }

    this.path = routeParams.pathMatch

    this.$store.dispatch('conversation/getMessages', {
      path: this.path,
      context: this.context
    })
  },
  computed: {
    messages() {
      if (this.path) {
        return this.$store.state.conversation.messages.filter(
          m => m.path === this.path
        )
      } else {
        return this.$store.state.conversation.messages.filter(m => !m.replyTo)
      }
    }
  }
}
</script>

<style lang="scss">
.messages {
  border-top: 1px solid #333;
  margin-top: 10px;
  padding-top: 10px;
}
.tabContentTitle {
  text-decoration: underline;
  font-weight: bold;
  font-size: 18px;
}
</style>
