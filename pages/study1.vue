<template>
  <div class="page-container">
    <div class="layout-container">
      <div class="main-content">
        <div class="sidebar">
          <div class="sidebar-inner">
            <div class="sidebar-content">
              <div class="header">
                <h1>Tech Hub</h1>
                <p>Explore, Learn, Share</p>
              </div>
              <div class="nav-menu">
                <div class="nav-item active">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  <p>Home</p>
                </div>
                <div class="nav-item">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                  </div>
                  <p>Articles</p>
                </div>
                <div class="nav-item">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  </div>
                  <p>Tutorials</p>
                </div>
                <div class="nav-item">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
                  </div>
                  <p>Topics</p>
                </div>
                <div class="nav-item">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                  <p>Search</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-area">
          <h2 class="section-title">Latest Articles</h2>
          <div class="articles-grid">
            <div v-for="article in articles" :key="article.id" class="article-card">
              <div
                class="article-image"
                :style="`background-image: url('${article.image}');`"
              ></div>
              <div class="article-content">
                <p class="article-title">{{ article.title }}</p>
                <p class="article-description">{{ article.description }}</p>
              </div>
            </div>
          </div>
          
          <h2 class="section-title">Popular Topics</h2>
          <div class="topics-container">
            <div v-for="topic in topics" :key="topic" class="topic-tag">
              <p>{{ topic }}</p>
            </div>
          </div>
          
          <h2 class="section-title">Featured Tutorials</h2>
          
          <div class="tutorials-container">
            <div class="tutorials-carousel">
              <div class="carousel-inner" :style="{ transform: `translateX(-${currentTutorial * 100}%)` }">
                <div v-for="(tutorial, index) in tutorials" :key="index" class="tutorial-card">
                  <div class="tutorial-image" :style="{ backgroundImage: `url(${tutorial.image})` }"></div>
                  <div class="tutorial-content">
                    <h3 class="tutorial-title">{{ tutorial.title }}</h3>
                    <p class="tutorial-description">{{ tutorial.description }}</p>
                    <div class="tutorial-meta">
                      <span class="meta-tag">{{ tutorial.duration }}</span>
                      <span class="meta-tag">{{ tutorial.level }}</span>
                    </div>
                    <div class="tutorial-tags">
                      <span v-for="(tag, tagIndex) in tutorial.tags" :key="tagIndex" class="tag">{{ tag }}</span>
                    </div>
                    <div class="start-button" @click="tutorial.title.includes('C++') ? navigateTo('/learning/cpp') : null">
                      <span>Start Tutorial</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-controls">
                <button @click="prevTutorial" class="carousel-control prev" :disabled="currentTutorial === 0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <div class="carousel-indicators">
                  <span 
                    v-for="(_, index) in tutorials" 
                    :key="index" 
                    class="indicator" 
                    :class="{ active: currentTutorial === index }"
                    @click="currentTutorial = index"
                  ></span>
                </div>
                <button @click="nextTutorial" class="carousel-control next" :disabled="currentTutorial === tutorials.length - 1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 设置页面头部
useHead({
  title: 'Tech Hub - Home',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
    }
  ]
})

// 文章数据
const articles = [
  {
    title: 'Understanding Cloud Computing',
    description: 'A comprehensive guide to cloud services and their benefits.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
  },
  {
    title: 'Mastering Python for Data Analysis',
    description: 'Learn Python\'s powerful libraries for data manipulation and analysis.',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80'
  },
  {
    title: 'Securing Your Home Network',
    description: 'Protect your digital life with these essential security tips.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
  },
  {
    title: 'Introduction to Machine Learning',
    description: 'Discover the fundamentals of ML and how it\'s changing the world.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
  },
  {
    title: 'Web Development Trends 2023',
    description: 'Stay ahead with the latest web development technologies and practices.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
  },
  {
    title: 'Blockchain Fundamentals',
    description: 'Understanding the technology behind cryptocurrencies and more.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
  },
  {
    title: 'Mobile App Design Principles',
    description: 'Create intuitive and engaging mobile experiences with these design tips.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2341&q=80'
  },
  {
    title: 'Getting Started with AI Development',
    description: 'Your first steps into the world of artificial intelligence development.',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
  }
];

// 话题数据
const topics = [
  'Web Development',
  'Data Science',
  'Machine Learning',
  'Cybersecurity',
  'Cloud Computing',
  'Mobile Development',
  'DevOps',
  'Blockchain',
  'UI/UX Design',
  'Game Development'
];

// 教程数据
const tutorials = [
  {
    title: 'C++ 编程基础与进阶',
    description: '从基础语法到高级特性，系统学习现代C++编程语言，掌握核心概念和实践技能。',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    duration: '10 hours',
    level: 'Beginner to Advanced',
    tags: ['C++', '编程语言', '算法', '数据结构']
  },
  {
    title: 'Data Analysis with Python',
    description: 'Master data manipulation, visualization, and analysis using Python\'s powerful libraries.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    duration: '6 hours',
    level: 'Beginner',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
  },
  {
    title: 'Mobile App Development with Flutter',
    description: 'Create beautiful, natively compiled applications for mobile from a single codebase.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    duration: '10 hours',
    level: 'Intermediate',
    tags: ['Flutter', 'Dart', 'Mobile', 'UI Design']
  }
];

