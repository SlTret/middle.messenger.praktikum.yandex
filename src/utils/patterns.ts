export const patterns = Object.freeze({
    login: "^[a-zA-Z][a-zA-Z0-9_-]{2,20}$",
    password: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,40}$",
    email: "^[^ ]+@[^ ]+[\.][a-z]{2,4}$",
    firstName: "^[А-ЯЁA-Z][a-zA-Zа-яёА-ЯЁ]{3,20}$",
    secondName: "^[А-ЯЁA-Z][a-zA-Zа-яёА-ЯЁ]{3,20}$",
    phone: "^[\+]?[0-9]{10,15}$",
    chatName: "^[a-zA-Zа-яёА-ЯЁ_-]{3,20}$",
    message: ".*\\S.*"
});
