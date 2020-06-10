import Vue from 'vue';
import * as todo from './todo';
import login from './login';

Vue.prototype.$api = {
    todo,
    login
}