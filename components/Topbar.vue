<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <nuxt-link
          class="navbar-brand"
          :to="localePath({name:'transcribe-manuscript-page-line'})"
        >{{ $t('main.site_name') }}</nuxt-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            href="localePath({name:'transcribe-manuscript-page-line'})"
            v-if="$store.state.auth.user"
          >{{ $t('nav.start') }}</b-nav-item>

          <b-nav-item-dropdown :text="$t('nav.about')">
            <b-dropdown-item href="#">
              <nuxt-link class="dropdown-item" :to="localePath('project')">{{ $t('nav.project') }}</nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <nuxt-link class="dropdown-item" :to="localePath('htr')">{{ $t('nav.htr') }}</nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <nuxt-link class="dropdown-item" :to="localePath('team')">{{ $t('nav.team') }}</nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <nuxt-link class="dropdown-item" :to="localePath('stats')">{{ $t('nav.stats') }}</nuxt-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="localePath({name:'conversation'})">{{ $t('nav.conversation') }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-bind:class="{ 'mr-auto': direction === 'rtl', 'ml-auto': direction !== 'rtl' }"> 
          <b-nav-item-dropdown>
            <template v-slot:button-content>
              
                <img
                  class="flag"
                  :src="require(`../assets/images/flags/${$i18n.locale}.png`)"
                  :alt="$i18n.locale"
                />
                {{$t(`lang.${$i18n.locale}`)}}
              
            </template>
            <b-dropdown-item
              v-for="locale in availableLocales"
              :key="locale.code"
              :href="switchLocalePath(locale.code)"
            >
              <img class="flag" :src="require(`../assets/images/flags/${locale.code}.png`)" alt />
              <span>{{ $t(`lang.${locale.code}`) }}</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown :text="$t('manuscripts')" v-if="$store.state.auth.user">
            <b-dropdown-item
              v-for="(manuscript,i) in manuscripts"
              :key="i"
              :href="localePath({ name: 'transcribe-manuscript-page-line', params: { manuscript:manuscript.name }})"
            >>{{manuscript.display_name}}</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item
            v-if="$store.state.auth.user && $store.state.auth.user.linesTranscribed"
            @click="showStats"
            :style="getLinesTranscribedStyle($store.state.auth.user.linesTranscribed)"
          >{{getLinesBadge($store.state.auth.user.linesTranscribed)}} - {{$store.state.auth.user.linesTranscribed}}</b-nav-item>
          <b-nav-item id="tooltip-notifications" style="position:relative;">
            <img
              :src="$store.state.auth.user.photoURL"
              alt
              v-if="$store.state.auth.user && !$store.state.auth.user.isAnonymous && $store.state.auth.user.photoURL"
              style="height:30px;width:30px;"
            />

            <span v-if="notifications.length" class="notifications">{{notifications.length}}</span>
          </b-nav-item>
          <b-nav-item-dropdown>
            <template v-slot:button-content>
            
                <span
                  v-if="!$store.state.auth.user.isAnonymous"
                >{{$store.state.auth.user.displayName || $store.state.auth.user.email}}</span>
                <span v-if="$store.state.auth.user.isAnonymous">{{$t('anonymous')}}</span>
             
            </template>
            <b-dropdown-item v-if="!$store.state.auth.user.isAnonymous">
              <nuxt-link
                class="dropdown-item"
                :to="localePath('profile')"
              >{{ $t('nav.profile') }}</nuxt-link>
            </b-dropdown-item>

            <b-dropdown-item @click="logout">{{ $t('nav.logout') }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal
      ref="modal-stats"
      id="modal-stats"
      :title="$t('stats.personal_stats')"
      ok-only
      :ok-title="$t('close')"
    >
      <div class="user-stats">
        <UserStatsChart></UserStatsChart>
      </div>
    </b-modal>
    <b-tooltip
      target="tooltip-notifications"
      :placement="tooltipPlacement"
      triggers="click"
      v-if="notifications.length"
    >
      <div
        class="notification mb-2 pb-2"
        v-for="(notification,i) in notifications"
        :key="`notification_${i}`"
        @click="goToNotificationContext(notification)"
      >
        <div class="time">{{getNotificationTime(notification)}}</div>
        <div class="label">{{getNotificationLabel(notification)}}</div>
      </div>
    </b-tooltip>
  </div>
</template>

<script>
import UserStatsChart from '~/components/UserStatsChart'
var images = require.context('~/assets/images/flags', false, /\.png$/)

export default {
  data() {
    return {
      tooltipPlacement: this.$t('dir') === 'rtl' ? 'bottomright' : 'bottomleft',
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
    inTasksMode() {
      // const transcribe_mode =
      //   localStorage.getItem('transcribe_mode') ||
      //   this.$store.state.auth.user.transcribe_mode
      // return transcribe_mode === 'tasks'
      return false
    },
    getNotificationTime(notification) {
      return new Date(notification.createdOn.seconds * 1000).toLocaleString()
    },
    getNotificationLabel(notification) {
      return `${this.$t('new_reply')} - ${notification.displayName}`
    },
    goToNotificationContext(notification) {
      this.$router.push(
        `/${this.$store.state.i18n.locale}/conversation/${notification.href}`
      )
      this.$store.dispatch('auth/removeNotification', notification)
    },
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
    notifications() {
      return this.$store.state.auth.user_notifications
    },
    isDemo() {
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
.notification {
  cursor: pointer;
  text-align: right;
  .time {
    color: #888;
  }
  .label {
    color: white;
    &:hover {
      text-decoration: underline;
    }
  }
}
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
.notifications {
  position: absolute;
  color: white;
  background-color: red;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: -1px;
  right: -5px;
}
.flag {
  width: 25px;
}
</style>
