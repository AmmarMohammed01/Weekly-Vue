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
  <div class="flex-1 min-w-50 xl:max-w-[14vw] min-h-90 border-none rounded-lg border-2 m-1 shadow-xl bg-linear-310 from-purple-600 to-blue-500 "> <!-- Original CSS: day-box -->
    <form @submit.prevent="addTask">
      <p class="text-2xl text-white text-center font-semibold mt-3 mb-2">{{ dayName }}</p> <!-- Original CSS: day-name -->
      <!-- <label for="newTask">Add Task</label> -->
      <div class="flex justify-center mb-3">
        <input type="text" name="newTask" id="newTask" v-model="newTask" placeholder="Type task here..." class="border-none border-1 rounded-md outline-none p-1 pl-2 text-sm inset-shadow-sm bg-white">
        <button type="submit" class="bg-orange-400 hover:bg-orange-600 text-sm text-white p-1 ml-1 rounded-lg">Add</button>
      </div>
    </form>

    <!-- Display Task: name, edit, check, delete -->
    <ul class="text-black text-sm">
      <li v-for="(task, index) in tasks" :key="task">
        <!-- Task editor view -->
        <div v-if="editModeIndex == index" class="bg-white px-5 py-3 mx-3 rounded-xl my-2">
          <input type="text" name="editTaskName" id="editTaskName" v-model="editTaskName"
          class="bg-white text-black rounded-md border outline-none">
          <div class="mt-2 text-white">
            <button @click="editModeSave(index)" class="bg-blue-400 px-2 py-1 hover:bg-blue-600 ml-1 rounded-xl">Save</button>
            <button @click="editModeExit()" class="bg-blue-400 px-2 py-1 hover:bg-blue-600 ml-1 rounded-xl">Cancel</button>
          </div>
        </div>
        <!-- Task normal view -->
        <div v-else class="bg-white px-5 py-3 mx-3 rounded-xl my-2">
          <div class="mb-2"> {{ task.taskName }} </div>
          <div class="text-white font-semibold">
            <button @click="completeTask(index)" class="bg-blue-400 w-10 h-7 rounded-4xl hover:bg-emerald-400" :class="{isTaskComplete: task.taskCompletion}">&check;</button>
            <button @click="editModeOpen(index)" class="bg-blue-400 w-10 h-7 ml-1 rounded-4xl hover:bg-amber-400">&#9998;</button>
            <button @click="deleteTask(index)"   class="bg-blue-400 w-10 h-7 ml-1 rounded-4xl hover:bg-red-500">x</button>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<style scoped>
/* .day-box { */
  /* display: inline-block; */
  /* width: 300px; */ 
  /* min-height: 400px; */
  /* border-style: solid; */
  /* border-radius: 20px; */
  /* border-color: black; */
  /* margin: 10px; */
  /* font-size: 20px; */
/*} */

/* .day-name {
  font-size: 30px; 
  margin: 10px;
  text-align: center;
} */

.isTaskComplete {
  background-color: lime;
}
</style>