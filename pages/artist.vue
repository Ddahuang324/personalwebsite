<template>
  <div class="artist-page">
    <!-- 返回按钮 -->
    <div class="back-button">
      <NuxtLink to="/" class="back-link">
        ←
      </NuxtLink>
    </div>
    
    <!-- 3D圆形轮播 -->
    <div 
      class="carousel-container"
      @mouseenter="handleCarouselMouseEnter"
      @mouseleave="handleCarouselMouseLeave"
    >
      <div 
        class="carousel-3d" 
        ref="carousel3d"
        @mouseenter="pauseAnimation"
        @mouseleave="resumeAnimation"
      >
        <div 
          v-for="(artwork, index) in artworks" 
          :key="index"
          class="carousel-item"
          :style="getItemStyle(index)"
          @click="selectArtwork(artwork)"
        >
          <div class="artwork-image">
            <img :src="artwork.image" :alt="artwork.title" />
          </div>
        </div>
      </div>
    </div>

    <!-- 优雅的作品展示弹窗 -->
    <Transition name="modal" appear>
      <div 
        v-if="isModalOpen" 
        class="modal-overlay"
        @click="closeModal"
      >
        <div 
          class="modal-container"
          :class="`modal-${modalAnimation}`"
          @click.stop
        >
          <!-- 关闭按钮 -->
          <button 
            class="modal-close"
            @click="closeModal"
            aria-label="关闭"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          
          <!-- 作品展示区域 -->
          <div class="modal-content">
            <div class="artwork-display">
              <img 
                :src="selectedArtwork?.image" 
                :alt="selectedArtwork?.title"
                class="artwork-image"
              />
              <div class="artwork-glow"></div>
            </div>
            
            <!-- 作品信息 -->
            <div class="artwork-info">
              <h2 class="artwork-title">{{ selectedArtwork?.title }}</h2>
              <p class="artwork-description">{{ selectedArtwork?.description }}</p>
              <div class="artwork-meta">
                <span class="artwork-medium">{{ selectedArtwork?.medium }}</span>
                <span class="artwork-year">{{ selectedArtwork?.year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 底部艺术文字 -->
    <div class="bottom-text-section">
      <div 
        class="artistic-quote"
        :style="{
          transform: `translate(${textOffset.x}px, ${textOffset.y}px)`,
          transition: 'transform 0.3s ease-out'
        }"
      >
        <p class="main-quote">"Art is the lie that enables us to realize the truth"</p>
        <p class="sub-quote">Where colors dance and dreams take form</p>
        <div class="signature">
          <span class="signature-line"></span>
          <span class="signature-text">— DaHuang</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

// 作品数据
const artworks = reactive([
  { 
    id: 1, 
    title: '抽象之美', 
    image: '/paintings/未命名作品.jpg',
    description: '这幅作品探索了色彩与形式的纯粹关系，通过抽象的表现手法展现内心世界的复杂情感。每一笔都承载着艺术家对美的独特理解。',
    medium: '布面油画',
    year: '2023'
  },
  { 
    id: 2, 
    title: '色彩交响', 
    image: '/paintings/未命名作品 1.jpg',
    description: '如同音乐中的和谐旋律，这幅画用色彩编织出一首视觉交响曲。暖色与冷色的对比创造出动人的节奏感。',
    medium: '丙烯画',
    year: '2023'
  },
  { 
    id: 3, 
    title: '光影诗篇', 
    image: '/paintings/未命名作品 2.jpg',
    description: '光与影的舞蹈在画布上展开，捕捉瞬间的美好。这是对时间流逝的诗意表达，每一道光线都诉说着不同的故事。',
    medium: '水彩画',
    year: '2022'
  },
  { 
    id: 4, 
    title: '梦境漫游', 
    image: '/paintings/未命名作品 3.jpg',
    description: '在梦与现实的边界游走，这幅作品邀请观者进入一个超现实的世界。模糊的边界让想象力自由飞翔。',
    medium: '混合媒介',
    year: '2023'
  },
  { 
    id: 5, 
    title: '时间碎片', 
    image: '/paintings/未命名作品 4.jpg',
    description: '时间如碎片般散落，每一片都承载着记忆的重量。这幅作品试图重新组合这些片段，寻找失落的完整。',
    medium: '拼贴画',
    year: '2022'
  },
  { 
    id: 6, 
    title: '情感流淌', 
    image: '/paintings/未命名作品 5.jpg',
    description: '情感如河流般在画布上流淌，没有固定的形状，却有着强烈的生命力。这是对人类情感复杂性的深度探索。',
    medium: '布面油画',
    year: '2023'
  },
  { 
    id: 7, 
    title: '自然律动', 
    image: '/paintings/未命名作品 6.jpg',
    description: '大自然的韵律在这里得到完美体现，从微观到宏观，从静止到运动，展现了生命的无穷活力。',
    medium: '版画',
    year: '2022'
  },
  { 
    id: 8, 
    title: '心灵对话', 
    image: '/paintings/未命名作品 7.jpg',
    description: '这是一场与内心的深度对话，通过艺术的语言表达最真实的自我。每一个细节都是心灵深处的回响。',
    medium: '素描',
    year: '2023'
  }
]);

// 3D轮播相关变量
const carousel3d = ref(null);
const rotationAngle = ref(0);
const isAnimating = ref(true);
const animationId = ref(null);
const radius = ref(300); // 轮播半径
const itemAngle = ref(0); // 每个项目之间的角度

// 计算每个项目的样式
const getItemStyle = (index) => {
  const angle = (index * itemAngle.value) + rotationAngle.value;
  const x = Math.cos(angle * Math.PI / 180) * radius.value;
  const z = Math.sin(angle * Math.PI / 180) * radius.value;
  
  // 改进的缩放和透明度计算，创造更平滑的过渡
  const normalizedZ = (z + radius.value) / (radius.value * 2); // 0到1之间的值
  const scale = 0.6 + normalizedZ * 0.7; // 0.6到1.3的缩放范围
  const opacity = Math.max(0.2, 0.3 + normalizedZ * 0.7); // 0.2到1的透明度范围
  
  // 添加模糊效果创造景深
  const blur = Math.max(0, (1 - normalizedZ) * 3); // 远处的卡片更模糊
  
  // 使用更平滑的zIndex计算
  const zIndex = Math.round(z + radius.value + normalizedZ * 10);
  
  return {
    transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
    opacity: opacity,
    zIndex: zIndex,
    filter: `blur(${blur}px)`,
    transition: 'filter 0.3s ease, opacity 0.3s ease' // 添加平滑过渡
  };
};

// 动画相关变量
const animationSpeed = ref(0.03); // 基础动画速度
const targetSpeed = ref(0.03);
const lastTime = ref(0);
const deltaTime = ref(0);

// 优化的动画循环函数
const animate = (currentTime = 0) => {
  // 计算时间差，确保动画帧率独立
  deltaTime.value = currentTime - lastTime.value;
  lastTime.value = currentTime;
  
  if (isAnimating.value) {
    // 平滑的速度过渡
    animationSpeed.value += (targetSpeed.value - animationSpeed.value) * 0.1;
    
    // 使用时间差来确保一致的动画速度
    const speedMultiplier = deltaTime.value / 16.67; // 基于60fps标准化
    rotationAngle.value += animationSpeed.value * speedMultiplier;
    
    if (rotationAngle.value >= 360) {
      rotationAngle.value = 0;
    }
  }
  animationId.value = requestAnimationFrame(animate);
};

// 暂停/恢复动画
const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value;
};

