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
  <router-view v-slot="{ Component }" :style="viewStyle" name="user">
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <player />
</template>

<script>
import Header from "@/components/header/Header";
import TabBar from "@/components/tabbar/TabBar";
import Player from "@/components/player/Player";
import { mapState } from "vuex";
export default {
  components: {
    MHeader: Header,
    TabBar,
    Player
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? "60px" : "0";
      return { bottom };
    },
    ...mapState(["playlist"])
  }
};
</script>
