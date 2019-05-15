<template>
  <div>
    <a
      :href="`${localePath('conversation')}${message.replyTo}`"
      v-if="main && message.replyTo"
    >---- Parent</a>

    <div class="message-wrapper" :id="`message_wrapper_${message.id}`">
      <div class="message-line">
        <a :href="`${localePath('conversation')}${message.path}`" class="title">{{message.title}}</a>

        <div class="content">{{message.content}}</div>
        <div>
          <div class="meta">
            {{$t('conversation.by')}}
            <span class="sender">{{message.displayName}}</span>
            -
            <span
              class="date"
              v-if="message.createdOn"
            >{{new Date(message.createdOn.seconds * 1000).toLocaleString()}}</span>
          </div>
          <div class="actions">
            <a
              href="javascript:;"
              @click="getReplies"
              v-if="message.num_replies && !repliesLoaded"
            >{{$t('conversation.comments')}} ({{message.num_replies}})</a>
            <a href="javascript:;" @click="showReplyLine">{{$t('conversation.reply')}}</a>
          </div>
        </div>
      </div>
      <div class="reply-line" v-if="message.showReplyLine">
        <AddMessage :replyTo="message" :num_replies="message.num_replies || 0"></AddMessage>
      </div>
      <div class="replies">
        <MessageBox v-for="reply in replies" :key="reply.id" :message="reply"></MessageBox>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.messages {
  .message-line {
    .meta {
      color: #888;
      font-size: 12px;

      .sender {
        font-weight: bold;
      }
    }
  }
  .replies {
    padding-right: 15px;
  }
}
</style>

<script>
import AddMessage from '~/components/AddMessage'
export default {
  name: 'MessageBox',
  data() {
    return {
      showReplies: false,
      repliesLoaded: false
    }
  },
  components: {
    AddMessage
  },
  props: {
    message: Object,
    main: Boolean
  },
  computed: {
    replies() {
      const self = this
      const replies = this.$store.state.conversation.messages.filter(
        m => m.replyTo === this.message.path
      )
      if (replies.length) {
        self.showReplies = true
        self.repliesLoaded = true
      }
      return replies
    }
  },
  methods: {
    navigateToParent() {
      this.$router.push({ path: `/conversation/${this.message.replyTo}` })
      this.$router.go(-1)
    },
    navigateToMessage() {
      this.$router.push({ path: `/conversation/${this.message.path}` })
    },
    showReplyLine() {
      this.$store.dispatch('conversation/showReplyLine', this.message.id)
    },
    getReplies() {
      const self = this
      this.$store
        .dispatch('conversation/getReplies', this.message.path)
        .then(res => {
          self.showReplies = true
          self.repliesLoaded = true
        })
    }
  }
}
</script>

