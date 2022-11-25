import { patterns } from '../../utils/patterns';
import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import { TextInput } from '../../components/textInput/textInput';
import { Pages, PagesEvents, Service } from '../../services/Service';
import tpl from './registrationPage.hbs';
import './registrationPage.scss';

export class RegistrationPage extends Component {

    constructor(service :Service, props = {}) {

        props = {
            events: {
                submit:(e:Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries());
                    console.log(data)
                    service.emit(PagesEvents.CHANGE_PAGE, Pages.CHAT_PAGE)
                    e.preventDefault();
                }
            },
            regBtn: new Button({
                attr: { type: 'submit', href: 'chat' },
                text: 'Зарегистрироваться',
            }),
            loginBtn: new Button({
                attr: { type: 'button', href: 'chat' },
                text: 'Войти',
                events: {
                    click: () => service.emit(PagesEvents.CHANGE_PAGE, Pages.CHAT_PAGE)
                }
            }),
            emailTextInput: new TextInput({ header: "Почта", name: "email", placeholder: "Введите email",  type: "text", pattern: patterns.email }),
            loginTextInput: new TextInput({ header: "Логин", name: "login", placeholder: "Введите имя пользователя", type: "text", pattern: patterns.login }),
            firstNameTextInput: new TextInput({ header: "Имя", name: "firstName", placeholder: "Ваше имя", type: "text", pattern: patterns.firstName }),
            secondNameTextInput: new TextInput({ header: "Фамилия", name: "secondName", placeholder: "Ваша фамилия",  type: "text", pattern: patterns.secondName }),
            phoneTextInput: new TextInput({ header: "Телефон", name: "phoneNumber", placeholder: "Номер телефона", type: "tel", pattern: patterns.phone }),
            passwordTextInput: new TextInput({ header: "Пароль", name: "password", placeholder: "Введите пароль", type: "password", pattern: patterns.password }),
            replayPasswordTextInput: new TextInput({ header: "Повторите пароль", name: "passwordReplay", placeholder: "Введите пароль ещё раз", type: "password", pattern: patterns.password }),
            ...props
        }

        super("div", props);
    }

    render() {
        return this.compile(tpl);
    }
}