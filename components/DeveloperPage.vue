<template>
  <div class="developer-page">
    <!-- 开发者标题区域 -->
    <div class="developer-header">
      <h1 class="developer-title">正在努力的开发者</h1>
      <p class="developer-subtitle">代码是新的画笔和乐器，用逻辑构建世界</p>
      <div class="code-animation">
        <span v-for="(char, index) in codeText" :key="index" :style="{ animationDelay: index * 0.1 + 's' }">{{ char }}</span>
      </div>
    </div>

    <!-- 项目展示区域 -->
    <div class="projects-showcase">
      <div class="projects-grid">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="project-card"
          @click="viewProject(project)"
        >
          <div class="project-header">
            <div class="project-icon">{{ project.icon }}</div>
            <div class="project-status" :class="project.status">{{ project.statusText }}</div>
          </div>
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <div class="tech-stack">
            <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <div class="project-stats">
            <div class="stat">
              <span class="stat-icon">⭐</span>
              <span>{{ project.stars }}</span>
            </div>
            <div class="stat">
              <span class="stat-icon">🔧</span>
              <span>{{ project.commits }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术栈区域 -->
    <div class="tech-section">
      <h2>技术栈</h2>
      <div class="tech-categories">
        <div v-for="category in techStack" :key="category.name" class="tech-category">
          <h3>{{ category.name }}</h3>
          <div class="tech-items">
            <div 
              v-for="tech in category.items" 
              :key="tech.name"
              class="tech-item"
              :class="tech.level"
            >
              <div class="tech-logo">{{ tech.icon }}</div>
              <span class="tech-name">{{ tech.name }}</span>
              <div class="tech-level">
                <div class="level-bar" :style="{ width: tech.proficiency + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编程统计 -->
    <div class="stats-section">
      <h2>编程统计</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ codingStats.linesOfCode }}</div>
          <div class="stat-label">代码行数</div>
          <div class="stat-icon">📝</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ codingStats.projects }}</div>
          <div class="stat-label">项目数量</div>
          <div class="stat-icon">🚀</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ codingStats.coffees }}</div>
          <div class="stat-label">咖啡杯数</div>
          <div class="stat-icon">☕</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ codingStats.bugs }}</div>
          <div class="stat-label">修复Bug</div>
          <div class="stat-icon">🐛</div>
        </div>
      </div>
    </div>

    <!-- 学习路径 -->
    <div class="learning-section">
      <h2>学习路径</h2>
      <div class="learning-timeline">
        <div 
          v-for="(milestone, index) in learningPath" 
          :key="index"
          class="timeline-item"
          :class="{ completed: milestone.completed, current: milestone.current }"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h4>{{ milestone.title }}</h4>
            <p>{{ milestone.description }}</p>
            <div class="timeline-date">{{ milestone.date }}</div>
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

const codeText = ref('console.log("Hello, World!");')

// 项目数据
const projects = ref([
  {
    name: '个人网站',
    description: '使用Vue.js构建的响应式个人作品集网站',
    icon: '🌐',
    status: 'active',
    statusText: '进行中',
    technologies: ['Vue.js', 'Nuxt.js', 'GSAP'],
    stars: 12,
    commits: 45
  },
  {
    name: '待办事项应用',
    description: '简洁的任务管理工具，支持拖拽和分类',
    icon: '📝',
    status: 'completed',
    statusText: '已完成',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    stars: 8,
    commits: 32
  },
  {
    name: '天气预报小程序',
    description: '基于微信小程序的天气查询应用',
    icon: '🌤️',
    status: 'paused',
    statusText: '暂停',
    technologies: ['小程序', 'JavaScript', 'API'],
    stars: 5,
    commits: 18
  },
  {
    name: '博客系统',
    description: '全栈博客平台，支持Markdown编辑',
    icon: '📚',
    status: 'planning',
    statusText: '计划中',
    technologies: ['Node.js', 'MongoDB', 'Express'],
    stars: 0,
    commits: 0
  }
])

// 技术栈数据
const techStack = ref([
  {
    name: '前端开发',
    items: [
      { name: 'HTML/CSS', icon: '🎨', proficiency: 80, level: 'advanced' },
      { name: 'JavaScript', icon: '⚡', proficiency: 75, level: 'advanced' },
      { name: 'Vue.js', icon: '💚', proficiency: 70, level: 'intermediate' },
      { name: 'React', icon: '⚛️', proficiency: 60, level: 'intermediate' }
    ]
  },
  {
    name: '后端开发',
    items: [
      { name: 'Node.js', icon: '🟢', proficiency: 65, level: 'intermediate' },
      { name: 'Python', icon: '🐍', proficiency: 55, level: 'beginner' },
      { name: 'MySQL', icon: '🗄️', proficiency: 50, level: 'beginner' }
    ]
  },
  {
    name: '工具与其他',
    items: [
      { name: 'Git', icon: '📚', proficiency: 70, level: 'intermediate' },
      { name: 'VS Code', icon: '💻', proficiency: 85, level: 'advanced' },
      { name: 'Figma', icon: '🎨', proficiency: 40, level: 'beginner' }
    ]
  }
])

