import type { NuxtConfig } from '@nuxt/types'

const metaData = {
  url: 'localtest.me',
  title: 'PLN',
  description: '',
  email: 's1lv3r@corax.team',
  theme: '#3b4252',
  author: 'S1LV3R',
  locale: 'nb_NO',
}

const config: NuxtConfig = {
  server: {
    https: undefined,
    host: '0.0.0.0',
  },

  // SSR: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) =>
      titleChunk !== 'frontend' ? `${titleChunk} | PLN` : 'PLN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },

      { name: 'title', content: metaData.title },
      { name: 'theme-color', content: metaData.theme },
      { name: 'author', content: metaData.author },
      {
        hid: 'description',
        name: 'description',
        content: metaData.description,
      },

      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: metaData.title },
      { property: 'og:url', content: `https://${metaData.url}` },
      { property: 'og:locale', content: metaData.locale },
      { property: 'og:description', content: metaData.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    'nuxt-build-optimisations',
    '@nuxtjs/color-mode',
    '@nuxtjs/toast',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/netlify-files',
    '@nuxtjs/fontawesome',
    '@nuxtjs/robots',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/sitemap',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  telemetry: false,

  sitemap: {
    hostname: `https://${metaData.url}`,
    exclude: ['/admin/**'],
  },

  robots: [
    {
      UserAgent: '*',
      Allow: '*',
      Disallow: '/admin',
      Sitemap: '/sitemap.xml',
    },
  ],

  colorMode: {
    fallback: 'dark',
    classSuffix: '',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    fullTextSearchFields: ['title', 'content', 'description'],
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  fontawesome: {
    component: 'Fa',
    suffix: true,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  buildOptimisations: {
    profile: process.env.NODE_ENV === 'development' ? 'risky' : 'experimental',
    features: { esbuildLoader: true },
  },

  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true,
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'jpg'],
  },

  generate: {
    fallback: '404.html',
  },

  tailwindcss: {
    exposeConfig: true,
  },

  loading: {
    throttle: 0,
    continuous: true,
    color: '#BF616A',
  },

  auth: {
    defaultStrategy: 'local',
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          type: 'Bearer',
        },
        user: {
          property: '',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/users/me', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
  },

  axios: {
    baseURL: 'http://localhost:3001/api/v1',
    credentials: true,
    progress: true,
  },

  toast: {
    position: 'bottom-right',
    duration: 3000,
    keepOnHover: true,
  },
}

export default config
