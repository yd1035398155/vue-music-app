import { createRouter, createWebHistory } from "vue-router";
// 载入页面

const Recommend = () =>
  import("views/recommend" /*webpackChunkName:'recommend'*/);
const Search = () => import("views/search" /*webpackChunkName:'search'*/);
const Singer = () => import("views/singer" /*webpackChunkName:'singer'*/);
const SingerDetail = () =>
  import("views/singer-detail" /*webpackChunkName:'singerdetail'*/);
const Album = () => import("views/album" /*webpackChunkName:'album'*/);
const TopList = () => import("views/top-list" /*webpackChunkName:'toplist'*/);
const UserCenter = () =>
  import("views/user-center" /*webpackChunkName:'usercenter'*/);
const TopDetail = () =>
  import("views/top-detail" /*webpackChunkName:'toplist'*/);
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
