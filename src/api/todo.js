import * as http from "./http";
import API from "./api";

const todoAPI = API.todo;

/**
 * 获取用户的todolist
 * @param {String} uid [用户uid]
 */
const getAll = () => http.get(todoAPI + "/all");

/**
 * 增加一个todo
 * @param {String} uid [用户uid]
 * @param {Object} todo [todo对象]
 */
const add = (todo) => http.post(todoAPI, todo);

/**
 * 删除一个todo
 * @param {String} uid [用户uid]
 * @param {Number} todoId [每个todo的ID]
 */
const remove = (todoId) => http.del(todoAPI + "/" + todoId);

/**
 * 更新todo的状态和信息
 * @param {String} uid [用户uid]
 * @param {Number} todoId [每个todo的ID]
 * @param {Object} data [todo对象数据: {complete:完成状态, content:内容}]
 */
const updateTodo = (todoId, data) => http.patch(todoAPI + "/" + todoId, data);

export { updateTodo, add, remove, getAll };
