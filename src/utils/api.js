import {
  get,
  post
} from "./http";

const todoURL = '/api/todolist';

/**
 * 获取用户的todolist
 * @param {String} uid [用户uid]
 */
const getAll = uid =>
  get(todoURL + '/' + uid, {
    // num: 'all'
  })

/**
 * 增加一个todo
 * @param {String} uid [用户uid]
 * @param {Object} todo [todo对象]
 */
const add = (uid, todo) =>
  post(todoURL + '/' + uid, todo)

/**
 * 删除一个todo
 * @param {String} uid [用户uid]
 * @param {Number} todoId [每个todo的ID]
 */
const del = (uid, todoId) =>
  post(todoURL + '/del/' + todoId, {
    uid
  })

/**
 * 改变todo的完成状态
 * @param {String} uid [用户uid]
 * @param {Number} todoId [每个todo的ID]
 * @param {Number} status [状态码,0为未完成，１为完成]
 */
const changeStatus = (uid, todoId, status) =>
  post(todoURL + '/changeStatus/' + todoId, {
    uid,
    status
  })

export {
  getAll,
  add,
  del,
  changeStatus
}