// 优化的鼠标悬停效果 - 减速而不是完全停止
const pauseAnimation = () => {
  targetSpeed.value = 0.008; // 减速到很慢，而不是完全停止
};

const resumeAnimation = () => {
  targetSpeed.value = 0.03; // 恢复正常速度
};

// 添加鼠标进入轮播区域的交互效果
const handleCarouselMouseEnter = () => {
  targetSpeed.value = 0.015; // 轻微减速
};

const handleCarouselMouseLeave = () => {
  targetSpeed.value = 0.03; // 恢复正常速度
};

// 弹窗相关状态
const isModalOpen = ref(false);
const selectedArtwork = ref(null);
const modalAnimation = ref('enter');

// 选择作品并打开弹窗
const selectArtwork = (artwork) => {
  selectedArtwork.value = artwork;
  modalAnimation.value = 'enter';
  isModalOpen.value = true;
  
  // 暂停轮播动画以聚焦于选中的作品
  targetSpeed.value = 0.005;
};

// 关闭弹窗
const closeModal = () => {
  modalAnimation.value = 'exit';
  
  // 延迟关闭以完成退出动画
  setTimeout(() => {
    isModalOpen.value = false;
    selectedArtwork.value = null;
    // 恢复轮播动画
    targetSpeed.value = 0.03;
  }, 400);
};

