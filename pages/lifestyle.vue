<template>
  <div class="lifestyle-page">
    <!-- 页面背景元素 -->
    <div class="bg-elements">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="noise-overlay"></div>
    </div>
    
    <!-- 返回按钮 -->
    <div class="back-button" v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }">
      <NuxtLink to="/" class="back-link">
        <span class="back-icon">←</span>
        <span class="back-text">返回首页</span>
      </NuxtLink>
    </div>
    
    <!-- 生活家标题区域 -->
    <div class="lifestyle-header">
      <h1 class="lifestyle-title" v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300, duration: 800 } }">生活家</h1>
      <p class="lifestyle-subtitle" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 600, duration: 800 } }">在平凡的日子里发现不平凡的美好</p>
      <div class="floating-elements">
        <div class="floating-item" v-for="n in 6" :key="n" :style="getFloatingStyle(n)">{{ getFloatingEmoji(n) }}</div>
      </div>
    </div>

    <!-- 生活瞬间展示区域 -->
    <div class="moments-showcase">
      <div class="section-header" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 800 } }">
        <h2 class="section-title">生活瞬间</h2>
        <div class="section-line"></div>
      </div>
      <div class="moments-grid">
        <div 
          v-for="(moment, index) in lifeMoments" 
          :key="index"
          class="moment-card"
          :class="`moment-${index % 3 + 1}`"
          @click="viewMoment(moment)"
          v-motion
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 900 + index * 100, duration: 600 } }"
        >
          <div class="moment-image">
            <img :src="moment.image" :alt="moment.title" />
            <div class="moment-overlay">
              <div class="moment-date">{{ moment.date }}</div>
            </div>
            <div class="moment-gradient"></div>
          </div>
          <div class="moment-content">
            <h3>{{ moment.title }}</h3>
            <p>{{ moment.description }}</p>
            <div class="moment-tags">
              <span v-for="tag in moment.tags" :key="tag" class="moment-tag">{{ tag }}</span>
            </div>
          </div>
          <div class="moment-glow"></div>
        </div>
      </div>
    </div>

    <!-- 生活理念区域 -->
    <div class="life-philosophy" v-motion :initial="{ opacity: 0, y: 60 }" :enter="{ opacity: 1, y: 0, transition: { delay: 1200 } }">
      <div class="section-header">
        <h2 class="section-title">生活理念</h2>
        <div class="section-line"></div>
      </div>
      <div class="philosophy-grid">
        <div 
          v-for="(philosophy, index) in philosophies" 
          :key="index" 
          class="philosophy-card"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: 1400 + index * 150 } }"
          :hovered="{ y: -10, scale: 1.03, transition: { duration: 400 } }"
        >
          <div class="card-glow"></div>
          <div class="philosophy-icon">{{ philosophy.icon }}</div>
          <h3>{{ philosophy.title }}</h3>
          <p>{{ philosophy.description }}</p>
        </div>
      </div>
    </div>

    <!-- 兴趣爱好区域 -->
    <div class="hobbies-section" v-motion :initial="{ opacity: 0, y: 60 }" :enter="{ opacity: 1, y: 0, transition: { delay: 1600 } }">
      <div class="section-header">
        <h2 class="section-title">兴趣爱好</h2>
        <div class="section-line"></div>
      </div>
      <div class="hobbies-grid">
        <div 
          v-for="(hobby, index) in hobbies" 
          :key="index" 
          class="hobby-item"
          v-motion
          :initial="{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 1800 + index * 100 } }"
          :hovered="{ y: -8, transition: { duration: 400 } }"
        >
          <div class="hobby-icon">{{ hobby.icon }}</div>
          <h3>{{ hobby.name }}</h3>
          <p>{{ hobby.description }}</p>
          <div class="hobby-level">
            <span>热爱程度:</span>
            <div class="level-bar">
              <div 
                class="level-fill" 
                :style="{ width: '0%' }"
                v-motion
                :initial="{ width: '0%' }"
                :enter="{ width: hobby.level + '%', transition: { delay: 2200 + index * 100, duration: 1000 } }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页脚区域 -->
    <footer class="lifestyle-footer" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 2400 } }">
      <p>用心感受每一刻 · 生活的艺术家</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useMotion } from '@vueuse/motion';

