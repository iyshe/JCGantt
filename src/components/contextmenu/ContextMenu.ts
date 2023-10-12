import Component from "../Component";
import {Element, ZRenderType} from "zrender";
import Option from "../Option";
import {ThemeItem} from "../../types";
import {ContextMenuItem} from "./types";
import JCGantt from "../../JCGantt";

export default class ContextMenu implements Component{

    jcGantt:JCGantt;
    _uiInstance: Element[];
    zrInstance: ZRenderType;

    dom:HTMLElement;

    target:Element;

    private static instance = new ContextMenu();

    public static getInstance():ContextMenu{
        return ContextMenu.instance;
    }

    private constructor() {
        this.dom = this.createContextMenu();
    }

    public show(x:number,y:number,items:ContextMenuItem[]):void{
        this.dom.remove();
        this.dom = null;
        if (!this.dom){
            this.dom = this.createContextMenu();
        }
        let that = this;
        if (items && items.length){
            items.forEach(it => {
                that.addItem(it);
            })
        }
        this.dom.classList.remove("hide_real");
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (h >= y + this.dom.clientHeight){
            this.dom.style.top = y + 'px';
        }else {
            this.dom.style.top = (y - this.dom.clientHeight) + 'px';
        }
        if (x + this.dom.clientWidth <= w){
            this.dom.style.left = x + 'px';
        }else {
            this.dom.style.left = (x - this.dom.clientWidth) + 'px';
        }
    }

    public hide():void{
        if (!this.dom){
            this.dom = this.createContextMenu();
        }
        this.dom.classList.add("hide_real");
    }

    refresh(): void {
    }

    setOption(option: Option): void {
    }

    setTheme(theme: ThemeItem, forceTheme?: boolean): void {
    }

    private createContextMenu():HTMLElement {
        if (this.dom){
            return this.dom;
        }
        let body = document.body;
        if (!body){
            return null;
        }
        let div = document.createElement("div");
        div.classList.add("content-menu","hide_real");
        body.append(div);
        return div;
    }

    private addItem(item:ContextMenuItem):void{
        let it = document.createElement("div");
        it.classList.add("content-menu-item");
        item.cls && it.classList.add(item.cls);
        let style = item.style ? item.style() : {};
        for (let key in style) {
            it.style[key] = style[key];
        }
        if (item.disabled && item.disabled()){
            it.classList.add("content-menu-item-forbid");
        }
        it.onclick = function (){
            item.handler && item.handler();
            ContextMenu.getInstance().hide();
        }
        let icon = document.createElement("i");
        icon.classList.add("content-menu-item-icon");
        let img = document.createElement("img");
        item.icon && (img.src = item.icon);
        icon.append(img);
        it.append(icon);
        let span = document.createElement("span");
        span.classList.add("content-menu-item-text");
        span.innerHTML = item.text || "";
        it.append(span);
        this.dom.append(it);
    }
}