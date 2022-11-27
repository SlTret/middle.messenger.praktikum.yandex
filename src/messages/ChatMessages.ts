import { cloneDeep } from "../utils/cloneDeep";
import store from "../store/store";

class ChatMessages {

    private sockets: { [chatId: string]: WebSocket } = {};

    constructor() {
        setInterval(() => {
            Object.keys(this.sockets).forEach((chatId: string) => {
                this.send(chatId, { type: "ping" })
            });
        }, 10000)
    }

    connect(chatId: string, message: any | null = "") {

        const userId = store.getState().user.id;
        const chat = store.getState().chats.find((chat: { [chatId: string]: unknown }) => chat.id == chatId);
        const token = chat.token;

        console.log("ChatMessages connect", userId, chatId, token);

        if (!token)
            throw new Error("No chat token");

        const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
        const socket = new WebSocket(url);

        socket.addEventListener('open', () => {
            console.log('Соединение установлено', message == "");
            this.sockets[chatId] = socket;

            if (message == "") {
                message = {
                    content: 'Моё первое сообщение миру!',
                    type: 'message',
                }
            }
            this.send(chatId, message);

        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            delete this.sockets[chatId];

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            const socket = event.currentTarget as WebSocket;
            const chatId = this.getChatBySocket(socket) as string;

            let data;
            try {
              data = JSON.parse(event.data);
            } catch (error) {
                console.log("json from socket parse error", error)
            }

            if(data.type != "message")
                return;

            const messages = cloneDeep(store.getState()?.messages) || {};

            if(!messages[chatId]) {
                messages[chatId] = [];
            }

            messages[chatId].push(data);
            store.set("messages", messages);

        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event);
        });
    }

    send(chatId: string, message = {}) {
        const socket = (this.sockets[chatId] as WebSocket)
        if (socket) {
            console.log("send message", JSON.stringify(message))
            socket.send(JSON.stringify(message));
        } else {
            this.connect(chatId, message)
        }
    }

    getChatBySocket(soket:WebSocket) {
        const result = Object.entries(this.sockets).find(([key, value]) => {
            return value == soket;
        })

        if(result)
            return result[0]
    }
}

export default new ChatMessages();

