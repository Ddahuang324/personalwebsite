<template>
  <div class="cpp-page">
    <!-- 背景装饰 -->
    <div class="background-elements">
      <div class="floating-element" v-for="i in 8" :key="i" :style="{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 10 + 's'
      }"></div>
    </div>

    <!-- 返回按钮 -->
    <NuxtLink to="/study" class="back-button" v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }">
      <span class="back-arrow">←</span>
      <span>返回学习</span>
    </NuxtLink>

    <!-- 页面标题 -->
    <div class="page-header" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
      <h1 class="page-title">C++ 知识库</h1>
      <p class="page-subtitle">深入学习现代C++编程</p>
    </div>

    <!-- 内容加载区域 -->
    <div class="content-container" v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
      <!-- 章节列表 -->
      <div class="chapters-container">
        <h2 class="container-title">C++ 学习章节</h2>
        <div class="chapters-list">
          <div 
            v-for="chapter in chapters" 
            :key="chapter.id"
            class="chapter-item"
            :class="{ expanded: chapter.expanded }"
          >
            <!-- 章节标题按钮 -->
            <div 
              class="chapter-header"
              @click="toggleChapter(chapter)"
            >
              <div class="chapter-info">
                <div class="chapter-number">{{ chapter.id }}</div>
                <div class="chapter-title">{{ chapter.title }}</div>
                <div class="chapter-count">{{ chapter.files.length }} 个小节</div>
              </div>
              <div class="chapter-toggle">
                <span class="toggle-icon" :class="{ rotated: chapter.expanded }">▼</span>
              </div>
            </div>
            
            <!-- 小节列表 -->
            <transition name="expand">
              <div v-if="chapter.expanded" class="sections-container">
                <div class="sections-list">
                  <div 
                    v-for="file in chapter.files" 
                    :key="file.name"
                    class="section-item"
                    @click="openHtmlFile(file)"
                  >
                    <span class="section-icon">📄</span>
                    <span class="section-name">{{ file.displayName }}</span>
                    <span class="section-arrow">→</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 页面元数据
useHead({
  title: 'C++ 知识库 - 个人网站',
  meta: [
    { name: 'description', content: 'C++编程知识库，点击章节直接跳转学习' }
  ]
})

// 响应式数据
const chapters = ref([])

// 章节数据
const initChapters = async () => {
  chapters.value = [
    { id: '01', title: '基本语言介绍', folder: '01-基本语言介绍', files: [], expanded: false },
    { id: '02', title: '环境配置', folder: '02-环境配置', files: [], expanded: false },
    { id: '03', title: '基本运算', folder: '03-基本运算', files: [], expanded: false },
    { id: '04', title: '基本控制语句', folder: '04-基本控制语句', files: [], expanded: false },
    { id: '05', title: '函数', folder: '05-函数', files: [], expanded: false },
    { id: '06', title: '数据类型', folder: '06-数据类型', files: [], expanded: false },
    { id: '07', title: '指针和引用', folder: '07-指针和引用', files: [], expanded: false },
    { id: '08', title: '面向对象编程', folder: '08-面向对象编程', files: [], expanded: false },
    { id: '09', title: '高级内存管理', folder: '09-高级内存管理', files: [], expanded: false },
    { id: '10', title: 'STL标准模板库', folder: '10-stl标准模板库', files: [], expanded: false },
    { id: '11', title: '编译器', folder: '11-编译器', files: [], expanded: false },
    { id: '12', title: 'C++程序组织与构建', folder: '12-cpp程序组织与构建', files: [], expanded: false },
    { id: '13', title: 'Lambda表达式', folder: '13-lambda表达式', files: [], expanded: false },
    { id: '14', title: '并发与多线程编程', folder: '14-并发与多线程编程', files: [], expanded: false },
    { id: '15', title: '模板元编程', folder: '15-模板元编程', files: [], expanded: false }
  ]
  
  // 动态加载每个章节的HTML文件
  await loadChapterFiles()
}

// 动态加载章节文件
const loadChapterFiles = async () => {
  for (const chapter of chapters.value) {
    // 在静态托管环境下，无法直接列出文件夹内容，因此直接使用已知文件列表
    await loadKnownFiles(chapter)
  }
}

