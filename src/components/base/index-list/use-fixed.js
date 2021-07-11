import { ref, watch, nextTick, computed } from "vue";

export default function useFixed(props) {
  const TITLE_HEIGHT = 30;
  const groupRef = ref(null);
  const listHeights = ref([]);
  const scrollY = ref(0);
  const currentIndex = ref(0);
  const distance = ref(0);

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) return "";
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
  });
  const fixedStyle = computed(() => {
    const distanceVal = distance.value;
    const diff =
      distanceVal > 0 && distanceVal < TITLE_HEIGHT
        ? distanceVal - TITLE_HEIGHT
        : 0;
    return {
      transform: `translate3d(0,${diff}px,0)`
    };
  });
  //监听props.data,并执行异步函数(DOM对象更新后,计算高度)
  watch(
    () => props.data,
    async () => {
      await nextTick();
      calculate();
    }
  );
  watch(scrollY, newY => {
    const listHeightsVal = listHeights.value;
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      let heightTop = listHeightsVal[i];
      let heightBottom = listHeightsVal[i + 1];
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i;
        distance.value = heightBottom - newY;
      }
    }
  });
  function calculate() {
    const list = groupRef.value.children;
    const listHeightsVal = listHeights.value;
    let height = 0;
    listHeightsVal.length = 0;
    listHeights.value.push(height);
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeightsVal.push(height);
    }
  }
  function onScroll(pos) {
    scrollY.value = -pos.y;
  }
  return { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex };
}
