import FixedContainer from "../../container/FixedContainer";
import Model from "../Model";
import ScrollOption from "./ScrollOption";
import {ScrollData} from "./types";
import {Scroll} from "./Scroll";
import ComponentManager from "../ComponentManager";
import TimeScale from "../timeScale/TimeScale";

export default class ScrollModel extends Model<ScrollOption>{

    container?: FixedContainer;

    horizon:ScrollData;

    vertical:ScrollData;

    scroll:Scroll;

    static scrollLength:number = 8;

    constructor(option?:ScrollOption,fullOption?:ScrollOption) {
        super(option || {},fullOption || {});
    }

    public setScroll(scroll:Scroll){
        this.scroll = scroll;
    }

    public setOption(option:ScrollOption):void{
        this.originOption = option;
        this.fullOption = option;
    }

    public setContainer(container:FixedContainer):void{
        this.container = container;
    }

    public refresh():void{
        this.scrollForContainer();
    }

    public scrollTo(container:FixedContainer):void{
        this.container = container;
        this.scrollForContainer();
    }

    private scrollForContainer():void{
        if (!this.container){
            return;
        }
        this.createScrollHorizon();
        this.createScrollVertical();
    }

    private createScrollHorizon():void{
        let overLength = this.container.realWidth - this.container.__width;
        if (overLength <= 0){
            this.horizon = null;
            return;
        }
        this.horizon = {
            type:"horizon",
            trackLength:this.container.__width,
            thumbLength:Math.round((this.container.__width/this.container.realWidth) * this.container.__width),
            trackStyle:this.originOption.trackStyle || {},
            thumbStyle:this.originOption.thumbStyle || {},
            height:this.originOption.thickness || ScrollModel.scrollLength
        }
    }

    private createScrollVertical():void{
        let overLength = this.container.realHeight - this.container.__height;
        // let overLength = this.container.getOriginBoundingRect().height - this.container.__height;
        if (overLength <= 0){
            this.vertical = null;
            return;
        }
        this.vertical = {
            type:"vertical",
            trackLength:this.container.__height,
            thumbLength:Math.round((this.container.__height/this.container.realHeight) * this.container.__height),
            trackStyle:this.originOption.trackStyle || {},
            thumbStyle:this.originOption.thumbStyle || {},
            width:this.originOption.thickness || ScrollModel.scrollLength
        }
    }

}