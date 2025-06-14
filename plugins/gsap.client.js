import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
    
    // 将GSAP和ScrollTrigger添加到全局，以便在组件中使用
    return {
      provide: {
        gsap,
        ScrollTrigger
      }
    };
  }
});