// 生活瞬间数据
const lifeMoments = reactive([
  {
    title: '晨光咖啡时光',
    description: '每天清晨的第一杯咖啡，是开启美好一天的仪式感。',
    image: 'https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=晨光咖啡',
    date: '2024-01-15',
    tags: ['咖啡', '晨光', '仪式感']
  },
  {
    title: '周末市集探索',
    description: '在热闹的市集中寻找新鲜食材，感受生活的烟火气。',
    image: 'https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=市集探索',
    date: '2024-01-12',
    tags: ['市集', '美食', '探索']
  },
  {
    title: '夜晚读书时光',
    description: '在安静的夜晚，与书为伴，在文字中寻找心灵的慰藉。',
    image: 'https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=读书时光',
    date: '2024-01-10',
    tags: ['阅读', '夜晚', '思考']
  },
  {
    title: '户外徒步之旅',
    description: '走进大自然，用脚步丈量世界，用心感受生命的美好。',
    image: 'https://via.placeholder.com/400x300/96CEB4/FFFFFF?text=徒步之旅',
    date: '2024-01-08',
    tags: ['徒步', '自然', '运动']
  },
  {
    title: '手工制作乐趣',
    description: '用双手创造美好，在制作过程中找到内心的平静。',
    image: 'https://via.placeholder.com/400x300/FFEAA7/000000?text=手工制作',
    date: '2024-01-05',
    tags: ['手工', '创作', '专注']
  },
  {
    title: '朋友聚会时光',
    description: '与好友相聚，分享生活的点点滴滴，珍惜友谊的温暖。',
    image: 'https://via.placeholder.com/400x300/DDA0DD/000000?text=朋友聚会',
    date: '2024-01-03',
    tags: ['友谊', '聚会', '分享']
  }
]);

// 生活理念数据
const philosophies = reactive([
  {
    icon: '🌱',
    title: '慢生活',
    description: '在快节奏的世界中，学会放慢脚步，细品生活的美好。'
  },
  {
    icon: '💝',
    title: '感恩之心',
    description: '对生活中的每一份美好都心怀感激，珍惜当下的幸福。'
  },
  {
    icon: '🎨',
    title: '创造美好',
    description: '用心发现生活中的美，用行动创造更多的美好瞬间。'
  },
  {
    icon: '🤝',
    title: '真诚待人',
    description: '以真诚的心对待每一个人，用善意温暖这个世界。'
  }
]);

// 兴趣爱好数据
const hobbies = reactive([
  {
    name: '摄影',
    icon: '📸',
    description: '用镜头记录生活的美好瞬间，发现平凡中的不平凡。',
    level: 85
  },
  {
    name: '烹饪',
    icon: '👨‍🍳',
    description: '在厨房中创造美味，用食物传递爱与温暖。',
    level: 75
  },
  {
    name: '园艺',
    icon: '🌿',
    description: '照料植物，观察生命的成长，感受自然的力量。',
    level: 70
  },
  {
    name: '旅行',
    icon: '✈️',
    description: '探索未知的世界，在旅途中收获不同的人生体验。',
    level: 90
  },
  {
    name: '瑜伽',
    icon: '🧘‍♀️',
    description: '通过瑜伽练习，寻找身心的平衡与内在的宁静。',
    level: 65
  },
  {
    name: '手工艺',
    icon: '🎨',
    description: '用双手创造独特的作品，享受制作过程的专注与快乐。',
    level: 80
  }
]);

// 浮动元素样式
const getFloatingStyle = (index) => {
  const positions = [
    { left: '10%', top: '20%' },
    { left: '85%', top: '15%' },
    { left: '15%', top: '70%' },
    { left: '80%', top: '65%' },
    { left: '50%', top: '25%' },
    { left: '70%', top: '80%' }
  ];
  
  return {
    ...positions[index - 1],
    animationDelay: (index * 0.5) + 's',
    animationDuration: (3 + Math.random() * 2) + 's'
  };
};

// 浮动表情符号
const getFloatingEmoji = (index) => {
  const emojis = ['☀️', '🌸', '🦋', '🌈', '⭐', '🍃'];
  return emojis[index - 1];
};

const viewMoment = (moment) => {
  console.log('查看生活瞬间:', moment.title);
  // 这里可以添加瞬间详情展示逻辑
};
</script>

<style scoped>
.lifestyle-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #121212 0%, #1e1e1e 100%);
  color: #f0f0f0;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

/* 背景元素 */
.bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  transition: all 5s ease-in-out;
}

.circle-1 {
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(255,107,107,0.8) 0%, rgba(255,107,107,0) 70%);
  top: -10%;
  left: -10%;
  animation: float-slow 15s ease-in-out infinite alternate;
}

.circle-2 {
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle, rgba(78,205,196,0.8) 0%, rgba(78,205,196,0) 70%);
  bottom: -5%;
  right: -5%;
  animation: float-slow 18s ease-in-out infinite alternate-reverse;
}

