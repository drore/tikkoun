<template>
  <div>
    <nuxt-child v-if="manuscript"/>
    <b-modal
      ref="modal-congrats"
      id="modal-congrats"
      title="Welcome Back!"
      ok-only
      ok-title="Start correcting!"
      v-if="$store.state.auth.user"
    >
      <div class="d-flex justify-content-between">
        <div>
          <div>Your last session was: {{last_session}}</div>
          <div class="motivational-message">{{motivational_message}}</div>
        </div>
        <div class="stats">
          <div>Number of lines: {{$store.state.auth.user.linesTranscribed}}</div>
          <div>Avg. per session: ** Coming soon! **</div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      manuscriptRequested: false,
      motivational_message: ''
    }
  },
  beforeDestroy(){
    this.$store.dispatch("transcribe/clear")
  },  

  watch: {
    userTemperament: function(traits) {
      if (this.$store.state.general.env === 'demo') {
        //modal-congrats
        const temperamentByTraits = {
          OC: 'curiosity',
          OU: 'curiosity',
          DC: 'altruism',
          DU: 'fun',
          NC: 'self_improvement',
          NU: 'social',
          ON: 'competition',
          DN: 'self_imporvement',
          NN: 'curiosity'
        }

        const messages = {
          curiosity: [
            'Discover ancient hebrew manuscripts',
            'Try to find what types of errors did the computer make',
            'What topic will come up today in the transcription?'
          ],
          altruism: [
            'Help us make ancient hebrew manuscripts accessible',
            'Your help is valuable in our completing this important project',
            'Make a difference by helping us reach our goals'
          ],
          self_improvement: [
            'Improve your hebrew skills',
            'Gain knowledge of midrashim while helping us',
            'Sharpen your cognitive and detective skills while trying to transcribe lines'
          ],
          competition: [
            'See how your skills at transcribing match up with others',
            'Can you reach our highest level in both quantity and accuracy?',
            'How good are you at transcription? Show the rest of the world'
          ],
          social: [
            'Join the effort to make ancient hebrew  manuscripts accessible',
            'Join our community and help us reach our goals',
            'Be part of our project. Contribute with friends to this effort'
          ],
          fun: [
            'Enjoy transcribing lines',
            'Pass some time by helping us transcribe lines',
            'Think of this as a game have fun'
          ]
        }

        const optional = messages[temperamentByTraits[traits]]
        this.motivational_message =
          optional[Math.floor(Math.random() * optional.length)]
        // If this page is the transcribe page
        this.$refs['modal-congrats'].show()
      }
    }
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
      const manuscript = this.$store.state.transcribe.manuscript

      return manuscript
    },
    last_session() {
      return 'Yesterday'
    },
    userTemperament() {
      return this.$store.state.research.userTemperament
    }
  }
}
</script>
<style lang="scss">
#modal-congrats {
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .stats {
    font-size: 10px;
  }
  .motivational-message {
    color: blue;
  }
}
</style>