const path = require("path");
const fs = require("fs");

module.exports = {
  port: 8008,
  koa: {
    proxy: true, //代理模式
    proxyIpHeader: "X-Real-IP", //代理x-real-ip头
    // maxIpsCount: 1, //反代数
  },
  static: {
    maxage: 60 * 1000, //cache-control强缓存
    setHeaders: addEtag, //设置Etag协商缓存
  },
  bodyParser: {
    multipart: true,
    formidable: {
      uploadDir: "files", //本地文件保存路径
      keepExtensions: true,
      hash: "sha256",
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
  logPath: "logs", //日志路径
  useCOS: false, // 是否使用云对象存储
};

//静态文件设置E-tag
function addEtag(res, path, stats) {
  res.setHeader("Etag", `W/"${stats.size}-${stats.mtime.getTime()}"`);
}

function saveFile(name, file) {
  // console.log(name, file);
  const pathSplit = file.path.split(path.sep);
  const uploadName = pathSplit.pop();
  const filePath = pathSplit.concat(name).join(path.sep);
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
  // file.path = file.path.replace(/upload_[1-9a-z]+/i, path.join(name, hash));
  file.path = path.join(filePath, uploadName);
}
