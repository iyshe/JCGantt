import { Group, Line, Rect, Text} from "zrender";
import { Task} from "../table/Types";
import Row from "../table/tableItem/Row";
import TaskOption from "./TaskOption";
import {isFunction} from "zrender/lib/core/util";
import Container from "../../container/Container";
import VirtualRect from "./VirtualRect";
import ComponentManager from "../ComponentManager";
import Table from "../table/Table";
import AxisPoint from "../tooltip/AxisPoint";
import TimeScale from "../timeScale/TimeScale";
import {moment, TipType} from "../../types";
import EnableTooltip from "../tooltip/EnableTooltip";
import Tooltip from "../tooltip/Tooltip";
import TaskBuilder from "./TaskBuilder";
import JCGantt from "../../JCGantt";

export default class TaskItem extends Group implements EnableTooltip{

    container:Container;

    x:number;

    y:number;

    width:number;

    height:number;

    rect:Rect;

    selectRect:Rect;

    text:Text;

    task:Task;

    row:Row;

    jcGantt:JCGantt;

    option:TaskOption;

    mousedown:boolean;

    virtualItem:Rect;

    dragLine:Line;

    timer:any;

    constructor(jcGantt:JCGantt,container:Container,option:TaskOption,row:Row,task:Task,x?:number,y?:number,width?:number,height?:number) {
        super();
        this.jcGantt = jcGantt;
        this.container = container;
        this.option = option;
        this.row = row;
        this.task = task;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.init();
        Tooltip.init(this);
    }

    public init(){
        let that = this;
        this.removeAll();
        let opt = this.option;
        this.rect = new Rect({
            shape : {
                width:that.width,
                height:that.height
            },
            style : {
                ...(isFunction(opt.taskStyle) ? opt.taskStyle(that.task,that.row.data) : {})
            }
        });
        this.text = new Text({
            style:{
                text:isFunction(opt.text) ? opt.text(that.task,that.row.data) : that.task.text,
                x:(that.width/2),
                width:that.width,
                height:that.height,
                align:"center",
                lineHeight:that.height,
                overflow:"truncate",
                ...(isFunction(opt.textStyle) ? opt.textStyle(that.task,that.row.data) : {})
            }
        });
        this.add(this.rect);
        this.add(this.text);
        this.setPosition([that.x,that.y]);
        this.initEvent();
    }

    private initMove(){
        let that = this;
        if (!this.virtualItem){
            that.virtualItem = new VirtualRect(that.rect);
            that.add(that.virtualItem);
        }
        if (!this.dragLine){
            that.dragLine = new Line({
                style:{
                    lineWidth:2,
                    stroke:that.rect.style.fill,
                    lineDash:"dashed"
                },
                zlevel:999
            });
            that.add(that.dragLine);
        }
    }

    private initEvent():void{
        let that = this;
        this.onmousedown = (e) => {
            if (e.event["button"] || e.event.ctrlKey){
                return;
            }
            e.stop();
            e.event.preventDefault();
            Tooltip.forbid();
            that.mousedown = true;
            let x1 = that.width,y1 = that.height/2;
            let _x = e.offsetX,_y = e.offsetY;
            let success = false;
            let r:Row,date,targetTask:TaskItem;

            document.onmousemove = (ev) => {
                ev.preventDefault();
                this.initMove();
                let res = that.mouseMove(ev,_x,_y,x1,y1);
                if (res){
                    r = res.row,date = res.date,_x = res.x,_y = res.y,success = res.success,targetTask = res.task;
                }
            }

            document.onmouseup = (ev) => {
                ev.preventDefault();
                if (!that.mousedown){
                    return;
                }
                let axisPoint = ComponentManager.getInstance(that.jcGantt).getComponent<AxisPoint>(AxisPoint.type);
                axisPoint.hide();
                that.virtualItem && that.remove(that.virtualItem);
                that.dragLine && that.remove(that.dragLine);
                that.timer && clearInterval(that.timer);
                that.mousedown = false;
                document.onmousemove = null;
                document.onmouseup = null;
                if (success){
                    that.drop(that.task,that.row,targetTask,r,date);
                }
                Tooltip.allow();
            }
        }
        this.onclick = (e) => {
            e.stop();
            e.event.preventDefault();
            that.dirty();
            let taskBuilder = ComponentManager.getInstance(that.jcGantt).getComponent<TaskBuilder>(TaskBuilder.type);
            if (e.event.ctrlKey){
                taskBuilder.ctrlSelect(that);
            }else{
                taskBuilder.selectTask(that);
            }
        }
    }

    private drop(task:Task,sourceRow:Row,targetTask:TaskItem,targetRow:Row,date:Date):void{
        let that = this;
        let onDrag = this.option.onDrag;
        new Promise(function (resolve, reject){
            if (isFunction(onDrag)){
                onDrag(task,sourceRow.data,targetTask ? targetTask.task : null,targetRow ? targetRow.data : {},date,resolve);
            }else {
                resolve();
            }
        }).then(function (){
            ComponentManager.getInstance(that.jcGantt).getComponent<Table>(Table.type).refresh();
            // that.rePosition(sourceRow,targetRow,date);
        }).catch(function (err){
            console.log(err);
        })
    }

    private rePosition(sourceRow:Row,targetRow:Row,date:Date):void{
        let coord = ComponentManager.getInstance(this.jcGantt).getComponent<TimeScale>(TimeScale.type).coord;
        let during = moment(this.task.end).diff(this.task.start,"second");
        this.task.start = date,this.task.end = moment(date).add(during,"second").toDate();
        let xStart = coord.dateToX(date);
        let xEnd = coord.dateToX(this.task.end);
        let height = targetRow.container.getBoundingRect().height - 8;
        let y = targetRow.getY() + 4;
        this.x = xStart,this.y = y,this.width = (xEnd - xStart),this.height = height;
        this.init();
        sourceRow.tasks.splice(sourceRow.tasks.indexOf(this),1);
        targetRow.tasks.push(this);
        this.row = targetRow;
    }

