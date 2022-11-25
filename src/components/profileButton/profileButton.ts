import { Component } from "../Block";
import tpl from "./profileButton.hbs";
import "./profileButton.scss";

export class ProfileButton extends Component {
    constructor(props : {[key: string] : object | string }) {
        super("button",  {...props, attr: {...(props.attr as object),  class: "chats__profile-btn"}});
    }

    render()  {
        const {text} = this.props;
        return this.compile(tpl, { text });
    }
}
