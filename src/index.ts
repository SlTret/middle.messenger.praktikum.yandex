import { LoginPage } from "./pages/login/loginPage";
import { RegistrationPage } from "./pages/registration/registrationPage";
import { ChatPage } from "./pages/chat/chatPage";
import { ChangeUserDataPage } from "./pages/changeUserData/changeUserDataPage";
import { ProfilePage } from "./pages/profile/profilePage";
import { ChangePasswordPage } from "./pages/changePassword/changePasswordPage";
import { ErrorPage } from "./pages/error/errorPage";
import { Pages, PagesEvents, Service } from "./services/Service";
import { HttpTransport } from "./services/HttpTransport";
import { RenderPage } from "./services/RenderPage";


const renderPage = new RenderPage(".root");
const service = new Service();

const loginPage = new LoginPage(service);
const registrationPage = new RegistrationPage(service);
const chatPage = new ChatPage(service);
const changeUserDataPage = new ChangeUserDataPage(service);
const profilePage = new ProfilePage(service);
const changePasswordPage = new ChangePasswordPage(service);
const errorPage = new ErrorPage(service);

renderPage.render(loginPage);

service.on(PagesEvents.CHANGE_PAGE, (page: Pages, arg :{[key:string] : string | object} = {}) => {
    switch (page) {
        case Pages.LOGIN_PAGE:
            renderPage.render(loginPage);
            break;
        case Pages.CHAT_PAGE:
            renderPage.render(chatPage);
            break;
        case Pages.CHANGE_USER_DATA_PAGE:
            renderPage.render(changeUserDataPage);
            break;
        case Pages.REGISTRATION_PAGE:
            renderPage.render(registrationPage);
            break;
        case Pages.USER_PROFILE_PAGE:
            renderPage.render(profilePage);
            break;
        case Pages.CHANGE_PASSWORD_PAGE:
            renderPage.render(changePasswordPage);
            break;
        case Pages.ERROR_PAGE:
            errorPage.setProps(arg);
            renderPage.render(errorPage);
            break;
        default:
            renderPage.render(loginPage);
            break;
    }
});

let http = new HttpTransport();
