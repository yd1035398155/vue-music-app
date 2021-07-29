// 储存搜索历史
import { save, remove, clear } from "@/assets/js/array-store";
import { SEARCH_KEY } from "@/assets/js/constant";
import { useStore } from "vuex";
export default function useSearchHistory() {
  const store = useStore();
  const maxLen = 200;
  function saveSearch(query) {
    const searches = save(
      query,
      SEARCH_KEY,
      item => {
        return item === query;
      },
      maxLen
    );
    store.commit("setSearchHistory", searches);
  }
  function deleteSearch(query) {
    const searches = remove(SEARCH_KEY, item => {
      return query === item;
    });
    store.commit("setSearchHistory", searches);
  }
  function clearSearch() {
    const searches = clear(SEARCH_KEY);
    store.commit("setSearchHistory", searches);
  }
  return { saveSearch, deleteSearch, clearSearch };
}
