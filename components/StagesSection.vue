<template>
  <section class="stages-section" ref="stagesSectionRef">
    <!-- 标题区域 -->
    <div class="header">
      <h1>STAGES</h1>
    </div>
    
    <!-- 进度指示器 -->
    <div class="progress-indicator">
      <div 
        v-for="(stage, index) in stages" 
        :key="stage.id"
        class="progress-dot"
        :class="{ active: currentStageIndex === index }"
      ></div>
    </div>
    
    <!-- 滚动提示 -->
    <div class="scroll-hint" v-show="showScrollHint">
      <div class="scroll-arrow"></div>
      <span>滚动探索</span>
    </div>
    
    <h3 v-for="(stage, index) in stages"
        :key="stage.id"
        :ref="el => { if (el) stageTitleRefs[index] = el }"
        class="stage-title"
        @click="onStageClick(stage)">
      {{ stage.title }}
    </h3>
    <p class="stage-subtitle">Hi, I'm Da Huang</p>
    
    <!-- 时间分配图表区域 -->
    <div class="time-chart-container" ref="timeChartRef" v-show="showTimeChart">
      <div class="chart-header">
        <h2>Time</h2>
        <p>This is how I spend my time. My biggest hobby is learning, as I am curious about almost everything.</p>
      </div>
      <div class="chart-wrapper">
        <div id="stages-chart-container" ref="chartContainer"></div>
        <div class="chart-legend">
          <div v-for="(item, index) in legendItems" :key="item.name" class="legend-item">
            <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 点击提示 -->
    <div class="click-hint">
      <span>点击标题 查看仔细内容</span>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router'; // Or Nuxt 3 might auto-import this
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as d3 from 'd3';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

// 引用整个阶段部分的DOM元素
const stagesSectionRef = ref(null);
// 引用每个阶段标题的DOM元素数组
const stageTitleRefs = ref([]);
// 引用时间图表容器
const timeChartRef = ref(null);
const chartContainer = ref(null);
// 当前激活的阶段索引
const currentStageIndex = ref(0);
// 是否显示滚动提示
const showScrollHint = ref(true);
// 是否显示时间分配图表
const showTimeChart = ref(false);
const lastChartCreateTime = ref(0);
const CHART_COOLDOWN = 5000; // 5秒冷却时间

// 时间分配图表数据
const chartData = [
  { age: 0, study: 60, game: 0, social: 40, coding: 0, music: 0 },
  { age: 2, study: 65, game: 5, social: 30, coding: 0, music: 0 },
  { age: 4, study: 70, game: 10, social: 20, coding: 0, music: 0 },
  { age: 6, study: 75, game: 15, social: 10, coding: 0, music: 0 },
  { age: 8, study: 70, game: 20, social: 10, coding: 0, music: 0 },
  { age: 10, study: 60, game: 30, social: 10, coding: 0, music: 0 },
  { age: 12, study: 55, game: 25, social: 15, coding: 5, music: 0 },
  { age: 14, study: 50, game: 20, social: 20, coding: 10, music: 0 },
  { age: 16, study: 45, game: 15, social: 25, coding: 15, music: 0 },
  { age: 18, study: 40, game: 10, social: 30, coding: 20, music: 0 },
  { age: 20, study: 35, game: 8, social: 32, coding: 25, music: 0 },
  { age: 22, study: 30, game: 5, social: 35, coding: 28, music: 2 },
  { age: 24, study: 25, game: 5, social: 38, coding: 30, music: 2 },
  { age: 25, study: 20, game: 5, social: 40, coding: 30, music: 5 }
];

const seriesNames = ['social', 'coding', 'game', 'study', 'music'];
const colors = ['#a7f3d0', '#10b981', '#60a5fa', '#6366f1', '#f472b6'];
const legendItems = [
  { name: 'Study', color: '#6366f1' },
  { name: 'Game', color: '#60a5fa' },
  { name: 'Social or Family', color: '#a7f3d0' },
  { name: 'Coding', color: '#10b981' },
  { name: 'Music', color: '#f472b6' }
];

