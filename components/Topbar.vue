<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <nuxt-link
        class="navbar-brand"
        :to="localePath({name:'transcribe-manuscript-page-line'})"
      >{{ $t('main.site_name') }}</nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarSupportedContent" class="collapse navbar-collapse justify-content-between">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :to="localePath({name:'transcribe-manuscript-page-line'})"
              v-if="$store.state.auth.user"
            >{{ $t('nav.start') }}</nuxt-link>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{ $t('nav.about') }}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <nuxt-link class="dropdown-item" :to="localePath('project')">{{ $t('nav.project') }}</nuxt-link>
              <nuxt-link class="dropdown-item" :to="localePath('htr')">{{ $t('nav.htr') }}</nuxt-link>
              <nuxt-link class="dropdown-item" :to="localePath('team')">{{ $t('nav.team') }}</nuxt-link>
              <nuxt-link class="dropdown-item" :to="localePath('stats')">{{ $t('nav.stats') }}</nuxt-link>
            </div>
          </li>

          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :to="localePath({name:'conversation'})"
            >{{ $t('nav.conversation') }}</nuxt-link>
          </li>
          <li class="nav-item">
            <b-button
              v-b-modal.modal-1
              v-if="isDemo"
            >{{ $t('nav.research_questionnaire') }}</b-button>
            <b-modal
              id="modal-1"
              centered
              @ok="updateResearchForUser"
              :title="$t('nav.research_questionnaire')"
            >
              <p
                class="my-4"
              >Answering the following questions will help us give you a better user experience.</p>
              <div>
                <h3>I see myself as:</h3>

                <div class="question form-group">
                  <!-- Conscientiousness -->
                  <label for="q_1">Dependable, self-disciplined</label>
                  <div class="d-flex justify-content-between">
                    <span>Disagree strongly</span>
                    <span>Agree strongly</span>
                  </div>
                  <input
                    type="range"
                    class="form-control-range"
                    min="1"
                    max="7"
                    name="q_1"
                    v-model="research['q_1']"
                  >
                </div>
                <!-- Openness -->
                <div class="question form-group">
                  <label for="q_2">Open to new experiences, complex</label>
                  <div class="d-flex justify-content-between">
                    <span>Disagree strongly</span>
                    <span>Agree strongly</span>
                  </div>
                  <input
                    type="range"
                    class="form-control-range"
                    min="1"
                    max="7"
                    name="q_2"
                    v-model="research['q_2']"
                  >
                </div>
                <!-- Conscientiousness reveresed -->
                <div class="question form-group">
                  <label for="q_3">Disorganized, careless</label>
                  <div class="d-flex justify-content-between">
                    <span>Disagree strongly</span>
                    <span>Agree strongly</span>
                  </div>
                  <input
                    type="range"
                    class="form-control-range"
                    min="1"
                    max="7"
                    name="q_3"
                    v-model="research['q_3']"
                  >
                </div>
                <!-- Openness reveresed -->
                <div class="question form-group">
                  <label for="q_4">Conventional, uncreative</label>
                  <div class="d-flex justify-content-between">
                    <span>Disagree strongly</span>
                    <span>Agree strongly</span>
                  </div>
                  <input
                    type="range"
                    class="form-control-range"
                    min="1"
                    max="7"
                    name="q_4"
                    v-model="research['q_4']"
                  >
                </div>
              </div>
            </b-modal>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{$t(`lang.${$i18n.locale}`)}}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <nuxt-link
                class="dropdown-item"
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
              >{{ $t(`lang.${locale.code}`) }}</nuxt-link>
            </div>
          </li>
          <li class="nav-item dropdown" v-if="$store.state.auth.user">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="msDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{$t('manuscripts')}}</a>

            <div class="dropdown-menu" aria-labelledby="msDropdown">
              <a
                class="dropdown-item"
                :href="localePath({ name: 'transcribe-manuscript-page-line', params: { manuscript:manuscript.name }})"
                v-for="(manuscript,i) in manuscripts"
                :key="i"
              >{{manuscript.display_name}}</a>
            </div>
          </li>
          <li
            class="nav-item"
            v-if="$store.state.auth.user && $store.state.auth.user.linesTranscribed"
            @click="showStats"
          >
            <a class="nav-link" v-if="$device.isMobile">
              {{$t('lines_made')}}:
              <span
                title="Number of lines transcribed"
              >{{$store.state.auth.user.linesTranscribed}}</span>
            </a>
            <a
              class="nav-link lines-made"
              v-if="!$device.isMobile"
              :style="getLinesTranscribedStyle($store.state.auth.user.linesTranscribed)"
            >
              <span
                title="Number of lines transcribed"
              >{{getLinesBadge($store.state.auth.user.linesTranscribed)}} - {{$store.state.auth.user.linesTranscribed}}</span>
            </a>
          </li>

          <li class="nav-item dropdown" v-if="$store.state.auth.user">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                :src="$store.state.auth.user.photoURL"
                alt
                v-if="!$store.state.auth.user.isAnonymous && $store.state.auth.user.photoURL"
                style="height:30px;width:30px;"
              >
              <span
                v-if="!$store.state.auth.user.isAnonymous"
              >{{$store.state.auth.user.displayName || $store.state.auth.user.email}}</span>
              <span v-if="$store.state.auth.user.isAnonymous">{{$t('anonymous')}}</span>
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <nuxt-link
                class="dropdown-item"
                :to="localePath('profile')"
                v-if="!$store.state.auth.user.isAnonymous"
              >{{ $t('nav.profile') }}</nuxt-link>
              <a href="javascript:;" class="dropdown-item" @click="logout">{{ $t('nav.logout') }}</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <b-modal ref="modal-stats" id="modal-stats" title="User statistics" ok-only ok-title="Dismiss">
      <div class="user-stats">
        <UserStatsChart></UserStatsChart>
      </div>
    </b-modal>
  </div>
