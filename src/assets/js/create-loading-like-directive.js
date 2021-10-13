import { createApp } from "vue";
import { addClass, removeClass } from "@/assets/js/dom";
// 相对定位,在scss/base中
const relativeCls = "g-relative";

export default function createLoadingLikeDirective(Comp) {
  return {
    // el 为 绑定自定义事件的节点
    // binding为传递参数,注意要加value
    mounted(el, binding) {
      const app = createApp(Comp);

      const instance = app.mount(document.createElement("div"));
      const name = Comp.name;
      if (!el[name]) {
        el[name] = {};
      }
      // 将ins挂载到el上
      el[name].instance = instance;

      const title = binding.arg;
      if (typeof title !== "undefined") {
        instance.setTitle(title);
      }

      if (binding.value) {
        append(el);
      }
    },
    updated(el, binding) {
      const title = binding.arg;
      const name = Comp.name;
      if (typeof title !== "undefined") {
        el[name].instance.setTitle(title);
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    }
  };
  // 挂载操作
  function append(el) {
    const name = Comp.name;
    const style = getComputedStyle(el);
    if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
      addClass(el, relativeCls);
    }
    el.appendChild(el[name].instance.$el);
  }
  // 移除操作
  function remove(el) {
    const name = Comp.name;
    removeClass(el, relativeCls);
    el.removeChild(el[name].instance.$el);
  }
}
