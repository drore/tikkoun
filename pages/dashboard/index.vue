<template>
  <div class="dashboard">
    <div class="manuscripts">
      <h2>Manuscripts</h2>
      <div class="manuscript" v-for="(manuscript,i) in manuscripts" :key="i">
        <div class="label">
          <span class="ms_name">{{manuscript.name}}</span>
          {{manuscript.transcriptions_threshold}} Pass
        </div>
        <div class="total">
          <div
            class="done"
            :style="`width:${getManuscriptDonePercentage(manuscript)}%`"
          >{{getManuscriptDonePercentage(manuscript)}}%</div>
        </div>
      </div>
    </div>
    <div class="users">
      <h2>Users</h2>
      <div class="user" v-for="(leader,i) in leaders" :key="i">
        <div class="name">****************</div>
        <!-- <div class="name">{{leader.displayName || leader.email}}</div> -->
        <div class="lines">Lines: {{leader.linesTranscribed}}</div>
        <hr />
        <div class="last_visit">Last login: {{getReadableTime(leader.lastLogin)}}</div>
        <div class="since">Joined: {{getReadableTime(leader.createdOn)}}</div>

        <!-- <div class="lines_last_two_weeks">10</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {}
  },

  computed: {
    manuscripts() {
      const manuscripts = this.$store.state.general.manuscripts
      return manuscripts.filter(m => {
        return !m.hidden
      })
    },
    leaders() {
      return this.$store.state.stats.leaders
    }
  },
  methods: {
    getManuscriptDonePercentage(manuscript) {
      let percentage = 0

      if (manuscript.doneLines) {
        percentage =
          (manuscript.doneLines.transcription / manuscript.total_lines) * 100
      }

      return percentage.toFixed(2)
    },
    getReadableTime(time) {
        if(time){
const date = new Date(time.seconds * 1000)
      let formatted_date =
        date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
      return formatted_date
        }
        else{
            return "Couldn't retrieve"
        }
      
    }
  },
  mounted() {
    this.$store.dispatch('stats/getLeaderBoard', {
      root: true,
      return_full: true,
      count: 20
    })
  }
}
</script>
<style lang="scss">
.dashboard {
  direction: ltr;
  text-align: left;
  & > div {
    padding: 10px 15px;

    border-bottom: 1px solid #888;
  }
}
.users {
  .user {
    display: inline-block;
    border: 1px solid #888;
    padding: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    .name {
      font-weight: bold;
    }
  }
}
.manuscripts {
  .manuscript {
    margin: auto;
    position: relative;
    margin-bottom: 10px;
    display: flex;
    .label {
      position: relative;
      z-index: 1;
      width: 100px;
      .ms_name {
        font-weight: bold;
        display: block;
      }
    }
    .total {
      flex: 1;
      position: relative;
      border: 1px solid #555;
      padding: 5px;
      .done {
        background-color: #9fd29f;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        padding: 5px;
        text-align: right;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}
</style>