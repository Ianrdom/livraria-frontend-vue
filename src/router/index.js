import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/livros",
      name: "livros",
      component: () => import("../views/LivrosView.vue"),
    },

    {
      path: "/editoras",
      name: "editoras",
      component: () => import("../views/EditorasView.vue"),
    },
    {
      path: "/cartegorias",
      name: "cartegorias",
      component: () => import("../views/CartegoriasView.vue"),
    },
    {
      path: "/autores",
      name: "autores",
      component: () => import("../views/AutoresView.vue"),
    },
  ],
});

export default router;
