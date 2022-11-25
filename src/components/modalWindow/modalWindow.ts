import store from "../../store/store";
import chatsController from "../../controllers/chatsController";
import { patterns } from "../../utils/patterns";
import { Component } from "../Block";
import { Button } from "../button/button";
import { TextInput } from "../textInput/textInput";
import tpl from "./modalWindow.hbs";
import "./modalWindow.scss";

export enum WindowTypes {
    CreateChatWindow = "CreateChatWindow",
    AddUserWindow = "AddUserWindow",
    RemoveUserWindow = "RemoveUserWindow"
}

export class ModalWindow extends Component {

    constructor(props: { [key: string]: object | string } = {}) {

        props = {
            tagName: "div",
            windowType: WindowTypes.CreateChatWindow,
            events: {
                click: (e: Event) => {
                    if ((e.target as HTMLElement).className == 'modal') {
                        this.hide();
                    }
                }
            },
            chatNameTextField: new TextInput({
                header: "Название чата",
                type: "text",
                name: "title",
                placeholder: "Введите название чата",
                pattern: patterns.login,

            }),
            createChatBtn: new Button({
                text: 'Создать чат',
                events: {
                    click: (e: Event) => {
                        const value = (this.children.chatNameTextField as TextInput).getInputValue()
                        const regex = new RegExp(patterns.login);
                        if (regex.test(value)) {
                            chatsController.createChat({ "title": value });
                            this.hide();
                        }
                    }
                }
            }),
            addUserTextField: new TextInput({
                header: "Добавить пользователя",
                type: "text",
                name: "title",
                placeholder: "Введите id пользователя",
                pattern: patterns.numbers,
            }),
            addUserBtn: new Button({
                text: 'Добавить',
                events: {
                    click: (e: Event) => {
                        const value = (this.children.addUserTextField as TextInput).getInputValue()
                        const regex = new RegExp(patterns.numbers);
                        if (regex.test(value)) {

                            const data = {
                                "users": [value],
                                "chatId": store.getState().currentChatId
                            }

                            chatsController.addUserToChat(data);
                            this.hide();
                        }
                    }
                }
            }),
            removeUserTextField: new TextInput({
                header: "Удалить пользователя",
                type: "text",
                name: "title",
                placeholder: "Введите id пользователя",
                pattern: patterns.numbers,
            }),
            removeUserBtn: new Button({
                text: 'Удалить',
                events: {
                    click: (e: Event) => {
                        const value = (this.children.removeUserTextField as TextInput).getInputValue()
                        const regex = new RegExp(patterns.numbers);
                        if (regex.test(value)) {

                            const data = {
                                "users": [value],
                                "chatId": store.getState().currentChatId
                            }

                            chatsController.removeUserFromChat(data);
                            this.hide();
                        }
                    }
                }
            }),
            ...props
        }

        super({ ...props, attr: { ...(props.attr as object), class: "modal" } });

    }
    show(): void {
        this.getContent().style.display = "flex";
    }
    hide(): void {
        this.getContent().style.display = "none";
    }
    render() {
        const { text, windowType } = this.props;

        const fragment = this.compile(tpl, { text });

        if (windowType == WindowTypes.CreateChatWindow) {
            (fragment.querySelector(".create-chat") as HTMLElement).style.display = "flex";
            (fragment.querySelector(".add-user") as HTMLElement).style.display = "none";
            (fragment.querySelector(".remove-user") as HTMLElement).style.display = "none";
        }

        if (windowType == "AddUserWindow") {
            (fragment.querySelector(".create-chat") as HTMLElement).style.display = "none";
            (fragment.querySelector(".add-user") as HTMLElement).style.display = "flex";
            (fragment.querySelector(".remove-user") as HTMLElement).style.display = "none";
        }

        if (windowType == "RemoveUserWindow") {
            (fragment.querySelector(".create-chat") as HTMLElement).style.display = "none";
            (fragment.querySelector(".add-user") as HTMLElement).style.display = "none";
            (fragment.querySelector(".remove-user") as HTMLElement).style.display = "flex";
        }

        return fragment;
    }
}
