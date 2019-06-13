<template>
  <div class="container pt-5">
    <div>{{$t('conversation.disclaimer')}}</div>
    <div>
      <Conversation/>
    </div>
  </div>
</template>
<script>
import Conversation from '~/components/Conversation'
export default {
  components: {
    Conversation
  }
}
</script>