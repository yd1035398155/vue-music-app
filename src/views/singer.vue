<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger" />
  </div>
  <router-view v-slot="{ Component }">
    <transition appear name="slide">
      <component :is="Component" :singer="selectedSinger" />
    </transition>
  </router-view>
</template>

<script>
import IndexList from "@/components/base/index-list/Index-list";
import { getSingerList } from "@/service/singer";
import storage from "good-storage";
import { SINGER_KEY } from "@/assets/js/constant";
export default {
  name: "singer",
  data() {
    return {
      singers: [],
      selectedSinger: null
    };
  },
  async created() {
    const res = await getSingerList();
    this.singers = res.singers;
  },
  components: {
    IndexList
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      this.cacheSinger(singer);
      this.$router.push({
        path: `/singer/${singer.mid}`
      });
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
    }
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
