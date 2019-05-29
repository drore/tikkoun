<template>
  <div class="container pt-5">
    <div
      class="alert"
    >ברוכים הבאים לפורום "תיקון סופרים" - אנא שימו לב כי הודעות שנכתבות כאן חשופות לכלל משתמשי האתר הרשומים</div>
    <div class="buttons">
      <input
        name="new"
        class="btn-primary"
        type="submit"
        @click="showNewMessageBox = true"
        :value="$t('conversation.new')"
      >
    </div>
    <AddMessage v-if="showNewMessageBox"></AddMessage>

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
  components: {
    MessageBox,
    AddMessage
  },
  mounted() {
    this.path = this.$route.params.pathMatch
    console.log(this.path)
    this.$store.dispatch('conversation/getMessages', this.path)
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
