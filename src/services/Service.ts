import { EventBus } from "../components/EventBus";

enum Pages  {
    LOGIN_PAGE,
    REGISTRATION_PAGE,
    CHAT_PAGE,
    CHANGE_USER_DATA_PAGE,
    CHANGE_PASSWORD_PAGE,
    USER_PROFILE_PAGE,
    ERROR_PAGE
}

enum PagesEvents {
    CHANGE_PAGE = "change-page",
}

class Service extends EventBus {
    constructor(){
        super();
    }
}

export {Pages, PagesEvents, Service}