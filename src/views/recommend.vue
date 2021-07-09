<template>
  <div class="recommend" v-loading="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders" />
          </div>
        </div>
        <div class="recommend-list">
          <h3 class="list-title" v-show="!loading">热门歌单推荐</h3>
          <ul>
            <li
              v-for="item in albums"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img v-lazy="item.pic" alt="" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.username }}</h2>
                <p class="title">{{ item.title }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend } from "@/service/recommend";
import Slider from "@/components/base/slide/Slide";
import Scroll from "@/components/base/scroll/Scroll";
export default {
  name: "recommend",
  data() {
    return {
      sliders: [],
      albums: []
    };
  },
  components: {
    Slider,
    Scroll
  },
  async created() {
    const result = await getRecommend();
    this.sliders = result.sliders;
    this.albums = result.albums;
  },
  computed: {
    loading() {
      return !this.sliders.length && !this.albums.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;
  .recommend-content {
    height: 100%;
    overflow: scroll;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      // overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        color: $color-theme;
        font-size: 14px;
      }
      .item {
        display: flex;
        padding: 0 20px 20px 20px;
        .icon {
          width: 60px;
          height: 60px;
          margin-right: 20px;
          img {
            width: 100%;
          }
        }
        .text {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          .name {
            flex: 1;
            margin-top: 10px;
            color: $color-text;
          }
          .title {
            flex: 1;
            color: $color-text-d;
          }
        }
      }
    }
  }
}
</style>
