<template>
  <div class="artist-page">
    <!-- 返回按钮 -->
    <div class="back-button">
      <NuxtLink to="/" class="back-link">
        <span class="back-icon">←</span>
        <span class="back-text">返回</span>
      </NuxtLink>
    </div>
    
    <!-- 艺术家标题区域 -->
    <div class="artist-header">
      <div class="header-content">
        <h1 class="artist-title">见习画手</h1>
        <p class="artist-subtitle">一切的一切都源自于对美的追求</p>
        <div class="brush-stroke"></div>
      </div>
    </div>

    <!-- 作品展示区域 -->
    <section class="artwork-section">
      <div class="section-title">
        <span class="section-number">01</span>
        <h2>作品集</h2>
      </div>
      
      <div class="artwork-gallery">
        <!-- 第一排跑马灯 - 向右滚动 -->
        <div class="marquee-container">
          <div class="marquee marquee-right">
            <div class="marquee-content">
              <div 
                v-for="(artwork, index) in [...artworks, ...artworks]" 
                :key="`row1-${index}`"
                class="artwork-item"
                @click="selectArtwork(artwork)"
              >
                <div class="artwork-frame">
                  <div class="artwork-image-container">
                    <img :src="artwork.image" :alt="artwork.title" />
                  </div>
                  <div class="artwork-info">
                    <h3>{{ artwork.title }}</h3>
                    <p class="artwork-medium">{{ artwork.medium }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 第二排跑马灯 - 向左滚动 -->
        <div class="marquee-container">
          <div class="marquee marquee-left">
            <div class="marquee-content">
              <div 
                v-for="(artwork, index) in [...artworks.slice().reverse(), ...artworks.slice().reverse()]" 
                :key="`row2-${index}`"
                class="artwork-item"
                @click="selectArtwork(artwork)"
              >
                <div class="artwork-frame">
                  <div class="artwork-image-container">
                    <img :src="artwork.image" :alt="artwork.title" />
                  </div>
                  <div class="artwork-info">
                    <h3>{{ artwork.title }}</h3>
                    <p class="artwork-medium">{{ artwork.medium }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 艺术理念区域 -->
    <section class="philosophy-section">
      <div class="section-title">
        <span class="section-number">02</span>
        <h2>艺术理念</h2>
      </div>
      
      <div class="philosophy-content">
        <div class="philosophy-quote">
          <p>每一笔都是对美的追求，每一幅作品都承载着情感的表达。</p>
          <p>在色彩与线条的交织中，寻找内心深处的声音。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 作品数据
const artworks = reactive([
  {
    title: '晨光初现',
    medium: '水彩画',
    image: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=晨光初现',
    description: '捕捉清晨第一缕阳光的温暖'
  },
  {
    title: '城市印象',
    medium: '油画',
    image: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=城市印象',
    description: '现代都市生活的快节奏与慢思考'
  },
  {
    title: '静物写生',
    medium: '素描',
    image: 'https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=静物写生',
    description: '在平凡中发现不平凡的美'
  },
  {
    title: '抽象情绪',
    medium: '丙烯画',
    image: 'https://via.placeholder.com/300x400/96CEB4/FFFFFF?text=抽象情绪',
    description: '用色彩表达内心的波澜'
  }
]);

const selectArtwork = (artwork) => {
  console.log('选中作品:', artwork);
  // 这里可以添加作品详情展示逻辑
};
</script>

<style scoped>
:root {
  --primary-color: #f5f5f5;
  --accent-color: #e0e0e0;
  --text-color: #f0f0f0;
  --text-secondary: #a0a0a0;
  --bg-color: #121212;
  --bg-secondary: #1a1a1a;
  --highlight: #d4a45f;
  --transition: 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.artist-page {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 0;
  font-family: 'Lora', serif;
  overflow-x: hidden;
}

/* 返回按钮样式 */
.back-button {
  position: fixed;
  top: 2.5rem;
  left: 2.5rem;
  z-index: 100;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
  transition: var(--transition);
  backdrop-filter: blur(10px);
}

.back-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.back-link:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

/* 标题区域样式 */
.artist-header {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(30, 30, 30, 0.5) 0%, rgba(10, 10, 10, 0.9) 100%);
}

.header-content {
  text-align: center;
  z-index: 2;
  padding: 0 2rem;
  max-width: 900px;
}

.artist-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  line-height: 1;
  opacity: 0.9;
  text-transform: uppercase;
}

.artist-subtitle {
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: var(--text-secondary);
  margin-bottom: 3rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  line-height: 1.6;
}

.brush-stroke {
  width: 150px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--highlight), transparent);
  margin: 0 auto;
  opacity: 0.7;
  animation: brushGlow 4s ease-in-out infinite;
}

