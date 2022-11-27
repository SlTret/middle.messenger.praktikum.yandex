import { Component } from "src/components/Block";
import store, { Indexed, StoreEvents } from "../store/store";
import { isEqual } from "../utils/isEqual";

const extendComponent = <Props extends Indexed, State extends Indexed>(ComponentClass: typeof Component, mapStateToProps: (state: Record<string, any>) => State) => {
    return class extends ComponentClass<Props> {
        mapStateToProps: (state: Record<string, any>) => State
        constructor(props: Props) {

            if(props?.mapStateToProps) {
                mapStateToProps = props.mapStateToProps;
                delete props.mapStateToProps;
            }

            let currentState = mapStateToProps(store.getState());

            super({ ...props, ...currentState });

            this.mapStateToProps = mapStateToProps;

            store.on(StoreEvents.Updated, () => {

                const newState = this.mapStateToProps(store.getState());

                if (!isEqual(currentState, newState)) {
                    console.log("component update");
                    this.setProps({ ...newState });
                    currentState = newState
                }
            });
        }
    }
}

export { extendComponent }
