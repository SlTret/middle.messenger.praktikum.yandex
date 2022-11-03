import { EventBus } from './EventBus';
import { v4 as uuidv4 } from 'uuid';

interface MetaType {
    tagName: string;
    props: object
}

type Props = { [key: string]: string }
type TemplateFunction = (props: Props) => string

export class Component extends EventBus {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
    };

    _element: HTMLElement;
    _id: string;
    _meta: MetaType;
    props: { [key: string]: object | string }
    children: { [key: string]: Component }

    constructor(tagName = "div", propsAndChildren = {}) {

        super();

        const { children, props } = this._getChildren(propsAndChildren);

        this.children = children;

        this._meta = {
            tagName,
            props
        };

        this._id = uuidv4();
        this.props = this._makePropsProxy({ ...props, id: this._id });
        this.dispatchComponentDidMount = this.dispatchComponentDidMount.bind(this);
        this._registerEvents();
        this.emit(Component.EVENTS.INIT);
    }

    _registerEvents() {
        this.on(Component.EVENTS.INIT, this.init.bind(this));
        this.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.on(Component.EVENTS.FLOW_CDU, this._render.bind(this));
    }

    compile(template: TemplateFunction, props = {}): DocumentFragment {
        const propsAndStubs: { [key: string]: string } = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

        fragment.innerHTML = template(propsAndStubs);

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    _addArrtibutes() {
        const { attr = {} } = { ...this.props };
        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value as string);
        });
    }

    _render() {
        const fragment = this.render();
        // this._removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(fragment);
        // this._addEvents();
    }

    // Может переопределять пользователь, необязательно трогать
    render(): DocumentFragment {
        return new DocumentFragment();
    }

    _getChildren(propsAndChildren: object) {
        const children: { [key: string]: Component } = {};
        const props: { [key: string]: object | string } = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Component) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    _addEvents() {
        const { events = {} } = this.props;
        (Object.keys(events) as Array<keyof typeof events>).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;
        (Object.keys(events) as Array<keyof typeof events>).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
        this._element.setAttribute('data-id', this._id);
        this._addArrtibutes();
        this._addEvents();
    }

    init() {
        this._createResources();
        this.emit(Component.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount(null);

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount(oldProps: object | null) { oldProps }

    dispatchComponentDidMount() {
        this.emit(Component.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: object, newProps: object) {
        const response: boolean = this.componentDidUpdate(oldProps, newProps);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: object, newProps: object) {
        this.emit(Component.EVENTS.FLOW_CDU);
        return true;
    }

    setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: { [key: string]: object | string }): { [key: string]: object | string } {
        const self = this;

        props = new Proxy(props, {
            get(target: { [key: string]: object }, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: { [key: string]: object }, prop: string, value) {
                if (target[prop] != value) {
                    const oldValue = target[prop];
                    target[prop] = value;
                    self.componentDidUpdate(oldValue, value)
                }
                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
        
        return props;
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}