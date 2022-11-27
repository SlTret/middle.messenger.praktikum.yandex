import { Indexed } from "src/store/store";
import { extendComponent } from "../../store/extendComponent";
import { Component } from "../Block";
import tpl from "./editTextField.hbs";
import "./editTextField.scss";

export interface State {
  fieldValue?: string
}

interface EditTextFieldProps extends State{
  fieldName:string;
  pattern?:string;
  inputName?:string;
  input?:string;
  mapStateToProps?: (state:Indexed) => State
  fieldType?:string;
}

class EditTextField extends Component<EditTextFieldProps> {
    constructor(props: { [key: string]: object | string }) {
        super({ ...props, tagName: "div", attr: { ...(props.attr as object), class: "user-info" } });
        this.addValidation();
    }

    render() {
        const { fieldName, fieldValue, inputName, fieldType, pattern, input } = this.props;
        return this.compile(tpl, { fieldName, fieldValue, inputName, fieldType, pattern, input });
    }

    addValidation(): void {
        const elem = this.element.getElementsByTagName("input")[0];
        if (elem) {
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

function mapStateToProps(state: Indexed): State {
    return { fieldValue: "" } ;
}

export default extendComponent<EditTextFieldProps, State>(EditTextField, mapStateToProps)
