import { ProfileButton } from '../../components/profileButton/profileButton';
import { Component } from '../../components/Block';
import { ChatItem } from '../../components/chatItem/chatItem';
import tpl from './chatPage.hbs';
import './chatPage.scss';
import Router from '../../router/router';
import { ImageButton } from '../../components/imageButton/imageButton';
import loginController from '../../controllers/loginController';
import { extendComponent } from '../../store/extendComponent';
import { ModalWindow, WindowTypes } from '../../components/modalWindow/modalWindow';
import chatsController from '../../controllers/chatsController';
import { Indexed } from 'src/store/store';

const router: Router = new Router();

class ChatPage extends Component {

    constructor(props = {}) {

        const modal = new ModalWindow();

        chatsController.getChats();

        props = {
            tagName: "main",
            events: {
                click: (e: Event) => {
                    const target = e.target as HTMLElement;

                    if (target.tagName == "BUTTON") {
                        const href = target.getAttribute("href");
                        if (href == 'sendMsg') {
                            if (this.props?.currentChat) {

                                const input = this.getContent().querySelector('.messages__input') as HTMLInputElement;
                                if(!input)
                                    return;

                                const msg = input.value;
                                if(msg.length) {
                                    chatsController.sendMessageToChat(this.props?.currentChat.id, { type: "message", content: msg })
                                }
                            }
                        }
                        // if(href == '500')
                        //     service.emit(PagesEvents.CHANGE_PAGE, Pages.ERROR_PAGE, {message:"Мы уже чиним", error: "500"})
                    }
                }
            },
            modalWindow: modal,
            chats: [],
            logoutButton: new ImageButton({
                altImage:"Выйти из учётной записи",
                imageUrl: require('/src/components/imageButton/icons/logout.svg'),
                events: {
                    click: () => loginController.logout(),
                }
            }),
            addUser: new ImageButton({
                altImage:"Добавить пользователя в чат",
                imageUrl: require('/src/components/imageButton/icons/account-plus-outline.svg'),
                events: {
                    click: () => {
                        modal.setProps({ ...modal.props, windowType: WindowTypes.AddUserWindow })
                        modal.show();
                    }
                }
            }),
            removeUser: new ImageButton({
                altImage: "Удалить пользователя из чата",
                imageUrl: require('/src/components/imageButton/icons/account-minus-outline.svg'),
                events: {
                    click: () => {
                        modal.setProps({ ...modal.props, windowType: WindowTypes.RemoveUserWindow })
                        modal.show();
                    }
                }
            }),
            createChatBtn: new ImageButton({
                altImage: "Добавить чат",
                imageUrl: require('/src/components/imageButton/icons/chat-plus-outline.svg'),
                events: {
                    click: () => {
                        modal.setProps({ ...modal.props, windowType: WindowTypes.CreateChatWindow })
                        modal.show();
                    }
                }
            }),
            userName: "Имя пользователя",
            // currentChatName: "Название чата",
            profileBtn: new ProfileButton({
                text: "Профиль",
                attr: { type: 'submit' },
                events: {
                    click: () => router.go('/profile'),
                }
            }),

            ...props
        }

        super(props);
    }

    render() {
        const { userName, chats, currentChat, messages } = this.props;

        console.log("render chats", chats);

        const currentChatExist = currentChat ? "block" : "none"
        const defaultCurrentChatDisplay = currentChat?.avatar ? "none" : "block"
        const avatarCurrentChatDisplay = currentChat?.avatar ? "block" : "none"
        const avatarUrl = currentChat?.avatar ? "https://ya-praktikum.tech/api/v2/resources" + currentChat?.avatar : ""

        const documentFragment = this.compile(tpl, { userName, chats, messages, currentChatExist, defaultCurrentChatDisplay, avatarCurrentChatDisplay, currentChatName: currentChat?.title, currentChatAvatar: avatarUrl });

        chats?.forEach((chat: any) => {
            const isCurrentChat = currentChat?.id == chat.id;
            const element = documentFragment.getElementById(chat.id)
            element?.replaceWith(new ChatItem({ chat, isCurrentChat }).getContent());
        });

        return documentFragment;
    }
}

interface ChatPageState {
    messages?:object,
    currentChat?:object,
    userName?:string,
    chats:[]
}

function mapStateToProps(state: Indexed): ChatPageState {

    let currentChat;
    state?.chats?.forEach((chat: any) => {
        if (state?.currentChatId == chat.id) {
            currentChat = chat;
        }
    })

    const chatId = state?.currentChatId;
    const messages = state?.messages ? state?.messages[chatId] : []

    return {
        messages,
        currentChat,
        userName: state?.user?.first_name,
        chats: state?.chats
    };
}

export default extendComponent(ChatPage, mapStateToProps)
