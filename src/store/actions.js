import { PLAY_MODE } from "@/assets/js/constant";
export function selectPlay({ commit, state }, { list, index }) {
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  // 先不考虑随机播放的情况
  commit("setPlaylist", list);
  commit("setCurrentIndex", index);
}
