import BScroll from "@better-scroll/core";
// 轮播图下方小点
import Slide from "@better-scroll/slide";
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from "vue";
BScroll.use(Slide);
export default function useSlider(wrapperRef) {
  const slider = ref(null);
  const currentPageIndex = ref(0);
  onMounted(() => {
    const sliderVal = (slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      //快速滑动时,是否会有惯性
      momentum: false,
      //是否开启回弹动画
      bounce: false,
      probeType: 2,
      slide: true
    }));
    sliderVal.on("slideWillChange", page => {
      currentPageIndex.value = page.pageX;
    });
  });
  onUnmounted(() => {
    slider.value.destroy();
  });
  onActivated(() => {
    slider.value.enable();
    slider.value.refresh();
  });
  onDeactivated(() => {
    slider.value.disable();
  });
  return { slider, currentPageIndex };
}
