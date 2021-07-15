import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";
import loadingDirective from "@/components/base/loading/directive";
import noResultDirective from "@/components/base/no-result/directive";
// 引入样式
import "@/assets/scss/index.scss";
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
