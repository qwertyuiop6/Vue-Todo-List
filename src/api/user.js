import * as http from "./http";
import API from "./api";

const get = (uid) => http.get(API.user + "/" + uid);

const update = (body) => http.post(API.user, body);

const uploadAvatar = (body) =>
  http.post(API.user + "/avatar", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export { get, update, uploadAvatar };
