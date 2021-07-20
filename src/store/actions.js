import { PLAY_MODE } from "@/assets/js/constant";
import { shuffle } from "@/assets/js/utils";
// 第一个参数是一个对象,可从中解构出commit
export function selectPlay({ commit }, { list, index }) {
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", list); // 先不考虑随机播放的情况
  commit("setCurrentIndex", index);
}
export function randomPlay({ commit }, list) {
  commit("setPlayMode", PLAY_MODE.random);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", shuffle(list));
  commit("setCurrentIndex", 0);
}
// 改变播放模式,并且保持当前播放的歌的状态
export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id;
  // const oldsong = getters.currentSong;
  if (mode === PLAY_MODE.random) {
    commit("setPlaylist", shuffle(state.playlist));
  } else {
    commit("setPlaylist", state.sequenceList);
  }
  const index = state.playlist.findIndex(song => {
    return song.id === currentId;
  });
  // const newsong = getters.currentSong;
  commit("setCurrentIndex", index);
  commit("setPlayMode", mode);
}
