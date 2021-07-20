<template>
  <m-header />
  <tab-bar />
  <!-- 路由懒加载 -->
  <router-view v-slot="{ Component }">
    <!-- 保存每个页面缓存 -->
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <player />
</template>

<script>
import Header from "@/components/header/Header";
import TabBar from "@/components/tabbar/TabBar";
import Player from "@/components/player/Player";
export default {
  components: {
    MHeader: Header,
    TabBar,
    Player
  },
  computed: {}
};
</script>
