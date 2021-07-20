<template>
  <scroll class="lyric-scroll">
    <div class="lyric-wrapper">
      <div v-if="currentLyric" ref="lyricListRef">
        <p
          class="text"
          :class="{ current: currentLineNum === index }"
          v-for="(line, index) in currentLyric.lines"
          :key="line.num"
        >
          {{ line.txt }}
        </p>
      </div>
    </div>
  </scroll>
</template>

<script>
import useLyric from "./use-lyric";
import Scroll from "@/components/base/scroll/Scroll";
export default {
  name: "",
  props: {
    songReady: Boolean,
    currentTime: Number
  },
  setup(props) {
    const { currentLyric, currentLineNum } = useLyric(props);
    return { currentLyric, currentLineNum };
  },
  components: { Scroll }
};
</script>

<style lang="scss" scoped>
.lyric-scroll {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .lyric-wrapper {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    .text {
      line-height: 32px;
      color: $color-text-l;
      font-size: $font-size-medium;
      &.current {
        color: $color-text;
      }
    }
    .pure-music {
      padding-top: 50%;
      line-height: 32px;
      color: $color-text-l;
      font-size: $font-size-medium;
    }
  }
}
</style>
