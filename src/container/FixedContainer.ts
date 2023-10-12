import {BoundingRect, Element, Group, Path, Rect} from "zrender";
import {OVERFLOW} from "./types";
import StackContainer from "./StackContainer";
import {Scroll} from "../components/scroll/Scroll";
import Container from "./Container";
import {isString} from "zrender/lib/core/util";
import ScrollOption from "../components/scroll/ScrollOption";
import EventManager from "../event/EventManager";
import {ScrollType} from "../components/scroll/types";

export default class FixedContainer extends StackContainer{

    static type = 'FixedContainer';

    type = FixedContainer.type;

    __origin_width:number | string;

    __origin_height:number | string;

    __width:number;

    __height:number;

    __overflow:OVERFLOW;

    __clipPath:Path;

    __scroll:Scroll;

    __scrollOption:ScrollOption;

    __content:Container;

    constructor(width?:number|string,height?:number|string,overflow?:OVERFLOW,scrollOption?:ScrollOption) {
        super();
        this.__origin_width = width;
        this.__origin_height = height;
        this.__overflow = overflow;
        this.__scrollOption = scrollOption || {};
        this.calcWeightAndHeight();
        this.initContentGroup();
        this.refreshClipPath();
        this.initEvent();
        EventManager.getInstance().registerListener(this);
    }

    public setScrollerOption(option:ScrollOption):void{
        this.__scrollOption = option;
        this.__scroll.setOption(option);
    }

    private initContentGroup():void{
        this.__content = new ContentContainer(this);
        this.add(this.__content);
    }

    private refreshClipPath(){
        this.__clipPath = new Rect({
            shape:{
                width:this.__width,
                height:this.__height
            }
        });
        this.setClipPath(this.__clipPath);
    }

    public add(child: Element): Group {
        let group = super.add(child);
        this.refreshScroll();
        return group;
    }

    public addContent(child: Element): Group {
        // let group = this.__content.add(child);
        let g = new ContentContainer(this);
        g.add(child);
        let group = this.__content.add(g);
        this.realWidth = super.getBoundingRect().width;
        this.realHeight = super.getBoundingRect().height;
        this.refreshScroll();
        return group;
    }

    public addContentHorizon(child: Element): Group {
        // let group = this.__content.addHorizon(child);
        let g = new ContentContainer(this);
        g.add(child);
        let group = this.__content.addHorizon(g);
        this.realWidth = super.getBoundingRect().width;
        this.realHeight = super.getBoundingRect().height;
        this.refreshScroll();
        return group;
    }

    public addContentVertical(child: Element): Group {
        // let group = this.__content.addVertical(child);
        let g = new ContentContainer(this);
        g.add(child);
        let group = this.__content.addVertical(g);
        this.realWidth = super.getBoundingRect().width;
        this.realHeight = super.getBoundingRect().height;
        this.refreshScroll();
        return group;
    }

    public bindScroll(type:ScrollType,container:FixedContainer):void{
        if (!this.__scroll || !container.__scroll){
            return;
        }
        this.__scroll.items.add({
            type:type,
            scroll:container.__scroll
        });
        container.__scroll.items.add({
            type:type,
            scroll:this.__scroll
        })
    }

    private addChild(child: Element,refreshScroller:boolean): Group {
        let group = super.add(child);
        refreshScroller && this.refreshScroll();
        return group;
    }

    public addBottom(child:Group):Group{
        let height = child.getBoundingRect().height;
        child.setPosition([0,this.__height - height]);
        return this.addChild(child,false);
    }

    public addRight(child:Group):Group{
        let width = child.getBoundingRect().width;
        child.setPosition([this.__width - width,0]);
        return this.addChild(child,false);
    }

    public refresh() {
        super.refresh();
    }

    public resize(width?:number | string,height?:number | string) {
        super.resize(width,height);
        width && (this.__origin_width = width);
        height && (this.__origin_height = height);
        this.calcWeightAndHeight();
        this.refreshClipPath();
        this.refreshScroll();
        // todo 当滚动滚动条后缩放尺寸，滚动条会置零，无法保持当前滚动状态
        this.__scroll && this.__scroll.resetPosition();
    }

    getBoundingRect(includeChildren?: Element[]): BoundingRect {
        return this.__clipPath ? this.__clipPath.getBoundingRect() : new BoundingRect(0,0,this.__width,this.__height);
    }

    getOriginBoundingRect(includeChildren?: Element[]): BoundingRect {
        return super.getBoundingRect(includeChildren);
    }

    private calcWeightAndHeight():void {
        this.__width = parseFloat(<string>this.__origin_width);
        this.__height = parseFloat(<string>this.__origin_height);
        if (this.parent && this.parent instanceof ContentContainer){
            let c = <FixedContainer>(this.parent.container);
            if (isString(this.__origin_width)){
                this.__width = c.__width * (parseFloat((<String>this.__origin_width).split("%")[0])/100);
            }
            if (isString(this.__origin_height)){
                this.__height = c.__height * (parseFloat((<String>this.__origin_height).split("%")[0])/100);
            }
        }
    }

    private refreshScroll():void{
        if (this.__overflow == 'hidden'){
            return;
        }
        !this.__scroll && (this.__scroll = new Scroll(this.__scrollOption || {},this));
        this.__scroll.model.setOption(this.__scrollOption);
        this.__scroll.refresh();
    }

    private initEvent():void{
        let that = this;
        this.onmousewheel = (e) => {
            e.stop();
            e.event.preventDefault();
            if (that.__scroll){
                if (e.event.shiftKey){
                    that.__scroll.moveTo("horizon",-5 * e.wheelDelta);
                }else {
                    that.__scroll.moveTo("vertical",-5 * e.wheelDelta);
                }
            }
        }
    }
}

class ContentContainer extends StackContainer{

    container:FixedContainer;

    constructor(container:FixedContainer) {
        super();
        this.container = container;
    }

}