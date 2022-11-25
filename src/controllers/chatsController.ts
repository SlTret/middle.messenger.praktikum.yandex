import chatMessages from "../messages/ChatMessages";
import { ChatsAPI } from "../api/chats-api";
import store from "../store/store";

const chats = new ChatsAPI();

class ChatsController {
  private static __instance: ChatsController
  constructor() {
    if (ChatsController.__instance) {
      return ChatsController.__instance;
    }
    ChatsController.__instance = this;
  }

  public removeChat(data: object) {
    chats.removeChat(data).then(result => {
      const response = JSON.parse(result.response);
      const chat = response.result;
      console.log("remove chat response", chat)
      if (chat.id) {
        this.getChats();
        store.set("currentChatId", "");
      }

    }).catch((err) => {
      console.log("remove chat error", err)
    })
  }

  public addUserToChat(data:object) {
    chats.addUser(data).then(result => {
      console.log("remove user result", result.response)
    }).catch((err) => {
      console.log("add user error", err)
    });
  }

  public deleteUserFromChat(data:object) {
    chats.removeUser(data);
  }

  public removeUserFromChat(data:object) {
    chats.removeUser(data).then(result => {
      console.log("remove user result", result.response)
    }).catch((err) => {
      console.log("remove user error", err)
    });
  }

  public getChatToken(chatId: any) {
    chats.getToken(chatId).then(result => {
      const { token } = JSON.parse(result.response);
      const chats = store.getState().chats.map((chat: {[chatId: string]: unknown}) => {
        if(chat.id == chatId) {
          chat.token = token;
          chatMessages.connect(chatId);
        }
        return chat;
      });
      store.set("chats", chats);
    }).catch((err) => {
      console.log("get token error", err)
    })
  }

  public setCurrentChat(chatId: number) {
    store.set("currentChatId", chatId);
  }

  public createChat(data: object) {
    chats.createChat(data).then(result => {
      const { id } = JSON.parse(result.response);
      if (id) {
        this.getChats();
      }
    }).catch((err) => {
      console.log("create chat error", err)
    })
  }

  public getChats() {
    chats.getChats().then(result => {
      const chats = JSON.parse(result.response);
      if (chats) {
       
        chats.forEach((chat:any)=>{
          store.set("chats", chats);
          this.getChatToken(chat.id)
        })
      }

    }).catch((err) => {
      console.log("get chats error", err)
    })
  }

  public sendMessageToChat(chatId:string, message:object) {
    chatMessages.send(chatId, message);
  }
}

export default new ChatsController();
