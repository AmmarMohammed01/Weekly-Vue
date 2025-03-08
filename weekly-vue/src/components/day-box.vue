<script setup>
import {ref} from 'vue';
const tasks = ref(['t1', 't2', 't3']);
const newTask = ref("");

const addTask = () => {
  if(newTask.value.trim() !== '') {
    tasks.value.push(newTask.value);
    newTask.value = '';
  }
}

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
}
</script>

<template>
  <!-- <p>Day Box</p> -->
  <div class="day-box">
  <form @submit.prevent="addTask">
    <p class="day-name">Day Name</p>
    <label for="newTask">Add Task</label>
    <input type="text" name="newTask" id="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>
        {{ task }}
      </span>
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
}

.day-name {
  font-size: 20px;
}
</style>