// 定义阶段数据
const stages = reactive([
  { id: 0, title: '一个见习画手', route: '/artist', content: '一切的一切都源自于对美的追求。', marqueeImages: [
      ['https://via.placeholder.com/150/FF0000/FFFFFF?Text=Img1', 'https://via.placeholder.com/150/00FF00/FFFFFF?Text=Img2', 'https://via.placeholder.com/150/0000FF/FFFFFF?Text=Img3'],
      ['https://via.placeholder.com/150/FFFF00/000000?Text=Img4', 'https://via.placeholder.com/150/FF00FF/FFFFFF?Text=Img5', 'https://via.placeholder.com/150/00FFFF/000000?Text=Img6'],
      ['https://via.placeholder.com/150/FFA500/FFFFFF?Text=Img7', 'https://via.placeholder.com/150/800080/FFFFFF?Text=Img8', 'https://via.placeholder.com/150/A52A2A/FFFFFF?Text=Img9']
    ] },
  { id: 1, title: '一个不怎么样的音乐家', route: '/musician', content: '用旋律记录点滴，用节奏表达情绪。虽然不怎么样，但热爱依旧。', marqueeImages: [
      ['https://via.placeholder.com/150/CCCCCC/000000?Text=Music1', 'https://via.placeholder.com/150/999999/FFFFFF?Text=Music2'],
      ['https://via.placeholder.com/150/666666/FFFFFF?Text=Music3', 'https://via.placeholder.com/150/333333/FFFFFF?Text=Music4']
    ]
  },
  { id: 2, title: '一个正在努力的开发者', route: '/developer', content: '代码是新的画笔和乐器，用逻辑构建世界，用创新解决问题。', marqueeImages: [
      ['https://via.placeholder.com/150/007BFF/FFFFFF?Text=Code1', 'https://via.placeholder.com/150/28A745/FFFFFF?Text=Code2'],
      ['https://via.placeholder.com/150/FFC107/000000?Text=Code3', 'https://via.placeholder.com/150/DC3545/FFFFFF?Text=Code4']
    ]
  },
  { id: 3, title: '一位"生活家"', route: '/lifestyle', content: '在平凡的日子里发现不平凡的美好，用心感受生活的每一个细节。', marqueeImages: [
      ['https://via.placeholder.com/150/FF6B6B/FFFFFF?Text=Life1', 'https://via.placeholder.com/150/4ECDC4/FFFFFF?Text=Life2', 'https://via.placeholder.com/150/45B7D1/FFFFFF?Text=Life3'],
      ['https://via.placeholder.com/150/96CEB4/FFFFFF?Text=Life4', 'https://via.placeholder.com/150/FFEAA7/000000?Text=Life5', 'https://via.placeholder.com/150/DDA0DD/000000?Text=Life6']
    ]
  },
]);

// 阶段标题点击事件处理函数
const onStageClick = (stage) => {
  if (stage.route) {
    router.push(stage.route);
  } else {
    console.warn(`No route defined for stage: ${stage.title}`);
  }
};

// 获取粒子效果的样式
const getParticleStyle = (index) => {
  return {
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 6 + 's',
    animationDuration: (4 + Math.random() * 4) + 's'
  };
};

