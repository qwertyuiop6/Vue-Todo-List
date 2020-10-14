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

function get({ name = null, uid = null }) {
  if (name) return pool.query("select name,id,passwd,salt from public.user where name=$1", [name]);
  return pool.query("select * from public.user where id=$1", [uid]);
}

function update({ status = null, uid = null }) {
  return pool.query("update public.user set status=$2 where id=$1", [uid, status]);
}

module.exports = {
  createUser,
  get,
  update,
  getUserCount
};
