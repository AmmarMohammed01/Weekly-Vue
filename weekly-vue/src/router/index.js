//npm i vue-router, create router folder in src, create this index.js, add the routes, create the view and bring it in and set as component
//in main.js import router and use it
//Finally, in App.vue use RouterView
import WeekView from "@/views/WeekView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WeekView',
      component: WeekView,
    },
  ]
});

export default router;