</template>
<script>
import UserStatsChart from '~/components/UserStatsChart'
export default {
  data() {
    return {
      research: {
        q_1: 3,
        q_2: 3,
        q_3: 3,
        q_4: 3
      }
    }
  },
  components: {
    UserStatsChart
  },
  methods: {
    showStats() {
      this.$refs['modal-stats'].show()
    },
    logout() {
      this.$store.dispatch('auth/signOut').then(() => {
        this.$router.push(`/${this.$store.state.i18n.locale}`)
        this.$store.dispatch('transcribe/clear')
      })
    },
    updateResearchForUser() {
      if (this.research) {
        const params = {
          research: Object.assign({}, this.research),
          uid: this.$store.state.auth.user.uid
        }

        this.$store.dispatch('research/updateUserTemperament', params)
      }
    },
    getLinesBadge(linesTranscribed) {
      let badge = 'Beginner'
      if (linesTranscribed > 100) {
        badge = 'Super-user'
      } else if (linesTranscribed > 1000) {
        badge = 'MEGA-user'
      }
      return badge
    },
    getLinesTranscribedStyle(linesTranscribed) {
      let style = 'background-color: '
      if (linesTranscribed < 20) {
        return (style += 'grey;color:black;')
      } else if (linesTranscribed > 100) {
        return (style += '#64bb9b;')
      } else if (linesTranscribed > 1000) {
        return (style += '#2ee600;color:black;')
      }
    },
    getTranscribePath() {
      if (
        this.$store.state.transcribe.manuscript &&
        this.$store.state.transcribe.selected_line
      ) {
        if (this.$i18n.locale === this.$i18n.defaultLocale) {
          return `/transcribe`
        } else {
          return `/${this.$i18n.locale}/transcribe/${
            this.$store.state.transcribe.manuscript.name
          }/${this.$store.state.transcribe.selected_line.page}/${
            this.$store.state.transcribe.selected_line.line
          }`
        }
      } else {
        return '/transcribe'
      }
    }
  },
  computed: {
    isDemo(){
      return this.$store.state.general.env === 'demo'
    },
    manuscripts() {
      const manuscripts = this.$store.state.general.manuscripts
      return manuscripts.filter(m => {
        return !m.hidden
      })
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>
<style lang="scss">
.question label {
  font-weight: bold;
}
.lines-made {
  margin: 0 10px;
  background-color: black;
  padding: 8px;
  border-radius: 5px;
  text-align: center;
  & > span {
    color: white;
    display: inline-block;
    &:hover {
      color: white;
    }
  }
}
</style>
