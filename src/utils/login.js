import Cookie from 'js-cookie';
import {
    get,
    post
} from "./http";

/**
 * set cookie
 * @param {*} key
 * @param {*} value
 */
function setCookie(key, value) {
    Cookie.set(key, value)
}

function getCookie(key) {
    return Cookie.get(key)
}

function delCookies(keys) {
    keys.forEach(key => {
        Cookie.remove(key)
    });
}


function toLogin(params) {
    return post('/login', params)
}

function checkLogin() {
    return get('/checkLogin')
}

function register(params) {
    return post('/register', params)
}

function toLogout(params) {
    return post('/logout', params)
}

export {
    setCookie,
    getCookie,
    delCookies,
    toLogin,
    register,
    toLogout,
    checkLogin,
}