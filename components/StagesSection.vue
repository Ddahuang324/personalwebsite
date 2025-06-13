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

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

// 引用整个阶段部分的DOM元素
const stagesSectionRef = ref(null);
// 引用每个阶段标题的DOM元素数组
const stageTitleRefs = ref([]);
// 当前激活的阶段索引
const currentStageIndex = ref(0);
// 是否显示滚动提示
const showScrollHint = ref(true);

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
  { id: 3, title: '一位生活家', route: '/lifestyle', content: '在平凡的日子里发现不平凡的美好，用心感受生活的每一个细节。', marqueeImages: [
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

    tl.to(titleEl, {
      autoAlpha: 0,
      y: -50, // Animates from y:0 to y:-50
      duration: animationDuration,
      ease: "power2.in"
    }, startTime + holdDuration);
  });
  
  // 添加键盘事件监听
  window.addEventListener('keydown', handleKeydown);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.stages-section {
  height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; 
  overflow: hidden;
  background: #0a0a0a; /* Dark background like the image */
  /* Consider adding a subtle gradient or a very dark, blurred background image later */
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
  z-index: 10;
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
  font-family: 'Anton', sans-serif; /* Kept Anton as it matches bold sans-serif */
  font-size: clamp(3rem, 8vw, 6rem); /* Larger, bolder */
  color: #ffffff; /* White text */
  font-weight: bold; 
  text-transform: uppercase;
  cursor: pointer;
  padding: 10px 20px;
  text-align: center;
  position: absolute; 
  top: 45%; /* Adjusted for better centering with subtitle */
  left: 50%;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5); /* Subtle shadow for depth */
  transition: all 0.3s ease;
  z-index: 5;
  will-change: transform, opacity;
  /* GSAP sets initial transform: translate(-50%, -50%) translateY(50px) via xPercent, yPercent, y */
  /* And opacity: 0 via autoAlpha */
}

.stage-title:hover {
  /* transform: scale(1.05); // Optional: keep or remove hover effect */
  text-shadow: 1px 1px 5px rgba(0,0,0,0.7);
}

.stage-subtitle {
  font-family: 'Lora', serif;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #e0e0e0; /* Light grey */
  text-align: center;
  position: absolute;
  top: 80%; /* Position below main title, moved down */
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  opacity: 0; /* Will be animated in by GSAP if desired, or set to 1 */
  animation: fadeInSubtitle 1s 1s ease-out forwards; /* Simple fade in for now */
}

@keyframes fadeInSubtitle {
  to {
    opacity: 0.9;
  }
}

@media (max-width: 768px) {
  .stage-title {
    font-size: clamp(1.8rem, 8vw, 3rem);
    top: 40%;
  }
  
  .stages-section {
    padding: 0 20px;
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
  z-index: 10;
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

@media (max-width: 480px) {
  /* .stage-title, .progress-dot adjustments are above */
  .click-hint {
    bottom: 20px; /* Further adjust for very small screens */
  }
  
  .click-hint span {
    font-size: clamp(0.5rem, 1.2vw, 0.65rem);
    padding: 3px 6px;
  }
}
</style>