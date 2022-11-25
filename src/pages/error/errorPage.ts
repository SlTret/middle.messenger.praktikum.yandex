import { Button } from '../../components/button/button';
import { Component } from '../../components/Block';
import tpl from './errorPage.hbs';
import './errorPage.scss';

export class ErrorPage extends Component {
  
    constructor(service :Service, props = {}) {

        props = {
            error: "404",
            message: "Не туда попали",
            returnBtn: new Button({
                attr: { type: 'button' },
                text: 'Вернуться в чат',
                events: {
                }
            }),
            ...props,
        }

        super("div", props);
    }

    render()  {
        const {error, message} = this.props;
        return this.compile(tpl, {error, message});
    }

    
}
