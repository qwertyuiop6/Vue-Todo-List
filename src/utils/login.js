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

function deleteCookies(keys) {
    keys.forEach(key => {
        Cookie.remove(key)
    });
}

function toLogin(params) {
    return post('/login', params)
}
export {
    setCookie,
    getCookie,
    deleteCookies,
    toLogin
}