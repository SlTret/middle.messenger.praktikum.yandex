import tpl from './registration.hbs';
import './registration.scss';

export function registrationPage(props = {}) {
    return tpl({...props });
}