const crypto = require("crypto");

function encrypt(
  passwd,
  salt = Math.random()
    .toString(16)
    .slice(-10)
) {
  let passwd_hash = sha256(passwd, salt);
  return { passwd_hash, salt };
}

function sha256(passwd, salt) {
  let hash = crypto.createHmac("sha256", salt);
  hash.update(passwd);
  return hash.digest("hex");
}

module.exports = encrypt;
