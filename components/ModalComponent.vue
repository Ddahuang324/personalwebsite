<template>
  <!-- 模态框 -->
  <Transition name="modal">
    <div v-if="isVisible && !showDetailPage" class="modal-overlay" @click="hideModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close-btn" @click="hideModal">×</button>
        <h2>{{ activeNode?.title }}</h2>
        <p>{{ activeNode?.content }}</p>
        <img v-if="activeNode?.image" :src="activeNode.image" alt="Node Image" class="modal-image">
        <div v-if="activeNode?.marqueeImages && activeNode.marqueeImages.length" class="marquee-section">
          <div class="marquee-row marquee-row-1">
            <div class="marquee-content">
              <img v-for="(img, index) in activeNode.marqueeImages[0]" :key="`row1-${index}`" :src="img" alt="Marquee Image">
              <img v-for="(img, index) in activeNode.marqueeImages[0]" :key="`row1-clone-${index}`" :src="img" alt="Marquee Image">
            </div>
          </div>
          <div class="marquee-row marquee-row-2">
            <div class="marquee-content marquee-reverse">
              <img v-for="(img, index) in activeNode.marqueeImages[1]" :key="`row2-${index}`" :src="img" alt="Marquee Image">
              <img v-for="(img, index) in activeNode.marqueeImages[1]" :key="`row2-clone-${index}`" :src="img" alt="Marquee Image">
            </div>
          </div>
          <div class="marquee-row marquee-row-3">
            <div class="marquee-content">
              <img v-for="(img, index) in activeNode.marqueeImages[2]" :key="`row3-${index}`" :src="img" alt="Marquee Image">
              <img v-for="(img, index) in activeNode.marqueeImages[2]" :key="`row3-clone-${index}`" :src="img" alt="Marquee Image">
            </div>
          </div>
        </div>
        
        <!-- 查看详情按钮 -->
        <div class="modal-actions">
          <button class="detail-btn" @click="showDetails">
            <span class="btn-icon">👁️</span>
            <span>查看详细内容</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- 详细页面 -->
  <Transition name="page">
    <div v-if="showDetailPage" class="detail-page-container">
      <ArtistPage v-if="currentPageType === 'artist'" @goBack="hideDetailPage" />
      <MusicianPage v-else-if="currentPageType === 'musician'" @goBack="hideDetailPage" />
      <DeveloperPage v-else-if="currentPageType === 'developer'" @goBack="hideDetailPage" />
      <LifestylePage v-else-if="currentPageType === 'lifestyle'" @goBack="hideDetailPage" />
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import ArtistPage from './ArtistPage.vue'
import MusicianPage from './MusicianPage.vue'
import DeveloperPage from './DeveloperPage.vue'
import LifestylePage from './LifestylePage.vue'

const props = defineProps({
  isVisible: Boolean,
  activeNode: Object
});

const emit = defineEmits(['close']);

const showDetailPage = ref(false)
const currentPageType = ref('')

// 根据activeNode的id或title确定页面类型
const getPageType = () => {
  if (!props.activeNode) return ''
  
  const title = props.activeNode.title
  if (title.includes('见习画手')) return 'artist'
  if (title.includes('音乐家')) return 'musician'
  if (title.includes('开发者')) return 'developer'
  if (title.includes('生活家')) return 'lifestyle'
  
  return ''
}

const hideModal = () => {
  showDetailPage.value = false
  currentPageType.value = ''
  emit('close');
};

const showDetails = () => {
  currentPageType.value = getPageType()
  if (currentPageType.value) {
    showDetailPage.value = true
  }
}

const hideDetailPage = () => {
  showDetailPage.value = false
  currentPageType.value = ''
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  max-width: 80vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modal-content h2 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.modal-content p {
  color: #f0f0f0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1.1rem;
}

.modal-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.marquee-section {
  margin-top: 2rem;
  overflow: hidden;
  border-radius: 10px;
}

.marquee-row {
  height: 100px;
  overflow: hidden;
  margin-bottom: 10px;
}

.marquee-content {
  display: flex;
  animation: marquee 20s linear infinite;
}

.marquee-reverse {
  animation-direction: reverse;
}

.marquee-content img {
  height: 100px;
  width: auto;
  margin-right: 10px;
  border-radius: 5px;
  flex-shrink: 0;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* 模态框动画 */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.8) translateY(-50px);
}

/* 新增样式 */
.modal-actions {
  margin-top: 2rem;
  text-align: center;
}

.detail-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.detail-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  background: linear-gradient(45deg, #764ba2, #667eea);
}

.btn-icon {
  font-size: 1.2rem;
}

.detail-page-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  overflow-y: auto;
}

/* 页面过渡动画 */
.page-enter-active, .page-leave-active {
  transition: all 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 95vw;
    max-height: 90vh;
    padding: 1.5rem;
  }
  
  .modal-content h2 {
    font-size: 1.5rem;
  }
  
  .detail-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>