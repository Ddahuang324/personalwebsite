<template>
  <section class="hero-section">
    <video autoplay loop muted playsinline class="background-video">
      <source src="/assets/img/video.mp4" type="video/mp4">
    </video>
    <header class="top-slogan">
      <p>March 2002</p>
    </header>
    <main class="hero-content">
      <h1>HEADING TOWARDS FREEDOM</h1>
      <p class="subtitle">Hi, I'm Da Huang</p>
    </main>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.8, defaults: { ease: 'power3.out', duration: 1.5 }});
  tl.from('.hero-section .background-video', { autoAlpha: 0, scale: 1.05, duration: 2}, 0)
    .from('.top-slogan', { y: -50, autoAlpha: 0, duration: 1.2 }, 0.8)
    .from('.hero-content h1', { y: 70, autoAlpha: 0, duration: 1.5 }, 1.2)
    .from('.hero-content .subtitle', { y: 50, autoAlpha: 0, duration: 1.2 }, 1.6);

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { clientWidth, clientHeight } = currentTarget;
      const xPercent = (clientX / clientWidth) - 0.5;
      const yPercent = (clientY / clientHeight) - 0.5;
      gsap.to('.background-video', { 
        x: xPercent * -20,
        y: yPercent * -20, 
        duration: 0.8,
        ease: 'power1.out'
      });
      gsap.to('.hero-content h1', { x: xPercent * -10, y: yPercent * -5, duration: 0.8, ease: 'power1.out'});
      gsap.to('.hero-content .subtitle', { x: xPercent * -15, y: yPercent * -8, duration: 0.8, ease: 'power1.out'});
    });
  }
});
</script>

<style scoped>
.hero-section {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  color: #fff;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(to top, 
    rgba(0,0,0,0.95) 0%, 
    rgba(0,0,0,0.8) 30%, 
    rgba(0,0,0,0.6) 50%, 
    rgba(0,0,0,0.3) 70%, 
    transparent 100%);
  z-index: 0;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.hero-section::before {
  content: '';
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(to top, 
    rgba(0,0,0,0.4) 0%, 
    rgba(0,0,0,0.2) 50%, 
    transparent 100%);
  z-index: 1;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

.hero-section .background-video {
  mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -2;
  filter: brightness(0.6);
}

.top-slogan {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.8;
}

.hero-content h1 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  margin: 0 0 10px 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: normal;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
}

.hero-content .subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-style: italic;
  opacity: 0.9;
  color: #e0e0e0;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }
  .hero-content .subtitle {
    font-size: 1.2rem;
  }
}
</style>