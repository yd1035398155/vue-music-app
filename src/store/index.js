import { createStore, createLogger } from "vuex";
import state from "./state";
import mutations from "./mutations";
import * as getters from "./getters";
import * as actions from "./actions";
// 获取开发环境
const debug = process.env.NODE_ENV !== "production";
export default createStore({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
