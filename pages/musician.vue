<template>
  <div class="musician-page">
    <!-- 背景装饰元素 -->
    <div class="bg-decoration">
      <div class="floating-notes">
        <div class="note" v-for="i in 12" :key="i" :style="{ animationDelay: i * 0.5 + 's' }">♪</div>
      </div>
      <div class="gradient-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    </div>

    <!-- 返回按钮 -->
    <div class="back-button">
      <NuxtLink to="/" class="back-link">
        <span class="back-icon">←</span>
        <span class="back-text">返回首页</span>
      </NuxtLink>
    </div>
    
    <!-- 音乐家标题区域 -->
    <div class="musician-header">
      <div class="title-container">
        <h1 class="musician-title">
          <span class="title-line">不怎么样的</span>
          <span class="title-line title-emphasis">音乐家</span>
        </h1>
        <p class="musician-subtitle">用旋律记录点滴，用节奏表达情绪</p>
      </div>
      <div class="sound-visualizer">
        <div class="wave-container">
          <div class="wave-bar" v-for="i in 7" :key="i" :style="{ animationDelay: i * 0.1 + 's' }"></div>
        </div>
      </div>
    </div>

    <!-- 音乐作品展示区域 -->
    <div class="music-showcase">
      <div class="section-header">
        <h2 class="section-title">音乐作品</h2>
        <div class="section-line"></div>
      </div>
      <div class="tracks-grid">
        <div 
          v-for="(track, index) in tracks" 
          :key="index"
          class="track-item"
          :class="{ 'track-playing': currentTrack?.title === track.title }"
          @click="playTrack(track)"
          :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <div class="track-cover">
            <div class="cover-bg" :class="`mood-${track.mood}`"></div>
            <div class="cover-content">
              <div class="track-title-overlay">{{ track.title }}</div>
            </div>
            <div class="play-overlay">
              <div class="play-button">
                <div class="play-icon"></div>
              </div>
              <div class="ripple-effect"></div>
            </div>
          </div>
          <div class="track-info">
            <h3 class="track-title">{{ track.title }}</h3>
            <div class="track-meta">
              <span class="track-genre">{{ track.genre }}</span>
              <span class="track-duration">{{ track.duration }}</span>
            </div>
            <div class="track-mood" :class="`mood-${track.mood}`">{{ track.mood }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 音乐理念区域 -->
    <div class="music-philosophy">
      <div class="philosophy-container">
        <h2 class="philosophy-title">音乐理念</h2>
        <div class="philosophy-content">
          <div class="quote-mark">"</div>
          <p class="philosophy-text">音乐是情感的语言，是心灵的表达</p>
          <p class="philosophy-text">虽然技术不精，但热爱音乐的心从未改变</p>
          <div class="quote-mark quote-end">"</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 音乐作品数据
const tracks = reactive([
  {
    title: '雨夜思绪',
    genre: '钢琴曲',
    duration: '3:42',
    mood: '忧郁',
    cover: 'https://via.placeholder.com/300x300/007BFF/FFFFFF?text=雨夜思绪',
    audio: '#'
  },
  {
    title: '晨曦',
    genre: '轻音乐',
    duration: '4:15',
    mood: '平静',
    cover: 'https://via.placeholder.com/300x300/28A745/FFFFFF?text=晨曦',
    audio: '#'
  },
  {
    title: '城市脉动',
    genre: '电子乐',
    duration: '5:08',
    mood: '活力',
    cover: 'https://via.placeholder.com/300x300/FFC107/000000?text=城市脉动',
    audio: '#'
  },
  {
    title: '星空漫步',
    genre: '环境音乐',
    duration: '6:23',
    mood: '梦幻',
    cover: 'https://via.placeholder.com/300x300/DC3545/FFFFFF?text=星空漫步',
    audio: '#'
  }
]);

// 当前播放的曲目
const currentTrack = ref(null);
const isPlaying = ref(false);

const playTrack = (track) => {
  currentTrack.value = track;
  isPlaying.value = true;
  console.log('播放音乐:', track.title);
  // 这里可以添加音乐播放逻辑
};
</script>

<style scoped>
.musician-page {
  min-height: 100vh;
  background: radial-gradient(ellipse at top, #0a0a0a 0%, #000000 100%);
  color: #f8f9fa;
  padding: 0;
  position: relative;
  overflow-x: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-notes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.note {
  position: absolute;
  color: rgba(0, 123, 255, 0.1);
  font-size: 1.5rem;
  animation: float 8s ease-in-out infinite;
}

.note:nth-child(1) { top: 10%; left: 10%; }
.note:nth-child(2) { top: 20%; left: 80%; }
.note:nth-child(3) { top: 30%; left: 15%; }
.note:nth-child(4) { top: 40%; left: 85%; }
.note:nth-child(5) { top: 50%; left: 5%; }
.note:nth-child(6) { top: 60%; left: 90%; }
.note:nth-child(7) { top: 70%; left: 20%; }
.note:nth-child(8) { top: 80%; left: 75%; }
.note:nth-child(9) { top: 15%; left: 50%; }
.note:nth-child(10) { top: 35%; left: 60%; }
.note:nth-child(11) { top: 55%; left: 40%; }
.note:nth-child(12) { top: 75%; left: 65%; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
}

.gradient-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: orbFloat 12s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 123, 255, 0.1) 0%, transparent 70%);
  top: 20%;
  left: -10%;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 198, 255, 0.08) 0%, transparent 70%);
  top: 60%;
  right: -5%;
  animation-delay: -4s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(0, 114, 255, 0.06) 0%, transparent 70%);
  top: 80%;
  left: 30%;
  animation-delay: -8s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