// 轮播控制
const currentTutorial = ref(0);

// 上一个教程
function prevTutorial() {
  if (currentTutorial.value > 0) {
    currentTutorial.value--;
  }
}

// 下一个教程
function nextTutorial() {
  if (currentTutorial.value < tutorials.length - 1) {
    currentTutorial.value++;
  }
}
</script>

<style scoped>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 页面容器 */
.page-container {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: #1a1a1a;
  overflow-x: hidden;
  font-family: "Space Grotesk", "Noto Sans", sans-serif;
  color: white;
}

/* 布局容器 */
.layout-container {
  display: flex;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
}

/* 主内容区域 */
.main-content {
  display: flex;
  gap: 4px;
  padding: 0 24px;
  flex: 1;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 320px;
  flex-shrink: 0;
}

.sidebar-inner {
  display: flex;
  height: 100%;
  min-height: 700px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #1a1a1a;
  padding: 16px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  display: flex;
  flex-direction: column;
}

.header h1 {
  color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}

.header p {
  color: #adadad;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.2s ease-in-out;
}

.nav-item:hover {
  background-color: #2a2a2a;
}

.nav-item.active {
  background-color: #363636;
}

.nav-item.active:hover {
  background-color: #404040;
}

.icon {
  color: white;
}

.nav-item p {
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
}

/* 内容区域 */
.content-area {
  display: flex;
  flex-direction: column;
  max-width: 960px;
  flex: 1;
  margin-left: 16px;
}

/* 章节标题 */
.section-title {
  color: white;
  letter-spacing: -0.5px;
  font-size: 28px;
  font-weight: bold;
  line-height: tight;
  padding: 0 16px;
  text-align: left;
  padding-bottom: 12px;
  padding-top: 20px;
}

/* 文章网格 - 只显示一行 */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  gap: 12px;
  padding: 16px;
  overflow-x: auto;
  max-height: 270px; /* 限制高度只显示一行 */
}

@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: column;
    grid-template-rows: 1fr;
  }
}

@media (max-width: 640px) {
  .articles-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: column;
    grid-template-rows: 1fr;
  }
}

/* 文章卡片 */
.article-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.article-card:hover {
  transform: scale(1.05);
}

.article-image {
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 16/9;
  background-size: cover;
  border-radius: 12px;
}

.article-content {
  display: flex;
  flex-direction: column;
}

.article-title {
  color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}

.article-description {
  color: #adadad;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
}

/* 话题容器 */
.topics-container {
  display: flex;
  gap: 12px;
  padding: 16px;
  flex-wrap: wrap;
}

.topic-tag {
  display: flex;
  height: 32px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  background-color: #363636;
  padding-left: 16px;
  padding-right: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.topic-tag:hover {
  background-color: #404040;
}

.topic-tag p {
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
}

/* 教程容器 */
.tutorials-container {
  padding: 16px;
}

.tutorials-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  width: 100%;
  transition: transform 0.5s ease;
}

.tutorial-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  border-radius: 12px;
  gap: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  padding: 16px;
  border-radius: 12px;
  min-width: 100%;
  box-sizing: border-box;
}

@media (min-width: 1024px) {
  .tutorial-card {
    flex-direction: row;
  }
}

.tutorial-card:hover {
  background-color: #2a2a2a;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 16px;
}

.carousel-control {
  background: #363636;
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.carousel-control:hover:not(:disabled) {
  background-color: #404040;
}

.carousel-control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  gap: 8px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #363636;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.indicator.active {
  background-color: #2563eb;
}

.indicator:hover:not(.active) {
  background-color: #404040;
}

.tutorial-image {
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 16/9;
  background-size: cover;
  border-radius: 12px;
}

.tutorial-content {
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
}

@media (min-width: 1024px) {
  .tutorial-content {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.tutorial-title {
  color: white;
  font-size: 18px;
  font-weight: bold;
  line-height: tight;
  letter-spacing: -0.015em;
}

.tutorial-description {
  color: #adadad;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
}

.tutorial-meta {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.meta-tag {
  font-size: 12px;
  background-color: #363636;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.tutorial-tags {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  font-size: 12px;
  background-color: #2563eb; /* blue-600 */
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.start-button {
  display: flex;
  min-width: 84px;
  max-width: 480px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  height: 32px;
  padding: 0 16px;
  background-color: black;
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  transition: background-color 0.2s ease-in-out;
  margin-top: 8px;
}

.start-button:hover {
  background-color: #333333;
}

.start-button span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    max-width: 320px;
  }
  
  .content-area {
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>