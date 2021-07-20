import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { getLyric } from "@/service/song";
import Lyric from "lyric-parser";
export default function useLyric(props) {
  const currentLyric = ref(null);
  const currentLineNum = ref(0);
  const store = useStore();
  const currentSong = computed(() => {
    return store.getters.currentSong;
  });
  const songReady = computed(() => {
    return props.songReady;
  });
  const currentTime = computed(() => {
    return props.currentTime;
  });
  watch(currentSong, async newSong => {
    if (!newSong.url || !newSong.id) return;
    const lyric = await getLyric(newSong);
    store.commit("addSongLyric", {
      song: newSong,
      lyric
    });
    // 如果切歌了,就不加载了
    if (currentSong.value.lyric !== lyric) {
      return;
    }
    currentLyric.value = new Lyric(lyric, handleLyric);
    if (songReady.value) {
      playLyric();
    }
  });
  watch(songReady, () => {
    playLyric();
  });
  function handleLyric({ lineNum }) {
    currentLineNum.value = lineNum;
  }
  function playLyric() {
    const currentLyricVal = currentLyric.value;
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000);
    }
  }

  return { currentLyric, currentLineNum, playLyric };
}
