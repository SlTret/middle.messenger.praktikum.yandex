import { patterns } from '../../utils/patterns';
import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import { TextInput } from '../../components/textInput/textInput';
import tpl from './registrationPage.hbs';
import './registrationPage.scss';
import { SignUpController } from '../../controllers/signUpController';
import Router from "../../router/router";


export class RegistrationPage extends Component {

    signupController:SignUpController = new SignUpController();
    _router = new Router();
    constructor(props : Record<string, string | object>) {

        props = {
            tagName:"main",
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    formData.delete("password_replay")
                    const data = Object.fromEntries(formData.entries());
                    this.signupController.signUp(data)
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
                    click: () => this._router.go("/")
                }
            }),
            emailTextInput: new TextInput({ header: "Почта", name: "email", placeholder: "Введите email", type: "text", pattern: patterns.email }),
            loginTextInput: new TextInput({ header: "Логин", name: "login", placeholder: "Введите имя пользователя", type: "text", pattern: patterns.login }),
            firstNameTextInput: new TextInput({ header: "Имя", name: "first_name", placeholder: "Ваше имя", type: "text", pattern: patterns.firstName }),
            secondNameTextInput: new TextInput({ header: "Фамилия", name: "second_name", placeholder: "Ваша фамилия", type: "text", pattern: patterns.secondName }),
            phoneTextInput: new TextInput({ header: "Телефон", name: "phone", placeholder: "Номер телефона", type: "tel", pattern: patterns.phone }),
            passwordTextInput: new TextInput({ header: "Пароль", name: "password", placeholder: "Введите пароль", type: "password", pattern: patterns.password }),
            replayPasswordTextInput: new TextInput({ header: "Повторите пароль", name: "passwordr_replay", placeholder: "Введите пароль ещё раз", type: "password", pattern: patterns.password }),
            ...props
        }

        super(props);
    }

    render() {
        return this.compile(tpl);
    }
}
