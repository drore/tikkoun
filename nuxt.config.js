const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: "Tikkoun Sofrim",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.3.1.min.js' },
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

    '~plugins/i18n.js',
    '~plugins/vue-wysiwyg',
    '~plugins/firebase.js',
    '~plugins/fireauth.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
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
    ]
  ],
}