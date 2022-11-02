export class EventBus {
    _listeners: {[key: string]: Function[]};

    constructor() {
        this._listeners = {};
    }

    on(event: string, callback : Function) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(callback);
    }

    off(event : string, callback : Function) {
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