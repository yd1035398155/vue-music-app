<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" />
      </div>
      <div class="top">
        <div class="back" @click="goBack"><i class="icon-back" /></div>
        <div class="title">{{ currentSong.name }}</div>
        <div class="subtitle">{{ currentSong.singer }}</div>
      </div>
      <div class="middle-l" v-show="false">
        <cd-rotate />
      </div>
      <div class="middle-r">
        <lyric :songReady="songReady" :currentTime="currentTime" />
      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar-wrapper">
            <progress-bar
              :progress="progress"
              @progress-changing="onProgressChanging"
              @progress-changed="onProgressChanged"
            />
          </div>
          <span class="time time-r">{{
            formatTime(currentSong.duration)
          }}</span>
        </div>
        <div class="operators">
          <div class="icon">
            <i :class="modeIcon" @click="changeMode"></i>
          </div>
          <div class="icon" :class="disableCls">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon" :class="disableCls">
            <i :class="playIcon" @click="togglePlay"></i>
          </div>
          <div class="icon" :class="disableCls">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon">
            <i
              @click="toggleFavorite(currentSong)"
              :class="getFavoriteIcon(currentSong)"
            >
            </i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updataTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
// 因为composition API获取不到store,所以引用
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
// hook
import useMode from "./use-mode";
import useFavorite from "./use-favorite";
import ProgressBar from "./Progress-bar";
import { formatTime } from "@/assets/js/utils";
import { PLAY_MODE } from "@/assets/js/constant";
import CdRotate from "./CdRotate";
import Lyric from "./Lyric";
export default {
  name: "player",
  setup() {
    // data
    const audioRef = ref(null);
    const songReady = ref(false);
    const currentTime = ref(0);

    let progressChanging = false;
    // vuex
    const store = useStore();
    //         使用computed的目的:为了响应式,注意加value
    const fullScreen = computed(() => store.state.fullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const currentIndex = computed(() => store.state.currentIndex);
    const playMode = computed(() => store.state.playMode);
    // hook
    const { modeIcon, changeMode } = useMode();
    const { getFavoriteIcon, toggleFavorite } = useFavorite();
    const playing = computed(() => store.state.playing);
    // computed
    const playIcon = computed(() => {
      return store.state.playing ? "icon-pause" : "icon-play";
    });
    const playlist = computed(() => store.state.playlist);
    const progress = computed(() => {
      return currentTime.value / currentSong.value.duration;
    });
    const disableCls = computed(() => {
      return songReady.value ? "" : "disable";
    });
    // watch
    // 实现点击就播放的功能
    watch(currentSong, newSong => {
      if (!newSong.id || !newSong.url) {
        return;
      }
      songReady.value = false;
      const audioEl = audioRef.value;
      audioEl.src = newSong.url;
      audioEl.play();
      store.commit("setPlayingState", true);
    });
    // 播放状态
    watch(playing, newState => {
      if (!songReady.value) return;
      const audioEl = audioRef.value;
      if (newState) {
        audioEl.play();
      } else {
        audioEl.pause();
      }
    });
    // methods
    function goBack() {
      store.commit("setFullScreen", false);
    }
    function togglePlay() {
      if (!songReady.value) return;
      store.commit("setPlayingState", !playing.value);
    }
    function pause() {
      store.commit("setPlayingState", false);
    }
    function prev() {
      const list = playlist.value;
      if (!songReady.value || list.length === 0) return;
      if (list.length === 1) {
        loop();
      } else {
        let index = currentIndex.value - 1;
        // 判断是否超出歌单边界
        if (index < 0) {
          index = list.length - 1;
        }
        store.commit("setCurrentIndex", index);
        // 如果是暂停状态
        if (!playing.value) {
          store.commit("setPlayingState", true);
        }
      }
    }
    function next() {
      const list = playlist.value;
      if (!songReady.value || list.length === 0) return;
      if (list.length === 1) {
        loop();
      } else {
        let index = currentIndex.value + 1;
        // 判断是否超出歌单边界
        if (index >= list.length) {
          index = 0;
        }
        store.commit("setCurrentIndex", index);
        if (!playing.value) {
          store.commit("setPlayingState", true);
        }
      }
    }
    function loop() {
      const audioEl = audioRef.value;
      store.commit("setPlayingState", true);
      audioEl.currentTime = 0;
      audioEl.play();
    }
    function ready() {
      if (songReady.value) return;
      songReady.value = true;
    }
    // 当播放发生错误时,songReady一直为false,不能切歌
    function error() {
      songReady.value = true;
    }
    function updataTime(e) {
      if (!progressChanging) currentTime.value = e.target.currentTime;
    }
    function onProgressChanging(progress) {
      progressChanging = true;
      currentTime.value = currentSong.value.duration * progress;
    }
    function onProgressChanged(progress) {
      progressChanging = false;
      audioRef.value.currentTime = currentTime.value =
        currentSong.value.duration * progress;
      if (!playing.value) {
        store.commit("setPlayingState", true);
      }
    }
    function end() {
      currentTime.value = 0;
      if (playMode.value === PLAY_MODE.loop) {
        loop();
      } else {
        next();
      }
    }
    return {
      fullScreen,
      currentSong,
      currentTime,
      audioRef,
      goBack,
      togglePlay,
      pause,
      prev,
      next,
      playIcon,
      ready,
      progress,
      disableCls,
      error,
      updataTime,
      modeIcon,
      changeMode,
      getFavoriteIcon,
      toggleFavorite,
      formatTime,
      onProgressChanging,
      onProgressChanged,
      end,
      songReady
    };
  },
  components: { ProgressBar, CdRotate, Lyric },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 5px;
        z-index: 50px;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        height: 40px;
        line-height: 40px;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle-r {
      height: 62%;
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        width: 80%;
        margin: 0 auto;
        bottom: 50px;
        display: flex;
        justify-content: space-between;
        .icon {
          text-align: center;
          color: $color-theme;
          font-size: 40px;
          &.disable {
            color: $color-theme-d;
          }
          .icon-favorite {
            color: $color-sub-theme;
          }
          i {
            font-size: 30px;
            line-height: 40px;
          }
          .icon-pause,
          .icon-play {
            font-size: 40px;
          }
        }
      }
    }
  }
}
</style>
