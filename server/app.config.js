const path = require("path");
const { addEtag, saveFile } = require("./utils/staticFile");

module.exports = {
  port: 8008,
  koa: {
    proxy: true, //代理模式
    proxyIpHeader: "X-Real-IP", //代理x-real-ip头
    // maxIpsCount: 1, //反代数
  },
  staticOptions: {
    maxage: 60 * 1000, //cache-control强缓存
    setHeaders: addEtag, //设置Etag协商缓存
  },
  bodyParser: {
    multipart: true,
    formidable: {
      uploadDir: path.resolve(__dirname, "./uploads"), //本地文件保存路径
      keepExtensions: true,
      hashAlgorithm: "sha256",
      onFileBegin: saveFile,
    },
  },
  cors: {
    origin: function () {
      return "*"; //配置跨域
    },
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowHeaders: ["authorization", "Content-Type"],
    maxAge: 86400, //24-hours
  },
  logPath: path.resolve(__dirname, "./logs"), //日志路径
  useCOS: false, // 是否使用云对象存储
};
