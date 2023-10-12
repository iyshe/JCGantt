import Component from "../Component";
import {Element, Group, ZRenderType} from "zrender";
import TableOption from "./TableOption";
import FixedContainer from "../../container/FixedContainer";
import TableItem from "./tableItem/TableItem";
import TimeScale from "../timeScale/TimeScale";
import Row from "./tableItem/Row";
import TaskBuilder from "../task/TaskBuilder";
import {clone, isFunction} from "zrender/lib/core/util";
import {RowData, RowStyle} from "./Types";
import {ThemeItem,moment} from "../../types";
import {applyTo} from "../../util/JCUtil";
import ContextMenu from "../contextmenu/ContextMenu";
import JCGantt from "../../JCGantt";
import ComponentManager from "../ComponentManager";

export default class Table implements Component{

    static type = 'table';

    type:string = Table.type;

    jcGantt:JCGantt;

    _uiInstance: Element[];

    zrInstance: ZRenderType;

    container:FixedContainer;

    option:TableOption;

    originOption:TableOption;

    timescale:TimeScale;

    rowGroup:Group;

    headGroup:Group;

    taskBuilder:TaskBuilder;

    rows:Row[] = [];

    selections:Row[] = [];

    tableItem:TableItem;

    static defaultOption:TableOption = {
        show:true,
        width:'20%',
        height:'100%',
        column:[
            {
                name:"姓名",
                prop:"name",
                width:100,
            },
            {
                name:"年龄",
                prop:"age",
                width:50
            },
            {
                name:"家庭住址",
                prop:"addr",
                width:200
            },
            {
                name:"联系电话",
                prop:"phone",
                width:150
            }
        ],
        row:{
            height:50,
            commonStyle:{
                textStyle:{
                    fill:"#000",
                    fontSize:20,
                    borderColor:"#acacac",
                    borderWidth:0.1
                }
            },
            hoverStyle:{
                rowStyle:{
                    fill:"#1ba78460"
                },
                textStyle:{
                    fill:"#fff"
                }
            },
            quickTip:(row) => {
                let res = '';
                for (let rowKey in row) {
                    res += (rowKey + ":" + row[rowKey] + "\n")
                }
                return res;
            }
        },
        headStyle:{
            textStyle:{
                // height:200,
                fontWeight:"bold",
                borderColor:"#1ba784",
                borderWidth:0.1,
                backgroundColor:"#f5960080",
                // lineHeight:200
            },
            rowStyle:{
                fill:"#f5960000",
                stroke:"none"
            }
        },
        style:{
            stroke:"#1ba784"
        },
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

    constructor(option?:TableOption,timeScale?:TimeScale) {
        this.timescale = timeScale;
        let opt = {
            ...Table.defaultOption,
            ...(option || {})
        }
        this.option = opt;
        this.originOption = clone(opt);
        this.container = new FixedContainer(opt.width,opt.height,'auto',opt.scroll);
        this.container.setComponent(this);
        this.initContentMenu();
    }

    public setTheme(theme: ThemeItem,forceTheme?:boolean) {
        // 更新主配置
        this.option = clone(this.originOption);
        if (theme){
            applyTo(theme.table,this.option,forceTheme);
        }
        this.container.setScrollerOption(this.option.scroll);
        this.container.__scroll.refresh();
        this.taskBuilder.setTheme(theme,forceTheme);
        this.refresh();
    }

    public getCurrentData():RowData[]{
        let data = [],tempRow;
        let rows = this.getRows();
        rows.forEach(r => {
            tempRow = r.data;
            tempRow.tasks = [];
            r.tasks.forEach(t => {
                t.task.start = moment(t.task.start).format("yyyy/MM/DD HH:mm:ss");
                t.task.end = moment(t.task.end).format("yyyy/MM/DD HH:mm:ss");
                tempRow.tasks.push(t.task);
            })
            data.push(tempRow);
        })
        return data;
    }

    public setTimeScale(timescale:TimeScale){
        this.timescale = timescale;
        this.timescale.setTable(this);
        this.container.bindScroll('vertical',timescale.container);
    }

    refresh(cache?:boolean) {
        // 1.清除旧内容
        let that = this;
        !cache && (this.tableItem = new TableItem(this));
        let tableItem = this.tableItem;
        tableItem.render(cache).then(() => {
            if (!cache){
                that.container.__content.removeAll();
                let container = tableItem.container;
                that.rows = tableItem.rows;
                that.rowGroup = tableItem.getRowGroup();
                that.headGroup = tableItem.getHeadGroup();
                that.container.addContent(container);
                that.container.__scroll.setTarget('vertical',tableItem.getRowGroup());
            }
            tableItem.updateTableRect();
            // 2.刷新网格
            let tm = ComponentManager.getInstance(that.jcGantt).getComponent<TimeScale>(TimeScale.type);
            tm.backGround.setTable(that);
            /*if (tm && tm.backGround){
                tm.backGround.setTable(that);
                tm.backGround.refresh();
                tm.coord && tm.coord.refresh();
            }
            // 3.刷新任务
            that.taskBuilder && that.taskBuilder.refresh();*/
            tm.refresh();
            // 清空选中行
            that.selections = [];
        });
    }

    public getData():Promise<RowData[]>{
        if (this.option.loadData){
            let that = this;
            let ts = this.timescale;
            return new Promise<RowData[]>(((resolve, reject) => {
                that.option.loadData(ts ? ts.model.start : null,ts ? ts.model.end : null,resolve);
            }))
        }else {
            return new Promise<RowData[]>(((resolve, reject) => {
                resolve(
                    this.option.data ? clone(this.option.data) : []
                )
            }));
        }
    }

    /**
     * @param filter 格式为'object.property == value'
     */
    public filterData(filter:string):void{
        let object;
        this.rows.forEach(r => {
            object = r.data;
            r.ignore = !eval(filter);
        })
        this.refresh(true);
    }

    getRowOffsetY():number{
        return this.rowGroup.y;
    }

    getHeadHeight():number{
        return this.headGroup.getBoundingRect().height;
    }

    public getHeight():number{
        return this.getHeadHeight() + this.rowGroup.getBoundingRect().height;
    }

    getRowByPos(pos:number):Row{
        let row = null;
        if (this.rows && this.rows.length > 0){
            let r,y,height;
            for (let i = 0; i < this.rows.length; i++) {
                r = this.rows[i];;
                y = r.getY();
                height = r.container.getBoundingRect().height;
                if (y <= pos && pos <= y + height){
                    row = r;
                    break;
                }
            }
        }
        return row;
    }

    public clearSelections():void{
        if (this.selections.length){
            this.selections.forEach(s => {
                s.restoreStyle();
                s.rect["hoverForbid"] = false;
            })
            this.selections = [];
        }
    }
    public removeSelection(row:Row):void{
        row.restoreStyle();
        row.rect["hoverForbid"] = false;
        this.selections.splice(this.selections.indexOf(row),1);
    }

    public selectRow(row:Row):void{
        if (!row){
            return;
        }
        row.rect["hoverForbid"] = true;
        if (this.selections.length == 1 && this.selections.indexOf(row) >= 0){
            return;
        }
        this.clearSelections();
        this.addRowToSelection(row);
    }

    public ctrlSelect(row:Row):void{
        if (this.selections.length == 0){
            return this.selectRow(row);
        }
        if (this.selections.indexOf(row) >= 0){
            this.removeSelection(row);
            return;
        }
        this.addRowToSelection(row);
    }

    public shiftSelect(row:Row):void{
        if (this.selections.length == 0){
            return this.selectRow(row);
        }
        let that = this;
        let startKey = this.selections[0].keyId;
        let endKey = row.keyId;
        let maxKey = Math.max(startKey,endKey);
        let minKey = Math.min(startKey,endKey);
        this.clearSelections();
        this.rows.forEach(r => {
            if (r.keyId >= minKey && r.keyId <= maxKey){
                that.addRowToSelection(r);
            }
        })
    }

    public selectAll():void{
        this.rows.forEach(r => {
            this.addRowToSelection(r);
        })
    }

    public getSelection():Row[]{
        return this.selections;
    }

    public updateData(data:RowData[]):void{
        this.option.data = data;
        this.refresh();
    }

    setOption(option: TableOption): void {
    }

    public getRows():Row[]{
        return this.rows;
    }

    private addRowToSelection(row:Row):void{
        row.rect["hoverForbid"] = true;
        let sf = this.option.row.selectStyle;
        let rowStyle:RowStyle;
        isFunction(sf) && (rowStyle = sf(row.data));
        row.rect.dirty();
        row.rect.attr("style",rowStyle && rowStyle.rowStyle ? rowStyle.rowStyle : {fill:"#f59600"});
        this.selections.push(row);
    }

    private initContentMenu() {
        let that = this;
        this.container.oncontextmenu = (e) => {
            e.stop();
            e.event.preventDefault();
            if (that.originOption.contextmenu){
                ContextMenu.getInstance().show(e.event['clientX'],e.event['clientY'],that.originOption.contextmenu);
            }else {
                ContextMenu.getInstance().hide();
            }
        }
    }
}