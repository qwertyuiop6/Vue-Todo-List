const { pool } = require("./pg");

function add(uid, { target, startDate, status, endDate }) {
  return pool.query(
    "INSERT INTO public.todo_list(id,uid, content,start_date,end_date,status) VALUES(nextval('todo_list_id_seq'), $1,$2,$3,$4,$5)",
    [uid, target, startDate, endDate, status]
  );
}

function del(id) {
  return pool.query("delete from public.todo_list where id=$1", [id]);
}

function update(todoId, todoData) {
  const col = ["status", "content"];
  const params = Object.keys(todoData).filter(v => col.includes(v));
  const setString = params.reduce((acc, p, i) => [...acc, p + "=$" + (i + 2)], []).join(",");
  const sql = `update public.todo_list set ${setString} where id=$1`;
  // const data=Object.values(todoData).map(v => (isFinite(v) ? +v : v)) //可能会有顺序问题
  const data = params.map(v => (isFinite(todoData[v]) ? +todoData[v] : todoData[v]));
  const arr = [todoId, ...data];
  // console.log(sql, arr);
  return pool.query(sql, arr);
}

function get(uid, id = null) {
  if (id === "all") {
    return pool.query("select * from public.todo_list where uid=$1", [uid]);
  } else {
    return pool.query("select * from public.todo_list where uid=$1 and id=$2", [uid.id]);
  }
}

function clear(uid) {}

module.exports = {
  add,
  get,
  del,
  update
};
