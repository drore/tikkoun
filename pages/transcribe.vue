<template>
  <div>
    <div class="task-announcement p-2" v-if="task && !hideTask && notDoneWithTask">
      <div
        class="start"
        @click="changedUserTrancribeMode('tasks')"
        v-if="$store.state.auth.user.transcribe_mode !== 'tasks'"
      >{{$t('task.weekly-task')}} - {{task.name}} - {{$t('task.click_to_participate')}}</div>
      <div><a href="javascript:;" @click="hideTaskAnnouncement()">{{$t('task.hide')}}</a></div>
      <div
        class="d-flex justify-content-between"
        v-if="$store.state.auth.user.transcribe_mode == 'tasks'"
      >
        <div class="task-info p-2">
          <div class="title">{{task.name}}</div>
          <div v-if="task.desc">{{task.desc}}</div>
          <div><a href="javascript:;" @click="hideTaskAnnouncement()">{{$t('task.hide')}}</a></div>
        </div>
        <div class="ranges d-flex justify-content-between" v-if="userTask">
          <div v-if="notDoneWithTask">
            <div
              class="range p-2 m-1"
              v-for="(range,i) in task.ranges"
              :key="`range_${i}`"
              v-bind:class="{ done: remining[range.id] === 0 }"
            >
              <div class="title">{{$t('task.part')}} - {{i+1}}</div>
              <div>שורות שנותרו: {{getReminingLinesForRange(range.id)}}</div>
            </div>
          </div>
          <div v-if="!notDoneWithTask" class="well-done">
            <marquee>{{$t('task.well_done')}}</marquee>
            </div>
        </div>
      </div>
    </div>
    <nuxt-child v-if="manuscript"/>
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      manuscriptRequested: false,
      motivational_message: '',
      remining: {}
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
  methods: {
    hideTaskAnnouncement(){
      this.$store.dispatch('auth/hideTaskAnnouncement', this.task.id)
    },
    getReminingLinesForRange(rangeId) {
      const range = this.$store.state.transcribe.task.ranges.find(
        r => r.id === rangeId
      )
      const user_task = this.userTask

      const userNextGeneralIndexForRange =
        user_task &&
        user_task.next_general_index &&
        user_task.next_general_index[rangeId]

      let reminingLines = !isNaN(userNextGeneralIndexForRange)
        ? range.end_general_index - userNextGeneralIndexForRange
        : range.end_general_index - range.start_general_index

      reminingLines = Math.max(reminingLines, 0)
      this.remining[rangeId] = reminingLines

      return reminingLines
    },
    changedUserTrancribeMode(mode) {
      this.$store.dispatch('auth/changeTranscribeMode', mode).then(res => {
        setTimeout(function() {
          window.location.reload()
        }, 1000)
      })
    }
  },
  computed: {
    hideTask(){
      return this.$store.state.auth.hidden_tasks && this.$store.state.auth.hidden_tasks[this.task.id]
    },
    task() {
      return this.$store.state.transcribe.task
    },
    userTask() {
      return this.$store.state.auth.user_task
    },
    notDoneWithTask() {
      // Either the userTask hasn't been created yet or she did not finish yet
      return !this.userTask || !(
        !isNaN(this.userTask.reminingLines) && this.userTask.reminingLines === 0
      )
    },
    manuscript() {
      const manuscript = this.$store.state.transcribe.manuscript
      return manuscript
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
    background-color: orange;
    &.done {
      background-color: green;
      color: white;
    }
  }
  .task-info,
  .range {
    .title {
      font-weight: bold;
    }
    .desc {
    }
  }
}
.well-done{
  font-size:25px;

}
</style>