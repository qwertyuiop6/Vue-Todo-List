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
    return pool.query('INSERT INTO todo_list(todo_id,uid, content,start_date,end_date,status) VALUES(nextval(\'todo_list_todo_id_seq\'), $1,$2,$3,$4,$5)', [uid, target, startDate, endDate, status])
}

function delTodo(todoId, uid) {
    return pool.query('delete from todo_list where uid=$1 and todo_id=$2', [uid, todoId])
}

function setStatus(todoId, status) {
    return pool.query('update todo_list set status=$2 where todo_id=$1', [todoId, status])
}

function getAll(uid) {

    return pool.query('select * from todo_list where uid=$1', [uid])
}


//user表操作

function createUser(name, passwd) {
    return pool.query('insert into users(uid,u_name,u_passwd) values(nextval(\'users_uid_seq\'),$1,$2)', [name, passwd])
}

function getUserInfo(name) {
    return pool.query('select u_passwd,uid from users where u_name=$1', [name])
}

module.exports = {
    createUser,
    getUserInfo,
    addTodo,
    getAll,
    delTodo,
    setStatus,
}