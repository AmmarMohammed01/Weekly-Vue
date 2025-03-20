<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const weekNum = ref(JSON.parse(localStorage.getItem('weekNum')) || 0);
const weeks = ref(JSON.parse(localStorage.getItem('weeks')) || [
{
  weekID: weekNum.value,
  weekName: "Default Week", 
  weekDays: [`w${weekNum.value}-day0`, `w${weekNum.value}-day1`, `w${weekNum.value}-day2`, `w${weekNum.value}-day3`, `w${weekNum.value}-day4`, `w${weekNum.value}-day5`, `w${weekNum.value}-day6`]
}
]);

const addWeekMode = ref(false);
const inputWeekName = ref("");

const addWeekModeOpen = () => {
  addWeekMode.value = true;
};

const addWeekModeSave = () => {
  weekNum.value++;
  // console.log(weekNum.value);
  (weeks.value)[weekNum.value] = {
    weekID: weekNum.value,
    weekName: inputWeekName.value, 
    weekDays: [`w${weekNum.value}-day0`, `w${weekNum.value}-day1`, `w${weekNum.value}-day2`, `w${weekNum.value}-day3`, `w${weekNum.value}-day4`, `w${weekNum.value}-day5`, `w${weekNum.value}-day6`]
  };
  updateLocalStorage();
  addWeekModeExit();
};

const addWeekModeExit = () => {
  addWeekMode.value = false;
};

const updateLocalStorage = () => {
  localStorage.setItem('weekNum', JSON.stringify(weekNum.value));
  localStorage.setItem('weeks', JSON.stringify(weeks.value));
  
  console.log( JSON.parse(localStorage.getItem('weekNum')) );
  console.log( JSON.parse(localStorage.getItem('weeks')) );
};
</script>

<template>
  <div>
    <div>Weekly</div>

    <div>
      <ul>
        <li v-for="(week, index) in weeks" :key="week">
          <RouterLink :to="`/view/${week.weekID}`"> {{ week.weekName }} </RouterLink>
        </li>
      </ul>
    </div>

    <div v-if="addWeekMode == true">
      <input type="text" placeholder="Enter Week Name" name="inputWeekName" id="inputWeekName" v-model="inputWeekName">
      <button @click="addWeekModeSave">Save</button>
      <button @click="addWeekModeExit">Cancel</button>
    </div>
    <div v-else>
      <button @click="addWeekModeOpen">Add Week</button>
    </div>
  </div>
</template>