import * as http from "../utils/http";
import apiConf from "../config/api";

const todoAPI = apiConf.todo;

/**
 * 获取用户的todolist
 * @param {String} uid [用户uid]
 */
const getAll = () => http.get(todoAPI);

/**
 * 增加一个todo
 * @param {String} uid [用户uid]
 * @param {Object} todo [todo对象]
 */
const add = todo => http.post(todoAPI, todo);

/**
 * 删除一个todo
 * @param {String} uid [用户uid]
 * @param {Number} todoId [每个todo的ID]
 */
const remove = todoId => http.del(todoAPI + "/" + todoId);

/**
 * 改变todo的完成状态
 * @param {String} uid [用户uid]
 * @param {Number} todoId [每个todo的ID]
 * @param {Number} status [状态码,0为未完成，１为完成]
 */
const changeStatus = (todoId, status) =>
  http.post(todoAPI + "/" + todoId + "/changeStatus", {
    status
  });

export { changeStatus, add, remove, getAll };
