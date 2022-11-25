import { Component } from "../Block";
import tpl from "./infoTextField.hbs";
import "./infoTextField.scss";

export class InfoTextField extends Component {
    constructor(props : {[key: string] : object | string} ) {
        super("div", {...props, attr: {...(props.attr as object),  class: "user-info"}});
    }

    render()  {
        const {fieldName, fieldValue} = this.props;
        return this.compile(tpl, {fieldName, fieldValue});
    }
}
