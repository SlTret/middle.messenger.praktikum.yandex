import { Component } from "../Block";
import tpl from "./button.hbs";
import "./button.scss";

export class Button extends Component {
    constructor(props : {[key: string] : object | string }) {
        super({...props, tagName:"button", attr: {...(props.attr as object),  class: "button"}});
    }

    render()  {
        const {text} = this.props;
        return this.compile(tpl, { text });
    }
}
