import { ref, computed } from "vue";
export default function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18;
  const touch = {};
  const scrollRef = ref(null);
  const shortcutList = computed(() => {
    return props.data.map(group => {
      return group.title;
    });
  });
  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index);
    touch.anchorIndex = anchorIndex;
    touch.y1 = e.touches[0].pageY;
    scrollTo(anchorIndex);
  }
  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY;
    //  | 0 向下取整
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0;
    const anchorIndex = touch.anchorIndex + delta;
    scrollTo(anchorIndex);
  }

  function scrollTo(index) {
    //如果没有在范围内拖动
    if (isNaN(index)) return;
    // NB,通过最大最小值限定index的范围
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index));
    const targetEl = groupRef.value.children[index];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEl, 100);
  }
  return { shortcutList, onShortcutTouchStart, onShortcutTouchMove, scrollRef };
}
