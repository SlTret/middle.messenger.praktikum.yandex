import { AuthAPI } from "../api/auth-api";
import router from "../router/router";
import store from "../store/store";

const userLoginValidator = (data: any) => {
  return { isCorrect: true };
}

const auth = new AuthAPI();

export interface LoginFormModel {
  login: string;
  password: string;
}

function prepareDataToRequest(data: object) {
  return data;
}

class LoginController {

  private static __instance: LoginController
  constructor() {
    if (LoginController.__instance) {
      return LoginController.__instance;
    }
    LoginController.__instance = this;
  }

  public async logout() {
    auth.signout()
      .then((result) => {
        console.log("logout result", result.response, result.status)
        router.go('/');
      })
  }

  public getUser(): Promise<boolean> {
    return auth.getUser().then(result => {

      const user = JSON.parse(result.response)
      console.log("user id", user.id)
      if (user.id) {
        store.set("user", user)
        return true;
      }

      return false;

    }).catch((err:Error) => {
      console.log(err.message)
      return false;
    })
  }

  public async login(data: object) {
    try {

      const validateData = userLoginValidator(data);

      if (!validateData.isCorrect) {
        throw new Error(JSON.stringify(validateData));
      }

      data = prepareDataToRequest(data);
      auth.signin(data).then(result => {
        this.getUser().then(result => {
          if (result) {
            if( window.location.pathname == "/") {
              router.go('/chats');
            } else {
              router.go(window.location.pathname);
            }
          }
        });
      }).catch((reason) => {
        console.log("login error reason", reason)
      });

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
    }
  }
}

export default new LoginController();
