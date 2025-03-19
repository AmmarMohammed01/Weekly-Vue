<script setup>
import {ref, defineProps, watch} from 'vue';

const props = defineProps({
  dayName: {
    type: String,
    default: 'Day Box'
  }
});

const tasks = ref(JSON.parse(localStorage.getItem(`tasks-${props.dayName}`)) || []);
const newTask = ref(""); //for task input field

const editModeIndex = ref(-1); //contains index of task being editted, otherwise -1
const editTaskName = ref(""); //contains edit task input field

//task object structure
const addTask = () => {
  if(newTask.value.trim() !== '') {
    tasks.value.push(
      {
        taskDay: props.dayName,
        taskName: newTask.value,
        taskCompletion: false 
      });
    newTask.value = '';
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

const completeTask = (index) => {
  // console.log((tasks.value)[index].taskCompletion);
  (tasks.value)[index].taskCompletion = !((tasks.value)[index].taskCompletion);
  //console.log(`Switched task completion to ${(tasks.value)[index].taskCompletion}`);
};

const editModeOpen = (index) => {
  editModeIndex.value = index;
  editTaskName.value = (tasks.value)[index].taskName;
};

const editModeExit = () => {
  editModeIndex.value = -1;
};

const editModeSave = (index) => {
  (tasks.value)[index].taskName = editTaskName.value;
  editTaskName.value = ""; //maybe unnecessary
  editModeExit();
};

watch(tasks, () => {
  localStorage.setItem(`tasks-${props.dayName}`, JSON.stringify(tasks.value));
}, {deep: true});
</script>

<template>
  <!-- Task input field -->
  <div class="day-box">
  <form @submit.prevent="addTask">
    <p class="day-name">{{ dayName }}</p>
    <label for="newTask">Add Task</label>
    <input type="text" name="newTask" id="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <!-- Display Task: name, edit, check, delete -->
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <!-- Task editor view -->
      <div v-if="editModeIndex == index">
        <input type="text" name="editTaskName" id="editTaskName" v-model="editTaskName">
        <button @click="editModeSave(index)">Save</button>
        <button @click="editModeExit()">Cancel</button>
      </div>
      <!-- Task normal view -->
      <div v-else>
        <span> {{ task.taskName }} </span>
        <button @click="editModeOpen(index)">&#9998;</button>
        <button @click="completeTask(index)" :class="{isTaskComplete: task.taskCompletion}">&check;</button>
        <button @click="deleteTask(index)">x</button>
      </div>
    </li>
  </ul>

  </div>
</template>

<style scoped>
.day-box {
  /* display: inline-block; */
  width: 300px;
  min-height: 400px;
  border-style: solid;
  border-radius: 20px;
  border-color: black;
  margin: 10px;
  font-size: 20px;
}

.day-name {
  font-size: 30px;
  margin: 10px;
  text-align: center;
}

.isTaskComplete {
  background-color: lime;
}
</style>