import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

const nuxtConfig: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    base: process.env.BASE,
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'page',
        path: '*',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },
  static: {
    prefix: false
  },
  head: {
    titleTemplate: '%s - admin-doc',
    title: 'admin-doc',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: `${process.env.BASE}/favicon.ico` }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  styleResources: {
    scss: ['~/assets/scss/_global_resources.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/initStore.ts',
    '@/plugins/veeValidate.ts',
    '@/plugins/axios.ts',
    '@/plugins/globalErrorHandler.ts',
    '@/plugins/initApi.ts',
    '@/plugins/vuetify.ts',
    '@/plugins/chart.ts',
    '@/plugins/flatpickr.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'portal-vue/nuxt',
    '@nuxtjs/style-resources',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:8000/api'
  },

  auth: {
    plugins: ['~/plugins/auth.ts'],
    autoLogout: true,
    watchLoggedIn: true,
    rewriteRedirects: true,
    vuex: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'POST',
            propertyName: 'token',
          },
          refresh: {
            url: '/refresh',
            method: 'GET',
          },
          user: false,
          logout: {
            url: '/logout',
            method: 'GET',
          },
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.lightBlue,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  generate: {
    fallback: true
  },
  target: 'static',
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isDev, isClient }): void {
      config.resolve!.alias!.vue = 'vue/dist/vue.common';
      if (!isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map';
      }
      config.node = {
        fs: 'empty',
      };
    },
    transpile: ['vue-intersect'],
  },
}

export default nuxtConfig
