import tpl from './chat.hbs';
import './chat.scss';

export function chatPage(props = {}) {
    return tpl({...props });
}