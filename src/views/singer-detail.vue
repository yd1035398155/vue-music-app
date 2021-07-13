<template>
  <div class="singer-detail">
    <music-list :songs="songs" :pic="pic" :title="title"></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/song";
import MusicList from "@/components/music-list/Music-list";
export default {
  name: "singer-detail",
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    };
  },
  props: {
    singer: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    pic() {
      // 如果singer存在则返回singer.pic
      return this.singer && this.singer.pic;
    },
    title() {
      return this.singer && this.singer.name;
    }
  },
  async created() {
    const result = await getSingerDetail(this.singer);
    const songs = await processSongs(result.songs);
    this.songs = songs;
    console.log(songs);
  }
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $color-background;
}
</style>
