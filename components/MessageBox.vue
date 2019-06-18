<template>
  <div>
    <a
      :href="`${localePath('conversation')}${message.replyTo}`"
      v-if="main && message.replyTo"
    >---- Parent</a>

    <div class="message-wrapper mb-2 pb-2" :id="`message_wrapper_${message.id}`">
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
            <span class="context" v-if="message.context" @click="goToContext()">{{context}}</span>
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
.message-wrapper{
      border-bottom: 1px solid #888;
}

.messages {
  .message-line {
    
    .context {
      font-size: 12px;
      border-radius: 5px;
      padding: 2px;
      background-color: orange;
      cursor: pointer;
      color:black;
    }
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
    context() {
      const contextArr = this.message.context && this.message.context.split('_')
      if (contextArr) {
        return `${this.$t('manuscript')} ${contextArr[0]} / ${this.$t(
          'page'
        )} ${contextArr[1]} / ${this.$t('line')} ${contextArr[2]}`
      }
    },
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
    goToContext() {
      const contextArr = this.message.context && this.message.context.split('_')
      if (contextArr) {
        //transcribe/geneva/452/2
        this.$router.push({ path: `/transcribe/${contextArr[0]}/${contextArr[1]}/${contextArr[2]}` })
      }
    },
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