@keyframes brushGlow {
  0%, 100% { opacity: 0.4; transform: scaleX(1); }
  50% { opacity: 0.8; transform: scaleX(1.5); }
}

/* 章节通用样式 */
section {
  padding: 8rem 2rem;
  position: relative;
}

.section-title {
  display: flex;
  align-items: baseline;
  margin-bottom: 4rem;
  padding-left: 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.section-number {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  color: var(--highlight);
  opacity: 0.7;
  margin-right: 1rem;
  font-weight: 400;
}

.section-title h2 {
  font-size: 2rem;
  font-weight: 400;
  color: var(--primary-color);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* 作品展示区域样式 */
.artwork-section {
  background-color: var(--bg-secondary);
  overflow: hidden;
}

.artwork-gallery {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* 跑马灯容器 */
.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee {
  display: flex;
  width: 100%;
}

.marquee-content {
  display: flex;
  gap: 3rem;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

/* 向右滚动的跑马灯 */
.marquee-right .marquee-content {
  animation-name: marqueeRight;
}

/* 向左滚动的跑马灯 */
.marquee-left .marquee-content {
  animation-name: marqueeLeft;
}

@keyframes marqueeRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes marqueeLeft {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* 悬停时暂停动画 */
.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}

.artwork-item {
  flex-shrink: 0;
  width: 280px;
  cursor: pointer;
  transition: var(--transition);
  opacity: 0.9;
}

.artwork-item:hover {
  transform: translateY(-10px) scale(1.02);
  opacity: 1;
}

.artwork-frame {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.artwork-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  aspect-ratio: 3/4;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.artwork-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
  filter: grayscale(20%);
}

.artwork-item:hover img {
  transform: scale(1.05);
  filter: grayscale(0%);
}

.artwork-info {
  padding: 1.5rem 0.5rem 0.5rem;
  transition: var(--transition);
}

.artwork-info h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  color: var(--primary-color);
}

.artwork-medium {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 300;
  margin: 0;
}

/* 艺术理念区域样式 */
.philosophy-section {
  background-color: var(--bg-color);
}

.philosophy-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.philosophy-quote {
  position: relative;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  border-left: 2px solid var(--highlight);
}

.philosophy-quote::before {
  content: '"';
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 4rem;
  color: var(--highlight);
  opacity: 0.2;
  font-family: serif;
}

.philosophy-quote p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-weight: 300;
  letter-spacing: 0.02em;
}

.philosophy-quote p:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .back-button {
    top: 1.5rem;
    left: 1.5rem;
  }
  
  section {
    padding: 5rem 1.5rem;
  }
  
  .section-title {
    padding-left: 0;
    margin-bottom: 3rem;
  }
  
  .artwork-gallery {
    gap: 3rem;
  }
  
  .artwork-item {
    width: 220px;
  }
  
  .marquee-content {
    gap: 2rem;
  }
  
  .philosophy-quote {
    padding: 2rem;
  }
  
  .philosophy-quote p {
    font-size: 1.1rem;
  }
}

@media (min-width: 1600px) {
  .artwork-item {
    width: 320px;
  }
  
  .marquee-content {
    gap: 4rem;
  }
  
  .section-title {
    margin-bottom: 5rem;
  }
}

</style>