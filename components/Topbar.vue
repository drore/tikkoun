<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <nuxt-link class="navbar-brand" :to="localePath('index')">{{ $t('main.site_name') }}</nuxt-link>
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
              v-if="$store.state.user"
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
          <li class="nav-item dropdown" v-if="$store.state.user">
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
                :src="$store.state.user.photoURL"
                alt
                v-if="!$store.state.user.isAnonymous && $store.state.user.photoURL"
                style="height:30px;width:30px;"
              >
              <span
                v-if="!$store.state.user.isAnonymous"
              >{{$store.state.user.displayName || $store.state.user.email}}</span>
              <span v-if="$store.state.user.isAnonymous">{{$t('anonymous')}}</span>
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <nuxt-link class="dropdown-item" :to="localePath('profile')" v-if="!$store.state.user.isAnonymous">{{ $t('nav.profile') }}</nuxt-link>

              <a class="dropdown-item" href="/" @click="logout">{{ $t('nav.logout') }}</a>
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
      this.$store.dispatch('auth/signOut')
      this.$router.push('/')
    },
    getTranscribePath() {
      if (this.$store.state.manuscript && this.$store.state.selected_liמק) {
        if (this.$i18n.locale === this.$i18n.defaultLocale) {
          return `/transcribe`
        } else {
          return `/${this.$i18n.locale}/transcribe/${
            this.$store.state.manuscript.name
          }/${this.$store.state.selected_line.page}/${
            this.$store.state.selected_line.line
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
