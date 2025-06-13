<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// App.vue now serves as the root layout for Nuxt pages
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

body.modal-open, body.no-scroll {
  overflow: hidden;
}

/* Global styles that were in app.vue and are not component-specific can remain here */
/* Or be moved to a global CSS file if preferred */

/* Example of a global style that might remain or be moved */
/* Responsive Adjustments that were global */
@media (max-width: 768px) {
  /* Global responsive adjustments if any were present outside of components */
}
</style>