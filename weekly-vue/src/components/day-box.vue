<script setup>
import {ref, defineProps, watch} from 'vue';

const props = defineProps({
  dayName: {
    type: String,
    default: 'Day Box'
  }
});

const tasks = ref(JSON.parse(localStorage.getItem(`tasks-${props.dayName}`)) || []);
const newTask = ref("");

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
  console.log(`Switched task completion to ${(tasks.value)[index].taskCompletion}`);
};

watch(tasks, () => {
  localStorage.setItem(`tasks-${props.dayName}`, JSON.stringify(tasks.value));
}, {deep: true});
</script>

<template>
  <!-- <p>Day Box</p> -->
  <div class="day-box">
  <form @submit.prevent="addTask">
    <p class="day-name">{{ dayName }}</p>
    <label for="newTask">Add Task</label>
    <input type="text" name="newTask" id="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <!-- Task box: name, check, delete -->
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span> {{ task.taskName }} </span>
      <button @click="completeTask(index)" :class="{isTaskComplete: task.taskCompletion}">&check;</button>
      <button @click="deleteTask(index)">x</button>
    </li>
  </ul>

  </div>
</template>

<style scoped>
.day-box {
  width: 300px;
  height: 400px;
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