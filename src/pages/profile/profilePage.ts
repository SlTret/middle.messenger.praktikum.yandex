import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import tpl from './profilePage.hbs';
import './profilePage.scss';
import Router from '../../router/router';
import EditTextField from '../../components/editTextField/editTextField';
import Avatar from '../../components/avatar/avatar';
import { Indexed } from 'src/store/store';

const router = new Router();

export class ProfilePage extends Component {

    constructor(props: { [key: string]: object | string } = {}) {

        props = {
            tagName: "main",
            avatar: new Avatar({}),
            emailTextField: new EditTextField({
                fieldName: "Почта",
                input: "disabled",
                mapStateToProps: (state: Indexed) => {
                    return {
                        fieldValue: state?.user?.email
                    }
                }
            }),
            loginTextField: new EditTextField({
                fieldName: "Логин",
                input: "disabled",
                mapStateToProps: (state: Indexed) => {
                    return {
                        fieldValue: state?.user?.login
                    }
                }
            }),
            firstNameTextField: new EditTextField({
                fieldName: "Имя",
                input: "disabled",
                mapStateToProps: (state: Indexed) => {
                    return {
                        fieldValue: state?.user?.first_name
                    }
                }
            }),
            secondNameTextField: new EditTextField({
                fieldName: "Фамилия",
                input: "disabled",
                mapStateToProps: (state: Indexed) => {
                    return {
                        fieldValue: state?.user?.second_name
                    }
                }
            }),
            chatNameTextField: new EditTextField({
                fieldName: "Имя в чате",
                input: "disabled",
                mapStateToProps: (state: Indexed) => {
                    return {
                        fieldValue: state?.user?.display_name
                    }
                }
            }),
            phoneNumberTextField: new EditTextField({
                fieldName: "Телефон",
                input: "disabled",
                mapStateToProps: (state: Indexed) => {
                    return {
                        fieldValue: state?.user?.phone
                    }
                }
            }),
            changeUserDataBtn: new Button({
                attr: { type: 'button' },
                text: 'Изменить данные',
                events: { click: () => router.go("/settings") }
            }),
            changePasswordBtn: new Button({
                attr: { type: 'button' },
                text: 'Изменить пароль',
                events: { click: () => router.go("/change-password") }
            }),
            returnBtn: new Button({
                attr: { type: 'button' },
                text: 'Назад',
                events: { click: () => router.go("/chats") }
            }),
            ...props
        }
        super({ ...props, attr: { ...(props.attr as object), class: "profile" } });
    }

    render() {
        return this.compile(tpl);
    }
}
