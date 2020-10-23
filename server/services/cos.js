require("dotenv").config();
const fs = require("fs");
const COS = require("cos-nodejs-sdk-v5");
const cfg = require("../configs/cos");
const cloud = new COS({
  SecretId: cfg.SecretId,
  SecretKey: cfg.SecretKey
});

function uploadFile(path, type, name) {
  const Key=`${cfg.FilePath[type]}/${name}`
  return new Promise((res, rej) => {
    cloud.putObject(
      {
        Bucket: cfg.Bucket,
        Region: cfg.Region,
        Key,
        StorageClass: "STANDARD",
        Body: fs.createReadStream(path), // 上传文件对象
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData));
        }
      },
      function(err, data) {
        if (err) rej(err);
        console.log("[TX云COS]上传成功-> " + Key);
        res(`${cfg.domain}/${Key}`);
      }
    );
  });
}

module.exports = {
  uploadFile
};
