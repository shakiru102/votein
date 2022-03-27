import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - votein',
    title: 'votein',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/chart', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-socket-io',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyCa1C_GJ0DJFbkhMW2-aR50IFypi1rSkx8",
          authDomain: "votein-56a10.firebaseapp.com",
          databaseURL: "https://votein-56a10-default-rtdb.firebaseio.com",
          projectId: "votein-56a10",
          storageBucket: "votein-56a10.appspot.com",
          messagingSenderId: "725574556802",
          appId: "1:725574556802:web:1e833aeb339b300306289b",
          measurementId: "G-S16HNRTJ2N"
        },
        services: {
          auth: true,
          firestore: true
        }
      }
    ],
    'nuxt-highcharts'
  ],
  io: {
    // module options
    sockets: [{
      default: true,
      name: 'main',
      url: 'http://localhost:8000'
    }]
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || 'http://localhost:8000/api',
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         required: false,
  //         type: false
  //       },
  //      endpoints: {
  //         login: { uri: '/user/signin', method: 'post' },
  //         logout: { uri: '/user/signout', method: 'get' },
  //         user: { uri: '/user/auth', method: 'get', propertyName: 'data' }
  //      }
  //     }
  //   }
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
