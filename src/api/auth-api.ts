import { HTTP } from '../http/Http';
import { BaseAPI } from './base-api';

const authAPIInstance = new HTTP('/auth');

export class AuthAPI extends BaseAPI {

  public signin(data: object) {
    return authAPIInstance.post('/signin', {data})
  }

  public signout() {
    return authAPIInstance.post('/logout', {})
  }

  public signup(data: object) {
    return authAPIInstance.post('/signup', {data})
  }

  public getUser() {
    return authAPIInstance.get('/user')
  }
}
