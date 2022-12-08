import { Component } from "../Block";
import tpl from "./chatItem.hbs";
import "./chatItem.scss";
import { v4 as uuidv4 } from 'uuid';
import { ImageButton } from "../imageButton/imageButton";
import chatsController from "../../controllers/chatsController";

export class ChatItem extends Component {
    constructor(props: Record<string, any>) {

        props = {
            tagName: "div",
            chatName: props.chat.title,
            maskId: uuidv4(),
            events: {
                click: (e:Event) => {

                    chatsController.setCurrentChat(props.chat.id)
                }
            },
            removeChatBtn:new ImageButton({
                imageUrl: require('/src/components/imageButton/icons/close.svg'),
                altImage:"Копка закрыть",
                events: {
                    click: (e:Event) => {
                        console.log("removeChatBtn", this.props.chat.id)
                        chatsController.removeChat({chatId:this.props.chat.id} );
                        e.stopPropagation();
                    }
                }
            }),
            ...props
        }

        super({ ...props, attr: { ...(props.attr as object), class: "chat__item" } });
    }

    render() {

        const { chatName, maskId, chat , isCurrentChat  } = this.props;
        console.log("render isCurrentChat", isCurrentChat);
        if(isCurrentChat) {
            this.getContent().classList.replace("chat__item", "chat__item_select")
        }

        const defaultAvatarDisplay = chat.avatar ? "none" : "block";
        const userAvatarDisplay =  chat.avatar ? "block" : "none";
        const chatAvatarUrl = chat.avatar ? "https://ya-praktikum.tech/api/v2/resources" + chat.avatar : "" ;
        return this.compile(tpl, { chatName, maskId, defaultAvatarDisplay, userAvatarDisplay, chatAvatarUrl});
    }
}
