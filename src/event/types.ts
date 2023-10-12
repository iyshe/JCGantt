/**
 * 事件
 */
export interface JCEvent{

    type:string;

    source:any;

}

/**
 * 事件监听器
 */
export interface JCEventListener<T extends JCEvent>{

    eventType:string;

    handleEvent(event:T);

}

/**
 * 事件管理中心
 */
export interface JCEventManager{

    registerListener(listener:JCEventListener<T>);

    registerListenerByType(listener: JCEventListener<JCEvent>,type:string);

    publishedEvent(event:JCEvent);

    removeListener(listener:JCEventListener<JCEvent>);

    removeListenerByType(listener:JCEventListener<JCEvent>,type:string);

    registerAction(listener:JCEventListener<JCEvent>,action:ExtraAction);

}

export interface ExtraAction{

    target:any;

    action:(listener:JCEventListener<JCEvent>,target:any)=>void;

}