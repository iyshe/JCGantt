import Component from "../Component";
import TimeScaleModel from "./TimeScaleModel";
import TimeScaleView from "./TimeScaleView";
import {ITimeScaleOption, TimeScaleOption} from "./TimeScaleOption";
import {Element, Group, ZRenderType} from "zrender";
import Grid from "../background/grid/Grid";
import TierContainer from "../../container/TierContainer";
import StackContainer from "../../container/StackContainer";
import {DateType, moment, ThemeItem} from "../../types";
import FixedContainer from "../../container/FixedContainer";
import Coord from "../../coord/Coord";
import Table from "../table/Table";
import TaskBuilder from "../task/TaskBuilder";
import EventManager from "../../event/EventManager";
import Container from "../../container/Container";
import {applyTo} from "../../util/JCUtil";
import {clone} from "zrender/lib/core/util";
import ComponentManager from "../ComponentManager";
import Mark from "../mark/Mark";
import ContextMenu from "../contextmenu/ContextMenu";
import JCGantt from "../../JCGantt";

export default class TimeScale implements Component{

    static type = "timeScale";

    static background:string = 'background';

    type:string = TimeScale.type;

    jcGantt:JCGantt;

    _uiInstance: Element[];

    model:TimeScaleModel;

    view:TimeScaleView;

    backGround:Grid;

    zrInstance:ZRenderType;

    tierContainer:TierContainer;

    container:FixedContainer;

    table:Table;

    coord:Coord;

    taskBuilder:TaskBuilder;

    static defaultFormatter = {
        second:"YY/MM/DD HH:mm:ss",
        minute:"YY/MM/DD HH:mm",
        hour:"YY/MM/DD HH时",
        day:"YY/MM/DD",
        week:"YY年W周",
        month:"YY年MM月",
        year:"YYYY年",
    }

    static defaultOption:ITimeScaleOption = {
        width:'80%',
        height:'100%',
        baseWidth:65,
        accuracy:"second",
        days:60,
        grid:{
        },
        scales:[
            {
                symbol:"day",
                formatter:'yy/MM/DD',
                commonStyle:{
                    backgroundColor: "#1ba78480",
                    borderColor:"#1ba784",
                },
                style:metaDate => {
                    let start = moment(metaDate.start);
                    if (moment().isBetween(start,moment(metaDate.end),"minute","[]")){
                        return {
                            backgroundColor: "#bacf65"
                        }
                    }
                    if (start.day() != 6 && start.day() != 0){
                        return {
                            backgroundColor:"#f5960080"
                        }
                    }
                }
            }
        ],
        scroll:{
            thickness:6,
            hoverOffset:10,
            trackStyle:{
                fill:"#1ba78450"
            },
            thumbStyle:{
                fill:"#1ba78490",
            }
        }
    }

    constructor(zrInstance:ZRenderType,option?:TimeScaleOption) {
        this.zrInstance = zrInstance;
        let opt:TimeScaleOption = {
            ...TimeScale.defaultOption,
            ...option
        }
        this.model = new TimeScaleModel(opt);
        this.view = new TimeScaleView();
        this.container = new FixedContainer(opt.width,opt.height);
        // this.container.setComponent(this);
        this.container.setScrollerOption(opt.scroll);
        this.tierContainer = new TierContainer(3);
        this.tierContainer.setTierName(1,TimeScale.background);
        // 设为层级容器
        this.tierContainer.setTierContainer(1,new TierContainer(2));
        this.tierContainer.setTierName(2,this.type);
        this.backGround = new Grid(this.model.fullOption.grid,this);
        this.container.setComponent(this.backGround);
        this.coord = new Coord(this);
        this.container.__scroll.setTarget('vertical',this.tierContainer.getContainer(1));
        this.initEvent();
        EventManager.getInstance().registerAction(this.container,{
            target:this.coord,
            action:(listener,target) => {
                target.refresh();
            }
        });
    }

    public getOffsetX():number{
        return this.container.__content.x;
    }

    public getOffsetY():number{
        return this.tierContainer.getContainer<Container>(1).y;
    }

    public getMarkContainer():Container{
        return this.tierContainer.getContainer(3);
    }

    public getTimeLineContainer():Container{
        return this.tierContainer.getContainer(2);
    }

