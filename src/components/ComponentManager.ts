import Component from "./Component";
import JCGantt from "../JCGantt";

export default class ComponentManager{

    componentMap:Map<string,Component> = new Map<string, Component>();

    // private static instance = new ComponentManager();
    private static instanceMap:Map<JCGantt,ComponentManager> = new Map<JCGantt, ComponentManager>();

    private constructor() {
    }

    public static registerInstance(jcGantt:JCGantt):void{
        ComponentManager.instanceMap.set(jcGantt,new ComponentManager());
    }

    public static getInstance(jcGantt:JCGantt):ComponentManager{
        return ComponentManager.instanceMap.get(jcGantt);
    }

    public componentRegister(key:string,component:Component){
        this.componentMap.set(key,component);
    }

    public getComponent<T>(key:string):T{
        return <T>this.componentMap.get(key);
    }

}