<template>
  <div class="artist-page">
    <!-- 艺术家标题区域 -->
    <div class="artist-header">
      <h1 class="artist-title">见习画手</h1>
      <p class="artist-subtitle">一切的一切都源自于对美的追求</p>
      <div class="brush-stroke"></div>
    </div>

    <!-- 作品展示区域 -->
    <div class="artwork-gallery">
      <div class="gallery-grid">
        <div 
          v-for="(artwork, index) in artworks" 
          :key="index"
          class="artwork-item"
          :class="`artwork-${index + 1}`"
          @click="selectArtwork(artwork)"
        >
          <div class="artwork-frame">
            <img :src="artwork.image" :alt="artwork.title" />
            <div class="artwork-overlay">
              <h3>{{ artwork.title }}</h3>
              <p>{{ artwork.medium }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创作理念区域 -->
    <div class="philosophy-section">
      <div class="philosophy-content">
        <h2>创作理念</h2>
        <p>每一笔都是情感的延伸，每一色都是内心的表达。在这个数字化的时代，我依然相信手绘的温度和传统媒介的魅力。</p>
        <div class="tools-showcase">
          <div class="tool-item" v-for="tool in tools" :key="tool.name">
            <div class="tool-icon">{{ tool.icon }}</div>
            <span>{{ tool.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能进度条 -->
    <div class="skills-section">
      <h2>技能水平</h2>
      <div class="skills-list">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <div class="skill-info">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-level">{{ skill.level }}%</span>
          </div>
          <div class="skill-bar">
            <div 
              class="skill-progress" 
              :style="{ width: skill.level + '%' }"
              :class="skill.color"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回按钮 -->
    <button class="back-button" @click="$emit('goBack')">
      <span>←</span> 返回
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

defineEmits(['goBack'])

// 作品数据
const artworks = ref([
  {
    title: '晨光初现',
    medium: '水彩画',
    image: 'https://via.placeholder.com/300x400/FFB6C1/FFFFFF?Text=晨光初现'
  },
  {
    title: '城市印象',
    medium: '素描',
    image: 'https://via.placeholder.com/300x400/87CEEB/FFFFFF?Text=城市印象'
  },
  {
    title: '静物写生',
    medium: '油画',
    image: 'https://via.placeholder.com/300x400/DDA0DD/FFFFFF?Text=静物写生'
  },
  {
    title: '人物肖像',
    medium: '炭笔画',
    image: 'https://via.placeholder.com/300x400/F0E68C/000000?Text=人物肖像'
  },
  {
    title: '风景速写',
    medium: '钢笔画',
    image: 'https://via.placeholder.com/300x400/98FB98/000000?Text=风景速写'
  },
  {
    title: '抽象表达',
    medium: '丙烯画',
    image: 'https://via.placeholder.com/300x400/FFA07A/FFFFFF?Text=抽象表达'
  }
])

// 绘画工具
const tools = ref([
  { name: '水彩笔', icon: '🖌️' },
  { name: '素描铅笔', icon: '✏️' },
  { name: '油画刀', icon: '🎨' },
  { name: '炭笔', icon: '✒️' }
])

// 技能数据
const skills = ref([
  { name: '素描基础', level: 75, color: 'skill-blue' },
  { name: '色彩理论', level: 60, color: 'skill-green' },
  { name: '构图设计', level: 70, color: 'skill-purple' },
  { name: '人物绘画', level: 55, color: 'skill-orange' },
  { name: '风景写生', level: 65, color: 'skill-pink' }
])

// 选择作品
const selectArtwork = (artwork) => {
  console.log('选中作品:', artwork.title)
}

// 页面加载动画
onMounted(() => {
  // 标题动画
  gsap.from('.artist-title', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
  
  gsap.from('.artist-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out'
  })
  
  // 作品网格动画
  gsap.from('.artwork-item', {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    delay: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  })
  
  // 技能条动画
  gsap.from('.skill-progress', {
    width: 0,
    duration: 1.5,
    delay: 1,
    stagger: 0.2,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.artist-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow-x: hidden;
}

.artist-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.artist-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-family: 'Lora', serif;
}

.artist-subtitle {
  font-size: 1.2rem;
  color: #f0f0f0;
  margin-bottom: 2rem;
  font-style: italic;
}

.brush-stroke {
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  margin: 0 auto;
  border-radius: 2px;
}

.artwork-gallery {
  margin-bottom: 4rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.artwork-item {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.artwork-item:hover {
  transform: translateY(-10px) rotate(1deg);
}

.artwork-frame {
  position: relative;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
}

.artwork-frame img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
}

.artwork-overlay {
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 1rem;
  border-radius: 5px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.artwork-item:hover .artwork-overlay {
  transform: translateY(0);
}

.artwork-overlay h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.artwork-overlay p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.philosophy-section {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
}

.philosophy-content h2 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Lora', serif;
}

.philosophy-content p {
  color: #f0f0f0;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 2rem auto;
}

.tools-showcase {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
}

.tool-icon {
  font-size: 2rem;
  background: rgba(255,255,255,0.2);
  padding: 1rem;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.tool-item:hover .tool-icon {
  transform: scale(1.1) rotate(10deg);
}

.skills-section {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
}

.skills-section h2 {
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Lora', serif;
}

.skills-list {
  max-width: 600px;
  margin: 0 auto;
}

.skill-item {
  margin-bottom: 1.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #fff;
}

.skill-name {
  font-weight: 500;
}

.skill-level {
  font-weight: bold;
}

.skill-bar {
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.skill-blue { background: linear-gradient(90deg, #4facfe, #00f2fe); }
.skill-green { background: linear-gradient(90deg, #43e97b, #38f9d7); }
.skill-purple { background: linear-gradient(90deg, #fa709a, #fee140); }
.skill-orange { background: linear-gradient(90deg, #ff9a9e, #fecfef); }
.skill-pink { background: linear-gradient(90deg, #a8edea, #fed6e3); }

.back-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: none;
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  z-index: 100;
}

.back-button:hover {
  background: rgba(255,255,255,0.3);
  transform: translateX(-5px);
}

.back-button span {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .artist-page {
    padding: 1rem;
  }
  
  .artist-title {
    font-size: 2.5rem;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .philosophy-section,
  .skills-section {
    padding: 2rem;
  }
  
  .tools-showcase {
    gap: 1rem;
  }
}
</style>