    public getTimeLineHeight():number{
        return this.getTimeLineContainer().getBoundingRect().height;
    }

    public getTimeLineWidth():number{
        return this.getTimeLineContainer().getBoundingRect().width;
    }

    public getStartX():number{
        return this.container.x;
    }

    public getBackGroundContainer(){
        let c = this.tierContainer.getContainer(1).getContainer(1);
        return c;
    }

    public getTaskContainer(){
        return this.tierContainer.getContainer(1).getContainer(2);
    }

    public setTable(table:Table){
        this.table = table;
    }

    public isEdge(x:number,y:number):string{
        let startX = this.getStartX();
        let startY = this.getTimeLineHeight();
        let width = this.container.__width - 10;
        let height = this.container.__height - startY - 10;
        if (x - startX <= 0){
            return "left";
        }
        if (x - startX >= width){
            return "right";
        }
        if (y - startY <= 0){
            return "top";
        }
        if (y - startY >= height){
            return "bottom";
        }
        return null;
    }

    public zoom(multiple:number):void{
        if (multiple <= 0){
            throw new Error(`The value of multiple must be a number greater than zero.(放大倍速必须是一个大于零的整数)`)
        }
        this.model._timeBase = this.model._timeBase * multiple;
        this.refresh();
    }

    public setDateRange(start:string|Date,end:string|Date):void{
        this.model.fullOption.start = start;
        this.model.fullOption.end = end;
        this.model.fullOption.days = -60;
        this.refresh();
    }

    public setTimeUnit(timeBase:number,timeUnit:DateType):void{
        this.model._timeBase = timeBase;
        this.model._timeUnit = timeUnit;
        this.refresh();
    }

    refresh(): void {
        let that = this;
        // 1.重新渲染时间刻度组件
        this.model.refresh();
        this.tierContainer.getContainerByName<StackContainer>(this.type).removeAll();
        this._uiInstance = this.view.render(this.model,this.zrInstance);
        this._uiInstance.forEach((ele) => {
            that.tierContainer.addHorizonToByName(<Group>ele,that.type);
        })
        // 2.重新渲染背景网格
        if (this.backGround){
            // this.backGround.setContainer(this.tierContainer.getContainerByName(TimeScale.background));
            this.backGround.setContainer(this.getBackGroundContainer());
            this.backGround.refresh();
        }
        this.container.addContent(this.tierContainer);
        // 3.刷新坐标系统
        this.coord.refresh();
        // 刷新mark
        let mark = ComponentManager.getInstance(this.jcGantt).getComponent<Mark>(Mark.type);
        mark && mark.refresh();
        // 3.刷新任务
        this.taskBuilder && this.taskBuilder.refresh();
    }

    public setTheme(theme: ThemeItem, forceTheme?: boolean) {
        this.model.fullOption = clone(this.model.option);
        if (theme){
            let t = clone(theme);
            let scales = t.timeLine.scales;
            delete t.timeLine.scales;
            let opt = this.model.fullOption
            applyTo(t.timeLine,opt,forceTheme);
            if (opt.scales){
                opt.scales.forEach(s => {
                    applyTo(scales,s,forceTheme);
                })
            }
        }
        this.model.originOption = this.model.fullOption;
        this.container.setScrollerOption(this.model.fullOption.scroll);
        this.container.__scroll.refresh();
        this.backGround.setOption(this.model.fullOption.grid);
        this.taskBuilder.setTheme(theme,forceTheme);
        this.refresh();
    }

    setOption(option: TimeScaleOption): void {
    }

    private initEvent() {
        let that = this;
        let mw = this.container.onmousewheel;
        this.container.onmousewheel = (e) => {
            e.stop();
            e.event.preventDefault();
            if (e.event.ctrlKey){
                if (e.wheelDelta < 0){
                    that.zoom(1.1);
                }else {
                    that.zoom(0.9);
                }
            }else {
                mw&&mw(e);
            }
        }
        this.initContentMenu();
    }

    private initContentMenu() {
        let that = this;
        this.container.oncontextmenu = (e) => {
            e.stop();
            e.event.preventDefault();
            if (that.model.originOption.contextmenu){
                ContextMenu.getInstance().show(e.event['clientX'],e.event['clientY'],that.model.originOption.contextmenu);
            }else {
                ContextMenu.getInstance().hide();
            }
        }
    }
}