import { Component } from "../Block";
import tpl from "./profileButton.hbs";
import "./profileButton.scss";

export class ProfileButton extends Component {
    constructor(props : {[key: string] : object | string }) {
        super({...props, tagName:"button", attr: {...(props.attr as object),  class: "chats__profile-btn"}});
    }

    render()  {
        const {text} = this.props;
        return this.compile(tpl, { text });
    }
}
