import * as http from "../utils/http";
import api from "../config/api";

const todoAPI = api.todo;

/**
 * 获取用户的todolist
 * @param {String} uid [用户uid]
 */
const getAll = () =>
  http.get(todoAPI, {
    // num: 'all'
  });

/**
 * 增加一个todo
 * @param {String} uid [用户uid]
 * @param {Object} todo [todo对象]
 */
const add = (uid, todo) => http.post(todoAPI + "/" + uid, todo);

/**
 * 删除一个todo
 * @param {String} uid [用户uid]
 * @param {Number} todoId [每个todo的ID]
 */
const remove = (todoId, uid) =>
  http.del(todoAPI + "/" + todoId, {
    uid,
  });

/**
 * 改变todo的完成状态
 * @param {String} uid [用户uid]
 * @param {Number} todoId [每个todo的ID]
 * @param {Number} status [状态码,0为未完成，１为完成]
 */
const changeStatus = (uid, todoId, status) =>
  http.post(todoAPI + "/" + todoId + "/changeStatus", {
    uid,
    status,
  });

export { changeStatus, add, remove, getAll };
