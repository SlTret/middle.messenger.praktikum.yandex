import { patterns } from '../../utils/patterns';
import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import { EditTextField } from '../../components/editTextField/editTextField';
import tpl from './changeUserDataPage.hbs';
import { Pages, PagesEvents, Service } from '../../services/Service';
import './changeUserDataPage.scss';

export class ChangeUserDataPage extends Component {

    constructor(service :Service, props = {} ) {

        props = {
            events: {
                submit:(e:Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries());
                    console.log(JSON.stringify(data))
                    service.emit(PagesEvents.CHANGE_PAGE, Pages.CHAT_PAGE)
                    e.preventDefault();
                }
            },
            emailTextField: new EditTextField({
                fieldName: "Почта",
                fieldValue: "ivan@yandex.ru",
                inputName: 'email',
                pattern: patterns.email
            }),
            loginTextField: new EditTextField({
                fieldName: "Логин",
                fieldValue: "Ivan",
                inputName: 'login',
                fieldType: 'text',
                pattern: patterns.login
            }),
            firstNameTextField: new EditTextField({
                fieldName: "Имя",
                fieldValue: "Иван",
                inputName: 'firstName',
                fieldType: 'text',
                pattern: patterns.firstName
            }),
            secondNameTextField: new EditTextField({
                fieldName: "Фамилия",
                fieldValue: "Иванов",
                inputName: 'secondName',
                fieldType: 'text',
                pattern: patterns.secondName
            }),
            chatNameTextField: new EditTextField({
                fieldName: "Имя в чате",
                fieldValue: "Иван",
                inputName: 'chatName',
                fieldType: 'text',
                pattern: patterns.chatName
            }),
            phoneNumberTextField: new EditTextField({
                fieldName: "Телефон",
                fieldValue: "+79991234567",
                inputName: 'phoneNumber',
                fieldType: 'tel',
                pattern: patterns.phone
            }),
            saveBtn: new Button({
                attr: { type: 'submit' },
                text: 'Сохранить',
            }),
            returnBtn: new Button({
                attr: { type: 'button'},
                text: 'Выйти',
                events:{
                    click: () => service.emit(PagesEvents.CHANGE_PAGE, Pages.USER_PROFILE_PAGE)
                }
            }),
            ...props
        }

        super("form", props);
    }
    render() {
        return this.compile(tpl);
    }
}