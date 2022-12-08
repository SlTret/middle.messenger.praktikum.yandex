import { isEqual } from '../utils/isEqual';
import { Component } from 'src/components/Block';
import { render } from '../utils/render';

type Props = {
    rootQuery: string;
    props?: Record<string, any>
}

export default class Route {
    private _pathname: string
    private _blockClass
    private _block: Component | null = null;
    private _props: Props

    constructor(pathname: string, view: typeof Component, props: Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props.props);
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}
