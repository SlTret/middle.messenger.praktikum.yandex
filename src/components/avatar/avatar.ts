import { extendComponent } from "../../store/extendComponent";
import usersController from "../../controllers/usersController";
import { Component } from "../Block";
import tpl from "./avatar.hbs";
import "./avatar.scss";
import { v4 as uuidv4 } from 'uuid';

class Avatar extends Component {
    constructor(props: { [key: string]: object | string } = {}) {
        props = {
            tagName: "form",
            maskId: uuidv4(),
            ...props
        }

        super(props);
    }

    render() {

        const { avatarUrl, input, maskId, selectAvatarId } = this.props;

        console.log("avatarURL", avatarUrl);

        const defaultAvatarDisplay = avatarUrl ? "none" : "block";
        const userAvatarDisplay =  avatarUrl ? "block" : "none";
        return this.compile(tpl, { avatarUrl, input, maskId, selectAvatarId, defaultAvatarDisplay, userAvatarDisplay });
    }
}

function mapStateToProps(state: any):any {
    return {
        avatarUrl: state?.user?.avatar ? "https://ya-praktikum.tech/api/v2/resources" + state?.user?.avatar : ""
    }
}

export default extendComponent(Avatar, mapStateToProps)  
