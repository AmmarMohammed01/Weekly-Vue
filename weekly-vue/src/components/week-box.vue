<script setup>
import DayBox from "./day-box.vue";
</script>

<template>
  <p>Week Box</p>
  <div class="week-box">
    <DayBox/>
    <DayBox/>
    <DayBox/>
    <DayBox/>
    <DayBox/>
    <DayBox/>
    <DayBox/>
  </div>
</template>

<style scoped>
.week-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>