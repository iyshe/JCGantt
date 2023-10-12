import Component from "../Component";
import {Element, ZRenderType} from "zrender";
import Option from "../Option";
import EnableTooltip from "./EnableTooltip";
import {ThemeItem} from "../../types";
import JCGantt from "../../JCGantt";

export default class Tooltip implements Component{

    static type = 'Tooltip';

    type = Tooltip.type;

    static instance = new Tooltip();

    jcGantt:JCGantt;

    _uiInstance: Element[];

    zrInstance: ZRenderType;

    dom:HTMLElement;

    private static forbidden:boolean;

    public static getInstance():Tooltip{
        return Tooltip.instance;
    }

    private constructor() {
        this.dom = this.createTooltip();
    }

    public hide():void{
        if (!this.dom){
            this.dom = this.createTooltip();
        }
        this.dom.classList.add("hide");
    }

    public show(x:number,y:number,content:string):void{
        if (!this.dom){
            this.dom = this.createTooltip();
        }
        this.dom.classList.remove("hide");
        this.dom.innerHTML = content;
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (y <= this.dom.clientHeight){
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

    public static forbid():void{
        Tooltip.forbidden = true;
    }

    public static allow():void{
        Tooltip.forbidden = false;
    }

    refresh(): void {
    }

    setOption(option: Option): void {
    }

    private createTooltip():HTMLElement{
        if (this.dom){
            return this.dom;
        }
        let body = document.body;
        if (!body){
            return null;
        }
        let div = document.createElement("div");
        div.classList.add("tooltip","hide");
        body.append(div);
        return div;
    }

    static init(element:EnableTooltip):void{
        let mov = element.onmouseover;
        let mou = element.onmouseout;
        element.onmouseover = (e) => {
            mov && mov(e);
            // !Tooltip.forbidden && Tooltip.getInstance().show(e.offsetX,e.offsetY,element.getTooltip());
            !Tooltip.forbidden && Tooltip.getInstance().show(e.event['clientX'],e.event['clientY'],element.getTooltip());
        }

        element.onmouseout = (e) => {
            mou && mou(e);
            Tooltip.getInstance().hide();
        }
    }

    static initElement(element:Element,content:string):void{
        let mov = element.onmouseover;
        let mou = element.onmouseout;
        element.onmouseover = (e) => {
            mov && mov(e);
            !Tooltip.forbidden && Tooltip.getInstance().show(e.event['clientX'],e.event['clientY'],content);
        }

        element.onmouseout = (e) => {
            mou && mou(e);
            Tooltip.getInstance().hide();
        }
    }

    setTheme(theme: ThemeItem, forceTheme?: boolean): void {
    }

}