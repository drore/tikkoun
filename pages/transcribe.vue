<template>
  <div>
    <nuxt-child v-if="manuscript" />
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      manuscriptRequested: false,
    }
  },
  beforeDestroy() {
    this.$store.dispatch('transcribe/clear')
  },
  mounted() {
    const routeParams = this.$route.params
    if (routeParams && routeParams.manuscript) {
      const routeManuscript = routeParams.manuscript.toLowerCase()
      const storeManuscript =
        this.$store.state.transcribe.manuscript &&
        this.$store.state.transcribe.manuscript.name &&
        this.$store.state.transcribe.manuscript.name.toLowerCase()

      if (routeManuscript === storeManuscript) {
        ////
      } else if (!this.manuscriptRequested) {
        this.manuscriptRequested = true
        this.$store.dispatch('transcribe/GET_MANUSCRIPT', routeManuscript)
      }
    } else if (!this.manuscriptRequested) {
      this.manuscriptRequested = true
      this.$store.dispatch('transcribe/GET_MANUSCRIPT')
    }
  },

  computed: {
    manuscript() {
      return this.$store.state.transcribe.manuscript
    }
  }
}
</script>
<style lang="scss">
.task-announcement {
  .start {
    cursor: pointer;
  }
  background-color: #e7f9f0;
  .range {
    border: 1px solid #333;
    border-radius: 5px;
    position: relative;
    &:before {
      content: '';
      background-color: #8cccac;
      left: 0;
      right: 0;
      position: absolute;
      bottom: 0;
      height: var(--percentage);
    }
  }
  .task-info,
  .range {
    .title {
      font-weight: bold;
    }
  }
}
</style>