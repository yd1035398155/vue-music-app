import { useStore } from "vuex";
import { computed } from "vue";
import { PLAY_MODE } from "@/assets/js/constant";
export default function useMode() {
  const store = useStore();
  const playMode = computed(() => store.state.playMode);
  const modeIcon = computed(() => {
    switch (playMode.value) {
      case PLAY_MODE.sequence:
        return "icon-sequence";
      case PLAY_MODE.loop:
        return "icon-loop";
      default:
        return "icon-random";
    }
  });
  function changeMode() {
    const mode = (playMode.value + 1) % 3;
    // store.commit("setPlayMode", mode);
    // 相当于mapActions,调用actions中的changeMode
    store.dispatch("changeMode", mode);
  }
  return { modeIcon, changeMode };
}
