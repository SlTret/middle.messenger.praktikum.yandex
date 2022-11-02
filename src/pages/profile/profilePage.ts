import { Pages, PagesEvents, Service } from '../../services/Service';
import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import { InfoTextField } from '../../components/infoTextField/infoTextField';
import tpl from './profilePage.hbs';
import './profilePage.scss';

export class ProfilePage extends Component {

    constructor(service :Service, props : {[key: string] : object | string }  = {}) {

        props = {
            emailTextField: new InfoTextField({
                fieldName: "Почта",
                fieldValue: "ivan@yandex.ru",
            }),
            loginTextField: new InfoTextField({
                fieldName: "Логин",
                fieldValue: "Ivan",
            }),
            firstNameTextField: new InfoTextField({
                fieldName: "Имя",
                fieldValue: "Иван",
            }),
            secondNameTextField: new InfoTextField({
                fieldName: "Фамилия",
                fieldValue: "Иванов",
            }),
            chatNameTextField: new InfoTextField({
                fieldName: "Имя в чате",
                fieldValue: "Иван",
            }),
            phoneNumberTextField: new InfoTextField({
                fieldName: "Телефон",
                fieldValue: "+7(000) 000 00 00",
            }),
            changeUserDataBtn: new Button({
                attr: { type: 'button'},
                text: 'Изменить данные',
                events: {
                    click: () => service.emit(PagesEvents.CHANGE_PAGE, Pages.CHANGE_USER_DATA_PAGE)
                }
            }),
            changePasswordBtn: new Button({
                attr: { type: 'button' },
                text: 'Изменить пароль',
                events: {
                    click: () => service.emit(PagesEvents.CHANGE_PAGE, Pages.CHANGE_PASSWORD_PAGE)
                }
            }),
            returnBtn: new Button({
                attr: { type: 'button' },
                text: 'Выйти',
                events: {
                    click: () => service.emit(PagesEvents.CHANGE_PAGE, Pages.CHAT_PAGE)
                }
            }),
            ...props
        }

        super("div", {...props, attr: {...(props.attr as object),  class: "profile"}});
    }

    render() {
        return this.compile(tpl);
    }
}