import { patterns } from '../../utils/patterns';
import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import { TextInput } from '../../components/textInput/textInput';
import tpl from './loginPage.hbs';
import './loginPage.scss';
import { Pages, PagesEvents, Service } from '../../services/Service';

export class LoginPage extends Component {

    loginButton: Button;

    constructor(service :Service, props: { [key: string]: object | string } = {}) {

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
            loginBtn: new Button({
                attr: { type: 'submit' },
                text: 'Войти',
            }),
            regBtn: new Button({
                attr: { type: 'button', href: 'registration' },
                text: 'Регистрация',
                events: {
                    click: () => service.emit(PagesEvents.CHANGE_PAGE, Pages.REGISTRATION_PAGE)
                }
            }),
            loginTextInput: new TextInput({
                header: "Логин",
                type: "text",
                name: "login",
                placeholder: "Введите имя пользователя",
                pattern: patterns.login,
            }),
            pwdTextInput: new TextInput({
                header: "Пароль",
                type: "text",
                name: "password",
                placeholder: "Введите пароль",
                pattern: patterns.password,
            }),
            ...props
        }

        super("form", {...props, attr: {...(props.attr as object),  class: "login-form"}});

        this.loginButton = props.loginBtn as Button;

    }

    render() {
        return this.compile(tpl);
    }
}