// 创建时间分配图表
const createTimeChart = () => {
  if (!chartContainer.value) return;
  
  // 检查冷却时间
  const now = Date.now();
  if (now - lastChartCreateTime.value < CHART_COOLDOWN) {
    console.log('图表创建请求被忽略，仍在冷却期内');
    return;
  }
  
  lastChartCreateTime.value = now;
  
  // 清除之前的图表
  d3.select(chartContainer.value).selectAll('*').remove();
  
  const width = 600;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  
  const svg = d3.select(chartContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // 创建比例尺
  const x = d3.scaleLinear()
    .domain(d3.extent(chartData, d => d.age))
    .range([0, innerWidth]);
  
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0]);
  
  // 创建颜色比例尺
  const color = d3.scaleOrdinal()
    .domain(seriesNames)
    .range(colors);
  
  // 创建堆叠数据
  const stack = d3.stack()
    .keys(seriesNames)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);
  
  const series = stack(chartData);
  
  // 创建区域生成器
  const area = d3.area()
    .x(d => x(d.data.age))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]))
    .curve(d3.curveMonotoneX);
  
  // 绘制路径并添加动画
  g.selectAll('.area')
    .data(series)
    .enter().append('path')
    .attr('class', 'area')
    .attr('d', area)
    .attr('fill', 'none')
    .attr('stroke', (d, i) => colors[i])
    .attr('stroke-width', 2)
    .each(function(d, i) {
      const path = d3.select(this);
      const totalLength = path.node().getTotalLength();
      
      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2000)
        .delay(i * 300)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('end', function() {
          d3.select(this)
            .transition()
            .duration(800)
            .attr('fill', color(d.key))
            .attr('fill-opacity', 0.7)
            .attr('stroke', 'none');
        });
    });
  
  // 添加坐标轴
  const xAxis = d3.axisBottom(x)
    .ticks(6)
    .tickFormat(d => d + ' years');
  
  const yAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d => d + '%');
  
  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis)
    .selectAll('text')
    .style('font-size', '10px')
    .style('fill', '#fff');
  
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxis)
    .selectAll('text')
    .style('font-size', '10px')
    .style('fill', '#fff');
  
  // 设置轴线颜色
  g.selectAll('.domain, .tick line')
    .style('stroke', '#fff')
    .style('opacity', 0.6);
  
  // 添加轴标签
  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (innerHeight / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .style('font-size', '12px')
    .style('fill', '#fff')
    .text('Time Percentage (%)');
  
  g.append('text')
    .attr('transform', `translate(${innerWidth / 2}, ${innerHeight + margin.bottom - 5})`)
    .style('text-anchor', 'middle')
    .style('font-size', '12px')
    .style('fill', '#fff')
    .text('Age');
};

// 滚动到指定阶段
const scrollToStage = (index) => {
  // 这里可以添加滚动到特定阶段的逻辑
  currentStageIndex.value = index;
};

// 处理键盘事件
const handleKeydown = (e) => {
  if (e.key === 'ArrowDown' && currentStageIndex.value < stages.length - 1) {
    currentStageIndex.value++;
    scrollToStage(currentStageIndex.value);
  } else if (e.key === 'ArrowUp' && currentStageIndex.value > 0) {
    currentStageIndex.value--;
    scrollToStage(currentStageIndex.value);
  }
};

// 组件挂载时初始化动画和事件监听
onMounted(async () => {
  await nextTick(); 

  // 为header元素添加渐入动画
  const headerH1 = stagesSectionRef.value?.querySelector('.header h1');
  // const headerP = stagesSectionRef.value?.querySelector('.header p'); // headerP is display:none
  
  if (headerH1) { // Check only for headerH1
    // 初始状态：透明且向上偏移
    gsap.set(headerH1, { autoAlpha: 0, y: -30 }); // Animate only headerH1
    
    // 渐入动画
    gsap.to(headerH1, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.3
    });
    // No animation for headerP as it's hidden
  }

  const validTitleEls = stageTitleRefs.value.filter(el => el);

  if (!stagesSectionRef.value || validTitleEls.length === 0) {
    console.warn("GSAP ScrollTrigger: Missing refs for StagesSection animation or no titles rendered.");
    return;
  }
  
  if (validTitleEls.length !== stages.length) {
    console.warn(`GSAP ScrollTrigger: Mismatch between stages data (${stages.length}) and rendered title refs (${validTitleEls.length}). Animating available refs.`);
  }

  gsap.set(validTitleEls, { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 50 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stagesSectionRef.value,
      pin: true, 
      scrub: 1.2, 
      start: "top top",
      end: () => `+=${validTitleEls.length * 50}%`, // Adjusted for slower transition between titles
      // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging, ensure process.env is available or use true
      onUpdate: (self) => {
        const progress = self.progress;
        const direction = self.direction;
        
        // 计算当前应该显示的阶段
        const totalStages = validTitleEls.length;
        const stageProgress = progress * totalStages;
        const currentStage = Math.floor(stageProgress);
        const stageLocalProgress = stageProgress - currentStage;
        
        // 处理图表的显示逻辑（向上滚动时隐藏图表）
        if (direction === -1 && showTimeChart.value && progress < 0.9) {
          // 当从图表区域向上滚动时，淡出图表
          if (timeChartRef.value) {
            gsap.to(timeChartRef.value, {
              autoAlpha: 0,
              y: 50,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                showTimeChart.value = false;
              }
            });
          }
        }
      }
    }
  });

  const animationDuration = 0.8;
  const holdDuration = 1.6;

  validTitleEls.forEach((titleEl, index) => {
    const startTime = index * (animationDuration + holdDuration);

    tl.to(titleEl, {
      autoAlpha: 1,
      y: 0, // Animates from y:50 to y:0 (relative to its yPercent:-50 position)
      duration: animationDuration,
      ease: "power2.out"
    }, startTime)
    .call(() => {
      currentStageIndex.value = index;
      if (index === 0) showScrollHint.value = false;
    }, null, startTime);

    // 如果不是最后一个阶段，添加淡出动画
    if (index < validTitleEls.length - 1) {
      tl.to(titleEl, {
        autoAlpha: 0,
        y: -50, // Animates from y:0 to y:-50
        duration: animationDuration,
        ease: "power2.in"
      }, startTime + holdDuration);
    } else {
      // 最后一个阶段（"一位生活家"）也添加淡出动画，和前三个标签保持一致
      tl.to(titleEl, {
        autoAlpha: 0,
        y: -50,
        duration: animationDuration,
        ease: "power2.in"
      }, startTime + holdDuration)
      .call(() => {
        // 生活家标签淡出后显示图表
        showTimeChart.value = true;
        nextTick(() => {
          if (timeChartRef.value) {
            gsap.set(timeChartRef.value, { autoAlpha: 0, y: 50 });
            createTimeChart();
            gsap.to(timeChartRef.value, {
              autoAlpha: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
              delay: 0.3
            });
          }
        });
      }, null, startTime + holdDuration + animationDuration);
    }
  });
  
  // 移除这部分代码，因为图表动画已经在上面的逻辑中处理了
  
  // 添加键盘事件监听
  window.addEventListener('keydown', handleKeydown);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
