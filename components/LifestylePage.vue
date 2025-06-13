<template>
  <div class="lifestyle-page">
    <!-- 生活家标题区域 -->
    <div class="lifestyle-header">
      <h1 class="lifestyle-title">生活家</h1>
      <p class="lifestyle-subtitle">在平凡的日子里发现不平凡的美好</p>
      <div class="floating-elements">
        <div class="floating-item" v-for="n in 6" :key="n" :style="getFloatingStyle(n)">{{ getFloatingEmoji(n) }}</div>
      </div>
    </div>

    <!-- 生活瞬间展示区域 -->
    <div class="moments-showcase">
      <div class="moments-grid">
        <div 
          v-for="(moment, index) in lifeMoments" 
          :key="index"
          class="moment-card"
          :class="`moment-${index % 3 + 1}`"
          @click="viewMoment(moment)"
        >
          <div class="moment-image">
            <img :src="moment.image" :alt="moment.title" />
            <div class="moment-overlay">
              <div class="moment-date">{{ moment.date }}</div>
            </div>
          </div>
          <div class="moment-content">
            <h3>{{ moment.title }}</h3>
            <p>{{ moment.description }}</p>
            <div class="moment-tags">
              <span v-for="tag in moment.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 生活哲学区域 -->
    <div class="philosophy-section">
      <div class="philosophy-content">
        <h2>生活哲学</h2>
        <div class="philosophy-grid">
          <div v-for="philosophy in lifePhilosophy" :key="philosophy.title" class="philosophy-card">
            <div class="philosophy-icon">{{ philosophy.icon }}</div>
            <h3>{{ philosophy.title }}</h3>
            <p>{{ philosophy.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 兴趣爱好区域 -->
    <div class="hobbies-section">
      <h2>兴趣爱好</h2>
      <div class="hobbies-wheel">
        <div class="wheel-center">
          <div class="center-icon">❤️</div>
          <span>热爱生活</span>
        </div>
        <div 
          v-for="(hobby, index) in hobbies" 
          :key="hobby.name"
          class="hobby-item"
          :style="getHobbyPosition(index)"
          @click="selectHobby(hobby)"
        >
          <div class="hobby-icon">{{ hobby.icon }}</div>
          <span>{{ hobby.name }}</span>
        </div>
      </div>
    </div>

    <!-- 生活技能 -->
    <div class="skills-section">
      <h2>生活技能</h2>
      <div class="skills-garden">
        <div 
          v-for="skill in lifeSkills" 
          :key="skill.name"
          class="skill-flower"
          :class="skill.level"
        >
          <div class="flower-stem"></div>
          <div class="flower-bloom">
            <div class="flower-center">{{ skill.icon }}</div>
            <div class="flower-petals"></div>
          </div>
          <div class="flower-label">{{ skill.name }}</div>
        </div>
      </div>
    </div>

    <!-- 生活感悟 -->
    <div class="insights-section">
      <h2>生活感悟</h2>
      <div class="insights-carousel">
        <div class="insight-card" v-for="(insight, index) in lifeInsights" :key="index">
          <div class="insight-quote">"{{ insight.quote }}"</div>
          <div class="insight-author">— {{ insight.author }}</div>
          <div class="insight-context">{{ insight.context }}</div>
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

// 生活瞬间数据
const lifeMoments = ref([
  {
    title: '晨光咖啡时光',
    description: '每天清晨的第一杯咖啡，是开启美好一天的仪式感',
    image: 'https://via.placeholder.com/300x200/DEB887/FFFFFF?Text=晨光咖啡',
    date: '2024.01.15',
    tags: ['咖啡', '晨光', '仪式感']
  },
  {
    title: '周末市集探索',
    description: '在热闹的市集中寻找新鲜食材，感受生活的烟火气',
    image: 'https://via.placeholder.com/300x200/98FB98/FFFFFF?Text=市集探索',
    date: '2024.01.12',
    tags: ['市集', '美食', '探索']
  },
  {
    title: '阳台小花园',
    description: '亲手种植的小花园，见证生命的成长与美好',
    image: 'https://via.placeholder.com/300x200/FFB6C1/FFFFFF?Text=小花园',
    date: '2024.01.10',
    tags: ['园艺', '植物', '成长']
  },
  {
    title: '手作料理时间',
    description: '用心制作每一道菜，享受烹饪带来的快乐',
    image: 'https://via.placeholder.com/300x200/F0E68C/000000?Text=手作料理',
    date: '2024.01.08',
    tags: ['烹饪', '美食', '手作']
  },
  {
    title: '夕阳散步',
    description: '在夕阳西下时漫步，感受时光的温柔',
    image: 'https://via.placeholder.com/300x200/FFA07A/FFFFFF?Text=夕阳散步',
    date: '2024.01.05',
    tags: ['散步', '夕阳', '宁静']
  },
  {
    title: '读书角落',
    description: '在温暖的角落里阅读，与文字对话',
    image: 'https://via.placeholder.com/300x200/DDA0DD/FFFFFF?Text=读书角落',
    date: '2024.01.03',
    tags: ['阅读', '书籍', '思考']
  }
])

// 生活哲学
const lifePhilosophy = ref([
  {
    title: '慢生活',
    icon: '🐌',
    description: '放慢脚步，用心感受生活中的每一个细节和美好瞬间'
  },
  {
    title: '感恩心',
    icon: '🙏',
    description: '对生活中的点点滴滴心怀感激，珍惜当下的幸福'
  },
  {
    title: '简约美',
    icon: '✨',
    description: '追求简单而精致的生活方式，在简约中发现美的真谛'
  },
  {
    title: '自然和谐',
    icon: '🌿',
    description: '与自然和谐相处，在绿色生活中找到内心的平静'
  }
])

// 兴趣爱好
const hobbies = ref([
  { name: '烹饪', icon: '👩‍🍳' },
  { name: '园艺', icon: '🌱' },
  { name: '摄影', icon: '📸' },
  { name: '阅读', icon: '📚' },
  { name: '瑜伽', icon: '🧘‍♀️' },
  { name: '手工', icon: '✂️' },
  { name: '旅行', icon: '✈️' },
  { name: '音乐', icon: '🎵' }
])

// 生活技能
const lifeSkills = ref([
  { name: '烹饪', icon: '🍳', level: 'expert' },
  { name: '整理', icon: '📦', level: 'advanced' },
  { name: '园艺', icon: '🌸', level: 'intermediate' },
  { name: '摄影', icon: '📷', level: 'intermediate' },
  { name: '手工', icon: '🎨', level: 'beginner' },
  { name: '瑜伽', icon: '🧘', level: 'beginner' }
])

// 生活感悟
const lifeInsights = ref([
  {
    quote: '生活不在别处，就在当下的每一个瞬间',
    author: '自己',
    context: '在忙碌的日子里突然意识到的道理'
  },
  {
    quote: '幸福不是拥有很多，而是需要很少',
    author: '生活感悟',
    context: '整理房间时的深刻体会'
  },
  {
    quote: '每一天都是新的开始，每一刻都值得珍惜',
    author: '晨间思考',
    context: '看着窗外的朝阳时的感悟'
  }
])

// 获取漂浮元素样式
const getFloatingStyle = (index) => {
  const positions = [
    { left: '10%', top: '20%' },
    { left: '85%', top: '15%' },
    { left: '15%', top: '70%' },
    { left: '80%', top: '60%' },
    { left: '50%', top: '10%' },
    { left: '70%', top: '80%' }
  ]
  return {
    ...positions[index - 1],
    animationDelay: (index * 0.5) + 's',
    animationDuration: (3 + Math.random() * 2) + 's'
  }
}

// 获取漂浮表情
const getFloatingEmoji = (index) => {
  const emojis = ['🌸', '🦋', '☀️', '🌿', '💫', '🌺']
  return emojis[index - 1]
}

// 获取爱好位置
const getHobbyPosition = (index) => {
  const angle = (index * 360) / hobbies.value.length
  const radius = 150
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius
  return {
    transform: `translate(${x}px, ${y}px)`,
    animationDelay: (index * 0.2) + 's'
  }
}

// 查看生活瞬间
const viewMoment = (moment) => {
  console.log('查看瞬间:', moment.title)
}

// 选择爱好
const selectHobby = (hobby) => {
  console.log('选择爱好:', hobby.name)
}

// 页面加载动画
onMounted(() => {
  // 标题动画
  gsap.from('.lifestyle-title', {
    scale: 0.5,
    opacity: 0,
    duration: 1.2,
    ease: 'elastic.out(1, 0.5)'
  })
  
  gsap.from('.lifestyle-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out'
  })
  
  // 漂浮元素动画
  gsap.from('.floating-item', {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  })
  
  // 生活瞬间卡片动画
  gsap.from('.moment-card', {
    y: 100,
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  })
  
  // 哲学卡片动画
  gsap.from('.philosophy-card', {
    rotateY: 90,
    opacity: 0,
    duration: 0.8,
    delay: 1.2,
    stagger: 0.2,
    ease: 'power2.out'
  })
  
  // 技能花朵动画
  gsap.from('.skill-flower', {
    scale: 0,
    opacity: 0,
    duration: 1,
    delay: 1.5,
    stagger: 0.3,
    ease: 'elastic.out(1, 0.5)'
  })
})
</script>

<style scoped>
.lifestyle-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #fd79a8 100%);
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  padding: 2rem;
  position: relative;
  overflow-x: hidden;
}

