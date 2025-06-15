<template>
  <section class="stages-section" ref="stagesSectionRef">
    <!-- 添加光效元素 -->
    <div class="light-effect"></div>
    <div class="light-effect light-effect-secondary"></div>
    <div class="starry-background"></div>
    <div class="wave-effect"></div>
    <!-- 标题区域 -->
    <div class="header">
      <h1></h1>
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
    <!-- 移除了stage-subtitle -->
    
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
import { useTimeAllocationData } from '~/composables/useTimeAllocationData';

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

// 使用共享的时间分配数据
const { timeAllocationData: chartData, seriesNames, colors, legendItems } = useTimeAllocationData();

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
  
  // 获取容器宽度，确保在所有设备上都能正确计算
  let containerWidth = chartContainer.value.clientWidth || chartContainer.value.offsetWidth;
  
  // 确保在移动设备上有合理的最小宽度
  containerWidth = Math.max(containerWidth, 280);
  
  // 根据设备类型调整宽高比
  let aspectRatio = 16 / 9; // 默认宽高比
  
  // 在小屏幕设备上使用更紧凑的宽高比
  if (window.innerWidth <= 480) {
    aspectRatio = 4 / 3;
  } else if (window.innerWidth <= 768) {
    aspectRatio = 5 / 3;
  }
  
  const width = containerWidth;
  const height = containerWidth / aspectRatio; // 根据宽度和宽高比计算高度
  
  // 根据屏幕大小调整边距
  const margin = { 
    top: Math.max(10, Math.min(20, width * 0.05)), 
    right: Math.max(15, Math.min(30, width * 0.05)), 
    bottom: Math.max(20, Math.min(40, width * 0.07)), 
    left: Math.max(25, Math.min(50, width * 0.08))
  };
  
  const svg = d3.select(chartContainer.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('display', 'block')
    .style('margin', '0 auto')
    .style('max-width', '100%');
  
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
  
  // 添加坐标轴，根据屏幕大小调整刻度数量
  const ticksCount = window.innerWidth <= 480 ? 4 : (window.innerWidth <= 768 ? 5 : 6);
  
  const xAxis = d3.axisBottom(x)
    .ticks(ticksCount)
    .tickFormat(d => d + (window.innerWidth <= 480 ? 'y' : ' years')); // 在小屏幕上简化标签
  
  const yAxis = d3.axisLeft(y)
    .ticks(window.innerWidth <= 480 ? 4 : 5)
    .tickFormat(d => d + '%');
  
  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis)
    .selectAll('text')
    .style('font-size', window.innerWidth <= 480 ? '8px' : '10px') // 小屏幕上使用更小的字体
    .style('fill', '#fff')
    .attr('dy', '0.7em'); // 调整文本垂直位置
  
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxis)
    .selectAll('text')
    .style('font-size', window.innerWidth <= 480 ? '8px' : '10px')
    .style('fill', '#fff')
    .attr('dx', '-0.5em'); // 调整文本水平位置
  
  // 设置轴线颜色
  g.selectAll('.domain, .tick line')
    .style('stroke', '#fff')
    .style('opacity', 0.6);
  
  // 添加轴标签，根据屏幕大小调整
  // Y轴标签
  if (window.innerWidth > 480) { // 在较大屏幕上显示完整标签
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (innerHeight / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', window.innerWidth <= 768 ? '10px' : '12px')
      .style('fill', '#fff')
      .text('Time Percentage (%)');
  }
  
  // X轴标签
  g.append('text')
    .attr('transform', `translate(${innerWidth / 2}, ${innerHeight + (window.innerWidth <= 480 ? margin.bottom - 2 : margin.bottom - 5)})`)
    .style('text-anchor', 'middle')
    .style('font-size', window.innerWidth <= 480 ? '9px' : (window.innerWidth <= 768 ? '10px' : '12px'))
    .style('fill', '#fff')
    .text(window.innerWidth <= 480 ? 'Age (years)' : 'Age');
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

// 处理设备方向变化或窗口大小变化的函数
const handleOrientationChange = () => {
  // 添加一个小延迟，确保DOM已经更新
  setTimeout(() => {
    if (showTimeChart.value && chartContainer.value) {
      createTimeChart();
    }
  }, 300);
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
            createTimeChart(); // Initial chart creation
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
  window.addEventListener('resize', createTimeChart); // Re-create chart on resize
});

// 添加设备方向变化监听
window.addEventListener('orientationchange', handleOrientationChange);
// 添加更精确的resize事件处理
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (showTimeChart.value && chartContainer.value) {
      createTimeChart();
    }
  }, 250); // 添加防抖，避免频繁重绘
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('resize', createTimeChart); // Remove resize listener
  window.removeEventListener('orientationchange', handleOrientationChange);
  clearTimeout(resizeTimeout);
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
  animation: backgroundAnimation 30s ease-in-out infinite alternate;
}

