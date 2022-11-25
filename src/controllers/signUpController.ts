import { AuthAPI } from "../api/auth-api";
import Router from "../router/router";
import store from "../store/store";


const router = new Router(".root");

const auth = new AuthAPI();
const userLoginValidator = (data: any) => {
  //validateLoginFields(validateRules)
  return { isCorrect: true };
}

export interface SignUpFormModel {
  email: string;
  password: string;
}

function prepareDataToRequest(data: any) {
  return data;
}

export class SignUpController {
  public async signUp(data: object) {
    try {
      // Запускаем крутилку            

      console.log("signup send data", JSON.stringify(data))
      const validateData = userLoginValidator(data);
      if (!validateData.isCorrect) {
        throw new Error(JSON.stringify(validateData));
      }
      auth.signup(prepareDataToRequest(data)).then((result) => {
        console.log("signup response", result.response)
        auth.getUser().then(result => {
          console.log("signup getUser response", result.response)
          const user = JSON.parse(result.response)
          if(user?.id) {
            store.set("user", user)
            router.go('/chats');
          }
        })
      }).catch((reason) => {
        console.log("signup error reason", reason)
      });

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
    }
  }
} 
