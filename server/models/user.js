const { pool } = require("./pg");

//user表操作
function getUserCount(name = "") {
  if (name) {
    return pool.query("select count(*) from public.user where name=$1", [name]);
  }
  return pool.query("select count(*) from public.user");
}

function createUser(name, passwd, salt) {
  return pool.query(
    "insert into public.user(id,name,passwd,salt) values(nextval('user_id_seq'),$1,$2,$3)",
    [name, passwd, salt]
  );
}

function getUserInfo(name) {
  return pool.query("select * from public.user where name=$1", [name]);
}

module.exports = {
  createUser,
  getUserInfo,
  getUserCount
};
