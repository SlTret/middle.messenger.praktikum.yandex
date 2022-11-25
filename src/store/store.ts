import { EventBus } from "../components/EventBus";
import set from "../utils/set";

export type Indexed =  { [key: string] : any }

export enum StoreEvents {
    Updated = 'updated',
  }

class Store extends EventBus {
    private state: Indexed = {};

    constructor(...args: []) {
        super(...args);
    }

    public getState() {
        return this.state;
    }
   
    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    };
}
export default new Store(); 