import { patterns } from '../../utils/patterns';
import { Button } from '../../components/button/button';
import { Component, Props } from '../../components/Block';
import { TextInput } from '../../components/textInput/textInput';
import tpl from './loginPage.hbs';
import './loginPage.scss';
import { extendComponent } from '../../store/extendComponent';
import loginController from '../../controllers/loginController';
import router from '../../router/router';

class LoginPage extends Component {

    constructor(props: { [key: string]: object | string } = {}) {

        props = {
            tagName:"main",
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries());

                    loginController.login(data)

                    e.preventDefault();
                }
            },
            loginBtn: new Button({
                attr: { type: 'submit' },
                text: 'Войти',
            }),
            regBtn: new Button({
                attr: { type: 'button' },
                text: 'Регистрация',
                events: {
                    click: () =>  router.go('/signup'),
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

        super({ ...props, attr: { ...(props.attr as object) } });
    }

    render() {
        return this.compile(tpl);
    }
}

function mapUserToProps(state :any) : Props {
    return {
        name: state?.user?.name,
        login: state?.user?.login,
    };
}


export default extendComponent(LoginPage, mapUserToProps)
