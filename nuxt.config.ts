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
  // GitHub Pages 部署配置
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  app: {
    baseURL: '/personalwebsite/', // 替换为你的仓库名
    buildAssetsDir: 'assets'
  },
  ssr: false, // 禁用服务端渲染
  target: 'static' // 设置为静态生成
})