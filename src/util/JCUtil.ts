import {Element} from "zrender";
import AnimateManager from "../animator/AnimateManager";
import {isFunction, isObject} from "zrender/lib/core/util";

export function addHoverAnimate<T>(el:Element,key:string,hoverProps:Partial<T>,duration:number):void{
    let origin =  el[key];
    let hover = {
        ...origin,
        ...hoverProps
    }
    let manager = AnimateManager.getInstance();
    manager.addAnimate(el,"mouseover",
        el.animate(key,false,true)
            .when(duration,hover)
            .done(() => {
                el[key] = hover
            }));

    manager.addAnimate(el,"mouseout",
        el.animate(key,false,true)
            .when(duration,origin)
            .done(() => {
                el[key] = origin
            }));

    el.onmouseover = (e) => {
        e.event.preventDefault();
        el.updateDuringAnimation('');
        manager.getAnimate(el,"mouseover").start();
    }
    el.onmouseout = (e) => {
        e.event.preventDefault();
        el.updateDuringAnimation('');
        manager.getAnimate(el,"mouseout").start();
    }
}

export function addHover<T>(el:Element,key:string,hoverProps:Partial<T>):void{

    el["originStyle"] || (el["originStyle"] = el[key]);

    el.onmouseover = (e) => {
        e.event.preventDefault();
        if (el["hoverForbid"]){
            return;
        }
        let hover = {
            ...el["originStyle"],
            ...hoverProps
        }
        el.dirty();
        el[key] = hover;
    }
    el.onmouseout = (e) => {
        e.event.preventDefault();
        if (el["hoverForbid"]){
            return;
        }
        el.dirty();
        el[key] = el["originStyle"];
    }

    el["restoreStyle"] = () => {
        let origin = el["originStyle"];
        el.dirty();
        el[key] = origin;
    }
}

export function applyTo(opt,target,overwrite?:boolean){
    if (!opt || !target){
        return;
    }
    for (let key in opt) {
        if (!target[key]){
            target[key] = opt[key];
        }else {
            if (isFunction(opt[key])){
                overwrite && (target[key] = opt[key]);
            }else if (isObject(opt[key])){
                applyTo(opt[key],target[key],overwrite);
            }else {
                overwrite && (target[key] = opt[key]);
            }
        }
    }
}
