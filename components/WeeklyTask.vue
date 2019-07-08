<template>
  <b-row class="task-announcement p-2" v-if="task && notDoneWithTask">
    <b-col md="8" class="task-info">
      <div class="title">{{task.name}}</div>
      <div v-if="task.desc">{{task.desc}}</div>
      <!-- <div>
        <a
          href="javascript:;"
          v-if="!inTasksMode"
          @click="changedUserTrancribeMode('tasks')"
        >{{$t('tasks.back_to_task_mode')}}</a>
        <a
          href="javascript:;"
          v-if="inTasksMode"
          @click="changedUserTrancribeMode('regular')"
        >{{$t('tasks.out_of_task_mode')}}</a>
      </div> -->
    </b-col>
    <b-col md="4" class="ranges">
      <b-row v-if="notDoneWithTask">
        <div
          class="range p-2 m-1 col"
          v-for="(range,i) in task.ranges"
          :key="`range_${i}`"
          :style="`--percentage: ${Math.min(range.donePercentage,100)}%`"
          v-bind:class="{ done: remaining[range.id] === 0 }"
        >
          <div class="remaining">
            <div class="title" v-if="task.ranges.length > 1">{{range.msName}}</div>
            <div class="gague team" style="white-space:nowrap">{{$t('tasks.team_effort')}}: {{`${Math.min(range.donePercentage && range.donePercentage.toFixed(2),100) || 0}%`}}</div>
            <!-- <div class="gague team" style="white-space:nowrap">{{$t('tasks.personal_effort')}}: {{`${range.donePercentage && range.donePercentage.toFixed(2) || 0}%`}}</div> -->
            <!-- <div>{{$t('tasks.lines_remaining')}}: {{getRemainingLinesForRange(range.id)}}</div> -->
          </div>
        </div>
      </b-row>
      <div v-if="!notDoneWithTask" class="well-done">
        <marquee>
          {{$t('tasks.well_done')}}
          <span style="font-size:20px">🤘</span>
        </marquee>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      remaining: {}
    }
  },
  methods: {
    hideTaskAnnouncement() {
      this.$store.dispatch('auth/hideTaskAnnouncement', this.task.id)
    },
    getRemainingLinesForRange(rangeId) {
      const range = this.$store.state.transcribe.task.ranges.find(
        r => r.id === rangeId
      )
      const totalLines = range.totalLines || (range.end_general_index - range.start_general_index)
      const doneLines = range.doneLines || 0
      return totalLines - doneLines
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
    inTasksMode(){
      const transcribe_mode = localStorage.getItem('transcribe_mode') || this.$store.state.auth.user.transcribe_mode || 'tasks' // default to the task
      return transcribe_mode === 'tasks'
    },
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
          !isNaN(this.userTask.remainingLines) &&
          this.userTask.remainingLines === 0
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
.remaining {
  z-index: 10;
  position: relative;
}
</style>