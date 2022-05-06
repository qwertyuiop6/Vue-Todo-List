const path = require("path");
const fs = require("fs");

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

module.exports = {
  addEtag,
  saveFile,
};
