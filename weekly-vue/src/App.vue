<script setup>
import {RouterView} from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="css-format">
    <Navbar />
    <RouterView />
  </div>
  
</template>

<style scoped>
.css-format {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
</style>
