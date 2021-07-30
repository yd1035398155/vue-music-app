import { createRouter, createWebHistory } from "vue-router";
// 载入页面

const Recommend = () => import("views/recommend");
const Search = () => import("views/search");
const Singer = () => import("views/singer");
const SingerDetail = () => import("views/singer-detail");
const Album = () => import("views/album");
const TopList = () => import("views/top-list");
const UserCenter = () => import("views/user-center");
const TopDetail = () => import("views/top-detail");
const routes = [
  {
    path: "",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    component: Recommend,
    children: [
      {
        path: ":id",
        component: Album
      }
    ]
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: SingerDetail
      }
    ]
  },

  {
    path: "/top-list",
    component: TopList,
    children: [
      {
        path: ":id",
        component: TopDetail
      }
    ]
  },
  {
    path: "/search",
    component: Search,
    children: [
      {
        path: ":id",
        component: SingerDetail
      }
    ]
  },
  {
    path: "/user",
    components: {
      user: UserCenter
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
