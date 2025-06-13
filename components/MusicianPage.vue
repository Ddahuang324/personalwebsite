<template>
  <div class="musician-page">
    <!-- 音乐家标题区域 -->
    <div class="musician-header">
      <h1 class="musician-title">不怎么样的音乐家</h1>
      <p class="musician-subtitle">用旋律记录点滴，用节奏表达情绪</p>
      <div class="sound-wave"></div>
    </div>

    <!-- 音乐作品展示区域 -->
    <div class="music-showcase">
      <div class="tracks-grid">
        <div 
          v-for="(track, index) in tracks" 
          :key="index"
          class="track-item"
          @click="playTrack(track)"
        >
          <div class="track-cover">
            <img :src="track.cover" :alt="track.title" />
            <div class="play-overlay">
              <div class="play-button">▶</div>
            </div>
          </div>
          <div class="track-info">
            <h3>{{ track.title }}</h3>
            <p>{{ track.genre }} • {{ track.duration }}</p>
            <div class="track-mood">{{ track.mood }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 音乐理念区域 -->
    <div class="philosophy-section">
      <div class="philosophy-content">
        <h2>音乐理念</h2>
        <p>虽然技艺还不够精湛，但每一个音符都承载着真挚的情感。音乐不在于完美，而在于能否触动人心。</p>
        <div class="instruments-showcase">
          <div class="instrument-item" v-for="instrument in instruments" :key="instrument.name">
            <div class="instrument-icon">{{ instrument.icon }}</div>
            <span>{{ instrument.name }}</span>
            <div class="proficiency">{{ instrument.level }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 音乐技能 -->
    <div class="skills-section">
      <h2>音乐技能</h2>
      <div class="skills-radar">
        <canvas ref="radarCanvas" width="300" height="300"></canvas>
        <div class="skills-legend">
          <div v-for="skill in musicSkills" :key="skill.name" class="legend-item">
            <div class="legend-color" :style="{ backgroundColor: skill.color }"></div>
            <span>{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 音乐心情板 -->
    <div class="mood-board">
      <h2>音乐心情</h2>
      <div class="mood-grid">
        <div 
          v-for="mood in moods" 
          :key="mood.name"
          class="mood-item"
          :class="{ active: selectedMood === mood.name }"
          @click="selectMood(mood.name)"
        >
          <div class="mood-emoji">{{ mood.emoji }}</div>
          <span>{{ mood.name }}</span>
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

const radarCanvas = ref(null)
const selectedMood = ref('平静')

// 音乐作品数据
const tracks = ref([
  {
    title: '午后时光',
    genre: '民谣',
    duration: '3:24',
    mood: '温暖',
    cover: 'https://via.placeholder.com/200x200/FFB6C1/FFFFFF?Text=午后时光'
  },
  {
    title: '城市夜晚',
    genre: '爵士',
    duration: '4:12',
    mood: '忧郁',
    cover: 'https://via.placeholder.com/200x200/4169E1/FFFFFF?Text=城市夜晚'
  },
  {
    title: '雨天随想',
    genre: '古典',
    duration: '5:08',
    mood: '沉思',
    cover: 'https://via.placeholder.com/200x200/708090/FFFFFF?Text=雨天随想'
  },
  {
    title: '春日序曲',
    genre: '流行',
    duration: '3:45',
    mood: '欢快',
    cover: 'https://via.placeholder.com/200x200/32CD32/FFFFFF?Text=春日序曲'
  }
])

// 乐器数据
const instruments = ref([
  { name: '吉他', icon: '🎸', level: '初级' },
  { name: '钢琴', icon: '🎹', level: '入门' },
  { name: '口琴', icon: '🎵', level: '业余' },
  { name: '尤克里里', icon: '🎶', level: '练习中' }
])

// 音乐技能数据
const musicSkills = ref([
  { name: '节奏感', value: 60, color: '#FF6B6B' },
  { name: '旋律创作', value: 45, color: '#4ECDC4' },
  { name: '和声理论', value: 30, color: '#45B7D1' },
  { name: '即兴演奏', value: 35, color: '#96CEB4' },
  { name: '情感表达', value: 70, color: '#FFEAA7' }
])

// 心情数据
const moods = ref([
  { name: '平静', emoji: '😌' },
  { name: '欢快', emoji: '😊' },
  { name: '忧郁', emoji: '😔' },
  { name: '激昂', emoji: '🔥' },
  { name: '浪漫', emoji: '💕' },
  { name: '神秘', emoji: '🌙' }
])

// 播放音乐
const playTrack = (track) => {
  console.log('播放音乐:', track.title)
}

// 选择心情
const selectMood = (mood) => {
  selectedMood.value = mood
}

// 绘制雷达图
const drawRadarChart = () => {
  const canvas = radarCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 100
  
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // 绘制网格
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.lineWidth = 1
  
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI)
    ctx.stroke()
  }
  
  // 绘制轴线
  const angleStep = (2 * Math.PI) / musicSkills.value.length
  
  for (let i = 0; i < musicSkills.value.length; i++) {
    const angle = i * angleStep - Math.PI / 2
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius
    
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  
  // 绘制数据
  ctx.fillStyle = 'rgba(255, 107, 107, 0.3)'
  ctx.strokeStyle = '#FF6B6B'
  ctx.lineWidth = 2
  
  ctx.beginPath()
  for (let i = 0; i < musicSkills.value.length; i++) {
    const skill = musicSkills.value[i]
    const angle = i * angleStep - Math.PI / 2
    const value = (skill.value / 100) * radius
    const x = centerX + Math.cos(angle) * value
    const y = centerY + Math.sin(angle) * value
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

// 页面加载动画
onMounted(() => {
  // 标题动画
  gsap.from('.musician-title', {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
  })
  
  gsap.from('.musician-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out'
  })
  
  // 音轨动画
  gsap.from('.track-item', {
    x: -100,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    stagger: 0.2,
    ease: 'power2.out'
  })
  
  // 心情板动画
  gsap.from('.mood-item', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    delay: 1,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  })
  
  // 绘制雷达图
  setTimeout(() => {
    drawRadarChart()
  }, 1500)
})
</script>

<style scoped>
.musician-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
  padding: 2rem;
  position: relative;
  overflow-x: hidden;
}

.musician-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.musician-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-family: 'Lora', serif;
}

