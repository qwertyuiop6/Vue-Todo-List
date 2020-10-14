module.exports = {
  devServer: {
    // host: "localhost",
    //远程开发
    host: "0.0.0.0",
    public: "129.211.173.197/",
    // 设置默认端口
    port: 8080,
    // 设置代理请求
    proxy: {
      "/api/*": {
        // 目标 API 地址
        target: "http://localhost:8000",
        // 将原地址主机更改为目标主机
        changeOrigin: true
      }
      // "/auth/*": {
      //   // 目标 API 地址
      //   target: "http://localhost:8000",
      //   // 将原地址主机更改为目标主机
      //   changeOrigin: true
      // }
    }
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: true
};
