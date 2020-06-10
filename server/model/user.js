const {
    Pool
} = require('pg')
const dbConf = require('../config/dbConf')
const pool = new Pool(dbConf)

//user表操作

function getUserCount(name = '') {
    if (name) {
        return pool.query('select count(*) from public.user where name=$1', [name])
    }
    return pool.query('select count(*) from public.user')
}

function createUser(name, passwd) {
    return pool.query('insert into public.user(id,name,passwd) values(nextval(\'user_id_seq\'),$1,$2)', [name, passwd])
}

function getUserInfo(name) {
    return pool.query('select name,passwd,id from public.user where name=$1', [name])
}


module.exports = {
    createUser,
    getUserInfo,
    getUserCount
}