import { useStore } from "vuex";
import { computed } from "vue";
import { save, remove } from "@/assets/js/array-store";
import { FAVORITE_KEY } from "@/assets/js/constant";

export default function useFavorite() {
  const store = useStore();
  const MAX_LEN = 100;
  const favoriteList = computed(() => store.state.favoriteList);
  // icon
  function getFavoriteIcon(song) {
    return isFavorite(song) ? "icon-favorite" : "icon-not-favorite";
  }
  function toggleFavorite(song) {
    // 如果歌在收藏列表,则移除,否则加入
    let list;
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare);
    } else {
      list = save(song, FAVORITE_KEY, compare, MAX_LEN);
    }
    store.commit("setFavoriteList", list);
    // 比较函数
    function compare(item) {
      return item.id === song.id;
    }
  }
  function isFavorite(song) {
    return (
      favoriteList.value.findIndex(item => {
        return item.id === song.id;
      }) > -1
    );
  }

  return { getFavoriteIcon, toggleFavorite };
}
