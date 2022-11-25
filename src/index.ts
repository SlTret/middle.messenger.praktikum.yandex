import LoginPage from "./pages/login/loginPage";
import { RegistrationPage } from "./pages/registration/registrationPage";
import  ChatPage from "./pages/chat/chatPage";
import  ChangeUserDataPage from "./pages/changeUserData/changeUserDataPage";
import { ProfilePage } from "./pages/profile/profilePage";
import { ChangePasswordPage } from "./pages/changePassword/changePasswordPage";
import { ErrorPage } from "./pages/error/errorPage";
import Router from "./router/router";


// const routes = {
//     // login: { path: "/", pageClass: LoginPage },
//     // registration: { path: "/sign-up", pageClass: RegistrationPage },
    
//     registration: { path: "/", pageClass: RegistrationPage },

//     chat: { path: "/messenger", pageClass: ChatPage },
//     profile: { path: "/profile", pageClass: ProfilePage },
//     settings: { path: "/settings", pageClass: ChangeUserDataPage },
//     changePassword: { path: "/change-password", pageClass: ChangePasswordPage },
//     error: { path: "/error", pageClass: ErrorPage }
// }

// router
//     // .use(routes.login)
//     .use(routes.registration)
//     .use(routes.chat)
//     // .use(routes.profile)
//     // .use(routes.settings)
//     // .use(routes.changePassword)
//     // .use(routes.error)
//     .start();

// router.go(routes.registration.path)

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