.lifestyle-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  height: 300px;
}

.lifestyle-title {
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  font-family: 'Lora', serif;
}

.lifestyle-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-style: italic;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  margin-bottom: 4rem;
}

.moments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.moment-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.moment-card:hover {
  transform: translateY(-10px) rotate(2deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.moment-card.moment-1:hover { transform: translateY(-10px) rotate(-2deg); }
.moment-card.moment-2:hover { transform: translateY(-10px) rotate(1deg); }
.moment-card.moment-3:hover { transform: translateY(-10px) rotate(2deg); }

.moment-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.moment-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.moment-card:hover .moment-image img {
  transform: scale(1.1);
}

.moment-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #333;
}

.moment-content {
  padding: 1.5rem;
}

.moment-content h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.moment-content p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.moment-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: linear-gradient(45deg, #fd79a8, #fdcb6e);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.philosophy-section {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 3rem;
  margin-bottom: 4rem;
}

.philosophy-content h2 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Lora', serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.philosophy-card {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.philosophy-card:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-5px);
}

.philosophy-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.philosophy-card h3 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.philosophy-card p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.hobbies-section {
  margin-bottom: 4rem;
  text-align: center;
}

.hobbies-section h2 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-family: 'Lora', serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.hobbies-wheel {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.center-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.wheel-center span {
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
}

.hobby-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: hobbyFloat 3s ease-in-out infinite;
}

