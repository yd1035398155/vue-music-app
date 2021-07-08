<template>
  <m-header />
  <tab-bar></tab-bar>
  <router-view></router-view>
</template>

<script>
import Header from "@/components/header/Header";
import TabBar from "@/components/tabbar/TabBar";
export default {
  components: {
    MHeader: Header,
    TabBar
  },
  computed: {}
};
</script>
