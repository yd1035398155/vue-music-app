import { load } from "@/assets/js/array-store";
import { PLAY_MODE, FAVORITE_KEY, SEARCH_KEY } from "@/assets/js/constant";

const state = {
  //原始歌单
  sequenceList: [],
  // 真正的播放歌单,收到播放模式的影响
  playlist: [],
  // 播放状态,是否正在播放
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  // 是否全屏播放
  fullScreen: false,
  favoriteList: load(FAVORITE_KEY),
  searchHistory: load(SEARCH_KEY),
  playHistory: []
};
export default state;
