<template>
  <div class="developer-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="grid-pattern"></div>
      <div class="floating-elements">
        <div class="floating-dot" v-for="i in 10" :key="i" :style="{ animationDelay: i * 0.8 + 's' }"></div>
        <div class="floating-square" v-for="i in 5" :key="'sq-'+i" :style="{ animationDelay: i * 1.2 + 's' }"></div>
        <div class="code-particle" v-for="i in 15" :key="'code-'+i" :style="{ animationDelay: i * 0.5 + 's' }">{{ codeParticles[i % codeParticles.length] }}</div>
      </div>
      <div class="glow-effect"></div>
    </div>
    
    <!-- 返回按钮 -->
    <div class="back-button">
      <NuxtLink to="/" class="back-link">
        <span class="back-icon">←</span>
        <span>返回首页</span>
      </NuxtLink>
    </div>
    
    <!-- 开发者标题区域 -->
    <section class="developer-header">
      <div class="header-content">
        <div class="title-wrapper animate-on-scroll">
          <h1 class="developer-title">Developer</h1>
          <div class="title-accent"></div>
        </div>
        <p class="developer-subtitle animate-on-scroll">代码是新的画笔和乐器，用逻辑构建世界</p>
        <!-- 三个代码块容器 -->
        <div class="code-blocks-container animate-on-scroll">
          <!-- JavaScript 代码块 -->
          <div class="code-block" :class="{ active: currentCodeBlock === 0 }">
            <div class="code-header">
              <div class="code-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="code-lang">JavaScript</span>
            </div>
            <div class="code-content">
              <div class="typing-code" v-html="jsTypingContent"></div>
            </div>
          </div>
          
          <!-- C++ 代码块 -->
          <div class="code-block" :class="{ active: currentCodeBlock === 1 }">
            <div class="code-header">
              <div class="code-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="code-lang">C++</span>
            </div>
            <div class="code-content">
              <div class="typing-code" v-html="cppTypingContent"></div>
            </div>
          </div>
          
          <!-- Python 代码块 -->
          <div class="code-block" :class="{ active: currentCodeBlock === 2 }">
            <div class="code-header">
              <div class="code-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="code-lang">Python</span>
            </div>
            <div class="code-content">
              <div class="typing-code" v-html="pythonTypingContent"></div>
            </div>
          </div>
          
          <!-- 语言切换指示器 -->
          <div class="language-indicators">
            <div 
              v-for="(lang, index) in languages" 
              :key="index"
              class="indicator" 
              :class="{ active: currentCodeBlock === index }"
              @click="switchCodeBlock(index)"
            >
              {{ lang.name }}
            </div>
          </div>
        </div>
        <div class="typing-container animate-on-scroll">
          <div class="typing-effect">{{ typingText }}<span class="cursor">|</span></div>
        </div>
      </div>
    </section>

    <!-- 项目展示区域 -->
    <section class="projects-showcase">
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">Featured Projects</h2>
        <div class="section-line"></div>
      </div>
      <div class="projects-grid">
        <article 
          v-for="(project, index) in projects" 
          :key="index"
          class="project-card animate-on-scroll"
          @click="viewProject(project)"
          @mousemove="handleCardMouseMove($event, index)"
          @mouseleave="handleCardMouseLeave($event, index)"
          :style="{ animationDelay: index * 0.1 + 's' }"
          :data-index="index"
        >
          <div class="project-header">
            <div class="project-icon">{{ project.icon }}</div>
            <div class="project-status" :class="project.status">
              <div class="status-dot"></div>
              {{ project.statusText }}
            </div>
          </div>
          <h3 class="project-title">{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="tech-stack">
            <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <div class="project-footer">
            <div class="project-stats">
              <div class="stat">
                <span class="stat-icon">⭐</span>
                <span class="stat-value">{{ project.stars }}</span>
              </div>
              <div class="stat">
                <span class="stat-icon">🔄</span>
                <span class="stat-value">{{ project.commits }}</span>
              </div>
            </div>
            <div class="project-date">{{ project.lastUpdate }}</div>
          </div>
        </article>
      </div>
    </section>

    <!-- 技能展示区域 -->
    <section class="skills-section">
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">Technical Skills</h2>
        <div class="section-line"></div>
      </div>
      <div class="skills-container">
        <div v-for="(skill, index) in skills" :key="index" class="skill-category animate-on-scroll" :style="{ animationDelay: index * 0.15 + 's' }">
          <h3 class="skill-category-title">{{ skill.category }}</h3>
          <div class="skill-items">
            <div v-for="(item, i) in skill.items" :key="i" class="skill-item">
              <div class="skill-info">
                <span class="skill-name">{{ item.name }}</span>
                <span class="skill-percentage">{{ item.level }}%</span>
              </div>
              <div class="skill-progress">
                <div class="skill-progress-bar" :style="{ width: item.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

// 三种语言的代码内容 - 按行分割便于逐行打字，增强语法高亮
const languages = reactive([
  {
    name: 'JS',
    lines: [
      '<span class="code-keyword">const</span> <span class="code-variable">developer</span> <span class="code-operator">=</span> <span class="code-punctuation">{</span>',
      '  <span class="code-property">passion</span><span class="code-punctuation">:</span> <span class="code-boolean">true</span><span class="code-punctuation">,</span>',
      '  <span class="code-property">learning</span><span class="code-punctuation">:</span> <span class="code-string">"always"</span><span class="code-punctuation">,</span>',
      '  <span class="code-property">goal</span><span class="code-punctuation">:</span> <span class="code-string">"create amazing experiences"</span>',
      '<span class="code-punctuation">};</span>'
    ]
  },
  {
    name: 'C++',
    lines: [
      '<span class="code-keyword">struct</span> <span class="code-class">Developer</span> <span class="code-punctuation">{</span>',
      '  <span class="code-keyword">bool</span> <span class="code-variable">passion</span> <span class="code-operator">=</span> <span class="code-boolean">true</span><span class="code-punctuation">;</span>',
      '  <span class="code-namespace">std</span><span class="code-operator">::</span><span class="code-keyword">string</span> <span class="code-variable">learning</span> <span class="code-operator">=</span> <span class="code-string">"always"</span><span class="code-punctuation">;</span>',
      '  <span class="code-namespace">std</span><span class="code-operator">::</span><span class="code-keyword">string</span> <span class="code-variable">goal</span> <span class="code-operator">=</span> <span class="code-string">"create amazing experiences"</span><span class="code-punctuation">;</span>',
      '<span class="code-punctuation">};</span>'
    ]
  },
  {
    name: 'PY',
    lines: [
      '<span class="code-variable">developer</span> <span class="code-operator">=</span> <span class="code-punctuation">{</span>',
      '  <span class="code-string">"passion"</span><span class="code-punctuation">:</span> <span class="code-boolean">True</span><span class="code-punctuation">,</span>',
      '  <span class="code-string">"learning"</span><span class="code-punctuation">:</span> <span class="code-string">"always"</span><span class="code-punctuation">,</span>',
      '  <span class="code-string">"goal"</span><span class="code-punctuation">:</span> <span class="code-string">"create amazing experiences"</span>',
      '<span class="code-punctuation">}</span>'
    ]
  }
]);

// 当前显示的代码块
const currentCodeBlock = ref(0);

// 三种语言的打字内容
const jsTypingContent = ref('');
const cppTypingContent = ref('');
const pythonTypingContent = ref('');

// 打字动画状态 - 改为按行和字符索引
let jsLineIndex = 0;
let jsCharIndex = 0;
let cppLineIndex = 0;
let cppCharIndex = 0;
let pythonLineIndex = 0;
let pythonCharIndex = 0;
let jsInterval, cppInterval, pythonInterval;

// 动画切换控制
let autoSwitchInterval;
let isAnimationComplete = [false, false, false]; // 跟踪每个动画是否完成
let currentAnimationIndex = 0; // 当前正在播放的动画索引

// 代码粒子
const codeParticles = ['{ }', '[ ]', '( )', '< >', '//', '/*', '*/', '=>', '++', '&&', '||', '!!', '??', '$.', '=='];

// 项目数据
const projects = reactive([
  {
    name: '个人网站',
    description: '使用Vue3和Nuxt3构建的个人展示网站，融合艺术与技术。',
    icon: '🌐',
    status: 'in-progress',
    statusText: '进行中',
    technologies: ['Vue3', 'Nuxt3', 'GSAP', 'CSS3'],
    stars: 12,
    commits: 47,
    lastUpdate: '2天前',
    link: '#'
  },
  {
    name: '智能助手应用',
    description: '基于自然语言处理的智能助手应用，帮助用户管理日常任务。',
    icon: '🤖',
    status: 'active',
    statusText: '活跃',
    technologies: ['React', 'Node.js', 'MongoDB', 'NLP'],
    stars: 28,
    commits: 103,
    lastUpdate: '1周前',
    link: '#'
  },
  {
    name: '音乐可视化工具',
    description: '将音频转换为视觉效果的工具，结合音乐与编程的创意项目。',
    icon: '🎵',
    status: 'completed',
    statusText: '已完成',
    technologies: ['JavaScript', 'Web Audio API', 'Canvas', 'Three.js'],
    stars: 45,
    commits: 76,
    lastUpdate: '1个月前',
    link: '#'
  },
  {
    name: '开源贡献',
    description: '参与多个开源项目，提交代码，修复bug，改进文档。',
    icon: '🔄',
    status: 'active',
    statusText: '活跃',
    technologies: ['Git', 'GitHub', 'Various'],
    stars: 'N/A',
    commits: '200+',
    lastUpdate: '持续中',
    link: '#'
  }
]);

// 技能数据
const skills = reactive([
  {
    category: '前端技术',
    items: [
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Vue.js', level: 80 },
      { name: 'React', level: 75 }
    ]
  },
  {
    category: '后端技术',
    items: [
      { name: 'Node.js', level: 70 },
      { name: 'Express', level: 65 },
      { name: 'MongoDB', level: 60 },
      { name: 'SQL', level: 55 }
    ]
  },
  {
    category: '其他技能',
    items: [
      { name: 'Git', level: 85 },
      { name: 'UI/UX', level: 75 },
      { name: '响应式设计', level: 80 },
      { name: '性能优化', level: 70 }
    ]
  }
]);

const viewProject = (project) => {
  console.log('查看项目:', project.name);
  // 这里可以添加项目详情展示逻辑
};

// 3D卡片悬停效果
const handleCardMouseMove = (e, index) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  card.style.boxShadow = `${(x - centerX) / 10}px ${(y - centerY) / 10}px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(34, 197, 94, 0.2)`;
  
  // 添加光泽效果
  const glare = card.querySelector('.card-glare') || document.createElement('div');
  if (!card.querySelector('.card-glare')) {
    glare.classList.add('card-glare');
    card.appendChild(glare);
  }
  
  const glareX = (x / rect.width) * 100;
  const glareY = (y / rect.height) * 100;
  glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)`;
};

const handleCardMouseLeave = (e, index) => {
  const card = e.currentTarget;
  card.style.transform = '';
  card.style.boxShadow = '';
  
  const glare = card.querySelector('.card-glare');
  if (glare) {
    glare.remove();
  }
};

// 动画和交互效果
let observer;
let cursorInterval;
let typingInterval;
const typingText = ref('');
const fullText = 'console.log("Hello, welcome to my developer space!");';
let typingIndex = 0;

onMounted(() => {
  // 技能条动画
  initSkillBars();
  
  // 滚动触发动画
  initScrollAnimations();
  
  // 启动所有打字效果
  startAllTypingEffects();
  
  // 自动切换代码块
  startAutoSwitch();
  
  // 鼠标跟随效果
  initCursorEffect();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (cursorInterval) clearInterval(cursorInterval);
  if (autoSwitchInterval) clearInterval(autoSwitchInterval);
  stopAllAnimations();
});

// 初始化技能条动画
const initSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
};

// 初始化滚动触发动画
const initScrollAnimations = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  // 监听需要动画的元素
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
};

// 切换代码块
const switchCodeBlock = (index) => {
  // 先隐藏当前代码块
  currentCodeBlock.value = -1;
  
  setTimeout(() => {
    // 停止当前所有动画
    stopAllAnimations();
    
    // 重置所有动画状态
    resetAllAnimations();
    
    // 设置新的代码块
    currentCodeBlock.value = index;
    currentAnimationIndex = index;
    
    // 启动对应的动画
    startSingleAnimation(index);
  }, 200); // 短暂延迟确保平滑过渡
};

// 自动切换代码块 - 重构为等待动画完成后再切换
const startAutoSwitch = () => {
  // 启动第一个动画
  startSingleAnimation(0);
  
  // 定期检查动画状态并切换
  autoSwitchInterval = setInterval(() => {
    checkAndSwitchAnimation();
  }, 500); // 每500ms检查一次
};

// 检查并切换动画
const checkAndSwitchAnimation = () => {
  // 如果当前动画已完成，等待2秒后切换到下一个
  if (isAnimationComplete[currentAnimationIndex]) {
    setTimeout(() => {
      // 切换到下一个动画
      const nextIndex = (currentAnimationIndex + 1) % 3;
      
      // 先隐藏当前代码块
      currentCodeBlock.value = -1; // 设置为无效值，隐藏所有代码块
      
      setTimeout(() => {
        // 停止当前动画
        stopAllAnimations();
        
        // 重置所有状态
        resetAllAnimations();
        
        // 切换代码块
        currentCodeBlock.value = nextIndex;
        currentAnimationIndex = nextIndex;
        
        // 启动新动画
        startSingleAnimation(nextIndex);
      }, 200); // 短暂延迟确保平滑过渡
    }, 2000); // 等待2秒
    
    // 重置完成状态，避免重复触发
    isAnimationComplete[currentAnimationIndex] = false;
  }
};

// 停止所有动画
const stopAllAnimations = () => {
  if (jsInterval) {
    clearInterval(jsInterval);
    jsInterval = null;
  }
  if (cppInterval) {
    clearInterval(cppInterval);
    cppInterval = null;
  }
  if (pythonInterval) {
    clearInterval(pythonInterval);
    pythonInterval = null;
  }
};

// 重置所有动画状态
const resetAllAnimations = () => {
  // 重置JS动画
  jsLineIndex = 0;
  jsCharIndex = 0;
  jsTypingContent.value = '';
  
  // 重置C++动画
  cppLineIndex = 0;
  cppCharIndex = 0;
  cppTypingContent.value = '';
  
  // 重置Python动画
  pythonLineIndex = 0;
  pythonCharIndex = 0;
  pythonTypingContent.value = '';
  
  // 重置完成状态
  isAnimationComplete = [false, false, false];
};

// 启动单个动画
const startSingleAnimation = (index) => {
  switch (index) {
    case 0:
      startJSTyping();
      break;
    case 1:
      startCppTyping();
      break;
    case 2:
      startPythonTyping();
      break;
  }
};

// JS 打字效果 - 逐行显示
const startJSTyping = () => {
  const jsLines = languages[0].lines;
  
  jsInterval = setInterval(() => {
    // 当前行还没打完
    if (jsLineIndex < jsLines.length) {
      const currentLine = jsLines[jsLineIndex];
      // 提取不含HTML标签的纯文本，用于计算字符索引
      const plainText = currentLine.replace(/<[^>]*>/g, '');
      
      if (jsCharIndex < plainText.length) {
        // 逐字符显示当前行，保留HTML标签
        let currentHtml = '';
        let plainIndex = 0;
        let i = 0;
        
        while (i < currentLine.length && plainIndex <= jsCharIndex) {
          if (currentLine[i] === '<') {
            let tagEnd = currentLine.indexOf('>', i);
            currentHtml += currentLine.substring(i, tagEnd + 1);
            i = tagEnd + 1;
          } else {
            currentHtml += currentLine[i];
            plainIndex++;
            i++;
          }
        }
        
        // 更新当前行的内容
        const completedLines = jsLines.slice(0, jsLineIndex).map(line => 
          `<div class="code-line">${line}</div>`
        ).join('');
        
        jsTypingContent.value = completedLines + 
          `<div class="code-line">${currentHtml}<span class="typing-cursor">|</span></div>`;
        
        jsCharIndex++;
      } else {
        // 当前行打完了，进入下一行
        jsLineIndex++;
        jsCharIndex = 0;
      }
    } else {
      // 所有行都打完了，标记动画完成
      clearInterval(jsInterval);
      jsInterval = null;
      isAnimationComplete[0] = true;
    }
  }, 80);
};

// C++ 打字效果 - 逐行显示
const startCppTyping = () => {
  const cppLines = languages[1].lines;
  
  cppInterval = setInterval(() => {
    // 当前行还没打完
    if (cppLineIndex < cppLines.length) {
      const currentLine = cppLines[cppLineIndex];
      // 提取不含HTML标签的纯文本，用于计算字符索引
      const plainText = currentLine.replace(/<[^>]*>/g, '');
      
      if (cppCharIndex < plainText.length) {
        // 逐字符显示当前行，保留HTML标签
        let currentHtml = '';
        let plainIndex = 0;
        let i = 0;
        
        while (i < currentLine.length && plainIndex <= cppCharIndex) {
          if (currentLine[i] === '<') {
            let tagEnd = currentLine.indexOf('>', i);
            currentHtml += currentLine.substring(i, tagEnd + 1);
            i = tagEnd + 1;
          } else {
            currentHtml += currentLine[i];
            plainIndex++;
            i++;
          }
        }
        
        // 更新当前行的内容
        const completedLines = cppLines.slice(0, cppLineIndex).map(line => 
          `<div class="code-line">${line}</div>`
        ).join('');
        
        cppTypingContent.value = completedLines + 
          `<div class="code-line">${currentHtml}<span class="typing-cursor">|</span></div>`;
        
        cppCharIndex++;
      } else {
        // 当前行打完了，进入下一行
        cppLineIndex++;
        cppCharIndex = 0;
      }
    } else {
      // 所有行都打完了，标记动画完成
      clearInterval(cppInterval);
      cppInterval = null;
      isAnimationComplete[1] = true;
    }
  }, 90);
};

// Python 打字效果 - 逐行显示
const startPythonTyping = () => {
  const pythonLines = languages[2].lines;
  
  pythonInterval = setInterval(() => {
    // 当前行还没打完
    if (pythonLineIndex < pythonLines.length) {
      const currentLine = pythonLines[pythonLineIndex];
      // 提取不含HTML标签的纯文本，用于计算字符索引
      const plainText = currentLine.replace(/<[^>]*>/g, '');
      
      if (pythonCharIndex < plainText.length) {
        // 逐字符显示当前行，保留HTML标签
        let currentHtml = '';
        let plainIndex = 0;
        let i = 0;
        
        while (i < currentLine.length && plainIndex <= pythonCharIndex) {
          if (currentLine[i] === '<') {
            let tagEnd = currentLine.indexOf('>', i);
            currentHtml += currentLine.substring(i, tagEnd + 1);
            i = tagEnd + 1;
          } else {
            currentHtml += currentLine[i];
            plainIndex++;
            i++;
          }
        }
        
        // 更新当前行的内容
        const completedLines = pythonLines.slice(0, pythonLineIndex).map(line => 
          `<div class="code-line">${line}</div>`
        ).join('');
        
        pythonTypingContent.value = completedLines + 
          `<div class="code-line">${currentHtml}<span class="typing-cursor">|</span></div>`;
        
        pythonCharIndex++;
      } else {
        // 当前行打完了，进入下一行
        pythonLineIndex++;
        pythonCharIndex = 0;
      }
    } else {
      // 所有行都打完了，标记动画完成
      clearInterval(pythonInterval);
      pythonInterval = null;
      isAnimationComplete[2] = true;
    }
  }, 70);
};

// 启动所有打字效果 - 现在只启动第一个
const startAllTypingEffects = () => {
  // 不再同时启动所有动画，改为通过自动切换控制
  // startJSTyping();
  // setTimeout(() => startCppTyping(), 2000);
  // setTimeout(() => startPythonTyping(), 4000);
};

// 鼠标跟随效果
const initCursorEffect = () => {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-follower');
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
    setTimeout(() => cursor.classList.remove('cursor-click'), 500);
  });
};
</script>

<style scoped>
.developer-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #e8e8e8;
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
  overflow: hidden;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px);
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

.floating-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(34, 197, 94, 0.4);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  filter: blur(1px);
}

.floating-square {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid rgba(34, 197, 94, 0.3);
  animation: rotate 10s linear infinite, float 8s ease-in-out infinite;
}

.code-particle {
  position: absolute;
  color: rgba(34, 197, 94, 0.2);
  font-family: monospace;
  font-size: 12px;
  animation: codeFloat 15s linear infinite;
  opacity: 0.5;
}

.glow-effect {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0) 70%);
  transform: translate(-50%, -50%);
  animation: pulse 10s ease-in-out infinite;
  filter: blur(50px);
}

/* 随机位置生成 */
.floating-dot:nth-child(1) { top: 20%; left: 10%; animation-delay: 0.5s; }
.floating-dot:nth-child(2) { top: 60%; left: 80%; animation-delay: 1.5s; }
.floating-dot:nth-child(3) { top: 80%; left: 20%; animation-delay: 2.5s; }
.floating-dot:nth-child(4) { top: 30%; left: 70%; animation-delay: 3.5s; }
.floating-dot:nth-child(5) { top: 50%; left: 90%; animation-delay: 4.5s; }
.floating-dot:nth-child(6) { top: 10%; left: 50%; animation-delay: 5.5s; }
.floating-dot:nth-child(7) { top: 40%; left: 30%; animation-delay: 6.5s; }
.floating-dot:nth-child(8) { top: 70%; left: 60%; animation-delay: 7.5s; }
.floating-dot:nth-child(9) { top: 25%; left: 85%; animation-delay: 8.5s; }
.floating-dot:nth-child(10) { top: 85%; left: 40%; animation-delay: 9.5s; }

.floating-square:nth-child(1) { top: 15%; left: 20%; animation-delay: 1s; }
.floating-square:nth-child(2) { top: 75%; left: 70%; animation-delay: 2s; }
.floating-square:nth-child(3) { top: 45%; left: 40%; animation-delay: 3s; }
.floating-square:nth-child(4) { top: 65%; left: 15%; animation-delay: 4s; }
.floating-square:nth-child(5) { top: 35%; left: 85%; animation-delay: 5s; }

.code-particle:nth-child(1) { top: 10%; left: 15%; animation-delay: 0.2s; }
.code-particle:nth-child(2) { top: 50%; left: 75%; animation-delay: 1.2s; }
.code-particle:nth-child(3) { top: 70%; left: 25%; animation-delay: 2.2s; }
.code-particle:nth-child(4) { top: 20%; left: 65%; animation-delay: 3.2s; }
.code-particle:nth-child(5) { top: 60%; left: 5%; animation-delay: 4.2s; }
.code-particle:nth-child(6) { top: 30%; left: 45%; animation-delay: 5.2s; }
.code-particle:nth-child(7) { top: 80%; left: 55%; animation-delay: 6.2s; }
.code-particle:nth-child(8) { top: 15%; left: 35%; animation-delay: 7.2s; }
.code-particle:nth-child(9) { top: 55%; left: 95%; animation-delay: 8.2s; }
.code-particle:nth-child(10) { top: 75%; left: 45%; animation-delay: 9.2s; }
.code-particle:nth-child(11) { top: 25%; left: 85%; animation-delay: 10.2s; }
.code-particle:nth-child(12) { top: 45%; left: 25%; animation-delay: 11.2s; }
.code-particle:nth-child(13) { top: 65%; left: 75%; animation-delay: 12.2s; }
.code-particle:nth-child(14) { top: 35%; left: 15%; animation-delay: 13.2s; }
.code-particle:nth-child(15) { top: 85%; left: 65%; animation-delay: 14.2s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
  50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes codeFloat {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0.5; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
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
  padding: 0.75rem 1.25rem;
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 50px;
  color: #22c55e;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
}

.back-link:hover {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.4);
  transform: translateX(-3px);
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.2);
}

.back-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.back-link:hover .back-icon {
  transform: translateX(-2px);
}

/* 头部区域 */
.developer-header {
  position: relative;
  z-index: 1;
  padding: 8rem 2rem 6rem;
  text-align: center;
}

.header-content {
  max-width: 900px;
  margin: 0 auto;
}

.title-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.animate-in {
  transform: translateY(0) !important;
  opacity: 1 !important;
}

/* 打字机效果 */
.typing-container {
  margin-top: 3rem;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.typing-effect {
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  color: #a1a1aa;
  background: rgba(15, 15, 15, 0.6);
  padding: 1rem;
  border-radius: 8px;
  display: inline-block;
  text-align: left;
  min-width: 300px;
}

.cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
  color: #22c55e;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

/* 鼠标跟随效果 */
.cursor-follower {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(34, 197, 94, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  transition: width 0.3s, height 0.3s, border-color 0.3s;
  mix-blend-mode: difference;
}

.cursor-click {
  width: 10px;
  height: 10px;
  background-color: rgba(34, 197, 94, 0.8);
  border-color: transparent;
}

.developer-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #22c55e 50%, #10b981 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  position: relative;
  animation: textGlow 5s ease-in-out infinite;
}

/* 字体炫光动画 */
@keyframes textGlow {
  0%, 100% {
    text-shadow: 
      0 0 5px rgba(34, 197, 94, 0.3),
      0 0 10px rgba(34, 197, 94, 0.2),
      0 0 15px rgba(34, 197, 94, 0.1);
    filter: brightness(1);
  }
  25% {
    text-shadow: 
      0 0 10px rgba(34, 197, 94, 0.6),
      0 0 20px rgba(34, 197, 94, 0.4),
      0 0 30px rgba(34, 197, 94, 0.3),
      0 0 40px rgba(34, 197, 94, 0.2);
    filter: brightness(1.2);
  }
  50% {
    text-shadow: 
      0 0 15px rgba(34, 197, 94, 0.8),
      0 0 30px rgba(34, 197, 94, 0.6),
      0 0 45px rgba(34, 197, 94, 0.4),
      0 0 60px rgba(34, 197, 94, 0.3),
      0 0 75px rgba(34, 197, 94, 0.2);
    filter: brightness(1.4);
  }
  75% {
    text-shadow: 
      0 0 10px rgba(34, 197, 94, 0.6),
      0 0 20px rgba(34, 197, 94, 0.4),
      0 0 30px rgba(34, 197, 94, 0.3),
      0 0 40px rgba(34, 197, 94, 0.2);
    filter: brightness(1.2);
  }
}

.title-accent {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #22c55e, transparent);
}

.developer-subtitle {
  font-size: 1.1rem;
  color: #a1a1aa;
  margin-bottom: 3rem;
  font-weight: 300;
  letter-spacing: 0.5px;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transition-delay: 0.2s;
}

/* 代码块容器样式 */
.code-blocks-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transition-delay: 0.4s;
}

.code-block {
  background: rgba(15, 15, 15, 0.8);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px) scale(0.98);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
}

.code-block.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
  z-index: 2;
  transition-delay: 0.1s;
}

.code-block:not(.active) {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px) scale(0.98);
  transition-delay: 0s;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(20, 20, 20, 0.5);
  border-bottom: 1px solid rgba(34, 197, 94, 0.1);
}

.code-dots {
  display: flex;
  gap: 0.5rem;
}

.code-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #525252;
}

.code-dots span:nth-child(1) { background: #ef4444; }
.code-dots span:nth-child(2) { background: #f59e0b; }
.code-dots span:nth-child(3) { background: #22c55e; }

.code-lang {
  font-size: 0.8rem;
  color: #a1a1aa;
  font-family: monospace;
}

.code-content {
  padding: 1.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-line {
  display: block;
  margin-bottom: 0.3rem;
}

.code-indent {
  padding-left: 2rem;
}

/* 语法高亮颜色 - 更丰富的配色方案 */
.code-keyword { 
  color: #c084fc; /* 紫色 - 关键字 */
  font-weight: 600;
}
.code-variable { 
  color: #60a5fa; /* 蓝色 - 变量名 */
}
.code-property { 
  color: #34d399; /* 绿色 - 属性名 */
  font-weight: 500;
}
.code-string { 
  color: #fbbf24; /* 黄色 - 字符串 */
  font-style: italic;
}
.code-boolean { 
  color: #f87171; /* 红色 - 布尔值 */
  font-weight: 600;
}
.code-class { 
  color: #fb7185; /* 粉色 - 类名 */
  font-weight: 600;
}
.code-number {
  color: #a78bfa; /* 浅紫色 - 数字 */
  font-weight: 500;
}
.code-operator {
  color: #f472b6; /* 粉红色 - 操作符 */
  font-weight: 600;
}
.code-punctuation {
  color: #94a3b8; /* 灰蓝色 - 标点符号 */
}
.code-comment {
  color: #6b7280; /* 灰色 - 注释 */
  font-style: italic;
  opacity: 0.8;
}
.code-function {
  color: #fbbf24; /* 黄色 - 函数名 */
  font-weight: 500;
}
.code-namespace {
  color: #06b6d4; /* 青色 - 命名空间 */
  font-weight: 500;
}

/* 打字光标样式 */
.typing-cursor {
  color: #22c55e;
  animation: blink 1s step-end infinite;
  font-weight: normal;
}

.typing-code {
  min-height: 120px;
  position: relative;
}

/* 代码行样式 */
.code-line {
  display: block;
  margin: 0;
  padding: 2px 0;
  white-space: pre;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* 代码缩进效果 */
.code-line:not(:first-child) {
  text-indent: 0;
}

/* 打字光标在代码行中的样式 */
.code-line .typing-cursor {
  color: #00ff88;
  font-weight: bold;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 语言指示器样式 */
.language-indicators {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
}

.indicator {
  position: relative;
  padding: 0.5rem 1rem;
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 20px;
  color: #a1a1aa;
  font-size: 0.8rem;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  user-select: none;
}

.indicator:hover {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.4);
  color: #22c55e;
  transform: translateY(-2px);
}

.indicator.active {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.6);
  color: #22c55e;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  transform: translateY(-2px);
}

.indicator.active::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #22c55e, #10b981);
  border-radius: 22px;
  z-index: -1;
  opacity: 0.3;
}

/* 区域标题 */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.section-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  color: #ffffff;
  margin: 0 0 1rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  animation: sectionTitleGlow 5s ease-in-out infinite;
  animation-delay: 2.5s;
}

/* 区域标题炫光动画 */
@keyframes sectionTitleGlow {
  0%, 100% {
    text-shadow: 
      0 0 3px rgba(255, 255, 255, 0.2),
      0 0 6px rgba(255, 255, 255, 0.1);
    filter: brightness(1);
  }
  25% {
    text-shadow: 
      0 0 6px rgba(255, 255, 255, 0.4),
      0 0 12px rgba(255, 255, 255, 0.3),
      0 0 18px rgba(34, 197, 94, 0.2);
    filter: brightness(1.1);
  }
  50% {
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 0.6),
      0 0 20px rgba(255, 255, 255, 0.4),
      0 0 30px rgba(34, 197, 94, 0.3),
      0 0 40px rgba(34, 197, 94, 0.2);
    filter: brightness(1.2);
  }
  75% {
    text-shadow: 
      0 0 6px rgba(255, 255, 255, 0.4),
      0 0 12px rgba(255, 255, 255, 0.3),
      0 0 18px rgba(34, 197, 94, 0.2);
    filter: brightness(1.1);
  }
}

.section-line {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #22c55e, transparent);
  margin: 0 auto;
}

/* 项目展示区域 */
.projects-showcase {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  background: rgba(15, 15, 15, 0.6);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, box-shadow;
}

/* 卡片光泽效果 */
.card-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(34, 197, 94, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(34, 197, 94, 0.1);
}

.project-card:hover::before {
  opacity: 1;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.project-icon {
  font-size: 2.5rem;
  filter: grayscale(0.3);
  transition: filter 0.3s ease;
}

.project-card:hover .project-icon {
  filter: grayscale(0);
}

.project-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.project-status.active {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.project-status.active .status-dot {
  background: #22c55e;
}

.project-status.in-progress {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.project-status.in-progress .status-dot {
  background: #fbbf24;
}

.project-status.completed {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.project-status.completed .status-dot {
  background: #3b82f6;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 1rem;
  letter-spacing: -0.01em;
}

.project-description {
  color: #a1a1aa;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tech-tag {
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 20px;
  color: #22c55e;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: rgba(34, 197, 94, 0.2);
  transform: translateY(-1px);
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.project-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #71717a;
  font-size: 0.8rem;
}

.stat-icon {
  font-size: 0.9rem;
}

.project-date {
  font-size: 0.8rem;
  color: #71717a;
  font-weight: 500;
}

/* 技能展示区域 */
.skills-section {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 6rem auto 4rem;
  padding: 4rem 2rem;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
}

.skill-category {
  background: rgba(15, 15, 15, 0.4);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67), transform 0.3s ease, border-color 0.3s ease;
}

.skill-category:hover {
  border-color: rgba(34, 197, 94, 0.2);
  transform: translateY(-2px);
}

.skill-category-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(34, 197, 94, 0.2);
  position: relative;
}

.skill-category-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 30px;
  height: 1px;
  background: #22c55e;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
  transition: transform 0.2s ease;
}

.skill-item:hover {
  transform: translateX(4px);
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-size: 0.9rem;
  color: #e5e5e5;
  font-weight: 500;
}

.skill-percentage {
  font-size: 0.8rem;
  color: #22c55e;
  font-weight: 600;
  font-family: monospace;
}

.skill-progress {
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.skill-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #10b981);
  border-radius: 3px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.skill-progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .developer-header {
    padding: 6rem 1rem 4rem;
  }
  
  .back-button {
    top: 1rem;
    left: 1rem;
  }
  
  .back-link {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
  
  .projects-showcase,
  .skills-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .projects-grid,
  .skills-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-card,
  .skill-category {
    padding: 1.5rem;
  }
  
  .code-block {
    margin: 0 1rem;
  }
  
  .code-content {
    padding: 1rem;
    font-size: 0.8rem;
  }
  
  .floating-dot,
  .floating-square,
  .code-particle {
    display: none;
  }
  
  .grid-pattern {
    background-size: 30px 30px;
  }
  
  .cursor-follower {
    display: none;
  }
  
  .typing-effect {
    font-size: 0.9rem;
    min-width: auto;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .developer-header {
    padding: 5rem 1rem 3rem;
  }
  
  .developer-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
  }
  
  .section-title {
    font-size: clamp(1.5rem, 6vw, 2rem);
  }
  
  .project-card,
  .skill-category {
    padding: 1.25rem;
  }
  
  .project-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>