# vue-music-app

导入图标字体

package.json 中 script 部分可编写 npm run ~的快捷脚本

scss 写了变量和函数后,若需要全局引入,可在 vue.config.js 中配置(注意 sass-loader 版本)

图标字体部分的 scss 写好后,在 main.js 里引入

<router-link/>组件来指定到哪个页面

router-link-active 属性指定当前页面

<router-view /> 路由视图

注意 hash 路由(#)和 history(HTML 5) 路由的区别,路由完成后,开始开发各个单独页面

在 vue.config.js 启动本地服务器

远程服务器->本地服务器->前端

## 推荐页面

跨域获取轮播图数据

BScroll+Slide,完成轮播图部分

实现图片懒加载

## 歌手页面

vue 收集依赖

刷新页面报错解决,localstorage(页面关闭后依旧保存) 和 sessionstorage(页面关闭不保存,刷新后依然保存)

router 和 route:router 是 VueRouter 的实例,相当于一个全局路由器对象,页面跳转可用 this.\$router.push
route 相当于当前的跳转对象,可从中获取{name,path,params,query};

进入和离开歌手页面的过度动画

歌单加载失败时的容错机制

vuex -debug 模式

如何使用 vuex,...mapActions([])

随机播放的显示 bug

## 播放器

处理 DOM 异常显示

收藏功能
