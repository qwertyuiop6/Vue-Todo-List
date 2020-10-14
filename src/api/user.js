import * as http from "../utils/http";
import API from "../config/api";

function get(query) {
  return http.get(API.user, query);
}

function update(body) {
  return http.post(API.user, body);
}

export default {
  get,
  update
};
