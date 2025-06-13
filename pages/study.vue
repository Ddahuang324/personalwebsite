<template>
  <div class="learning-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="grid-pattern"></div>
      <div class="floating-elements">
        <div class="floating-code" v-for="i in 8" :key="i" :style="{ animationDelay: i * 0.6 + 's' }">{{ codeSymbols[i % codeSymbols.length] }}</div>
        <div class="floating-bracket" v-for="i in 6" :key="'bracket-'+i" :style="{ animationDelay: i * 1.1 + 's' }">{{ brackets[i % brackets.length] }}</div>
      </div>
      <div class="knowledge-glow"></div>
    </div>
    
    <!-- 返回按钮 -->
    <div class="back-button">
      <NuxtLink to="/" class="back-link">
        <span class="back-icon">←</span>
        <span>返回首页</span>
      </NuxtLink>
    </div>
    
    <!-- 学习标题区域 -->
    <section class="learning-header">
      <div class="header-content">
        <div class="title-wrapper animate-on-scroll">
          <h1 class="learning-title">Learning</h1>
          <div class="title-accent"></div>
        </div>
        <p class="learning-subtitle animate-on-scroll">知识共享，智慧传承</p>
        <div class="knowledge-stats animate-on-scroll">
          <div class="stat-item">
            <span class="stat-number">{{ typedLanguages }}</span>
            <span class="stat-label">编程语言</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ typedProjects }}</span>
            <span class="stat-label">项目经验</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ typedHours }}</span>
            <span class="stat-label">学习时长</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 知识分类导航 -->
    <section class="knowledge-nav">
      <div class="nav-container">
        <div 
          v-for="(category, index) in knowledgeCategories" 
          :key="category.id"
          class="nav-item"
          :class="{ active: activeCategory === category.id }"
          @click="setActiveCategory(category.id)"
          :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <div class="nav-icon">{{ category.icon }}</div>
          <span class="nav-label">{{ category.name }}</span>
          <div class="nav-indicator"></div>
        </div>
      </div>
    </section>
    
    <!-- 知识分类内容区域 -->
    <section class="knowledge-content">
      <div class="content-container">
        <div 
          v-for="category in knowledgeCategories" 
          :key="category.id"
          v-show="activeCategory === category.id"
          class="category-content"
        >
          <div class="category-header">
            <div class="category-icon">{{ category.icon }}</div>
            <h2 class="category-title">{{ category.name }}</h2>
            <p class="category-description">{{ category.description }}</p>
          </div>
          
          <div class="category-action">
            <NuxtLink 
              :to="category.route" 
              class="explore-btn"
              v-if="category.route"
            >
              <span>深入学习</span>
              <div class="btn-arrow">→</div>
            </NuxtLink>
            <div class="coming-soon" v-else>
              <span>敬请期待</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 响应式数据
const activeCategory = ref('cpp')
const typedLanguages = ref(0)
const typedProjects = ref(0)
const typedHours = ref(0)

// 静态数据
const codeSymbols = ['{}', '[]', '()', '<>', '//', '/*', '*/', ';', '::', '->', '&&', '||']
const brackets = ['{', '}', '[', ']', '<', '>', '(', ')']


const knowledgeCategories = [
  { 
    id: 'cpp', 
    name: 'C++', 
    icon: '⚡', 
    description: '现代C++编程语言，从基础语法到高级特性的系统学习',
    route: '/learning/cpp'
  },
  { 
    id: 'algorithms', 
    name: '算法与数据结构', 
    icon: '🧮', 
    description: '计算机科学核心算法和数据结构的深入理解',
    route: null
  },
  { 
    id: 'system', 
    name: '系统设计', 
    icon: '🏗️', 
    description: '大规模分布式系统的架构设计与实现',
    route: null
  },
  { 
    id: 'tools', 
    name: '开发工具', 
    icon: '🛠️', 
    description: '提升开发效率的工具链和最佳实践',
    route: null
  }
]

// 移除了C++特定的数据，现在只保留通用的知识分类

// 方法
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

// 数字动画
const animateNumbers = () => {
  gsap.to({ value: 0 }, {
    value: 15,
    duration: 2,
    ease: "power2.out",
    onUpdate: function() {
      typedLanguages.value = Math.floor(this.targets()[0].value)
    }
  })
  
  gsap.to({ value: 0 }, {
    value: 50,
    duration: 2.2,
    ease: "power2.out",
    onUpdate: function() {
      typedProjects.value = Math.floor(this.targets()[0].value)
    }
  })
  
  gsap.to({ value: 0 }, {
    value: 1000,
    duration: 2.5,
    ease: "power2.out",
    onUpdate: function() {
      typedHours.value = Math.floor(this.targets()[0].value)
    }
  })
}

