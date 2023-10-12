import {Rect, Text} from "zrender";
import {RowData, RowStyle} from "../Types";
import RowBuilder from "./RowBuilder";
import TierContainer from "../../../container/TierContainer";
import {addHover} from "../../../util/JCUtil";
import Table from "../Table";
import TaskItem from "../../task/TaskItem";
import {isFunction} from "zrender/lib/core/util";
import ComponentManager from "../../ComponentManager";
import {moment} from "../../../types";
import JCGantt from "../../../JCGantt";

export default class Row{

    keyId:number;

    container:TierContainer;

    data:RowData;

    tasks:TaskItem[] = [];

    rowBuilder:RowBuilder;

    rect:Rect;

    ignore:boolean;

    constructor(data:RowData,rowBuilder:RowBuilder,keyId:number,additionStyle?:RowStyle) {
        this.keyId = keyId;
        this.container = new TierContainer(2);
        this.data = data;
        this.rowBuilder = rowBuilder;
        this.render(additionStyle);
        let that = this;
        let table = ComponentManager.getInstance(this.rowBuilder.table.jcGantt).getComponent<Table>(Table.type);
        this.container.onclick = (e) => {
            e.stop();
            e.event.preventDefault();
            if (e.event.ctrlKey){
                table.ctrlSelect(that);
            }else if (e.event.shiftKey){
                table.shiftSelect(that);
            } else{
                table.selectRow(that);
            }
        }
    }

    /* public */
    public render(additionStyle?:RowStyle):void{
        let columns = this.rowBuilder.colOpt;
        let that = this;
        let height = that.rowBuilder.rowOpt.height;
        columns.forEach((col) => {
            that.container.addHorizonTo(
                new Text({
                    silent:true,
                    style:{
                        text:that.data[col.prop],
                        backgroundColor:"#ffffff00",
                        width:col.width || 100,
                        x:col.width/2 || 50,
                        height:height,
                        lineHeight:height,
                        fontSize:16,
                        align:"center",
                        ...(that.rowBuilder.rowOpt.commonStyle ? (that.rowBuilder.rowOpt.commonStyle.textStyle || {}) : {}),
                        ...(that.rowBuilder.rowOpt.style ? that.rowBuilder.rowOpt.style(that.data).textStyle : {}),
                        ...(additionStyle ? additionStyle.textStyle : {})
                    }
                }),2
            )
        })
        this.container.addTo((that.rect = new Rect({
            shape:{
                width:that.container.getBoundingRect().width,
                height:height
            },
            style:{
                stroke:"#acacac",
                fill:"#fff",
                ...(that.rowBuilder.rowOpt.commonStyle ? (that.rowBuilder.rowOpt.commonStyle.rowStyle || {}) : {}),
                ...(that.rowBuilder.rowOpt.style ? that.rowBuilder.rowOpt.style(that.data).rowStyle : {}),
                ...(additionStyle ? additionStyle.rowStyle : {})
            }
        })),1);
        !additionStyle && addHover(that.rect,"style",this.rowBuilder.rowOpt.hoverStyle.rowStyle);
        // !additionStyle && addHover(that.container,"style",this.rowBuilder.rowOpt.hoverStyle.textStyle);
    }

    public getY():number{
        return this.rowBuilder.table.rowGroup.parent.y + this.container.y;
    }

    public restoreStyle():void{
        let rowOpt = this.rowBuilder.rowOpt;
        let commonStyle:RowStyle = rowOpt.commonStyle || {};
        let styleFunc = rowOpt.style;
        let style:RowStyle;
        if (isFunction(styleFunc)){
            style = styleFunc(this.data);
        }
        let rectStyle = {
            stroke:"#acacac",
            fill:"#fff",
            ...commonStyle.rowStyle,
            ...(style ? style.rowStyle : {})
        }
        this.rect.dirty();
        this.rect.attr("style",rectStyle);
    }

    public getTasks():TaskItem[]{
        return this.tasks;
    }

    public getTaskByDate(date:Date):TaskItem{
        let item:TaskItem = null;
        let start,end,task:TaskItem;
        let mDate = moment(date);
        for (let i = 0,len = this.tasks.length; i < len; i++) {
            task = this.tasks[i]
            start = moment(task.task.start);
            end = moment(task.task.end);
            if (mDate.isBetween(start,end,'second','[]')){
                item = task;
                break;
            }
        }
        return item;
    }

    /* private */

}