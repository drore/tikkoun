<template>
  <div class="task-announcement p-2" v-if="task && notDoneWithTask">
    <!-- <div
      class="start"
      @click="changedUserTrancribeMode('tasks')"
      v-if="$store.state.auth.user.transcribe_mode !== 'tasks'"
    >{{$t('task.weekly-task')}} - {{task.name}} - {{$t('task.click_to_participate')}}</div>-->

    <div class="d-flex justify-content-between">
      <div class="task-info p-2">
        <div class="title">{{task.name}}</div>
        <div v-if="task.desc">{{task.desc}}</div>
        <div>
          <a
            href="javascript:;"
            v-if="$store.state.auth.user.transcribe_mode !=='tasks'"
            @click="changedUserTrancribeMode('tasks')"
          >{{$t('back_to_task_mode')}}</a>
          <a
            href="javascript:;"
            v-if="$store.state.auth.user.transcribe_mode ==='tasks'"
            @click="changedUserTrancribeMode('regular')"
          >{{$t('out_of_task_mode')}}</a>
        </div>
      </div>
      <div class="ranges d-flex justify-content-between">
        <div v-if="notDoneWithTask">
          <div
            class="range p-2 m-1"
            v-for="(range,i) in task.ranges"
            :key="`range_${i}`"
            v-bind:class="{ done: remining[range.id] === 0 }"
          >
            <div class="title" v-if="task.ranges.length > 1">{{$t('task.part')}} - {{i+1}}</div>
            <div>{{$t('lines_remining')}}: {{getReminingLinesForRange(range.id)}}</div>
          </div>
        </div>
        <div v-if="!notDoneWithTask" class="well-done">
          <marquee>
            {{$t('task.well_done')}}
            <span style="font-size:20px">🤘</span>
          </marquee>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remining: {}
    }
  },
  methods: {
    hideTaskAnnouncement() {
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



      let reminingLines = (userNextGeneralIndexForRange && !isNaN(userNextGeneralIndexForRange))
        ? range.end_general_index - userNextGeneralIndexForRange
        : range.end_general_index - range.start_general_index

      reminingLines = Math.max(reminingLines, 0)
      this.remining[rangeId] = reminingLines

      return reminingLines
    },
    async changedUserTrancribeMode(mode) {
      await this.$store.dispatch('auth/changeTranscribeMode', mode)
      await this.$store.dispatch('transcribe/clear')
      setTimeout(function() {
        window.location = '/'
      }, 1000)
    }
  },
  computed: {
    hideTask() {
      return (
        this.$store.state.auth.hidden_tasks &&
        this.$store.state.auth.hidden_tasks[this.task.id]
      )
    },
    task() {
      return this.$store.state.transcribe.task
    },
    userTask() {
      return this.$store.state.auth.user_task
    },
    notDoneWithTask() {
      // Either the userTask hasn't been created yet or she did not finish yet
      return (
        !this.userTask ||
        !(
          !isNaN(this.userTask.reminingLines) &&
          this.userTask.reminingLines === 0
        )
      )
    },
    line() {
      return this.$store.state.transcribe.selected_line
    },
    manuscript() {
      return this.$store.state.transcribe.manuscript
    }
  }
}
</script>

<style>
</style>