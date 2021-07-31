const registerRouter = require("./backend/router");
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  // 启动本地服务器
  devServer: {
    before(app) {
      registerRouter(app);
    }
  },
  // webpack分析
  configureWebpack: config => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
        .BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  },
  // 禁止访问源码
  productionSourceMap: false
};
