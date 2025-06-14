// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@vueuse/motion/nuxt'
  ],
  motion: {
    directives: {
      'motion': {},
      'motion-slide': {},
      'motion-slide-left': {},
      'motion-slide-right': {},
      'motion-slide-up': {},
      'motion-slide-down': {},
    },
  },
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/personalwebsite/' : '/'
  }
})