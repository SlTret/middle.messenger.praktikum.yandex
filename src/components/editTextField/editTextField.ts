import { Component } from "../Block";
import tpl from "./editTextField.hbs";
import "./editTextField.scss";

export class EditTextField extends Component {
    constructor(props : {[key: string] : object | string} ) {
        super("div", {...props, attr: {...(props.attr as object),  class: "user-info"}});
        this.addValidation();
    }

    render()  {
        const {fieldName, fieldValue, inputName, fieldType, pattern} = this.props;
        return this.compile(tpl, {fieldName, fieldValue, inputName, fieldType, pattern});
    }

    addValidation() : void {
        const elem = this.element.getElementsByTagName("input")[0];
        if(elem) {
            const pattern = this.props.pattern;
            const regex = new RegExp(pattern as string);
            elem.addEventListener("focus", () => {
                regex.test(elem.value) ? elem.classList.remove("valid") : elem.classList.remove("invalid")
            })
            elem.addEventListener("blur", () => {
                regex.test(elem.value) ? elem.classList.add("valid") : elem.classList.add("invalid")
            })
        }
    }
}
