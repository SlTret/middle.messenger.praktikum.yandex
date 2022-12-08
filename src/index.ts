import LoginPage from "./pages/login/loginPage";
import { RegistrationPage } from "./pages/registration/registrationPage";
import  ChatPage from "./pages/chat/chatPage";
import  ChangeUserDataPage from "./pages/changeUserData/changeUserDataPage";
import { ProfilePage } from "./pages/profile/profilePage";
import { ChangePasswordPage } from "./pages/changePassword/changePasswordPage";
import Router from "./router/router";


const router = new Router(".root");
router
    .use("/", LoginPage)
    .use("/signup", RegistrationPage)
    .use("/chats", ChatPage )
    .use("/profile", ProfilePage )
    .use("/settings", ChangeUserDataPage)
    .use("/change-password", ChangePasswordPage)
//     // .use(routes.error)
    .start();