/* 返回按钮 */
.back-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 400;
  font-size: 0.9rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
}

.back-link:hover {
  background: rgba(0, 123, 255, 0.2);
  border-color: rgba(0, 123, 255, 0.4);
  transform: translateX(-8px);
  box-shadow: 0 8px 32px rgba(0, 123, 255, 0.2);
}

.back-icon {
  transition: transform 0.3s ease;
}

.back-link:hover .back-icon {
  transform: translateX(-3px);
}

/* 标题区域 */
.musician-header {
  text-align: center;
  padding: 8rem 2rem 4rem;
  position: relative;
  z-index: 2;
}

.title-container {
  margin-bottom: 3rem;
}

.musician-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 0.9;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.title-line {
  display: block;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleFade 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.title-line:first-child {
  font-size: 0.6em;
  font-weight: 300;
  animation-delay: 0.2s;
}

.title-emphasis {
  background: linear-gradient(135deg, #007bff 0%, #00c6ff 50%, #0072ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation-delay: 0.5s;
  position: relative;
}

.title-emphasis::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #007bff, transparent);
  animation: lineGrow 1s ease-out 1s forwards;
  transform-origin: center;
  scale: 0;
}

@keyframes titleFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes lineGrow {
  to {
    scale: 1;
  }
}

.musician-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
  letter-spacing: 0.5px;
  animation: subtitleFade 1s ease-out 0.8s forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes subtitleFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 音频可视化器 */
.sound-visualizer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.wave-container {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 50px;
}

.wave-bar {
  width: 3px;
  background: linear-gradient(to top, #007bff, #00c6ff);
  border-radius: 2px;
  animation: waveAnimation 1.5s ease-in-out infinite;
  height: 10px;
}

.wave-bar:nth-child(1) { animation-delay: 0s; }
.wave-bar:nth-child(2) { animation-delay: 0.1s; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; }
.wave-bar:nth-child(4) { animation-delay: 0.3s; }
.wave-bar:nth-child(5) { animation-delay: 0.2s; }
.wave-bar:nth-child(6) { animation-delay: 0.1s; }
.wave-bar:nth-child(7) { animation-delay: 0s; }

@keyframes waveAnimation {
  0%, 100% { height: 10px; }
  50% { height: 40px; }
}

/* 音乐作品展示区域 */
.music-showcase {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-family: 'Anton', sans-serif;
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  opacity: 0;
  animation: sectionTitleFade 1s ease-out 1.2s forwards;
}

.section-line {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #007bff, transparent);
  margin: 0 auto;
  opacity: 0;
  animation: sectionLineFade 1s ease-out 1.5s forwards;
}

@keyframes sectionTitleFade {
  to {
    opacity: 1;
  }
}

@keyframes sectionLineFade {
  to {
    opacity: 1;
  }
}

.tracks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 2rem 0;
}

.track-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
  animation: trackItemFade 0.8s ease-out forwards;
  position: relative;
}

.track-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.05) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 20px;
}

.track-item:hover::before {
  opacity: 1;
}

.track-item:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 123, 255, 0.15);
  border-color: rgba(0, 123, 255, 0.2);
}

.track-playing {
  border-color: rgba(0, 123, 255, 0.5) !important;
  box-shadow: 0 0 30px rgba(0, 123, 255, 0.3) !important;
}

@keyframes trackItemFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.track-cover {
  position: relative;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.cover-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  transition: all 0.5s ease;
}

.mood-忧郁 {
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
}

