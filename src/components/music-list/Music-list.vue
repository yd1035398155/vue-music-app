<template>
  <div class="music-list">
    <div class="back" @click="goBack"><i class="icon-back"></i></div>
    <div class="title">{{ title }}</div>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <scroll
      class="list"
      :probe-type="3"
      :style="scrollStyle"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/base/scroll/Scroll";
import SongList from "@/components/base/song-list/Song-list";
const RESERVED_HEIGHT = 40;
export default {
  name: "music-list",
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String
    },
    pic: {
      type: String
    }
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0
    };
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
  },
  components: {
    scroll,
    SongList
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
      console.log(this.scrollY);
    }
  },
  computed: {
    bgImageStyle() {
      // 基于父元素宽度的70%
      let paddingTop = "70%";
      let height = 0;
      let zIndex = 0;
      const scrollY = this.scrollY;
      // 解决兼容性问题
      let translateZ = 0;
      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1;
      }

      return {
        paddingTop,
        zIndex,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `translateZ(${translateZ}px)`
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 5px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    top: 400px;
    bottom: 0;
    width: 100%;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
