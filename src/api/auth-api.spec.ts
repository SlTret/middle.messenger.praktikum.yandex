import { expect } from "chai";
import { AuthAPI } from "./auth-api";

const auth = new AuthAPI();
     
async function login() { 

  const data = {
    login:"fffDDDaaa",
    password:"Qwerty123"
  }

  return auth.signin(data).then(result => {
    return true;
  }).catch((reason) => {
    return false;
  });
}

async function logout() { 
  return auth.signout().then((result) => {
    return true
  }).catch((reason) => {
    return false
  });
}

describe('Проверяем АPI', () => {

  it('Проверяем вход в учётную запись', () => {
    login().then(result => expect(result).to.eq(true))
  }),

  it('Проверяем выход из учётной записи', () => {
    logout().then(result => expect(result).to.eq(true))
  });
});
