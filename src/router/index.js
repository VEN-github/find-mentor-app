import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/mentors",
      name: "mentors",
      component: () => import("@/views/mentors/MentorsList.vue"),
    },
    {
      path: "/mentors/:name",
      name: "mentor",
      component: () => import("@/views/mentors/MentorsDetails.vue"),
    },
    {
      path: "/mentors/create",
      name: "become-a-mentor",
      component: () => import("@/views/mentors/MentorRegistration.vue"),
    },
    // {
    //   path: "/requests",
    //   name: "requests",
    //   // component: () => import(null),
    // },
    {
      path: "/:notFound(.*)",
      name: "not-found",
      component: NotFound,
    },
  ],
  linkActiveClass: "active",
});

export default router;
