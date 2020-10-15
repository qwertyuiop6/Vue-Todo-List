import * as http from "../utils/http";
import API from "../config/api";

const get = query => http.get(API.user, query);

const update = body => http.post(API.user, body);

const uploadAvatar = body =>
  http.post(API.user + "/avatar", body, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export default {
  get,
  update,
  uploadAvatar
};
