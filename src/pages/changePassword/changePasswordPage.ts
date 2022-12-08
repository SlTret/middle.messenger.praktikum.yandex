import { patterns } from '../../utils/patterns';
import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import EditTextField from '../../components/editTextField/editTextField';
import tpl from './changePasswordPage.hbs';
import './changePasswordPage.scss';
import Router from '../../router/router';
import Avatar from '../../components/avatar/avatar';
import usersController from '../../controllers/usersController';

const router = new Router();


export class ChangePasswordPage extends Component {

    constructor(props = {}) {

        props = {
            tagName: 'main',
            avatar: new Avatar({}),
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    formData.delete("replayPassword")
                    const data = Object.fromEntries(formData.entries());
                    usersController.changeUserPassword(data);
                    e.preventDefault();
                }
            },
            oldPwdTextField: new EditTextField({
                fieldName: "Старый пароль",
                fieldValue: "",
                inputName: 'oldPassword',
                fieldType: "password",
                pattern: patterns.password
            }),
            newPwdTextField: new EditTextField({
                fieldName: "Новый пароль",
                fieldValue: "",
                inputName: 'newPassword',
                fieldType: "password",
                pattern: patterns.password
            }),
            replayPwdTextField: new EditTextField({
                fieldName: "Повторить пароль",
                fieldValue: "",
                inputName: 'replayPassword',
                fieldType: "password",
                pattern: patterns.password
            }),
            createChatBtn: new Button({
                attr: { type: 'submit' },
                text: 'Сохранить',
            }),
            returnBtn: new Button({
                attr: { type: 'button' },
                text: 'Назад',
                events: { click: () => router.go("/profile") }
            }),
            ...props,
        }

        super(props);
    }
    render() {
        return this.compile(tpl);
    }
}
