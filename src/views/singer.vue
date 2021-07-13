<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
  </div>
  <router-view :singer="selectedSinger"></router-view>
</template>

<script>
import IndexList from "@/components/base/index-list/Index-list";
import { getSingerList } from "@/service/singer";
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
      this.$router.push({
        path: `/singer/${singer.mid}`
      });
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
}</style
>>