// 编程统计
const codingStats = ref({
  linesOfCode: '10K+',
  projects: 15,
  coffees: 247,
  bugs: 89
})

// 学习路径
const learningPath = ref([
  {
    title: 'HTML/CSS 基础',
    description: '学习网页结构和样式设计',
    date: '2023.01',
    completed: true,
    current: false
  },
  {
    title: 'JavaScript 入门',
    description: '掌握编程基础和DOM操作',
    date: '2023.03',
    completed: true,
    current: false
  },
  {
    title: 'Vue.js 框架',
    description: '学习现代前端框架开发',
    date: '2023.06',
    completed: true,
    current: false
  },
  {
    title: 'Node.js 后端',
    description: '探索服务端JavaScript开发',
    date: '2023.09',
    completed: false,
    current: true
  },
  {
    title: '全栈项目',
    description: '构建完整的Web应用',
    date: '2024.01',
    completed: false,
    current: false
  }
])

// 查看项目
const viewProject = (project) => {
  console.log('查看项目:', project.name)
}

// 页面加载动画
onMounted(() => {
  // 标题动画
  gsap.from('.developer-title', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
  
  gsap.from('.developer-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out'
  })
  
  // 代码动画
  gsap.from('.code-animation span', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    delay: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
  })
  
  // 项目卡片动画
  gsap.from('.project-card', {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    delay: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  })
  
  // 技术栈动画
  gsap.from('.tech-item', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    delay: 1.2,
    stagger: 0.1,
    ease: 'power2.out'
  })
  
  // 统计卡片动画
  gsap.from('.stat-card', {
    rotateY: 90,
    opacity: 0,
    duration: 0.8,
    delay: 1.5,
    stagger: 0.2,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.developer-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 0, 255, 0.1) 0%, transparent 50%);
  padding: 2rem;
  position: relative;
  overflow-x: hidden;
  color: #fff;
}

.developer-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.developer-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #00ff88;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  font-family: 'Courier New', monospace;
}

.developer-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  font-style: italic;
}

.code-animation {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  color: #00ff88;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 136, 0.3);
  display: inline-block;
}

.code-animation span {
  display: inline-block;
  animation: typing 0.5s ease-in-out;
}

@keyframes typing {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.projects-showcase {
  margin-bottom: 4rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent);
  transition: left 0.5s ease;
}

.project-card:hover::before {
  left: 100%;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-icon {
  font-size: 2rem;
}

.project-status {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.project-status.active { background: rgba(0, 255, 136, 0.2); color: #00ff88; }
.project-status.completed { background: rgba(0, 123, 255, 0.2); color: #007bff; }
.project-status.paused { background: rgba(255, 193, 7, 0.2); color: #ffc107; }
.project-status.planning { background: rgba(108, 117, 125, 0.2); color: #6c757d; }

.project-card h3 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.project-card p {
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.project-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ccc;
  font-size: 0.9rem;
}

.tech-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
}

.tech-section h2 {
  color: #00ff88;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.tech-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tech-category h3 {
  color: #fff;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  border-bottom: 2px solid rgba(0, 255, 136, 0.3);
  padding-bottom: 0.5rem;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.tech-logo {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
}

.tech-name {
  flex: 1;
  color: #fff;
  font-weight: 500;
}

.tech-level {
  width: 100px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.level-bar {
  height: 100%;
  background: linear-gradient(90deg, #00ff88, #00cc6a);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.stats-section {
  margin-bottom: 4rem;
}

.stats-section h2 {
  color: #00ff88;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ff88;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.stat-label {
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.stat-card .stat-icon {
  font-size: 2rem;
  opacity: 0.3;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.learning-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
}

.learning-section h2 {
  color: #00ff88;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.learning-timeline {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.learning-timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(0, 255, 136, 0.3);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 60px;
}

.timeline-marker {
  position: absolute;
  left: 12px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(108, 117, 125, 0.5);
  border: 3px solid rgba(108, 117, 125, 0.3);
}

.timeline-item.completed .timeline-marker {
  background: #00ff88;
  border-color: rgba(0, 255, 136, 0.5);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.timeline-item.current .timeline-marker {
  background: #ffc107;
  border-color: rgba(255, 193, 7, 0.5);
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.timeline-content h4 {
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.timeline-content p {
  color: #ccc;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.timeline-date {
  color: #00ff88;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
}

.back-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(0, 255, 136, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  z-index: 100;
  font-family: 'Courier New', monospace;
}

.back-button:hover {
  background: rgba(0, 255, 136, 0.3);
  transform: translateX(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 136, 0.2);
}

.back-button span {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .developer-page {
    padding: 1rem;
  }
  
  .developer-title {
    font-size: 2.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-categories {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>