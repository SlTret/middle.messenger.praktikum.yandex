import { HTTP } from '../http/Http';
import { BaseAPI } from './base-api';

const chatsAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2');

export class ChatsAPI extends BaseAPI {
  public createChat(data: object) {
    return chatsAPIInstance.post('/chats', data)
  }
  
  public removeChat(data: object) {
    return chatsAPIInstance.delete('/chats', data)
  }

  public getChats() {
    return chatsAPIInstance.get('/chats', {})
  }

  public getToken(chatId: number) {
    return chatsAPIInstance.post(`/chats/token/${chatId}`, {})
  }

  public addUser(data:object) {
    return chatsAPIInstance.put(`/chats/users`, data)
  }

  public removeUser(data:object) {
    return chatsAPIInstance.delete(`/chats/users`, data)
  }
  
} 