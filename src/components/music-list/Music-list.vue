<template>
  <div class="music-list">
    <div class="back" @click="goBack"><i class="icon-back"></i></div>
    <div class="title">{{ title }}</div>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :probe-type="3"
      :style="scrollStyle"
      @scroll="onScroll"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/base/scroll/Scroll";
import SongList from "@/components/base/song-list/Song-list";
import { mapActions } from "vuex";
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
    },
    loading: {
      type: Boolean
    },
    noResultText: {
      type: String,
      default: "抱歉，没有找到可播放的歌曲"
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
    },
    selectItem({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index: this.index
      });
    },
    ...mapActions(["selectPlay"])
  },
  computed: {
    noResult() {
      return !this.loading && !this.songs.length;
      // return !this.songs.length;
    },
    bgImageStyle() {
      // 基于父元素宽度的70%
      let paddingTop = "70%";
      let height = 0;
      let zIndex = 0;
      // 多次访问一个数据时,保存为局部变量进行优化
      const scrollY = this.scrollY;
      // 解决兼容性问题
      let translateZ = 0;
      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1;
      }
      // 下拉放大背景图
      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }
      return {
        paddingTop,
        zIndex,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`
      };
    },
    filterStyle() {
      const scrollY = this.scrollY;
      const imageHeight = this.imageHeight;
      let blur = 0;
      if (scrollY >= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) *
          20;
      }
      return {
        backdropFilter: `blur(${blur}px)`
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
