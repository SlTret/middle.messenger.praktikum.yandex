import { loginPage } from './pages/login';
import { registrationPage } from './pages/registration';
import { chatPage } from './pages/chat';
import { profilePage } from './pages/profile';
import { changeUserDataPage } from './pages/changeUserData';
import { changePasswordPage } from './pages/changePassword';
import { errorPage } from './pages/error';

document.getElementById("root").innerHTML = loginPage();
document.getElementById("root").onclick = (e) => {

    if (e.target.tagName == "BUTTON") {

        const href = e.target.getAttribute("href");
        if (href === "registration")
            document.getElementById("root").innerHTML = registrationPage();
        if (href === "login")
            document.getElementById("root").innerHTML = loginPage();
        if (href === "chat")
            document.getElementById("root").innerHTML = chatPage({ userName: "Имя пользователя" });
        if (href === "profile")
            document.getElementById("root").innerHTML = profilePage();
        if (href === "changeUserData")
            document.getElementById("root").innerHTML = changeUserDataPage();
        if (href === "changePassword")
            document.getElementById("root").innerHTML = changePasswordPage();
        if (href === "500")
            document.getElementById("root").innerHTML = errorPage({ error: 500, message: "Мы уже фиксим" });
        if (href === "404")
            document.getElementById("root").innerHTML = errorPage({ error: 404, message: "Не туда попали" });

        e.preventDefault();
    }
}