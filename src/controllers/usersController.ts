import { UsersAPI } from "../api/users-api";
import store from "../store/store";
import loginController from "./loginController";

const users = new UsersAPI();

function prepareDataToRequest(data: object) {
  return data;
}

class UsersController {

  private static __instance: UsersController
  constructor() {
    if (UsersController.__instance) {
      return UsersController.__instance;
    }
    UsersController.__instance = this;
  }

  public changeAvatar(data: FormData) {
    users.changeAvatar(data).then(result => {
      const user = JSON.parse(result.response);
      if (user.id) {
        store.set("user", user)
      }
    }).catch((err) => {
      console.log("change avatar error", err)
    })
  }

  public changeUserPassword(data: object) {
    return users.changeUserPassword(data).then(result => {
      console.log("change user password ", result.response)
      if (result.response === "OK") {
        loginController.logout();
      }
    }).catch((err: Error) => {
      console.log("change user password", err)
    })
  }

  public changeUserProfile(data: object) {
    return users.changeUserProfile(data).then(result => {
      const user = JSON.parse(result.response)
      console.log("change profile user ", JSON.stringify(user))
      if (user.id) {
        store.set("user", user)
      }
    }).catch((err) => {
      console.log("change profile  error", err)
    })
  }
}

export default new UsersController();
