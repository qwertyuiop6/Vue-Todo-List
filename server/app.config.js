const path = require("path");

function addEtag(res, path, stats) {
  res.setHeader("Etag", `W/"${stats.size}-${stats.mtime.getTime()}"`);
}

function saveFile(name, file) {}

module.exports = {
  port: 8000,
  koa: {
    proxy: true, //代理模式
    proxyIpHeader: "X-Real-IP" //代理x-real-ip头
    // maxIpsCount: 1, //反代数
  },
  static: {
    maxage: 60 * 1000, //cache-control强缓存
    setHeaders: addEtag //设置Etag协商缓存
  },
  bodyParser: {
    // enableTypes: ["json", "form", "text"]
    multipart: true,
    formidable: {
      // uploadDir: "./files",
      keepExtensions: true,
      hash: "sha1",
      onFileBegin: saveFile
    }
  },
  cors: {
    origin: function(ctx) {
      return "*";
    },
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowHeaders: ["authorization", "Content-Type"],
    maxAge: 86400 //24-hours
  }
};
