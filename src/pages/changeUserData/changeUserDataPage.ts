import { patterns } from '../../utils/patterns';
import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import EditTextField from '../../components/editTextField/editTextField';
import tpl from './changeUserDataPage.hbs';
import './changeUserDataPage.scss';
import Router from '../../router/router';
import { extendComponent } from '../../store/extendComponent';
import usersController from '../../controllers/usersController';
import Avatar from '../../components/avatar/avatar';
import { v4 as uuidv4 } from 'uuid';

const router = new Router();

class ChangeUserDataPage extends Component {

    constructor(props: any) {

        const selectAvatarId = uuidv4()

        props = {
            tagName: "form",
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries());
                    usersController.changeUserProfile(data);
                    e.preventDefault();
                }
            },
            avatar: new Avatar({
                selectAvatarId: selectAvatarId,
                events: {
                    click: () => {
                        const inputElement = document.getElementById(selectAvatarId);
                        inputElement?.click();
                    },
                    change :(e: Event) => {
                        const element = e.currentTarget as HTMLFormElement;
                        const form = new FormData(element);
                        usersController.changeAvatar(form);
                    }
                }
            }),
            emailTextField: new EditTextField({
                fieldName: "Почта",
                inputName: 'email',
                pattern: patterns.email,
                mapStateToProps: (state: any) => {
                    return {
                        fieldValue: state?.user?.email
                    }
                }
            }),
            loginTextField: new EditTextField({
                fieldName: "Логин",
                inputName: 'login',
                fieldType: 'text',
                pattern: patterns.login,
                mapStateToProps: (state: any) => {
                    return {
                        fieldValue: state?.user?.login
                    }
                }
            }),
            firstNameTextField: new EditTextField({
                fieldName: "Имя",
                inputName: 'first_name',
                fieldType: 'text',
                pattern: patterns.firstName,
                mapStateToProps: (state: any) => {
                    return {
                        fieldValue: state?.user?.first_name
                    }
                }
            }),
            secondNameTextField: new EditTextField({
                fieldName: "Фамилия",
                inputName: 'second_name',
                fieldType: 'text',
                pattern: patterns.secondName,
                mapStateToProps: (state: any) => {
                    return {
                        fieldValue: state?.user?.second_name
                    }
                }
            }),

            phoneNumberTextField: new EditTextField({
                fieldName: "Телефон",
                inputName: 'phone',
                fieldType: 'tel',
                pattern: patterns.phone,
                mapStateToProps: (state: any) => {
                    return {
                        fieldValue: state?.user?.phone
                    }
                }
            }),

            chatNameTextField: new EditTextField({
                fieldName: "Имя в чате",
                inputName: 'display_name',
                fieldType: 'text',
                pattern: patterns.chatName,
                mapStateToProps: (state: any) => {
                    return {
                        fieldValue: state?.user?.display_name
                    }
                }
            }),
            saveBtn: new Button({
                attr: { type: 'submit' },
                text: 'Сохранить',
            }),
            returnBtn: new Button({
                attr: { type: 'button' },
                text: 'Выйти',
                events: {
                    click: () => router.go('/profile'),
                }
            }),
            ...props
        }

        super(props);
    }
    render() {
        return this.compile(tpl);
    }
}

export default ChangeUserDataPage  