// 键盘事件处理
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};

// 鼠标跟随动画相关变量
const mouseX = ref(0);
const mouseY = ref(0);
const textOffset = ref({ x: 0, y: 0 });
const targetOffset = ref({ x: 0, y: 0 });
const mouseMoveThrottle = ref(null);

// 平滑的文字跟随动画
const updateTextOffset = () => {
  // 使用缓动函数实现平滑过渡
  const easing = 0.08;
  textOffset.value.x += (targetOffset.value.x - textOffset.value.x) * easing;
  textOffset.value.y += (targetOffset.value.y - textOffset.value.y) * easing;
  
  // 如果还在移动，继续更新
  if (Math.abs(targetOffset.value.x - textOffset.value.x) > 0.1 || 
      Math.abs(targetOffset.value.y - textOffset.value.y) > 0.1) {
    requestAnimationFrame(updateTextOffset);
  }
};

// 优化的鼠标移动处理函数
const handleMouseMove = (event) => {
  if (process.client) {
    // 防抖处理，减少计算频率
    if (mouseMoveThrottle.value) {
      clearTimeout(mouseMoveThrottle.value);
    }
    
    mouseMoveThrottle.value = setTimeout(() => {
      mouseX.value = event.clientX;
      mouseY.value = event.clientY;
      
      // 计算反向移动偏移量
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // 增加移动范围和响应性
      const maxOffset = 30; // 最大偏移量
      const sensitivity = 0.05; // 敏感度
      
      const rawOffsetX = -(mouseX.value - centerX) * sensitivity;
      const rawOffsetY = -(mouseY.value - centerY) * sensitivity;
      
      // 限制最大偏移量
      targetOffset.value = {
        x: Math.max(-maxOffset, Math.min(maxOffset, rawOffsetX)),
        y: Math.max(-maxOffset, Math.min(maxOffset, rawOffsetY))
      };
      
      // 启动平滑动画
      updateTextOffset();
    }, 16); // 约60fps的更新频率
  }
};

// 响应式调整半径
const updateRadius = () => {
  if (process.client) {
    const width = window.innerWidth;
    if (width <= 480) {
      radius.value = 250;
    } else if (width <= 768) {
      radius.value = 350;
    } else {
      radius.value = 500; // 增大半径，让轮播扩展到屏幕宽度之外
    }
  }
};

onMounted(() => {
  // 计算每个项目之间的角度
  itemAngle.value = 360 / artworks.length;
  
  // 开始动画
  animate();
  
  // 响应式调整
  updateRadius();
  if (process.client) {
    window.addEventListener('resize', updateRadius);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  // 清理动画
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
  
  // 清理防抖定时器
  if (mouseMoveThrottle.value) {
    clearTimeout(mouseMoveThrottle.value);
  }
  
  // 清理事件监听
  if (process.client) {
    window.removeEventListener('resize', updateRadius);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('keydown', handleKeydown);
  }
});
</script>

<style scoped>
.artist-page {
  min-height: 100vh;
  background: #1a1a1a;
  color: #f0f0f0;
  font-family: 'Lora', serif;
  position: relative;
  overflow-x: hidden;
}

/* 背景图片效果 */
.artist-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/img/clark-van-der-beken-qtPL8ERHOEA-unsplash.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
}

/* 添加轻微遮罩层以保持文字可读性 */
.artist-page::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.3), rgba(0, 0, 0, 0.2));
  pointer-events: none;
  z-index: 1;
}

/* 返回按钮 */
.back-button {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100;
}

.back-link {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  color: #f0f0f0;
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* 3D圆形轮播 */
.carousel-container {
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  perspective: 1200px;
  perspective-origin: center center;
  overflow: visible;
  margin-bottom: 120px;
  /* 添加容器级别的过渡效果 */
  transition: perspective 0.5s ease;
}

.carousel-container:hover {
  perspective: 1500px; /* 鼠标悬停时增加透视深度 */
}

.carousel-3d {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 优化3D渲染性能 */
  will-change: transform;
  backface-visibility: hidden;
}

.carousel-item {
  position: absolute;
  width: 280px;
  height: 300px;
  cursor: pointer;
  transform-origin: center;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  will-change: transform, opacity, filter;
  backface-visibility: hidden;
  /* 添加平滑的过渡效果 */
  transition: box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              filter 0.3s ease;
  /* 优化渲染性能 */
  transform-style: preserve-3d;
  contain: layout style paint;
}

.carousel-item:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 40px rgba(255, 255, 255, 0.1);
  transform: scale(1.02) translateZ(20px);
  filter: brightness(1.1) contrast(1.05);
}