.mood-平静 {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

.mood-活力 {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.mood-梦幻 {
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
}

.cover-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.track-title-overlay {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
  backdrop-filter: blur(5px);
}

.track-item:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}

.track-item:hover .play-button {
  transform: scale(1);
  background: rgba(255, 255, 255, 1);
}

.play-icon {
  width: 0;
  height: 0;
  border-left: 20px solid #007bff;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  margin-left: 4px;
}

.ripple-effect {
  position: absolute;
  width: 70px;
  height: 70px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: ripple 2s ease-out infinite;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.track-info {
  padding: 2rem 1.5rem;
  position: relative;
}

.track-title {
  margin: 0 0 1rem;
  font-size: 1.4rem;
  color: #ffffff;
  font-weight: 600;
}

.track-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.track-genre {
  font-weight: 500;
}

.track-duration {
  font-family: 'Courier New', monospace;
}

.track-mood {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid;
  transition: all 0.3s ease;
}

.track-mood.mood-忧郁 {
  background: rgba(30, 58, 138, 0.2);
  border-color: rgba(30, 58, 138, 0.4);
  color: #60a5fa;
}

.track-mood.mood-平静 {
  background: rgba(5, 150, 105, 0.2);
  border-color: rgba(5, 150, 105, 0.4);
  color: #34d399;
}

.track-mood.mood-活力 {
  background: rgba(220, 38, 38, 0.2);
  border-color: rgba(220, 38, 38, 0.4);
  color: #f87171;
}

.track-mood.mood-梦幻 {
  background: rgba(124, 58, 237, 0.2);
  border-color: rgba(124, 58, 237, 0.4);
  color: #a78bfa;
}

/* 音乐理念区域 */
.music-philosophy {
  max-width: 900px;
  margin: 6rem auto 8rem;
  text-align: center;
  padding: 0;
  position: relative;
  z-index: 2;
}

.philosophy-container {
  position: relative;
  padding: 5rem 3rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transform: translateY(30px);
  opacity: 0;
  animation: philosophyFade 1s ease-out 1.8s forwards;
}

.philosophy-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.05) 0%, transparent 100%);
  z-index: -1;
}

@keyframes philosophyFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.philosophy-title {
  font-family: 'Anton', sans-serif;
  font-size: 2.8rem;
  background: linear-gradient(135deg, #007bff 0%, #00c6ff 50%, #0072ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 3rem;
  position: relative;
}

.philosophy-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #007bff, transparent);
}

.philosophy-content {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
}

.quote-mark {
  font-family: 'Georgia', serif;
  font-size: 6rem;
  line-height: 0;
  color: rgba(0, 123, 255, 0.2);
  position: absolute;
  top: 0;
  left: -20px;
}

.quote-end {
  bottom: -30px;
  right: -20px;
  left: auto;
  top: auto;
  transform: rotate(180deg);
}

.philosophy-text {
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  letter-spacing: 0.5px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .musician-header {
    padding: 6rem 2rem 3rem;
  }
  
  .music-showcase {
    padding: 3rem 2rem;
  }
  
  .tracks-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .music-philosophy {
    margin: 4rem auto 6rem;
  }
  
  .philosophy-container {
    padding: 4rem 2rem;
  }
}

@media (max-width: 768px) {
  .musician-page {
    padding: 0;
  }
  
  .back-button {
    top: 1.5rem;
    left: 1.5rem;
  }
  
  .musician-header {
    padding: 5rem 1.5rem 2rem;
  }
  
  .musician-title {
    font-size: clamp(2rem, 8vw, 4rem);
  }
  
  .tracks-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .music-showcase {
    padding: 2rem 1.5rem;
  }
  
  .section-header {
    margin-bottom: 2.5rem;
  }
  
  .music-philosophy {
    margin: 3rem auto 5rem;
    padding: 0 1.5rem;
  }
  
  .philosophy-container {
    padding: 3rem 1.5rem;
  }
  
  .philosophy-title {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }
  
  .philosophy-text {
    font-size: 1.1rem;
  }
  
  .quote-mark {
    font-size: 4rem;
    left: -10px;
  }
  
  .quote-end {
    right: -10px;
  }
}

@media (max-width: 480px) {
  .back-button {
    top: 1rem;
    left: 1rem;
  }
  
  .back-link {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .musician-header {
    padding: 4rem 1rem 2rem;
  }
  
  .sound-visualizer {
    height: 60px;
  }
  
  .wave-bar {
    width: 2px;
  }
  
  .music-showcase {
    padding: 2rem 1rem;
  }
  
  .track-cover {
    height: 220px;
  }
  
  .track-info {
    padding: 1.5rem 1rem;
  }
  
  .music-philosophy {
    padding: 0 1rem;
  }
  
  .philosophy-container {
    padding: 2.5rem 1rem;
    border-radius: 20px;
  }
}
</style>