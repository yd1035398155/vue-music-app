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

跨域获取轮播图数据

BScroll+Slide,完成轮播图部分

实现图片懒加载

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
