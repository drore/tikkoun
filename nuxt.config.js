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
    { src: 'assets/styles.css', lang: 'css' }
  ],
  router: {
    middleware: ['router-auth']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/gtag.js',
    '~plugins/i18n.js',
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