@font-face {
  font-family: '王强手写体';
  src: url('/assets/fonts/王强手写体.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.stages-section {
  height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; 
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/img/图像2025-6-15_07.16.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.stages-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.8) 0%, 
    rgba(0, 0, 0, 0.6) 30%, 
    rgba(0, 0, 0, 0.4) 60%, 
    rgba(0, 0, 0, 0.2) 80%, 
    transparent 100%);
  z-index: 1;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  pointer-events: none;
}

/* Removing ::after and ::before for now to simplify, can re-add if needed for top gradient */
/* .stages-section::after { ... } */
/* .stages-section::before { ... } */

.stages-section .header {
  text-align: center;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  width: 100%;
}

.stages-section .header h1 {
  font-family: 'Lora', serif; /* Changed to Lora for a softer look, or keep sans-serif if preferred */
  font-size: clamp(0.9rem, 2vw, 1.1rem); /* Smaller like 'MARCH 2002' */
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #c0c0c0; /* Light grey */
  /* removed background-clip and text-shadow for cleaner look */
  letter-spacing: 1px;
}

.stages-section .header p {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: #aaa;
  max-width: 600px;
  margin: 0 auto;
  display: none; /* Hide paragraph under header for now */
}

/* Particles removed for minimalist style */

.progress-indicator {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10;
  display: none !important; /* Hide progress indicator */
}

.progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.progress-dot.active {
  background: #ffffff; /* White active dot */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.5); /* More subtle color */
  font-size: 0.8rem; /* Smaller */
  animation: bounce 2s infinite;
  z-index: 10;
  opacity: 0.7; /* Make it less prominent */
  display: none !important; /* Hide scroll hint */
}

