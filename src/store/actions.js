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

export function removeSong({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice();
  const playlist = state.playlist.slice();

  const sequenceIndex = findIndex(sequenceList, song);
  const playIndex = findIndex(playlist, song);
  // 防止删除过快
  if (sequenceIndex < 0 || playIndex < 0) {
    return;
  }

  sequenceList.splice(sequenceIndex, 1);
  playlist.splice(playIndex, 1);

  let currentIndex = state.currentIndex;
  // 如果删除当前播放歌的前面的歌 或者  当前歌曲为列表的最后一首
  if (playIndex < currentIndex || currentIndex === playlist.length) {
    currentIndex--;
  }

  commit("setSequenceList", sequenceList);
  commit("setPlaylist", playlist);
  commit("setCurrentIndex", currentIndex);
  if (!playlist.length) {
    commit("setPlayingState", false);
  }
}
export function clearSongList({ commit }) {
  commit("setSequenceList", []);
  commit("setPlaylist", []);
  commit("setCurrentIndex", 0);
  commit("setPlayingState", false);
}
export function addSong({ commit, state }, song) {
  const playlist = state.playlist.slice();
  const sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  const playIndex = findIndex(playlist, song);

  if (playIndex > -1) {
    currentIndex = playIndex;
  } else {
    playlist.push(song);
    currentIndex = playlist.length - 1;
  }

  const sequenceIndex = findIndex(sequenceList, song);
  if (sequenceIndex === -1) {
    sequenceList.push(song);
  }

  commit("setSequenceList", sequenceList);
  commit("setPlaylist", playlist);
  commit("setCurrentIndex", currentIndex);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
}
function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id;
  });
}
