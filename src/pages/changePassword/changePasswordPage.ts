import { patterns } from '../../utils/patterns';
import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import { EditTextField } from '../../components/editTextField/editTextField';
import { Pages, PagesEvents, Service } from '../../services/Service';
import tpl from './changePasswordPage.hbs';
import './changePasswordPage.scss';

export class ChangePasswordPage extends Component {

    constructor(service :Service, props = {}) {

        props = {
            events: {
                submit:(e:Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries());
                    console.log(JSON.stringify(data))
                    service.emit(PagesEvents.CHANGE_PAGE, Pages.USER_PROFILE_PAGE)
                    e.preventDefault();
                }
            },
            oldPwdTextField: new EditTextField({
                fieldName: "Старый пароль",
                fieldValue: "",
                inputName: 'oldPwd',
                fieldType: "password",
                pattern: patterns.password
            }),
            newPwdTextField: new EditTextField({
                fieldName: "Новый пароль",
                fieldValue: "",
                inputName: 'newPwd',
                fieldType: "password",
                pattern: patterns.password
            }),
            replayPwdTextField: new EditTextField({
                fieldName: "Повторить пароль",
                fieldValue: "",
                inputName: 'replayPwd',
                fieldType: "password",
                pattern: patterns.password
            }),
            saveBtn: new Button({
                attr: { type: 'submit' },
                text: 'Сохранить',
            }),
            returnBtn: new Button({
                attr: { type: 'button' },
                text: 'Выйти',
                events:{
                    click: () => service.emit(PagesEvents.CHANGE_PAGE, Pages.CHANGE_USER_DATA_PAGE)
                }
            }),
            ...props,
        }

        super("form", props);
    }
    render() {
        return this.compile(tpl);
    }
}