import { extendComponent } from "../../store/extendComponent";
import { Component } from "../Block";
import tpl from "./avatar.hbs";
import "./avatar.scss";
import { v4 as uuidv4 } from 'uuid';
import { Indexed } from "src/store/store";
import { RESOURCES_URL } from "../../api/base-api";

interface AvatarState {
  avatarUrl?: string;
}

interface AvatarProps extends AvatarState {
  tagName?: string;
  maskId?: string;
  events?: {};
  selectAvatarId?: string;
}

class Avatar extends Component<AvatarProps> {
  constructor(props: AvatarProps) {
    props = {
      tagName: "form",
      maskId: uuidv4(),
      ...props
    }

    super(props);
  }

  render() {
    const { avatarUrl, input, maskId, selectAvatarId } = this.props;
    const defaultAvatarDisplay = avatarUrl ? "none" : "block";
    const userAvatarDisplay = avatarUrl ? "block" : "none";
    return this.compile(tpl, { avatarUrl, input, maskId, selectAvatarId, defaultAvatarDisplay, userAvatarDisplay });
  }
}


function mapStateToProps(state: Indexed): AvatarState {
  return {
    avatarUrl: state?.user?.avatar ? RESOURCES_URL + state?.user?.avatar : ""
  }
}

export default extendComponent<AvatarProps, AvatarState>(Avatar, mapStateToProps)
