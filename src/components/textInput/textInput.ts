import { Component } from "../Block";
import tpl from "./textInput.hbs";
import "./textInput.scss";

export class TextInput extends Component {
    constructor(props : {[key: string] : object | string} ) {
        super({...props, tagName:"div", attr: {...(props.attr as object),  class: "text-field"}});
        this.addValidation();
    }
    
    render() {
        const {header, name, placeholder, pattern, type} = this.props;
        return this.compile(tpl, {header, name, pattern, placeholder, type});
    }
    getInputValue() {
        const elem = this.element.getElementsByTagName("input")[0];
        return elem.value;
    }

    addValidation() : void {
        const elem = this.element.getElementsByTagName("input")[0];
        if(elem) {
            const pattern = this.props.pattern;
            const regex = new RegExp(pattern as string);
            elem.addEventListener("focus", () => {
                regex.test(elem.value) ? elem.classList.remove("text-field__input_valid") : elem.classList.remove("text-field__input_invalid")
            })
            elem.addEventListener("blur", () => {
                regex.test(elem.value) ? elem.classList.add("text-field__input_valid") : elem.classList.add("text-field__input_invalid")
            })
        }
    }
}