.hobby-item:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

@keyframes hobbyFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.hobby-icon {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

.hobby-item span {
  font-size: 0.7rem;
  color: #333;
  font-weight: 500;
  text-align: center;
}

.skills-section {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
}

.skills-section h2 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-family: 'Lora', serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.skills-garden {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
  min-height: 200px;
}

.skill-flower {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skill-flower:hover {
  transform: scale(1.1);
}

.flower-stem {
  width: 4px;
  background: linear-gradient(to top, #27ae60, #2ecc71);
  border-radius: 2px;
  margin-bottom: 1rem;
}

.skill-flower.expert .flower-stem { height: 80px; }
.skill-flower.advanced .flower-stem { height: 60px; }
.skill-flower.intermediate .flower-stem { height: 40px; }
.skill-flower.beginner .flower-stem { height: 20px; }

.flower-bloom {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.flower-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: #f39c12;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 2;
}

.flower-petals {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.flower-petals::before,
.flower-petals::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 40px;
  background: linear-gradient(45deg, #e74c3c, #f39c12);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}

.flower-petals::before {
  top: -10px;
  left: 20px;
  transform: rotate(0deg);
}

.flower-petals::after {
  top: 20px;
  left: -10px;
  transform: rotate(90deg);
}

.flower-label {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.insights-section {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
}

.insights-section h2 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Lora', serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.insights-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.insight-card {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.insight-card:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-5px);
}

.insight-quote {
  color: #fff;
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.insight-author {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.insight-context {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-style: italic;
}

.back-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border: none;
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateX(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.back-button span {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .lifestyle-page {
    padding: 1rem;
  }
  
  .lifestyle-title {
    font-size: 2.5rem;
  }
  
  .moments-grid {
    grid-template-columns: 1fr;
  }
  
  .philosophy-grid {
    grid-template-columns: 1fr;
  }
  
  .hobbies-wheel {
    width: 300px;
    height: 300px;
  }
  
  .hobby-item {
    width: 60px;
    height: 60px;
  }
  
  .skills-garden {
    gap: 1rem;
  }
  
  .insights-carousel {
    grid-template-columns: 1fr;
  }
}
</style>