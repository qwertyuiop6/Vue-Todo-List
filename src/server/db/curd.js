const {
    Pool
} = require('pg')
const dbConf = require('../config/dbConf')
const pool = new Pool(dbConf)


//todo_list表操作
function addTodo(uid, {
    target,
    startDate,
    status,
    endDate
}) {
    // let todoId = String.prototype.slice.call(new Date().getTime(), -6) + uid.padStart(3, '0') + Math.random().toString().slice(-6)
    return pool.query('INSERT INTO public.todo_list(id,uid, content,start_date,end_date,status) VALUES(nextval(\'todo_list_id_seq\'), $1,$2,$3,$4,$5)', [uid, target, startDate, endDate, status])
}

function delTodo(todoId, uid) {
    return pool.query('delete from public.todo_list where uid=$1 and id=$2', [uid, todoId])
}

function setStatus(todoId, status) {
    return pool.query('update public.todo_list set status=$2 where id=$1', [todoId, status])
}

function getAll(uid) {

    return pool.query('select * from public.todo_list where uid=$1', [uid])
}

function clear(uid) {

}


//user表操作

// function getUserCount() {
//     return pool.pool.query('select count(*) from users')
// }

function createUser(name, passwd) {
    return pool.query('insert into public.user(id,name,passwd) values(nextval(\'user_id_seq\'),$1,$2)', [name, passwd])
}

function getUserInfo(name) {
    return pool.query('select passwd,id from public.user where name=$1', [name])
}

module.exports = {
    createUser,
    getUserInfo,
    addTodo,
    getAll,
    delTodo,
    setStatus,
}

