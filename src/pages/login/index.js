import tpl from './login.hbs';
import './login.scss';

export function loginPage(props = {}) {
    return tpl({...props });
}