.circle-3 {
  width: 30vw;
  height: 30vw;
  background: radial-gradient(circle, rgba(255,193,7,0.8) 0%, rgba(255,193,7,0) 70%);
  top: 40%;
  left: 60%;
  animation: float-slow 20s ease-in-out infinite alternate;
}

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=');
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* 动画关键帧 */
@keyframes float-slow {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(30px, -30px) rotate(5deg); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 107, 107, 0.6); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

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
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 50px;
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.back-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.2), transparent);
  transition: left 0.5s;
}

.back-link:hover::before {
  left: 100%;
}

.back-link:hover {
  background: rgba(255, 107, 107, 0.15);
  border-color: rgba(255, 107, 107, 0.6);
  transform: translateX(-8px) scale(1.05);
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
}

.back-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.back-link:hover .back-icon {
  transform: translateX(-3px);
}

.back-text {
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.lifestyle-header {
  text-align: center;
  padding: 6rem 0 4rem;
  position: relative;
  overflow: hidden;
}

.lifestyle-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem, 10vw, 8rem);
  background: linear-gradient(45deg, #ff6b6b, #ffc107, #4ecdc4, #45b7d1);
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 50px rgba(255, 107, 107, 0.4);
  animation: gradient-shift 8s ease-in-out infinite;
  position: relative;
}

.lifestyle-title::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #ff6b6b, #ffc107, #4ecdc4, #45b7d1);
  background-size: 400% 400%;
  animation: gradient-shift 8s ease-in-out infinite;
  filter: blur(20px);
  opacity: 0.3;
  z-index: -1;
}

.lifestyle-subtitle {
  font-size: 1.4rem;
  color: #ccc;
  margin-bottom: 3rem;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0.9;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Section样式 */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.section-line {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  margin: 0 auto;
  border-radius: 2px;
  position: relative;
}

.section-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  border-radius: 2px;
  filter: blur(8px);
  opacity: 0.6;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-item {
  position: absolute;
  font-size: 2rem;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

.moments-showcase {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 0;
}

.moments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
  padding: 2rem 0;
}

.moment-card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  cursor: pointer;
  position: relative;
  backdrop-filter: blur(20px);
}

.moment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 24px;
  pointer-events: none;
  z-index: 1;
}

.moment-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.moment-1 {
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.moment-1:hover {
  box-shadow: 
    0 30px 60px rgba(255, 107, 107, 0.2),
    0 0 40px rgba(255, 107, 107, 0.3);
}

.moment-2 {
  border: 1px solid rgba(78, 205, 196, 0.3);
}

.moment-2:hover {
  box-shadow: 
    0 30px 60px rgba(78, 205, 196, 0.2),
    0 0 40px rgba(78, 205, 196, 0.3);
}

.moment-3 {
  border: 1px solid rgba(69, 183, 209, 0.3);
}

.moment-3:hover {
  box-shadow: 
    0 30px 60px rgba(69, 183, 209, 0.2),
    0 0 40px rgba(69, 183, 209, 0.3);
}

.moment-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #ffc107);
  border-radius: 26px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease;
  filter: blur(10px);
}

.moment-card:hover .moment-glow {
  opacity: 0.6;
}

.moment-image {
  position: relative;
  overflow: hidden;
  height: 280px;
}

.moment-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(0.9) contrast(1.1);
}

.moment-card:hover .moment-image img {
  transform: scale(1.08);
  filter: brightness(1) contrast(1.2);
}

.moment-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  pointer-events: none;
}

.moment-overlay {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 2;
}

.moment-date {
  color: #ffc107;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.moment-content {
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.moment-content h3 {
  margin: 0 0 1rem;
  font-size: 1.4rem;
  color: #f8f8f8;
  font-weight: 600;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.moment-card:hover .moment-content h3 {
  color: #fff;
}

.moment-content p {
  color: #bbb;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.moment-card:hover .moment-content p {
  color: #ddd;
}

.moment-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.moment-tag {
  font-size: 0.75rem;
  padding: 0.4rem 1rem;
  background: rgba(255, 107, 107, 0.15);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 25px;
  color: #ff8a8a;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.moment-tag:hover {
  background: rgba(255, 107, 107, 0.25);
  border-color: rgba(255, 107, 107, 0.5);
  transform: translateY(-2px);
}

.life-philosophy {
  max-width: 1200px;
  margin: 6rem auto;
  padding: 4rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 32px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 107, 0.2);
  position: relative;
  overflow: hidden;
}

.life-philosophy::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.05), rgba(255, 193, 7, 0.05));
  border-radius: 32px;
  pointer-events: none;
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
}

.philosophy-card {
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);
}

.philosophy-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 20px;
  pointer-events: none;
  z-index: 1;
}

.philosophy-card:hover {
  transform: translateY(-10px) scale(1.03);
  border-color: rgba(255, 107, 107, 0.4);
  box-shadow: 0 20px 40px rgba(255, 107, 107, 0.2);
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff6b6b, #ffc107);
  border-radius: 22px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease;
  filter: blur(8px);
}