.artwork-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

.artwork-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(80%);
  transition: filter 0.5s ease, transform 0.5s ease; /* 延长过渡时间创造更平滑效果 */
  will-change: transform, filter;
  backface-visibility: hidden;
}

.carousel-item:hover .artwork-image img {
  filter: grayscale(0%) brightness(1.1); /* 添加亮度提升 */
  transform: scale3d(1.08, 1.08, 1); /* 稍微增大缩放效果 */
}



/* 底部艺术文字区域 */
.bottom-text-section {
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}

.artistic-quote {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  opacity: 0.9;
}

.main-quote {
  font-size: 1.2rem;
  font-style: italic;
  color: #e0e0e0;
  margin: 0 0 8px 0;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  opacity: 0.9;
}

.sub-quote {
  font-size: 0.9rem;
  color: #b0b0b0;
  margin: 0 0 15px 0;
  font-weight: 200;
  letter-spacing: 1px;
  opacity: 0.8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.signature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.signature-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(to right, transparent, #888, transparent);
  opacity: 0.6;
}

.signature-text {
  font-size: 0.85rem;
  color: #999;
  font-style: italic;
  font-weight: 300;
  opacity: 0.8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}

/* 优雅的弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(40, 40, 40, 0.95));
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5),
              0 0 60px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  overflow: hidden;
  transform-origin: center;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  backdrop-filter: blur(10px);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1) rotate(90deg);
}

.modal-content {
  display: flex;
  gap: 40px;
  padding: 40px;
  align-items: center;
}

.artwork-display {
  position: relative;
  flex: 1;
  max-width: 600px;
  display: flex;
  justify-content: center;
}

.artwork-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.artwork-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.artwork-display:hover .artwork-glow {
  opacity: 1;
}

.artwork-info {
  flex: 0 0 300px;
  padding-left: 20px;
}

.artwork-title {
  font-size: 2rem;
  font-weight: 300;
  color: #f0f0f0;
  margin: 0 0 20px 0;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease 0.2s forwards;
}

.artwork-description {
  font-size: 1rem;
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0 0 30px 0;
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease 0.4s forwards;
}

.artwork-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease 0.6s forwards;
}

.artwork-medium,
.artwork-year {
  font-size: 0.9rem;
  color: #888;
  font-style: italic;
}

/* 弹窗动画 */
.modal-enter {
  animation: modalEnter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.modal-exit {
  animation: modalExit 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes modalEnter {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(50px) rotateX(15deg);
    filter: blur(10px);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.95) translateY(10px) rotateX(5deg);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0) rotateX(0deg);
    filter: blur(0);
  }
}

@keyframes modalExit {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0) rotateX(0deg);
    filter: blur(0);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95) translateY(-10px) rotateX(-5deg);
    filter: blur(2px);
  }
  100% {
    opacity: 0;
    transform: scale(0.7) translateY(-50px) rotateX(-15deg);
    filter: blur(10px);
  }
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue Transition 样式 */
.modal-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .artwork-info {
    flex: none;
    padding-left: 0;
    text-align: center;
  }
  
  .artwork-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .back-button {
    top: 20px;
    left: 20px;
  }
  
  .carousel-container {
    perspective: 800px;
  }
  
  .carousel-item {
    width: 220px;
    height: 240px; /* 移动端也相应降低高度 */
  }
  
  .main-quote {
    font-size: 1rem;
  }
  
  .sub-quote {
    font-size: 0.8rem;
  }
  
  .signature-text {
    font-size: 0.75rem;
    letter-spacing: 1.5px;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    perspective: 600px;
  }
  
  .carousel-item {
    width: 180px;
    height: 200px; /* 小屏幕设备进一步降低高度 */
  }
  
  .carousel-item:hover {
    transform: scale(1.05) !important;
  }
  
  .bottom-text-section {
    height: 100px;
  }
  
  .main-quote {
    font-size: 0.9rem;
  }
  
  .sub-quote {
    font-size: 0.75rem;
  }
  
  .signature-line {
    width: 30px;
  }
  
  .signature-text {
    font-size: 0.7rem;
    letter-spacing: 1px;
  }
}

</style>