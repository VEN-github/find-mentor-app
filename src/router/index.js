import { createRouter, createWebHistory } from "vue-router";

import store from "@/store";
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
      path: "/mentor/:slug",
      name: "mentor",
      component: () => import("@/views/mentors/MentorDetails.vue"),
      props: true,
    },
    {
      path: "/mentors/create",
      name: "become-a-mentor",
      component: () => import("@/views/mentors/MentorRegistration.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/UserAuth.vue"),
    },
    {
      path: "/account/create",
      name: "sign-up",
      component: () => import("@/views/auth/UserAuth.vue"),
    },
    {
      path: "/requests",
      name: "requests",
      component: () => import("@/views/mentors/MentorRegistration.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:notFound(.*)",
      name: "not-found",
      component: NotFound,
    },
  ],
  linkActiveClass: "active",
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
