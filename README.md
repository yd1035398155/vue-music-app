# vue-music-app

导入图标字体

package.json 中 script 部分可编写 npm run ~的快捷脚本

scss 写了变量和函数后,若需要全局引入,可在 vue.config.js 中配置(注意 sass-loader 版本)

图标字体部分的 scss 写好后,在 main.js 里引入

## Tab 栏开发

<router-link/>组件来指定到哪个页面
通过 v-for 遍历 Tab 组件中的 data,添加 to(到哪个页面) key(diff 算法优化)和{{item.name}}

router-index.js 中设置对应路由:
routes = [{path:'',redirect:'/recommend'},{path:'/recommend',components:Recommend}]
第一个对象为默认页面

&router-link-active 属性指定当前页面,当前页面会高亮
注意父级元素选择器的作用.不加父级选择器会默认在标签间加空格

定义好基础视图组件(在 view 中)(recommend singer toplist search )

<router-view /> 路由视图,有了这个就可以显示各个路由组件了

注意 hash 路由(#)和 history(HTML 5) 路由的区别,路由完成后,开始开发各个单独页面

## 推荐页面(view/recommend)

解决跨域问题,复习其他跨域请求方法(如 JSONP,CORS):
1 起一个自己的 node server 本地服务器
2 在 vue.config.js 启动本地服务器
3 远程服务器->本地服务器->前端

轮播图和推荐歌单在一个接口里
轮播图数据(sliders):包含三个字段 1.id 2.pic 3.link
推荐歌单(albums):包括四个字段 1.id 2.username 3.title 4.pic

安装 axios
npm i axios -S
-S 为生产环境(Dependencies) -D 为开发环境(devDependencies)
封装 get 和 getRecommend

在 created 中请求数据,并加上 async 和 await

# BScroll+Slide,完成轮播图部分 (component/base/slide)

ref API 是 vue 暴露的,注意:通过 ref 创建的响应式对象,在使用时需要加上.value
在 slide 中创建 setup,创建 use-slide.js 完成具体功能
use-slide 中,在 onMounted 中初始化轮播图,完成配置项,在 onUnmounted 中销毁轮播图
完成 dots 小点,通过监听 slideWillChange 事件,监听 pageX 的变化,得到 currentIndex

在 recommend 中引入 slide 组件,完成轮播图

# 轮播图完成

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

## 播放器(+mini 播放器)

1.播放器基础样式和功能实现

通过控制 全局属性 fullScreen,来显示或者隐藏播放器

vuex-getter 中的 currentSong 通过 playlist 和 currentIndex 计算而来

由于 play 逻辑功能复杂,所以使用 vue3 的 Composition API
Composition API 中不能使用 this,vue3 提供了对应的 API,如 this.\$store = useStore
如果希望 fullScreen 是响应式的,要使用计算属性,如 const fullScreen = computed(()=>store.state.fullScreen)
setup 函数中定义的数据,需要 return 出去.如 return{ fullScreen,currentSong }

将 player 组件放在 app.vue 主页面中

报错处理:初始时,playlist 为空,currenIndex = 0,播放器中有 currentSong.pic 报错,因为 undefined.pic.
解决:getter 中修改 currentSong = state.playlist[currentIndex]|| {},加一个空对象,空对象没有 pic 属性,但不会报错

v-if 和 v-show 的区别:
v-if 动态删除或增加 DOM 节点,false 时不会执行内部的逻辑
v-show:仅仅是 display:none;

2. 播放功能实现:

拿到 audio 的 ref,监听 currenSong 的变化,将 currentSong 的 url 赋值给 audioEl.src,并且 audioEl.play()

退出按钮:监听点击事件,把 fullScreen 的值 改为 false.

播放按钮是一个动态变化的字体图标,根据不同的播放状态,将 class 改为 icon-play or icon-pause
实现:通过动态绑定 class <div :class="playIcon"> playIcon 为计算属性

同时将 audio 的 play()和 pause() 方法关联起来,通过监听 playing 全局状态实现

注意:其他原因会导致歌曲暂停,如息屏.在 audio 标签监听@pause 事件,目的是修改 playing 的状态.

3. 前进和后退实现:

实际上控制 currentIndex 来实现前进和后退

边界情况:index =-1 时,将 index 指向列表的最后一首歌,当 index 为 playlist 的长度时,让其等于 0;
并且切歌时,如果为暂停状态,将暂停状态改为播放状态
并且如果歌单只有一首歌,循环播放这首歌.通过 loop 函数实现.将 audio.currentTime = 0 ,audio.play();
并且如果歌单没有歌,直接返回,不执行任何操作

4. 处理 DOM 异常显示:

点击播放和快速切歌时会报错:the play() request was interrupted by a new load request.
解决:歌曲需要缓冲时间,当 audio 准备好后,会触发 canplay 事件,监听 canplay,触发 ready 函数
注意歌曲是流式数据,会多次缓冲,我们只需判断第一次可以播放的时刻.
ready 函数改变 songready 状态为 true,且 songready 为 true 时,直接返回.切歌改变 songready 为 false

通过 songready 状态,重写 playing 的监听

disableCls 修改未准备好时候的样式

监听 audio 的 error 事件,防止 songready 一直为 false 不能切歌.

5. 播放模式实现

使用 use-mode.js 钩子函数完成播放模式的相关逻辑

通过播放模式改变 icon

改变播放模式,并保持当前的歌曲不变使用 store->actions->changeMode 来实现

mutations 中的操作通过 commit 实现,ations 中的操作通过 dispatch 实现

6. 歌曲收藏(本地存储)

使用 use-favorite.js 钩子函数完成收藏相关逻辑

存一个全局状态 favoriteList 收藏列表

改变 icon

本地 localstorage

7. 进度条相关逻辑

创建 progress-bar.vue 完成进度条模块

接收 progress 参数,默认为 0,最大为 1
设置一个偏移量 offset 来控制位置
监听 progress 来改变 offset

进度条实现:
添加动态属性,控制 offset 来 控制 progress(宽度) 和 progressBtn(transform:translate(offset px,0,0)) 的位置

player 中定义 progress = currentTime / currentSong.value.duration;(0~1)

监听 audio 的原生事件 @timeupdate = updateTime,用来更新 currentTime = e.target.currentTime

currentTime 为毫秒数,格式化歌曲时间 formatTime 函数来实现分:秒格式
分钟: (interval/60|0+"").padStart(2,"0")
秒: ((interval%60|0)+"").padStart(2,"0")

实现拖动进度条歌曲跟随改变:
监听三个事件:@touchstart.prevent @touchmove.prevent @touchend.prevent
onTouchStart(e):
保存开始移动的位置: x1 = e.touches[0].pagex
保存进度条开始移动时的宽度: beginWidth = this.\$refs.progress.clientWidth;
onTouchMove(e):(通过当前进度百分比 x barwidth 来更新 offset)
计算开始位置与现在位置的偏差: delta = e.touches[0].pagex - x1;
计算现在进度条的宽度: tempWidth = beginWidth + delta;
计算 progress 的百分比: Math.min(1,Math.max(0,tempWidth/barWidth))
更新 offset: barWidth x progress;
派发 progress-changing 事件,将 progress 传出去
onTouchEnd(e):()
派发 progress-changed 事件,将 progress 传出去

此时能拖动进度条,但歌曲不会发生改变,因为没有和 player 关联起来

player 组件内:
监听上面派发的事件,得到 progress
progress-changing:(未松手)
currentTime = progress x 歌曲总时长
progress-changed:(松手)

## 收藏功能