.scroll-arrow {
  width: 16px; /* Smaller arrow */
  height: 16px;
  border-right: 2px solid rgba(255, 255, 255, 0.5); /* More subtle color */
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  transform: rotate(45deg);
  margin-bottom: 6px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.stage-title {
  font-family: '王强手写体', 'Times New Roman', 'Georgia', serif; /* 王强手写体 */
  font-size: clamp(4rem, 10vw, 8rem); /* 增加字体大小 */
  color: #ffffff; /* White text */
  font-weight: bold; /* 增加字体粗度 */
  font-style: normal; /* 正常样式 */
  text-transform: none; /* 移除大写转换 */
  cursor: pointer;
  padding: 10px 20px;
  text-align: center;
  position: absolute; 
  top: 40%; /* 减少与顶部的距离 */
  left: 50%;
  width: 60vw; /* 适中的宽度允许两行显示 */
  max-width: 800px; /* 减少最大宽度 */
  white-space: normal; /* 允许文本换行 */
  line-height: 1.4; /* 提高标签高度 */
  text-shadow: none; /* 移除阴影 */
  transition: all 0.3s ease;
  z-index: 10;
  will-change: transform, opacity;
  letter-spacing: 1px; /* 适当的字母间距 */
  /* GSAP sets initial transform: translate(-50%, -50%) translateY(50px) via xPercent, yPercent, y */
  /* And opacity: 0 via autoAlpha */
}

.stage-title:hover {
  /* transform: scale(1.05); // Optional: keep or remove hover effect */
  text-shadow: 1px 1px 5px rgba(0,0,0,0.7);
}

.stage-subtitle {
  font-family: 'Brush Script MT', 'Lucida Handwriting', 'Dancing Script', 'Pacifico', cursive; /* 艺术字体 */
  font-size: clamp(0.8rem, 2vw, 1.2rem); /* 缩小字体大小 */
  font-style: italic; /* 斜体 */
  color: #e0e0e0; /* Light grey */
  text-align: center;
  position: absolute;
  top: 80%; /* Position below main title, moved down */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  opacity: 0; /* Will be animated in by GSAP if desired, or set to 1 */
  animation: fadeInSubtitle 1s 1s ease-out forwards; /* Simple fade in for now */
  text-shadow: 1px 1px 3px rgba(0,0,0,0.6); /* 添加阴影效果 */
  letter-spacing: 0.5px; /* 增加字母间距 */
}

@keyframes fadeInSubtitle {
  to {
    opacity: 0.9;
  }
}

@media (max-width: 768px) {
  .stage-title {
    font-size: clamp(2.5rem, 10vw, 4rem);
    top: 40%;
    width: 90vw; /* 移动端增加宽度 */
    max-width: 600px; /* 移动端最大宽度 */
  }
  
  .stages-section {
    padding: 0 20px;
    background-attachment: scroll; /* 移动端使用scroll避免性能问题 */
  }
  
  .progress-indicator {
    right: 15px;
  }
  
  .scroll-hint {
    bottom: 20px;
  }
}

.click-hint {
  position: absolute;
  bottom: 40px; /* Positioned lower */
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  opacity: 0.7;
}

.click-hint span {
  font-family: 'Lora', serif;
  font-size: clamp(0.6rem, 1.5vw, 0.75rem); /* Very small font */
  color: rgba(255, 255, 255, 0.4); /* More subtle color */
  background: rgba(0, 0, 0, 0.15);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  display: inline-block;
  letter-spacing: 0.5px;
}

.click-hint:hover span {
  color: rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.25);
}

@media (max-width: 768px) {
  /* .stage-title, .stages-section, .progress-indicator, .scroll-hint adjustments are above */
  .click-hint {
    bottom: 30px; /* Adjust for smaller screens */
  }
  .click-hint span {
    font-size: clamp(0.55rem, 1.3vw, 0.7rem);
    padding: 3px 7px;
  }
}

/* 时间分配图表样式 */
.time-chart-container {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  opacity: 0;
  width: 90%;
  max-width: 800px;
  text-align: center;
}

.chart-header {
  margin-bottom: 30px;
}

.chart-header h2 {
  font-family: 'Lora', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #ffffff;
  margin-bottom: 12px;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
}

.chart-header p {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: #e0e0e0;
  margin: 0;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.chart-wrapper {
  padding: 20px;
}

#stages-chart-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .time-chart-container {
    width: 95%;
    padding: 0 10px;
  }
  
  .chart-wrapper {
    padding: 15px;
  }
  
  .chart-header h2 {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }
  
  .chart-header p {
    font-size: clamp(0.8rem, 3vw, 1rem);
  }
  
  .chart-legend {
    gap: 15px;
  }
  
  .legend-item {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  /* .stage-title, .progress-dot adjustments are above */
  .click-hint {
    bottom: 20px; /* Further adjust for very small screens */
  }
  
  .click-hint span {
    font-size: clamp(0.5rem, 1.2vw, 0.65rem);
    padding: 3px 6px;
  }
  
  .time-chart-container {
    width: 98%;
  }
  
  .chart-wrapper {
    padding: 12px;
  }
  
  .chart-legend {
    gap: 10px;
  }
  
  .legend-item {
    font-size: 11px;
  }
  
  .legend-color {
    width: 14px;
    height: 14px;
  }
}
</style>