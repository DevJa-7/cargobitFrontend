import Config from "../config";
import * as _ from 'lodash'
import $ from 'jquery';

export default {
  async baseApi(sub_url, method, json_data, cb) {
      let user = localStorage.currentUser?JSON.parse(localStorage.currentUser):null
    try {
      let request = {
        method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": user
            ? "Bearer " + user['token']
            : null,
        }
      };
      if (method == "POST" || method == "PUT") {
        console.log("just before:",json_data)
        request["body"] = JSON.stringify(json_data);
      }
      let response = await fetch(Config.SERVICE_API_URL + sub_url, request);
      let responseJson = await response.json();
      if (response.status == 200) {
        cb(null, responseJson);
      } else {
        cb(responseJson);
      }
    } catch (error) {
      cb(error);
    }
  },

  async init(cb) {
    //check if current user exists or not
    var email = localStorage.email
    var password = localStorage.password

    if (password) {
      this.login(email, password, (err, user) => {
        cb(err, user)
      })
    } else {
      cb(null)
    }
  },

  login(email, password, cb) {
    this.baseApi('/api/admin/login', 'POST', { email, password }, (err, res) => {
      if (err == null) {
        console.log('res', res);
        var result = res;
        result.slot_id = null;
        if (result.admin.id == 2) {
          result.slot_id = 1;
        } else if (result.admin.id == 3) {
          result.slot_id = 2;
        }
        localStorage.currentUser = JSON.stringify(result)
        localStorage.currentAdminUser = JSON.stringify(result)
        localStorage.email=email
        localStorage.password=password;
      }
      cb(err, res)
    })
  },
  logout() {
    delete localStorage.currentAdminUser
    delete localStorage.currentUser
    delete localStorage.email
    delete localStorage.password
  },

  getUsers(cb){
    this.baseApi('/admin/users', 'GET', {}, cb)
  },
};
