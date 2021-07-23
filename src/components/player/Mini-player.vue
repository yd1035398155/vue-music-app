<template>
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="showNormalPlayer">
      <div class="cd-wrapper">
        <div ref="cdRef" class="cd">
          <img
            ref="cdImageRef"
            width="40"
            height="40"
            :src="currentSong.pic"
            :class="cdCls"
          />
        </div>
      </div>
      <div ref="sliderWrapperRef" class="slider-wrapper">
        <div class="slider-group">
          <div class="slider-page" v-for="song in playlist" :key="song.id">
            <h2 class="name">{{ song.name }}</h2>
            <p class="desc">{{ song.singer }}</p>
          </div>
        </div>
      </div>
      <div class="control">
        <progress-circle :radius="32" :progress="progress">
          <i class="icon-mini" :class="miniPlayIcon"></i>
        </progress-circle>
      </div>
    </div>
  </transition>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import ProgressCircle from "./progress-circle.vue";
import useCd from "./use-cd";

export default {
  name: "mini-player",
  components: { ProgressCircle },
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const store = useStore();
    const playing = computed(() => {
      return store.state.playing;
    });
    const currentSong = computed(() => {
      return store.getters.currentSong;
    });
    const fullScreen = computed(() => {
      return store.state.fullScreen;
    });
    const miniPlayIcon = computed(() => {
      return playing.value ? "icon-pause-mini" : "icon-play-mini";
    });
    const playlist = computed(() => {
      return store.state.playlist;
    });
    function showNormalPlayer() {
      store.commit("setFullScreen", true);
    }
    const { cdCls, cdRef, cdImageRef } = useCd();
    return {
      currentSong,
      fullScreen,
      cdCls,
      cdRef,
      cdImageRef,
      miniPlayIcon,
      playlist,
      showNormalPlayer
    };
  }
};
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  display: flex;
  width: 100%;
  height: 60px;
  bottom: 0;
  left: 0;
  z-index: 180;
  align-items: center;
  background: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      height: 100%;
      width: 100%;
      img {
        border-radius: 50%;
        &.playing {
          animation: rotate 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme-d;
    }
    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }
  }
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
