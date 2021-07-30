import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";
import loadingDirective from "@/components/base/loading/directive";
import noResultDirective from "@/components/base/no-result/directive";
import { load, saveAll } from "@/assets/js/array-store";
import { FAVORITE_KEY, PLAY_KEY } from "@/assets/js/constant";
import { processSongs } from "@/service/song";
// 引入样式
import "@/assets/scss/index.scss";
// 更新过期的歌曲URL
const favoriteSongs = load(FAVORITE_KEY);
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then(songs => {
    store.commit("setFavoriteList", songs);
    saveAll(songs, FAVORITE_KEY);
  });
}
const historySongs = load(PLAY_KEY);
if (historySongs.length > 0) {
  processSongs(historySongs).then(songs => {
    store.commit("setPlayHistory", songs);
    saveAll(songs, PLAY_KEY);
  });
}
createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    loading: require("@/assets/images/default.png")
  })
  // 自定义指令,注册完成后可在组件中使用v-loading
  .directive("loading", loadingDirective)
  .directive("no-result", noResultDirective)
  .mount("#app");
