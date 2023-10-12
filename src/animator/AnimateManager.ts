import Animator from "zrender/lib/animation/Animator";
import {Element} from "zrender";

export default class AnimateManager {

    private animateMap:Map<Element,Map<string,Animator<any>>> = new Map();

    private static instance:AnimateManager = new AnimateManager();

    private constructor() {

    }

    static getInstance():AnimateManager{
        return AnimateManager.instance;
    }

    public addAnimate(el:Element,name:string,animator:Animator<any>):Animator<any>{
        let map:Map<string,Animator<any>> = null;
        if(!(map = this.animateMap.get(el))){
            map = new Map<string, Animator<any>>();
            this.animateMap.set(el,map);
        }
        map.set(name,animator);
        return animator;
    }

    public getAnimate(el:Element,name:string):Animator<any>{
        let ani = null;
        let map = this.animateMap.get(el);
        if (map){
            ani = map.get(name);
        }
        if (ani){
            ani._started = 0;
            for (let key in ani._tracks) {
                ani._tracks[key]._finished = false;
            }
        }
        return ani;
    }

    public createAnimate<T>(el:Element,key:string,hoverProps:Partial<T>,duration:number,saveState:boolean,loop:boolean,animateName:string):Animator<any>{
        let origin =  el[key];
        let hover = {
            ...origin,
            ...hoverProps
        }
        let animate = el.animate(key,loop,true)
            .when(duration,hover)
            .done(() => {
                saveState && (el[key] = hover)
            });
        let manager = AnimateManager.getInstance();
        manager.addAnimate(el,animateName,animate);
        return animate;
    }

}