module.exports = {
  devServer: {
    host: "localhost",
    // host: "0.0.0.0", //远程开发
    // public: ",
    port: 8080, // 设置默认端口
    // 设置代理请求
    proxy: {
      "/api/*": {
        // 目标 API 地址
        target: "http://localhost:8008",
        // 将原地址主机更改为目标主机
        changeOrigin: true,
      },
      // "/auth/*": {
      //   // 目标 API 地址
      //   target: "http://localhost:8000",
      //   // 将原地址主机更改为目标主机
      //   changeOrigin: true
      // }
    },
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: true,
};