    private mouseMove(ev:MouseEvent,_x:number,_y:number,x:number,y:number):{row:Row,task:TaskItem,date:Date,x:number,y:number,success:boolean}{
        let that = this;
        let row:Row,date:Date,targetTask:TaskItem;
        ev.preventDefault()
        if ((!ev['zrX'] && ev['zrX'] != 0) || (!ev['zrY'] && ev['zrY'] != 0)){
            return;
        }
        let target = that.virtualItem;
        let line = that.dragLine;
        let manager = ComponentManager.getInstance(that.jcGantt);
        let table = manager.getComponent<Table>(Table.type);
        let axisPoint = manager.getComponent<AxisPoint>(AxisPoint.type);
        let timeScale = manager.getComponent<TimeScale>(TimeScale.type);
        let coord = timeScale.coord;
        let tipY = '',tipX;
        date = coord.xToDate(target.x + target.parent.x);
        if(table && table.option.row && isFunction(table.option.row.quickTip)){
            row = table.getRowByPos(target.y + target.parent.y);
            if (row){
                tipY = table.option.row.quickTip(row.data);
                targetTask = row.getTaskByDate(date);
            }
        }
        tipX = date.toLocaleString();
        let tipType:TipType = 'error',flag;
        if (isFunction(that.option.allowDrag)){
            flag = that.option.allowDrag(that.task,that.row.data,targetTask ? targetTask.task : null,row ? row.data : null,date);
            flag.allow && (tipType = 'success');
            flag.messageX && (tipX = flag.messageX);
            flag.messageY && (tipY = flag.messageY);
        }
        target.dirty();
        target.setPosition([target.x + ev.offsetX - _x,target.y + ev.offsetY - _y]);
        line.attr("shape",{
            x1:x,
            y1:y,
            x2:target.x,
            y2:target.y
        });
        axisPoint.show(target.x + target.parent.x,target.y + target.parent.y,tipX,tipY,tipType);
        _x = ev.offsetX,_y = ev.offsetY;
        let edge = timeScale.isEdge(ev['zrX'],ev['zrY']);
        if (edge){
            !that.timer && (that.timer = setInterval(function (){
                let offsetPos = 0;
                if (edge == 'right'){
                    offsetPos = timeScale.container.__scroll.moveTo("horizon",2);
                }else if (edge == 'left'){
                    offsetPos = timeScale.container.__scroll.moveTo("horizon",-2);
                }else if (edge == 'top'){
                    offsetPos = timeScale.container.__scroll.moveTo("vertical",-2);
                }else if (edge == 'bottom'){
                    offsetPos = timeScale.container.__scroll.moveTo("vertical",2);
                }
                that.rePosVirtualRect(edge,offsetPos);
            },20));
        }else {
            clearInterval(that.timer);
            that.timer = null;
        }
        return {
            row:row,
            date:date,
            x:_x,
            y:_y,
            success:flag.allow,
            task:targetTask
        }
    }

    private rePosVirtualRect(direction:string,offset:number):void{
        if (!offset){
            return;
        }
        let rect = this.virtualItem;
        let line = this.dragLine;
        rect.dirty();
        switch (direction){
            case 'left':{
                rect.setPosition([rect.x + offset,rect.y]);
            };break;
            case 'right':{
                rect.setPosition([rect.x + offset,rect.y]);
            };break;
            case 'top':{
                rect.setPosition([rect.x,rect.y + offset]);
            };break;
            case 'bottom':{
                rect.setPosition([rect.x,rect.y + offset]);
            };break;
        }
        line.attr("shape",{
            x1:line.shape.x1,
            y1:line.shape.y1,
            x2:rect.x,
            y2:rect.y
        });

        let manager = ComponentManager.getInstance(this.jcGantt);
        let table = manager.getComponent<Table>(Table.type);
        let axisPoint = manager.getComponent<AxisPoint>(AxisPoint.type);
        let timeScale = manager.getComponent<TimeScale>(TimeScale.type);
        let coord = timeScale.coord;
        let tipY = '',tipX,row:Row,date:Date;
        if(table && table.option.row && isFunction(table.option.row.quickTip)){
            row = table.getRowByPos(rect.y + rect.parent.y);
            if (row){
                tipY = table.option.row.quickTip(row.data);
            }
        }
        date = coord.xToDate(rect.x + rect.parent.x);
        tipX = date.toLocaleString();
        let tipType:TipType = 'error',flag;
        if (isFunction(this.option.allowDrag)){
            flag = this.option.allowDrag(this.task,this.row.data,row ? row.getTaskByDate(date).task : null,row ? row.data : null,date);
            flag.allow && (tipType = 'success');
            flag.messageX && (tipX = flag.messageX);
            flag.messageY && (tipY = flag.messageY);
        }
        axisPoint.show(rect.x + rect.parent.x,rect.y + rect.parent.y,tipX,tipY,tipType);
    }

    getTooltip(): string {
        if (isFunction(this.option.tooltip)){
            return this.option.tooltip(this.task,this.row.data);
        }
        return this.task.text;
    }

    public select():void{
        let that = this;
        !this.selectRect && (this.selectRect = new Rect({
            shape:{
                x:-2,
                y:-2,
                width:that.rect.shape.width + 4,
                height:that.rect.shape.height + 4,
            },
            style:{
                stroke:"#000",
                lineDash:"dashed",
                fill:"none"
            }
        }));
        this.add(this.selectRect);
    }

    public unSelect(){
        this.remove(this.selectRect);
    }

}