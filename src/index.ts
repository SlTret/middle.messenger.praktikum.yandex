import LoginPage from "./pages/login/loginPage";
import { RegistrationPage } from "./pages/registration/registrationPage";
import  ChatPage from "./pages/chat/chatPage";
import  ChangeUserDataPage from "./pages/changeUserData/changeUserDataPage";
import { ProfilePage } from "./pages/profile/profilePage";
import { ChangePasswordPage } from "./pages/changePassword/changePasswordPage";
import router from "./router/router";
import "./styles/style.scss"
import { ErrorPage } from "./pages/error/errorPage";

router
    .use("/", LoginPage)
    .use("/signup", RegistrationPage)
    .use("/chats", ChatPage )
    .use("/profile", ProfilePage )
    .use("/settings", ChangeUserDataPage)
    .use("/change-password", ChangePasswordPage)
    .use("/error",ErrorPage)
    .start();
