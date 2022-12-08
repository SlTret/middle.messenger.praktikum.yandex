import { HTTP } from '../http/Http';
import { BaseAPI } from './base-api';

const chatsAPIInstance = new HTTP('/chats');

export class ChatsAPI extends BaseAPI {
  public createChat(data: object) {
    return chatsAPIInstance.post('', {data})
  }

  public removeChat(data: object) {
    return chatsAPIInstance.delete('', {data})
  }

  public getChats() {
    return chatsAPIInstance.get('', {})
  }

  public getToken(chatId: number) {
    return chatsAPIInstance.post(`/token/${chatId}`, {})
  }

  public addUser(data:object) {
    return chatsAPIInstance.put(`/users`, {data})
  }

  public removeUser(data:object) {
    return chatsAPIInstance.delete(`/users`, {data})
  }

}
