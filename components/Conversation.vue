<template>
  <div class="container pt-5">
    <div class="alert">{{$t('conversation.disclaimer')}}</div>
    <div class="buttons">
      <input
        name="new"
        class="btn-primary"
        type="submit"
        @click="showNewMessageBox = true"
        :value="$t('conversation.new')"
      >
    </div>
    <AddMessage v-if="showNewMessageBox" :context="context"></AddMessage>

    <div class="messages">
      <MessageBox v-for="message in messages" :key="message.id" :message="message" :main="true"></MessageBox>
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
