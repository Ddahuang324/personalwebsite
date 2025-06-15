<template>
  <section class="hero-section">
    <!-- 背景视频，添加更多兼容性属性 -->
    <video 
      ref="backgroundVideo"
      autoplay 
      loop 
      muted 
      playsinline 
      preload="metadata"
      class="background-video"
      :poster="fallbackImage"
      @loadstart="onVideoLoadStart"
      @canplay="onVideoCanPlay"
      @error="onVideoError"
    >
      <source src="/assets/img/video.mp4" type="video/mp4">
      <source src="/assets/img/video.webm" type="video/webm">
      <!-- 如果视频无法播放，显示fallback图片 -->
    </video>
    
    <!-- 移动端fallback背景图片 -->
    <div 
      v-if="showFallbackImage" 
      class="fallback-background"
      :style="{ backgroundImage: `url(${fallbackImage})` }"
    ></div>
    
    <header class="top-slogan">
      <p>March 2002</p>
    </header>
    <main class="hero-content">
      <h1>HEADING TOWARDS FREEDOM</h1>
      <p class="subtitle">Hi, I'm Da Huang</p>
    </main>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { gsap } from 'gsap';

// 响应式变量
const backgroundVideo = ref(null);
const showFallbackImage = ref(false);
const fallbackImage = '/assets/img/hero-fallback.jpg'; // 需要添加一个fallback图片

// 检测是否为移动设备
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// 视频事件处理
const onVideoLoadStart = () => {
  console.log('Video loading started');
};

const onVideoCanPlay = () => {
  console.log('Video can play');
  showFallbackImage.value = false;
  
  // 确保视频在移动端能够播放
  if (backgroundVideo.value && isMobile()) {
    backgroundVideo.value.play().catch(error => {
      console.warn('Video autoplay failed:', error);
      showFallbackImage.value = true;
    });
  }
};

const onVideoError = (error) => {
  console.error('Video loading error:', error);
  showFallbackImage.value = true;
};

// 尝试强制播放视频（用于移动端交互后）
const tryPlayVideo = () => {
  if (backgroundVideo.value) {
    backgroundVideo.value.play().catch(error => {
      console.warn('Manual video play failed:', error);
      showFallbackImage.value = true;
    });
  }
};

onMounted(async () => {
  await nextTick();
  
  // 移动端检测和fallback处理
  if (isMobile()) {
    // 移动端默认显示fallback，等待视频加载
    showFallbackImage.value = true;
    
    // 添加用户交互监听器来尝试播放视频
    const playVideoOnInteraction = () => {
      tryPlayVideo();
      document.removeEventListener('touchstart', playVideoOnInteraction);
      document.removeEventListener('click', playVideoOnInteraction);
    };
    
    document.addEventListener('touchstart', playVideoOnInteraction, { once: true });
    document.addEventListener('click', playVideoOnInteraction, { once: true });
  }
  
  // GSAP动画
  const tl = gsap.timeline({ delay: 0.8, defaults: { ease: 'power3.out', duration: 1.5 }});
  tl.from('.hero-section .background-video, .hero-section .fallback-background', { autoAlpha: 0, scale: 1.05, duration: 2}, 0)
    .from('.top-slogan', { y: -50, autoAlpha: 0, duration: 1.2 }, 0.8)
    .from('.hero-content h1', { y: 70, autoAlpha: 0, duration: 1.5 }, 1.2)
    .from('.hero-content .subtitle', { y: 50, autoAlpha: 0, duration: 1.2 }, 1.6);

  // 鼠标移动效果（仅桌面端）
  if (!isMobile()) {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { clientWidth, clientHeight } = currentTarget;
        const xPercent = (clientX / clientWidth) - 0.5;
        const yPercent = (clientY / clientHeight) - 0.5;
        gsap.to('.background-video, .fallback-background', { 
          x: xPercent * -20,
          y: yPercent * -20, 
          duration: 0.8,
          ease: 'power1.out'
        });
        gsap.to('.hero-content h1', { x: xPercent * -10, y: yPercent * -5, duration: 0.8, ease: 'power1.out'});
        gsap.to('.hero-content .subtitle', { x: xPercent * -15, y: yPercent * -8, duration: 0.8, ease: 'power1.out'});
      });
    }
  }
});
</script>

<style scoped>
.hero-section {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  color: #fff;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(to top, 
    rgba(0,0,0,0.95) 0%, 
    rgba(0,0,0,0.8) 30%, 
    rgba(0,0,0,0.6) 50%, 
    rgba(0,0,0,0.3) 70%, 
    transparent 100%);
  z-index: 0;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.hero-section::before {
  content: '';
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(to top, 
    rgba(0,0,0,0.4) 0%, 
    rgba(0,0,0,0.2) 50%, 
    transparent 100%);
  z-index: 1;
  filter: blur(2px);
  -webkit-filter: blur(2px);
}

.hero-section .background-video {
  mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -2;
  filter: brightness(0.6);
}

.fallback-background {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  z-index: -2;
  filter: brightness(0.6);
}

.hero-section .fallback-background {
  mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
}

.top-slogan {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.85;
  filter: blur(1px);
  -webkit-filter: blur(1px);
}

.hero-content h1 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  margin: 0 0 10px 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: normal;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
  z-index: 10;
  position: relative;
  filter: blur(1px);
  -webkit-filter: blur(1px);
  opacity: 0.6;
}

.hero-content .subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 30px;
  opacity: 0.85;
  color: #ffffff;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
  font-weight: 500;
  z-index: 10;
  position: relative;
  filter: blur(1px);
  -webkit-filter: blur(1px);
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }
  .hero-content .subtitle {
    font-size: 1.2rem;
  }
  
  /* 移动端优化 */
  .background-video {
    /* 移动端减少视频处理负担 */
    will-change: transform;
  }
  
  .fallback-background {
    will-change: transform;
  }
  
  /* 移动端禁用一些可能影响性能的效果 */
  .hero-section::after,
  .hero-section::before {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>