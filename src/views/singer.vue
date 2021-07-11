<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import IndexList from "@/components/base/index-list/Index-list";
import { getSingerList } from "@/service/singer";
export default {
  name: "singer",
  data() {
    return {
      singers: []
    };
  },
  async created() {
    const res = await getSingerList();
    this.singers = res.singers;
  },
  components: {
    IndexList
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
