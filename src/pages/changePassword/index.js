import tpl from './changePassword.hbs';
import './changePassword.scss';

export function changePasswordPage(props = {}) {
    return tpl({...props });
}