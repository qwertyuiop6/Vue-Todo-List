const { pool } = require("./pg");

//todo_list表操作
function add(uid, { target, startDate, status, endDate }) {
  // let todoId = String.prototype.slice.call(new Date().getTime(), -6) + uid.padStart(3, '0') + Math.random().toString().slice(-6)
  return pool.query(
    "INSERT INTO public.todo_list(id,uid, content,start_date,end_date,status) VALUES(nextval('todo_list_id_seq'), $1,$2,$3,$4,$5)",
    [uid, target, startDate, endDate, status]
  );
}

function del(id) {
  return pool.query("delete from public.todo_list where id=$1", [id]);
}

function setStatus(todoId, status) {
  return pool.query("update public.todo_list set status=$2 where id=$1", [todoId, status]);
}

function getAll(uid) {
  return pool.query("select * from public.todo_list where uid=$1", [uid]);
}

function clear(uid) {}

module.exports = {
  add,
  getAll,
  del,
  setStatus
};
