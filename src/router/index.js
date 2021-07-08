import { createRouter, createWebHistory } from "vue-router";
// 载入页面

const Recommend = () => import("views/recommend");
const Search = () => import("views/search");
const Singer = () => import("views/singer");
const TopList = () => import("views/top-list");
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
