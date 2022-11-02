import tpl from './profile.hbs';
import './profile.scss';

export function profilePage(props = {}) {
    return tpl({...props });
}