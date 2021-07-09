import { createRouter, createWebHistory } from "vue-router";
// 载入页面

const Recommend = () => import("views/recommend");
const Search = () => import("views/search");
const Singer = () => import("views/singer");
const TopList = () => import("views/top-list");
const User = () => import("views/user");
const routes = [
  {
    path: "",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    component: Recommend
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/singer",
    component: Singer
  },
  {
    path: "/top-list",
    component: TopList
  },
  {
    path: "/user",
    component: User
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