// 加载已知存在的文件
const loadKnownFiles = async (chapter) => {
  const knownFiles = {
    '08': [{ name: '01-类和对象.html', displayName: '类和对象' }],
    '10': [{ name: 'demo.html', displayName: 'STL演示' }],
    '15': [{ name: '01-模板基础.html', displayName: '模板基础' }]
  }
  
  const files = knownFiles[chapter.id] || []
  chapter.files = files.map(file => ({
    ...file,
   path: `/personalwebsite/cpp-content/${chapter.folder}/${file.name}`
  
  // 如果没有已知文件，显示占位符
  if (chapter.files.length === 0) {
    chapter.files = [{
      name: '待添加.html',
      displayName: '内容待添加',
      path: '#'
    }]
  }
}

// 切换章节展开/折叠
const toggleChapter = async (chapter) => {
  chapter.expanded = !chapter.expanded
  
  // 如果是首次展开且文件列表为空，尝试重新加载
  if (chapter.expanded && chapter.files.length === 0) {
    await loadKnownFiles(chapter)
  }
}

// 打开HTML文件
const openHtmlFile = (file) => {
  // 检查是否为占位符
  if (file.path === '#') {
    alert('该章节内容正在准备中，敬请期待！')
    return
  }
  
  // 在新标签页中打开HTML文件
  window.open(file.path, '_blank')
}

// 组件挂载时初始化
onMounted(async () => {
  await initChapters()
})


</script>

<style scoped>
.cpp-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  color: #f0f0f0;
  position: relative;
  overflow-x: hidden;
  padding: 20px;
}

/* 背景装饰 */
.background-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-element {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(0, 123, 255, 0.3);
  border-radius: 50%;
  animation: float 15s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* 返回按钮 */
.back-button {
  position: fixed;
  top: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: #f0f0f0;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 100;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(-5px);
}

.back-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.back-button:hover .back-arrow {
  transform: translateX(-3px);
}

/* 页面标题 */
.page-header {
  text-align: center;
  padding: 100px 20px 60px;
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0 0 20px;
  background: linear-gradient(135deg, #007bff, #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: rgba(240, 240, 240, 0.7);
  margin: 0;
}

/* 内容容器 */
.content-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 章节容器 */
.chapters-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px;
  backdrop-filter: blur(10px);
}

.container-title {
  text-align: center;
  color: #f0f0f0;
  margin: 0 0 30px;
  font-size: 1.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #007bff, #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 章节项 */
.chapter-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chapter-item:hover {
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 5px 20px rgba(0, 123, 255, 0.15);
}

.chapter-item.expanded {
  background: rgba(0, 123, 255, 0.1);
  border-color: rgba(0, 123, 255, 0.3);
}

/* 章节标题 */
.chapter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chapter-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.chapter-info {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.chapter-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  min-width: 40px;
}

.chapter-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f0f0f0;
  flex: 1;
}

.chapter-count {
  font-size: 0.9rem;
  color: rgba(240, 240, 240, 0.6);
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
}

.chapter-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.toggle-icon {
  font-size: 1.2rem;
  color: #007bff;
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

/* 小节容器 */
.sections-container {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.sections-list {
  padding: 20px 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.section-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(5px);
}



.section-icon {
  font-size: 1.2rem;
}

.section-name {
  font-weight: 500;
  color: #f0f0f0;
  flex: 1;
}

.section-arrow {
  font-size: 1.2rem;
  color: #007bff;
  transition: transform 0.3s ease;
}

.section-item:hover .section-arrow {
  transform: translateX(5px);
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}





/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .page-header {
    padding: 80px 20px 40px;
  }
  
  .content-container {
    padding: 0 10px;
  }
  
  .back-button {
    top: 20px;
    left: 20px;
    padding: 10px 16px;
  }
  
  .chapters-container {
    padding: 20px;
  }
  
  .container-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .chapter-header {
    padding: 15px 20px;
  }
  
  .chapter-info {
    gap: 15px;
  }
  
  .chapter-number {
    font-size: 1.3rem;
    min-width: 35px;
  }
  
  .chapter-title {
    font-size: 1.1rem;
  }
  
  .sections-list {
    padding: 15px 20px;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  

}
</style>