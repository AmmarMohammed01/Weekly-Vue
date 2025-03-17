<script setup>
import DayBox from "./day-box.vue";
import {ref} from 'vue';

const title = ref(JSON.parse(localStorage.getItem(`week-title`)) || "Week Box Title Here...");
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
  localStorage.setItem("week-title", JSON.stringify(editTitle.value));
  editModeClose();
};

</script>

<template>
  <div v-if="isModeEdit == false">
    <span>{{ title }}</span>
    <button @click="editModeOpen()">&#9998;</button>
  </div>
  <div v-else>
    <input type="text" v-model="editTitle" name="editTitle" id="editTitle">
    <button @click="editModeSave()">Save</button>
    <button @click="editModeClose()">Cancel</button>
  </div>

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