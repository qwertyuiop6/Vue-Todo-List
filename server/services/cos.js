require("dotenv").config();
const fs = require("fs");
const COS = require("cos-nodejs-sdk-v5");
const cos = require("../configs/cos");
const cloud = new COS({
  SecretId: cos.SecretId,
  SecretKey: cos.SecretKey
});

function uploadIMG(path, name) {
  // const Key = path
  //   .split(path.sep)
  //   .slice(-2)
  //   .join("/");
  return new Promise((res, rej) => {
    cloud.putObject(
      {
        Bucket: cos.Bucket,
        Region: cos.Region,
        Key: name,
        StorageClass: "STANDARD",
        Body: fs.createReadStream(path), // 上传文件对象
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData));
        }
      },
      function(err, data) {
        if (err) rej(err);
        console.log("[TX云COS]上传成功-> " + name);
        res(name);
      }
    );
  });
}

module.exports = {
  uploadIMG
};
