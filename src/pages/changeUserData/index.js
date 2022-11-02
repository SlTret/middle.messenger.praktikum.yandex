import tpl from './changeUserData.hbs';
import './changeUserData.scss';

export function changeUserDataPage(props = {}) {
    return tpl({...props });
}