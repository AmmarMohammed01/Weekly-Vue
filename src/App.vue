<script setup>
import {RouterView} from 'vue-router';
// import { ref } from 'vue';
// import Navbar from './components/Navbar.vue';

// const weekNum = ref(JSON.parse(localStorage.getItem('weekNum')) || 0);
// const weeks = ref(JSON.parse(localStorage.getItem('weeks')) || [
// {
//   weekID: weekNum.value,
//   weekName: "Default Week", 
//   weekDays: [`w${weekNum.value}-day0`, `w${weekNum.value}-day1`, `w${weekNum.value}-day2`, `w${weekNum.value}-day3`, `w${weekNum.value}-day4`, `w${weekNum.value}-day5`, `w${weekNum.value}-day6`]
// }
// ]);

</script>

<template>
  <div> <!--class="css-format"-->
    <!-- <Navbar /> -->
    <RouterView />
  </div>
  
</template>

<style scoped>
.css-format {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
</style>
