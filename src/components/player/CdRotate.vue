<template>
  <div class="cd-rotate">
    <div class="cd-wrapper">
      <div class="cd" ref="cdRef">
        <img
          class="image"
          ref="cdImageRef"
          :class="{ playing: isPlaying }"
          :src="currentSong.pic"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cd-rotate",
  data() {
    return {};
  },
  computed: {
    currentSong() {
      return this.$store.getters.currentSong;
    },
    isPlaying() {
      return this.$store.state.playing;
    }
  },
  watch: {
    isPlaying(newVal) {
      if (!newVal) {
        this.syncTransform(this.$refs.cdRef, this.$refs.cdImageRef);
      }
    }
  },
  methods: {
    syncTransform(wrapper, inner) {
      const wrapperTransform = getComputedStyle(wrapper).transform;
      const innerTransform = getComputedStyle(inner).transform;
      wrapper.style.transform =
        wrapperTransform === "none"
          ? innerTransform
          : innerTransform.concat("", wrapperTransform);
    }
  }
};
</script>

<style lang="scss" scoped>
.cd-rotate {
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
  .cd-wrapper {
    position: absolute;
    width: 80%;
    height: 80%;
    left: 10%;
    top: 0;
    box-sizing: border-box;
    .cd {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid rgba(255, 255, 255, 0.1);
      }
      .playing {
        animation: rotate 20s linear infinite;
      }
    }
  }
}
</style>
