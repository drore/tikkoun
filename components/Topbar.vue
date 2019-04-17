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
            </div>
          </li>

          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :to="localePath('conversation')"
            >{{ $t('nav.conversation') }}</nuxt-link>
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
                :href="localePath({ name: 'transcribe-manuscript-page-line', params: { manuscript:'geneva' }})"
              >Geneva</a>
              <a
                class="dropdown-item"
                :href="localePath({ name: 'transcribe-manuscript-page-line', params: { manuscript:'bnf150' }})"
              >BNF</a>
            </div>
          </li>
          <li class="nav-item" v-if="$store.state.auth.user && $store.state.auth.user.linesTranscribed">
            <a class="nav-link" v-if="$device.isMobile">
              {{$t('lines_made')}}: 
              <span
                title="Number of lines transcribed"
              >{{$store.state.auth.user.linesTranscribed}}</span>
            </a>
            <a class="nav-link lines-made" v-if="!$device.isMobile">
              <span
                title="Number of lines transcribed"
              >{{$store.state.auth.user.linesTranscribed}}</span>
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
              <!-- <nuxt-link
                class="dropdown-item"
                :to="localePath('profile')"
                v-if="!$store.state.auth.user.isAnonymous"
              >{{ $t('nav.profile') }}</nuxt-link>-->
              <!-- <nuxt-link
                class="dropdown-item"
                :to="localePath('admin')"
                v-if="$store.state.auth.user && $store.state.auth.user.role && $store.state.auth.user.role==='admin'"
              >Admin</nuxt-link>-->
              <a href="javascript:;" class="dropdown-item" @click="logout">{{ $t('nav.logout') }}</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/signOut').then(() => {
        this.$router.push(`/${this.$store.state.i18n.locale}`)
      })
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
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>
<style lang="scss">
.lines-made {
  margin: 0 10px;
  background-color: black;
  padding: 8px;
  border-radius: 50%;
  text-align: center;
  & > span {
    width: 25px;
    height: 25px;
    color: white;
    display: inline-block;
    &:hover {
      color: white;
    }
  }
}
</style>
