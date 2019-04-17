const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.min.js',
        integrity: 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=',
        crossorigin: 'anonymous'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
        integrity:
          'sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1',
        crossorigin: 'anonymous'
      },
      {
        src:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        integrity:
          'sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM',
        crossorigin: 'anonymous'
      },
      { src: 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js' },
      { src: 'https://unpkg.com/leaflet-draw@0.4.10/dist/leaflet.draw.js' },
      { src: 'https://unpkg.com/leaflet-iiif@2.0.1/leaflet-iiif.js' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#777' },
  /*
  ** Global CSS
  */
  css: [
    { src: 'assets/styles.css', lang: 'css' },
    { src: 'vue-wysiwyg/dist/vueWysiwyg.css', lang: 'css' }
  ],
  router: {
    middleware: ['router-auth']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/v-viewer.js',
    '~plugins/fit-text.js',
    '~plugins/i18n.js',
    '~plugins/vue-wysiwyg',
    '~plugins/bootstrap-vue',
    '~plugins/firebase.js',
    '~plugins/fireauth.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-device-detect',
    [
      'nuxt-i18n',
      {
        vueI18n: {
          fallbackLocale: 'en'
        },
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          },
          {
            code: 'he',
            iso: 'he-IL',
            file: 'he-IL.js'
          },
          {
            code: 'fr',
            iso: 'fr-FR',
            file: 'fr-FR.js'
          }
        ],
        strategy: 'prefix_and_default',
        defaultLocale: 'he',
        lazy: true,
        langDir: 'lang/'
      }
    ],
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    devTools:true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