// 生命周期
onMounted(() => {
  nextTick(() => {
    // 初始动画
    gsap.from('.learning-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    
    gsap.from('.learning-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    })
    
    gsap.from('.knowledge-stats', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: 'power3.out',
      onComplete: animateNumbers
    })
    
    gsap.from('.nav-item', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 1,
      ease: 'power3.out'
    })
    
    gsap.from('.knowledge-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 1.3,
      ease: 'power3.out'
    })
    
    // 滚动触发动画
    ScrollTrigger.create({
      trigger: '.learning-path',
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.timeline-item', {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        })
      }
    })
  })
})
</script>

<style scoped>
.learning-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%);
  color: #f0f0f0;
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
  z-index: 0;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-code, .floating-bracket {
  position: absolute;
  color: rgba(255, 193, 7, 0.1);
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  animation: float 8s ease-in-out infinite;
}

.floating-code {
  font-weight: bold;
}

.floating-bracket {
  font-size: 2rem;
  color: rgba(0, 123, 255, 0.1);
}

.floating-code:nth-child(1) { top: 10%; left: 10%; }
.floating-code:nth-child(2) { top: 20%; right: 15%; }
.floating-code:nth-child(3) { top: 60%; left: 5%; }
.floating-code:nth-child(4) { bottom: 30%; right: 10%; }
.floating-code:nth-child(5) { top: 40%; left: 80%; }
.floating-code:nth-child(6) { bottom: 20%; left: 20%; }
.floating-code:nth-child(7) { top: 80%; right: 25%; }
.floating-code:nth-child(8) { top: 30%; left: 60%; }

.floating-bracket:nth-child(9) { top: 15%; left: 70%; }
.floating-bracket:nth-child(10) { bottom: 40%; left: 15%; }
.floating-bracket:nth-child(11) { top: 70%; right: 20%; }
.floating-bracket:nth-child(12) { bottom: 10%; right: 60%; }
.floating-bracket:nth-child(13) { top: 50%; left: 30%; }
.floating-bracket:nth-child(14) { bottom: 60%; right: 40%; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-3deg); }
  75% { transform: translateY(-15px) rotate(2deg); }
}

.knowledge-glow {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 123, 255, 0.1) 0%, transparent 70%);
  transform: translateX(-50%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
  50% { opacity: 0.6; transform: translateX(-50%) scale(1.2); }
}

/* 返回按钮 */
.back-button {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f0f0f0;
  text-decoration: none;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

.back-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.back-link:hover .back-icon {
  transform: translateX(-3px);
}

/* 标题区域 */
.learning-header {
  padding: 120px 0 80px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.learning-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 400;
  margin: 0;
  background: linear-gradient(135deg, #007bff, #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.title-accent {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #ffc107);
  border-radius: 2px;
}

.learning-subtitle {
  font-size: 1.3rem;
  color: rgba(240, 240, 240, 0.8);
  margin: 0 0 50px;
  font-weight: 300;
}

.knowledge-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 50px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffc107;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(240, 240, 240, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 导航区域 */
.knowledge-nav {
  padding: 60px 0;
  position: relative;
  z-index: 1;
}

.nav-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0 20px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-width: 120px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.nav-item.active {
  background: rgba(0, 123, 255, 0.2);
  border-color: #007bff;
}

.nav-icon {
  font-size: 2rem;
}

.nav-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #f0f0f0;
}

.nav-indicator {
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #007bff;
  transition: width 0.3s ease;
}

.nav-item.active .nav-indicator {
  width: 80%;
}

/* 知识内容区域 */
.knowledge-content {
  padding: 80px 0;
  position: relative;
  z-index: 1;
}

.content-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.category-content {
  text-align: center;
  padding: 60px 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.category-header {
  margin-bottom: 40px;
}

.category-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  display: block;
}

.category-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 20px;
  color: #f0f0f0;
}

.category-description {
  font-size: 1.2rem;
  color: rgba(240, 240, 240, 0.8);
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.category-action {
  margin-top: 40px;
}

.explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.explore-btn:hover {
  background: linear-gradient(135deg, #0056b3, #004085);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.explore-btn:hover .btn-arrow {
  transform: translateX(5px);
}

.coming-soon {
  display: inline-block;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(240, 240, 240, 0.6);
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 移除了不再使用的样式 */

/* 响应式设计 */
@media (max-width: 768px) {
  .knowledge-stats {
    gap: 30px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .nav-container {
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .nav-item {
    min-width: 100px;
    padding: 15px;
  }
  
  .knowledge-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .knowledge-card {
    padding: 20px;
  }
  
  .path-timeline:before {
    left: 30px;
  }
  
  .timeline-item {
    flex-direction: row !important;
    padding-left: 80px;
  }
  
  .timeline-marker {
    position: absolute;
    left: 0;
    margin: 0;
  }
  
  .timeline-content {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .learning-header {
    padding: 100px 0 60px;
  }
  
  .knowledge-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .section-title, .path-title {
    font-size: 2rem;
  }
  
  .back-link {
    padding: 10px 15px;
    font-size: 0.8rem;
  }
}
</style>