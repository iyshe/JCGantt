import Container from "../../container/Container";
import {Element, Group, Line, Text, ZRenderType} from "zrender";
import Component from "../Component";
import Option from "../Option";
import {colors, ThemeItem, TipType} from "../../types";
import ComponentManager from "../ComponentManager";
import TimeScale from "../timeScale/TimeScale";
import JCGantt from "../../JCGantt";

export default class AxisPoint implements Component{

    _uiInstance:Element[];

    zrInstance:ZRenderType;

    static type:string = 'AxisPoint';

    type:string = AxisPoint.type;

    container:Container;

    startX:number;

    endX:number;

    startY:number;

    endY:number;

    // 指向x的线
    lineX:Line;

    lineY:Line;

    tipX:Text;

    tipY:Text;

    group:Group;

    jcGantt:JCGantt;

    constructor(container:Container) {
        this.container = container;
        this.group = new Group();
        this.lineX = new Line({
            shape:{
                x1:this.startX,
                y1:this.startY,
                x2:this.startX,
                y2:this.endY
            },
            style:{
                stroke:"#00000090",
                lineWidth:1,
                lineDash:"dashed"
            },
            zlevel:1000
        });
        this.lineY = new Line({
            shape:{
                x1:this.startX,
                y1:this.startY,
                x2:this.endX,
                y2:this.startY
            },
            style:{
                stroke:"#00000090",
                lineWidth:1,
                lineDash:"dashed"
            },
            zlevel:1000
        });
        this.tipX = new Text({
            style:{
                x:this.endX,
                y:this.endY,
                text:"This is a tip for x axis",
                padding:5,
                backgroundColor:"#acacac"
            },
            zlevel:1000
        });
        this.tipY = new Text({
            style:{
                x:this.endX,
                y:this.endY,
                text:"This is a tip for y axis",
                padding:5,
                backgroundColor:"#acacac"
            },
            zlevel:1000
        });
        this.group.add(this.lineX);
        this.group.add(this.lineY);
        this.group.add(this.tipX);
        this.group.add(this.tipY);
        this.group.hide();
        this.container.add(this.group);
    }

    public setTheme(theme: ThemeItem) {
    }

    public addToContainer():void{
        this.container.add(this.group);
    }

    public setEnd(x:number,y:number):void{
        this.endX = x;
        this.endY = y;
    }

    public show(x:number,y:number,xTip:string,yTip:string,type:TipType):void{
        let timeScale = ComponentManager.getInstance(this.jcGantt).getComponent<TimeScale>(TimeScale.type);
        let offsetX = timeScale.getOffsetX()
        let offsetY = timeScale.getOffsetY()
        this.group.show();
        this.startX = x;
        this.startY = y;
        this.lineX.attr("shape",{
            x1:this.startX,
            y1:this.startY,
            x2:this.startX,
            y2:this.endY - offsetY
        });
        this.lineY.attr("shape",{
            x1:this.startX,
            y1:this.startY,
            x2:this.endX - offsetX,
            y2:this.startY
        });
        this.tipX.attr("style",{
            x:this.startX,
            y:this.endY - offsetY,
            text:xTip,
            backgroundColor:colors[type]
        });
        this.tipY.attr("style",{
            x:this.endX - offsetX,
            y:this.startY,
            text:yTip,
            backgroundColor:colors[type]
        });
    }

    public hide():void{
        this.group.hide();
    }

    refresh(): void {
    }

    setOption(option: Option): void {
    }

}