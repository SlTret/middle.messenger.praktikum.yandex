import { Component } from "../Block";
import tpl from "./chatItem.hbs";
import "./chatItem.scss";

export class ChatItem extends Component {
    constructor(props : {[key: string] : object | string} ) {
        super("div", {...props, attr: {...(props.attr as object),  class: "chats__item"}});
    }

    render()  {
        const {userName} = this.props;
        return this.compile(tpl, {userName});
    }
}
