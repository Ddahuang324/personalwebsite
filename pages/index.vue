<template>
  <div>
    <HeroSection />
    <MenuComponent v-model="isMenuOpen" @scrollToSection="handleScrollToSection" />
    <StagesSection @showDetails="showStageDetailsModal" />
    <ModalComponent :isVisible="isModalVisible" :activeNode="activeModalNode" @close="hideModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeroSection from '~/components/HeroSection.vue';
import MenuComponent from '~/components/MenuComponent.vue';
import StagesSection from '~/components/StagesSection.vue';
import ModalComponent from '~/components/ModalComponent.vue';

const isMenuOpen = ref(false);
const isModalVisible = ref(false);
const activeModalNode = ref(null);

const handleScrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const showStageDetailsModal = (stage) => {
  activeModalNode.value = stage;
  isModalVisible.value = true;
  document.body.classList.add('modal-open');
};

const hideModal = () => {
  isModalVisible.value = false;
  activeModalNode.value = null;
  document.body.classList.remove('modal-open');
};
</script>

<style>
/* General Styles */
body {
  font-family: 'Lora', serif;
  margin: 0;
  background-color: #1a1a1a; /* Dark background for contrast */
  color: #f0f0f0;
  overflow-x: hidden; /* Prevent horizontal scrollbars */
  transition: background-color 0.3s ease;
}

body.modal-open {
  overflow: hidden;
}

/* Font Face Declarations */
@font-face {
  font-family: 'Anton';
  src: url('/fonts/Anton-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora-Italic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}
</style>