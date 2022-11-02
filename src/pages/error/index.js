import tpl from './error.hbs';
import './error.scss';

export function errorPage(props = {}) {
    return tpl({...props });
}