.musician-subtitle {
  font-size: 1.2rem;
  color: #f0f0f0;
  margin-bottom: 2rem;
  font-style: italic;
}

.sound-wave {
  width: 300px;
  height: 40px;
  margin: 0 auto;
  background: linear-gradient(90deg, 
    transparent 0%, #fff 20%, transparent 40%,
    #fff 60%, transparent 80%, #fff 100%);
  background-size: 20px 100%;
  animation: wave 2s infinite;
  border-radius: 20px;
}

@keyframes wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}

.music-showcase {
  margin-bottom: 4rem;
}

.tracks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.track-item {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.2);
}

.track-item:hover {
  transform: translateY(-5px);
  background: rgba(255,255,255,0.2);
}

.track-cover {
  position: relative;
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
}

.track-cover img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.track-item:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #333;
}

.track-info h3 {
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.track-info p {
  color: #ccc;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.track-mood {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
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

.instruments-showcase {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.instrument-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-align: center;
}

.instrument-icon {
  font-size: 2.5rem;
  background: rgba(255,255,255,0.2);
  padding: 1rem;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.instrument-item:hover .instrument-icon {
  transform: scale(1.1) rotate(10deg);
}

.proficiency {
  font-size: 0.8rem;
  color: #ccc;
}

.skills-section {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
}

.skills-section h2 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Lora', serif;
}

.skills-radar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.skills-legend {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
}

.legend-color {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.mood-board {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
}

.mood-board h2 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Lora', serif;
}

.mood-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.mood-item {
  background: rgba(255,255,255,0.1);
  border: 2px solid transparent;
  border-radius: 15px;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
}

.mood-item:hover,
.mood-item.active {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.5);
  transform: scale(1.05);
}

.mood-emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

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
  .musician-page {
    padding: 1rem;
  }
  
  .musician-title {
    font-size: 2.5rem;
  }
  
  .tracks-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-radar {
    flex-direction: column;
    gap: 2rem;
  }
  
  .mood-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>