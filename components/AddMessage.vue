<template>
  <div class="new-message pt-3 pb-3">
    <input
      type="text"
      class="form-control mb-3"
      @keyup="updateMessageTitle"
      placeholder="כותרת"
      :value="$store.state.conversation.current_message.title"
    >
    <textarea
      class="form-control mb-3"
      rows="3"
      placeholder="תוכן"
      @keyup="updateMessageContent"
      :value="$store.state.conversation.current_message.content"
    ></textarea>

    <input type="button" class="btn-primary" @click="addMessage" value="שלח">
  </div>
</template>
<script>
import MessageBox from '~/components/MessageBox'
export default {
  components: {
    MessageBox
  },
  props: {
    replyTo: Object,
    num_replies: Number,
    context: String,
  },
  methods: {
    updateMessageContent(event) {
      this.$store.dispatch(
        'conversation/updateCurrentMessageContent',
        event.target.value
      )
    },
    updateMessageTitle(event) {
      this.$store.dispatch(
        'conversation/updateCurrentMessageTitle',
        event.target.value
      )
    },
    addMessage() {
      let params = {
        displayName:
          this.$store.state.auth.user.displayName ||
          this.$store.state.auth.user.uid,
        uid: this.$store.state.auth.user.uid,
        manuscript:
          this.$store.state.transcribe.manuscript &&
          this.$store.state.transcribe.manuscript.id,
        content: this.$store.state.conversation.current_message.content,
        context: this.context,
        title: this.$store.state.conversation.current_message.title,
        replyTo: (this.replyTo && this.replyTo.path) || null,
        num_replies: this.num_replies || 0
      }

      this.$store.dispatch('conversation/addMessage', params)
      this.$store.dispatch('conversation/hideReplyLine', this.replyTo.id)
    }
  }
}
</script>

