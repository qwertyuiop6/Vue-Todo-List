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
  if (name)
    return pool.query("select name,id,passwd,salt,avatar from public.user where name=$1", [name]);
  return pool.query("select * from public.user where id=$1", [uid]);
}

function update(uid, userData) {
  const col = ["status", "avatar"];
  const params = Object.keys(userData).filter(v => col.includes(v));
  const setString = params.reduce((acc, p, i) => [...acc, p + "=$" + (i + 2)], []).join(",");
  const sql = `update public.user set ${setString} where id=$1`;
  const data = params.map(v => userData[v]);
  const arr = [uid, ...data];
  console.log(sql, arr);
  return pool.query(sql, arr);
}

module.exports = {
  createUser,
  get,
  update,
  getUserCount
};
