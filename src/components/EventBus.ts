
type ListenerFn = (...args: any[] ) => void

export class EventBus {

    _listeners: {[key: string]: ListenerFn[]};

    constructor() {
        this._listeners = {};
    }

    on(event: string, callback : ListenerFn) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(callback);
    }

    off(event : string, callback : ListenerFn) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event] = this._listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event : string, ...args : any[]) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}