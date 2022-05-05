const fs = require("fs");
const path = require("path");
const { timestamp2str: t2s } = require("./date");

module.exports = function save2log(logPath, type, data) {
  const now = new Date();
  const filepath = path.resolve(logPath, type);
  const filename = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.log`;
  if (!fs.existsSync(filepath)) fs.mkdirSync(filepath, { recursive: true });

  if (type === "error") {
    // Object.getOwnPropertyNames(data)
    const { status, message, info, stack } = data;
    data = `${t2s(now)} ${status ? "status: " + status : ""} message：${message} ${
      info ? JSON.stringify(info) : ""
    }
      stack: ${stack}\n`;
  }

  fs.writeFile(path.join(filepath, filename), data, { flag: "a" }, (err) => {
    if (err) log(err);
  });
};
