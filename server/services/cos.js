const path = require("path");
const fs = require("fs");
const COS = require("cos-nodejs-sdk-v5");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { SecretId, SecretKey, Bucket, Region, domain, avatar } = process.env;

const cloud = new COS({
  SecretId,
  SecretKey,
});

function uploadFile(fullPath, type, name) {
  const Key = `${type}/${name}`;
  return new Promise((res, rej) => {
    cloud.putObject(
      {
        Bucket,
        Region,
        Key,
        StorageClass: "STANDARD",
        Body: fs.createReadStream(fullPath), // 上传文件对象
        onProgress: function (progressData) {
          // console.log(JSON.stringify(progressData));
        },
      },
      function (err, data) {
        if (err) rej(err);
        console.log("[TX云COS]上传成功-> " + Key);
        res(`${domain}/${Key}`);
      }
    );
  });
}

module.exports = {
  uploadFile,
};
