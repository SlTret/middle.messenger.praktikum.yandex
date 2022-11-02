import { ProfileButton } from '../../components/profileButton/profileButton';
import { Pages, PagesEvents, Service } from '../../services/Service';
import { Component } from '../../components/Block';
import { ChatItem } from '../../components/chatItem/chatItem';
import tpl from './chatPage.hbs';
import './chatPage.scss';


export class ChatPage extends Component {

    constructor(service :Service, props = {} ) {

        props = {
            events: {
                click: (e:Event) => {
                    const target = e.target as HTMLElement;

                    if (target.tagName == "BUTTON") {
                        const href = target.getAttribute("href");
                        
                        console.log("href",href )

                        if(href == '404')
                            service.emit(PagesEvents.CHANGE_PAGE, Pages.ERROR_PAGE, {message:"Не туда попали", error: "404"})
                        if(href == '500')
                            service.emit(PagesEvents.CHANGE_PAGE, Pages.ERROR_PAGE, {message:"Мы уже чиним", error: "500"})
                    }
                }
            },
            chatItem:  new ChatItem({
                userName:"Имя пользователя"
            }),
            userName: "Имя пользователя",
            profileBtn: new ProfileButton({
                text: "Профиль",
                attr: { type: 'submit'},
                events: {
                    click: () => service.emit(PagesEvents.CHANGE_PAGE, Pages.USER_PROFILE_PAGE)
                }
            }),

            ...props
        }

        super("div", props);
    }

    render() {
        const {userName, chats} = this.props;
        return this.compile(tpl, {userName, chats});
    }
}