.philosophy-card:hover .card-glow {
  opacity: 0.4;
}

.philosophy-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.philosophy-card:hover .philosophy-icon {
  transform: scale(1.1) rotate(5deg);
}

.philosophy-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #f8f8f8;
  font-weight: 600;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.philosophy-card:hover h3 {
  color: #fff;
}

.philosophy-card p {
  color: #bbb;
  line-height: 1.7;
  font-size: 0.95rem;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.philosophy-card:hover p {
  color: #ddd;
}

.hobbies-section {
  max-width: 1400px;
  margin: 6rem auto;
  padding: 4rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 32px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(78, 205, 196, 0.2);
  position: relative;
  overflow: hidden;
}

.hobbies-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.05), rgba(69, 183, 209, 0.05));
  border-radius: 32px;
  pointer-events: none;
}

.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
}

.hobby-item {
  background: rgba(0, 0, 0, 0.3);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(78, 205, 196, 0.3);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);
}

.hobby-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 20px;
  pointer-events: none;
  z-index: 1;
}

.hobby-item:hover {
  transform: translateY(-12px) scale(1.02);
  border-color: rgba(78, 205, 196, 0.5);
  box-shadow: 0 25px 50px rgba(78, 205, 196, 0.2);
}

.hobby-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  transition: transform 0.4s ease;
}

.hobby-item:hover .hobby-icon {
  transform: scale(1.15) rotate(-5deg);
}

.hobby-item h3 {
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #f8f8f8;
  font-weight: 600;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.hobby-item:hover h3 {
  color: #fff;
}

.hobby-item p {
  color: #bbb;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.hobby-item:hover p {
  color: #ddd;
}

.hobby-level {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  position: relative;
  z-index: 2;
}

.hobby-level span {
  color: #ddd;
  white-space: nowrap;
  font-weight: 500;
  transition: color 0.3s ease;
}

.hobby-item:hover .hobby-level span {
  color: #fff;
}

.level-bar {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.level-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ecdc4, #45b7d1, #6c5ce7);
  border-radius: 10px;
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 2px 8px rgba(78, 205, 196, 0.4);
}

.level-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

/* 页脚样式 */
.lifestyle-footer {
  text-align: center;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.lifestyle-footer p {
  color: #888;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin: 0;
  transition: color 0.3s ease;
}

.lifestyle-footer:hover p {
  color: #bbb;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .bg-circle {
    filter: blur(60px);
  }
  
  .circle-1 {
    width: 60vw;
    height: 60vw;
  }
  
  .circle-2 {
    width: 50vw;
    height: 50vw;
  }
  
  .circle-3 {
    width: 40vw;
    height: 40vw;
  }
}

@media (max-width: 768px) {
  .lifestyle-page {
    padding: 1rem;
  }
  
  .back-button {
    top: 1rem;
    left: 1rem;
  }
  
  .back-link {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
  
  .lifestyle-header {
    padding: 4rem 0 3rem;
  }
  
  .lifestyle-title {
    font-size: clamp(2.5rem, 12vw, 4rem);
  }
  
  .lifestyle-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
  }
  
  .moments-showcase,
  .life-philosophy,
  .hobbies-section {
    margin: 3rem auto;
    padding: 2.5rem 1.5rem;
  }
  
  .moments-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .moment-card {
    border-radius: 20px;
  }
  
  .moment-image {
    height: 240px;
  }
  
  .moment-content {
    padding: 1.5rem;
  }
  
  .philosophy-grid,
  .hobbies-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .philosophy-card,
  .hobby-item {
    padding: 2rem 1.5rem;
  }
  
  .hobby-level {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  
  .level-bar {
    width: 100%;
    height: 8px;
  }
  
  .floating-item {
    font-size: 1.5rem;
  }
  
  .bg-circle {
    filter: blur(40px);
    opacity: 0.1;
  }
}

@media (max-width: 480px) {
  .lifestyle-page {
    padding: 0.5rem;
  }
  
  .lifestyle-header {
    padding: 3rem 0 2rem;
  }
  
  .moments-showcase,
  .life-philosophy,
  .hobbies-section {
    margin: 2rem auto;
    padding: 2rem 1rem;
    border-radius: 20px;
  }
  
  .moment-content {
    padding: 1.2rem;
  }
  
  .philosophy-card,
  .hobby-item {
    padding: 1.5rem 1rem;
  }
  
  .philosophy-icon,
  .hobby-icon {
    font-size: 2.5rem;
  }
  
  .lifestyle-footer {
    padding: 2rem 0 1rem;
  }
  
  .lifestyle-footer p {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
}
</style>