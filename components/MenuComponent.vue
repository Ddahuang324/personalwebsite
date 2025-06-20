<template>
  <div>
    <div class="menu-toggle-btn" :class="{ 'is-active': modelValue }" @click="toggleMenu">
      <span class="line line-1"></span>
      <span class="line line-2"></span>
      <span class="line line-3"></span>
    </div>
    <div class="fullscreen-menu" :class="{ 'is-visible': modelValue }">
      <nav>
        <NuxtLink to="/study1" @click="toggleMenu">Learning</NuxtLink>
        <a @click="toggleMenuAndScroll('moments-section')">Moments</a>
        <a @click="toggleMenuAndScroll('about-me-section')">About Me</a>
        <a @click="toggleMenuAndScroll('experience-section')">Experience</a>
        <a @click="toggleMenuAndScroll('projects-section')">Projects</a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  modelValue: Boolean // Used for v-model binding from parent
});

const emit = defineEmits(['update:modelValue', 'scrollToSection']);

let menuTl = null;

const toggleMenu = () => {
  emit('update:modelValue', !props.modelValue);
};

const toggleMenuAndScroll = (sectionId) => {
  emit('update:modelValue', false);
  // Add a slight delay to allow the menu to close before scrolling
  setTimeout(() => {
    emit('scrollToSection', sectionId);
  }, 300); // Adjust delay as needed
};

onMounted(() => {
  gsap.from('.menu-toggle-btn', {autoAlpha: 0, scale: 0.5, duration: 0.8, delay: 2.2});

  menuTl = gsap.timeline({ paused: true, reversed: true, defaults: { ease: 'expo.inOut' } });
  menuTl.to('.fullscreen-menu', { 
      duration: 0.6, 
      clipPath: 'circle(150% at top right)',
      autoAlpha: 1 
    })
    .fromTo('.fullscreen-menu nav a', 
      { y: 30, opacity: 0, skewX: '-10deg' }, 
      { y: 0, opacity: 1, skewX: '0deg', duration: 0.4, stagger: 0.08 }, 
      "-=0.4"
    );
  
  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      menuTl.play();
      document.body.classList.add('no-scroll');
    } else {
      menuTl.reverse();
      document.body.classList.remove('no-scroll');
    }
  });
});

</script>

<style scoped>
.menu-toggle-btn {
  position: fixed;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 22px;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-toggle-btn .line {
  width: 100%;
  height: 3px;
  background-color: #fff;
  transition: transform 0.3s ease, opacity 0.3s ease;
  border-radius: 2px;
}

.menu-toggle-btn.is-active .line-1 {
  transform: translateY(9.5px) rotate(45deg);
}
.menu-toggle-btn.is-active .line-2 {
  opacity: 0;
}
.menu-toggle-btn.is-active .line-3 {
  transform: translateY(-9.5px) rotate(-45deg);
}

.fullscreen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(20, 20, 20, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  clip-path: circle(0% at top right);
}

.fullscreen-menu.is-visible {
  visibility: visible;
  opacity: 1;
}



.fullscreen-menu nav a,
.fullscreen-menu nav a.nuxt-link-exact-active,
.fullscreen-menu nav a.nuxt-link-active {
  display: block;
  font-family: 'Anton', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  color: #f0f0f0;
  text-decoration: none;
  margin: 15px 0;
  padding: 10px 20px;
  transition: color 0.3s ease, transform 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0; 
}

.fullscreen-menu nav a:hover,
.fullscreen-menu nav a.nuxt-link-exact-active:hover,
.fullscreen-menu nav a.nuxt-link-active:hover {
  color: #ffc107;
  transform: translateX(10px) skewX(-5deg);
}

@media (max-width: 768px) {
  .fullscreen-menu nav a {
    font-size: 2.5rem;
  }
}
</style>