<template>
  <scroll class="index-list" :probe-type="3" @scroll="onScroll" ref="scrollRef">
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            class="item"
            @click="onItemClick(item)"
          >
            <img v-lazy="item.pic" alt="" class="avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-show="fixedTitle" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          class="item"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/base/scroll/Scroll";
import useFixed from "./use-fixed";
import useShortcut from "./use-shortcut";
export default {
  name: "IndexList",
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: ["select"],
  setup(props, { emit }) {
    const {
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      currentIndex
    } = useFixed(props);
    const {
      shortcutList,
      onShortcutTouchStart,
      onShortcutTouchMove,
      scrollRef
    } = useShortcut(props, groupRef);
    function onItemClick(item) {
      emit("select", item);
    }
    return {
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      currentIndex,
      shortcutList,
      onShortcutTouchStart,
      onShortcutTouchMove,
      scrollRef,
      onItemClick
    };
  }
};
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .group {
    .title {
      height: 30px;
      line-height: 30px;
      background: $color-highlight-background;
      padding-left: 20px;
      font-size: 12px;
      color: $color-text-l;
    }
    .item {
      display: flex;
      padding-left: 30px;
      padding-top: 20px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
      .name {
        display: inline-block;
        color: $color-text-l;
        font-size: $font-size-medium;
        line-height: 50px;
        margin-left: 20px;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .shortcut {
    position: absolute;
    width: 20px;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    font-size: 12px;
    padding: 20px 0;
    .item {
      padding: 3px;
      color: $color-text-l;
      &.current {
        color: yellow;
      }
    }
  }
}
</style>
