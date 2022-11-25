import { IComponent, Props } from "src/components/Block";
import store, { StoreEvents } from "../store/store";
import { isEqual } from "../utils/isEqual";

type MapToPropsType = (state: any) => any;

const extendComponent = (ComponentClass: IComponent, mapStateToProps: (state: Props) => Props) => {
    return class extends ComponentClass {
        mapStateToProps: MapToPropsType
        constructor(props: any = {}) {
           
            if(props?.mapStateToProps) {
                mapStateToProps = props.mapStateToProps;
                delete props.mapStateToProps;
            }

            let currentState = mapStateToProps(store.getState());

            super({ ...props, ...currentState });

            this.mapStateToProps = mapStateToProps;

            store.on(StoreEvents.Updated, () => {
                
                const newState = this.mapStateToProps(store.getState());
                
                console.log("Updated currentState", currentState, store.getState());

                console.log("isEqual", isEqual(currentState, newState), newState);

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
