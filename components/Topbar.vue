<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/login"></a>
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

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/transcribe">{{ $t('nav.start') }}</nuxt-link>
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
            <a class="dropdown-item" href="/project">{{ $t('nav.project') }}</a>
            <a class="dropdown-item" href="/htr">{{ $t('nav.htr') }}</a>
            <a class="dropdown-item" href="/team">{{ $t('nav.team') }}</a>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/conversation">{{ $t('nav.conversation') }}</a>
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

        <li class="nav-item" v-if="$store.state.user">
          <a class="nav-link" href="#" @click="logout">{{ $t('nav.logout') }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('signOut')
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>
