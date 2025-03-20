<script setup>
import DayBox from "./day-box.vue";
import {ref} from 'vue';
import { useRoute } from "vue-router";

// const route = useRoute();
// let currentWeek = route.params.id;
// console.log(`Current Week: ${currentWeek}`);

//const weeks = ref(JSON.parse(localStorage.getItem('weeks')));
//const title = ref(weeks[currentWeek].weekName || "Week Box Title Here...");
// const title = ref(JSON.parse(localStorage.getItem('weeks'))[currentWeek].weekName || "Week Box Title Here...");
const title = ref(JSON.parse(localStorage.getItem('week-title')) || "Title Here... (Ex. Week 6: Mar. 16-22, 2025)");
const editTitle = ref("");
const isModeEdit = ref(false);

const editModeOpen = () => {
  isModeEdit.value = true;
  editTitle.value = title.value;
};

const editModeClose = () => {
  isModeEdit.value = false;
};

const editModeSave = () => {
  title.value = editTitle.value;
  // localStorage.setItem("weeks", weeks);
  localStorage.setItem("week-title", JSON.stringify(title.value));
  editModeClose();
};

</script>

<template>
  <div class="px-2">
    <!-- title -->
    <div v-if="isModeEdit == false" class="mt-8 mb-4">
      <span class="font-bold text-4xl">{{ title }}</span>
      <button @click="editModeOpen()">&#9998;</button>
    </div>
    <div v-else class="text-white mt-8 mb-4">
      <input type="text" v-model="editTitle" name="editTitle" id="editTitle" class="bg-white text-black rounded-md border border-solid border-black outline-none w-1/2">
      <button @click="editModeSave()" class="bg-blue-400 p-2 hover:bg-blue-600 ml-1 rounded-xl">Save</button>
      <button @click="editModeClose()" class="bg-blue-400 p-2 hover:bg-blue-600 ml-1 rounded-xl">Cancel</button>
    </div>
    
    <!-- the portion containing day boxes -->
    <div class="week-box">
      <DayBox dayName="Sunday"/>
      <DayBox dayName="Monday"/>
      <DayBox dayName="Tuesday"/>
      <DayBox dayName="Wedensday"/>
      <DayBox dayName="Thursday"/>
      <DayBox dayName="Friday"/>
      <DayBox dayName="Saturday"/>
      
    </div>
  </div>
</template>

<style scoped>
.week-box {
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  justify-content: space-between;
}
</style>