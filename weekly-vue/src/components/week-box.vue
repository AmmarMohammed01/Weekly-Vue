<script setup>
import DayBox from "./day-box.vue";
</script>

<template>
  <p>Week Box</p>
  <div class="week-box">
    <DayBox dayName="Sunday"/>
    <DayBox dayName="Monday"/>
    <DayBox dayName="Tuesday"/>
    <DayBox dayName="Wedensday"/>
    <DayBox dayName="Thursday"/>
    <DayBox dayName="Friday"/>
    <DayBox dayName="Saturday"/>
    
  </div>
</template>

<style scoped>
.week-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>