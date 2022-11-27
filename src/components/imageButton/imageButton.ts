import { Component } from "../Block";
import tpl from "./imageButton.hbs";
import "./imageButton.scss";

export class ImageButton extends Component {
    constructor(props : {[key: string] : object | string } = {}) {
        super({altImage:"кнопка", ...props, tagName:"div", attr: {...(props.attr as object),  class: "image-button"}});
    }

    render() {
        const {text, imageUrl, altImage} = this.props;
        return this.compile(tpl, { text, imageUrl, altImage });
    }
}
