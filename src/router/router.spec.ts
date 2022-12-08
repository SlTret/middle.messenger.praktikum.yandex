import { expect } from "chai";

import LoginPage from "../pages/login/loginPage";
import { RegistrationPage } from "../pages/registration/registrationPage";
import router from "./router";

router.use("/", LoginPage)
router.use("/signup", RegistrationPage)
router.start();

describe('Проверяем Роутер', () => {
  it('Переход на новую страницу должен менять состояние сущности history', () => {
    router.go("/")
    expect(window.history.length).to.eq(2);
  });

  it('Проверяем url при переходе', () => {
    router.go("/signup")
    expect(router.getCurrentRoute()?.pathname()).to.eq("/signup");
  });
}); 