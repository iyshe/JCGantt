import {ExtraAction, JCEvent, JCEventListener, JCEventManager} from "./types";

export default class EventManager implements JCEventManager{

    private static instance = new EventManager();

    private listenerMap:Map<string,JCEventListener<JCEvent>[]>;

    private extraActionMap:Map<JCEventListener<JCEvent>,ExtraAction[]>;

    public static getInstance():JCEventManager{
        return EventManager.instance;
    }

    private constructor() {
    }

    /* public */

    publishedEvent(event: JCEvent) {
        if (!event || !this.listenerMap){
            return;
        }
        let listenerArray = this.listenerMap.get(event.type);
        let actionMap = this.extraActionMap;
        if (listenerArray){
            listenerArray.forEach((listener) => {
                listener.handleEvent(event);
                let actions = actionMap.get(listener);
                if (actions){
                    actions.forEach((act) => {
                        act.action(listener,act.target);
                    })
                }
            })
        }
    }

    registerListener(listener: JCEventListener<JCEvent>) {
        if (!listener){
            return;
        }
        !this.listenerMap && this.initListenerMap();
        let listenerArray:JCEventListener<JCEvent>[] = this.listenerMap.get(listener.eventType);
        if (!listenerArray){
            listenerArray = [];
            this.listenerMap.set(listener.eventType,listenerArray);
        }
        listenerArray.push(listener);
    }

    registerListenerByType(listener: JCEventListener<JCEvent>,type:string) {
        if (!listener){
            return;
        }
        !this.listenerMap && this.initListenerMap();
        let listenerArray:JCEventListener<JCEvent>[] = this.listenerMap.get(type);
        if (!listener){
            listenerArray = [];
            this.listenerMap.set(type,listenerArray);
        }
        listenerArray.push(listener);
    }

    removeListener(listener:JCEventListener<JCEvent>){
        let listenerArray:JCEventListener<JCEvent>[];
        if (this.listenerMap && (listenerArray = this.listenerMap.get(listener.eventType))){
            let index = listenerArray.indexOf(listener);
            if (index >= 0){
                listenerArray.splice(index,1);
            }
        }
    }

    removeListenerByType(listener:JCEventListener<JCEvent>,type:string){
        let listenerArray:JCEventListener<JCEvent>[];
        if (this.listenerMap && (listenerArray = this.listenerMap.get(type))){
            let index = listenerArray.indexOf(listener);
            if (index >= 0){
                listenerArray.splice(index,1);
            }
        }
    }

    registerAction(listener:JCEventListener<JCEvent>,action:ExtraAction){
        let arr = this.extraActionMap.get(listener);
        if (!arr){
            arr = [];
            this.extraActionMap.set(listener,arr);
        }
        arr.push(action);
    };

    /* private */

    private initListenerMap() {
        this.listenerMap = new Map<string, JCEventListener<JCEvent>[]>();
        this.extraActionMap = new Map<JCEventListener<JCEvent>, ExtraAction[]>();
    }
}