@keyframes backgroundAnimation {
  0% {
    background-position: center;
    background-color: rgba(0, 0, 0, 0);
  }
  50% {
    background-position: calc(50% - 10px) calc(50% - 10px);
    background-color: rgba(20, 20, 40, 0.2);
  }
  100% {
    background-position: calc(50% + 10px) calc(50% + 10px);
    background-color: rgba(40, 20, 20, 0.2);
  }
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
  animation: gradientPulse 8s ease-in-out infinite;
}

@keyframes gradientPulse {
  0% {
    opacity: 0.9;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  50% {
    opacity: 0.7;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  100% {
    opacity: 0.9;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
}

/* 添加背景粒子效果 */
.stages-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 8%), 
                    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 5%);
  background-size: 180px 180px, 160px 160px;
  background-position: 0 0;
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
  animation: particlesDrift 60s linear infinite;
}

@keyframes particlesDrift {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

/* 这部分已经在上面定义过，这里删除重复定义 */

/* 添加光效元素 */
.light-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
  animation: lightMove 20s ease-in-out infinite alternate;
  mix-blend-mode: screen;
}

.light-effect-secondary {
  top: -30%;
  left: -30%;
  width: 160%;
  height: 160%;
  background: radial-gradient(ellipse at center, rgba(70, 120, 255, 0.02) 0%, transparent 60%);
  animation: lightMoveSecondary 25s ease-in-out infinite alternate;
  opacity: 0.4;
}

@keyframes lightMove {
  0% {
    transform: translate(-5%, -5%) rotate(0deg) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(5%, 5%) rotate(180deg) scale(1.05);
    opacity: 0.6;
  }
  100% {
    transform: translate(-5%, 5%) rotate(360deg) scale(1);
    opacity: 0.5;
  }
}

@keyframes lightMoveSecondary {
  0% {
    transform: translate(5%, 5%) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-5%, -5%) rotate(-180deg) scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: translate(5%, -5%) rotate(-360deg) scale(1);
    opacity: 0.4;
  }
}

/* 添加星光背景效果 */
.starry-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 25% 15%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(1px 1px at 50% 40%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 75% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 20% 60%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 40% 70%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(1px 1px at 60% 85%, rgba(255, 255, 255, 0.4) 0%, transparent 100%),
    radial-gradient(2px 2px at 85% 75%, rgba(255, 255, 255, 0.5) 0%, transparent 100%);
  background-repeat: repeat;
  background-size: 250px 250px;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
  animation: twinkle 8s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% {
    opacity: 0.1;
    background-position: 0px 0px;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.15;
    background-position: 20px 20px;
  }
}

/* 添加波浪效果 */
.wave-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 10, 30, 0.1) 100%);
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.wave-effect::before,
.wave-effect::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.05" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: 1440px 120px;
  background-repeat: repeat-x;
  animation: waveMove 20s linear infinite;
}

.wave-effect::after {
  bottom: -30px;
  height: 90px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.03" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,197.3C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  animation-duration: 30s;
  animation-direction: reverse;
}

@keyframes waveMove {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1440px;
  }
}

.stages-section .header {
  text-align: center;
  position: absolute;
  top: 20%; /* 调整位置更靠近中央 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  width: 100%;
  animation: fadeInHeader 1.5s ease-out forwards; /* 添加淡入动画 */
}

@keyframes fadeInHeader {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.stages-section .header h1 {
  font-family: 'Brush Script MT', 'Lucida Handwriting', 'Dancing Script', 'Pacifico', cursive; /* 艺术字体 */
  font-size: clamp(1.2rem, 3vw, 2rem); /* 增加字体大小 */
  font-style: italic; /* 斜体 */
  text-transform: none; /* 移除大写转换 */
  margin-bottom: 10px;
  color: #ffffff; /* 白色文字 */
  text-shadow: 1px 1px 3px rgba(0,0,0,0.6); /* 添加阴影效果 */
  letter-spacing: 0.5px; /* 字母间距 */
  opacity: 0.9; /* 透明度 */
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  z-index: 5;
  opacity: 0;
  width: 90%;
  max-width: 800px;
  text-align: center;
  box-sizing: border-box;
  margin: 0 auto;
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
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

#stages-chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  
  .chart-wrapper {
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }
  
  #stages-chart-container {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    position: absolute;
  }
  
  .chart-wrapper {
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }
  
  #stages-chart-container {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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

/* iOS Safari 特定修复 */
@supports (-webkit-touch-callout: none) {
  .time-chart-container {
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    top: 50%;
    left: 50%;
  }
  
  #stages-chart-container {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    margin: 0 auto;
  }
}

/* Android Chrome 特定修复 */
@supports (-webkit-appearance:none) and (not (-webkit-touch-callout:none)) {
  .time-chart-container {
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  
  #stages-chart-container {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
}

/* Windows Edge/Chrome 特定修复 */
@supports (-ms-ime-align:auto) {
  .time-chart-container {
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  
  #stages-chart-container {
    transform: translateZ(0);
    -ms-transform: translateZ(0);
  }
}
</style>