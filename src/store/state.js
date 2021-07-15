import { PLAY_MODE } from "@/assets/js/constant";
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
  fullScreen: false
};
export default state;
