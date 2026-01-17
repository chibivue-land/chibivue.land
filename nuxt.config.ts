export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  imports: { autoImport: false },
  components: { dirs: [] },
  typescript: {
    strict: true,
    typeCheck: false,
    tsConfig: {
      exclude: ['tests/**/*'],
      compilerOptions: {
        types: [],
        strict: true,
        noUncheckedIndexedAccess: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        exactOptionalPropertyTypes: true,
        noPropertyAccessFromIndexSignature: true,
        forceConsistentCasingInFileNames: true,
        verbatimModuleSyntax: true,
      },
    },
  },

  app: {
    baseURL: process.env['NUXT_APP_BASE_URL'] ?? '/',
    head: {
      title: 'chibivue.land - The Kingdom of Vue.js Community',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'chibivue.land is a virtual kingdom on the internet, home to the Vue.js community and kawaiko the duck mascot.',
        },
        { property: 'og:title', content: 'chibivue.land' },
        {
          property: 'og:description',
          content: 'The Kingdom of Vue.js Community',
        },
        { property: 'og:image', content: 'https://chibivue.land/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://raw.githubusercontent.com' },
        { rel: 'dns-prefetch', href: 'https://raw.githubusercontent.com' },
        { rel: 'preload', as: 'image', href: 'https://raw.githubusercontent.com/chibivue-land/art/main/kawaiko.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],


  modules: ['@nuxtjs/color-mode', '@nuxtjs/i18n', '@nuxt/scripts', '@tresjs/nuxt', '@nuxt/a11y'],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ja', language: 'ja-JP', file: 'ja.json', name: '日本語' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '../i18n/locales',
    strategy: 'prefix_except_default',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  vite: {
    css: {
      transformer: 'lightningcss',
    },
    build: {
      cssMinify: 'lightningcss',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three'],
            'tresjs': ['@tresjs/core', '@tresjs/cientos'],
          },
        },
      },
    },
  },

  nitro: {
    preset: 'github-pages',
  },
})
