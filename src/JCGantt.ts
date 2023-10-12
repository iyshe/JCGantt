import MainOption from "./MainOption";
import TimeScale from "./components/timeScale/TimeScale";
import {ZRenderType, init,dispose} from "zrender";
import {isString} from "zrender/lib/core/util";
import FixedContainer from "./container/FixedContainer";
import EventManager from "./event/EventManager";
import ResizeEvent from "./event/ResizeEvent";
import Table from "./components/table/Table";
import TaskBuilder from "./components/task/TaskBuilder";
import ComponentManager from "./components/ComponentManager";
import "./main.css";
import Row from "./components/table/tableItem/Row";
import {RowData} from "./components/table/Types";
import {DateType, ThemeItem} from "./types";
import Theme from "./Theme";
import Mark from "./components/mark/Mark";
import ContextMenu from "./components/contextmenu/ContextMenu";
import TaskItem from "./components/task/TaskItem";

//todo bug
//todo 1.table行选中后在选中下一行边框消失
//todo 2.时间组件宽度与滚动条不符

//todo 待开发项
//todo 1.表格筛选

export default class JCGantt{

    /* api instance */

    public tableApi:TableApi;

    public timeScaleApi:TimeScaleApi;

    public taskApi:TaskApi;

    /* api instance */

    private static initMap:Map<HTMLElement|string,JCGantt> = new Map<HTMLElement|string, JCGantt>();

    protected zrInstance:ZRenderType;

    protected timeScale?:TimeScale;

    protected table?:Table;

    protected taskBuilder:TaskBuilder;

    protected mark?:Mark;

    protected container:FixedContainer;

    private dom:HTMLElement;

    private originOption:MainOption;

    /* public */

    constructor(dom:string | HTMLElement,option?:MainOption,theme?:string | ThemeItem,forceTheme?:boolean) {
        let jcGantt = JCGantt.initMap.get(dom);
        if (jcGantt){
            dispose(jcGantt.zrInstance);
            JCGantt.initMap.delete(dom);
            window.removeEventListener("resize",jcGantt.resize);
            jcGantt = null;
        }
        ComponentManager.registerInstance(this);
        this._init(dom, option, theme,forceTheme);
        JCGantt.initMap.set(dom,this);
    }

    /**
     * 设置主题
     * @param theme 主题名称
     * @param forceTheme 是否强制使用主题样式，
     *                      否:不会覆盖配置中的样式 是:覆盖配置中的样式
     */
    public setTheme(theme:string | ThemeItem,forceTheme?:boolean):void{
        if (isString(theme)){
            theme = Theme.getTheme(theme);
        }
        this.table.setTheme(theme,forceTheme);
        this.timeScale.setTheme(theme,forceTheme);
    }

    private _init(dom:string | HTMLElement,option?:MainOption,theme?:string | ThemeItem,forceTheme?:boolean):JCGantt{
        if (!dom){
            throw new Error("The dom is required.(传入的dom不能为空)");
        }
        let opt = option || {};
        this.originOption = opt;
        Theme.applyTheme(opt,theme,forceTheme);
        dom = this.resolveDom(dom);
        this.dom = dom;
        this.zrInstance = init(dom);
        this.container = new FixedContainer(this.zrInstance.getWidth(),this.zrInstance.getHeight(),'hidden');
        this.initTimeScale(opt);
        this.initTable(opt);
        this.initTask(opt);
        this.initMark(opt);
        this.zrInstance.add(this.container);
        this.initResize(dom);
        this.initApi();
        this.onceRendered();
        return this;
    }

    /* private */

    private resolveDom(dom:string | HTMLElement):HTMLElement{
        if (isString(dom)){
            dom = document.getElementById(dom);
        }
        if (!dom){
            throw new Error(`The element named '${dom}' is not exit.(id为'${dom}'的元素不存在)`);
        }
        return dom;
    }

    private initTimeScale(option?:MainOption):void{
        this.timeScale = new TimeScale(this.zrInstance,option.timeLine);
        this.timeScale.jcGantt = this;
        this.timeScale.refresh();
        this.container.addContentHorizon(this.timeScale.container);
        ComponentManager.getInstance(this).componentRegister(this.timeScale.type,this.timeScale);
    }

    private initTable(option:MainOption){
        if (option.table && option.table.show === false){
            return;
        }
        this.table = new Table(option.table,this.timeScale);
        this.table.jcGantt = this;
        this.table && this.table.setTimeScale(this.timeScale);
        this.table.refresh();
        this.container.addContentHorizon(this.table.container);
        ComponentManager.getInstance(this).componentRegister(this.table.type,this.table);
    }

    private initTask(option?:MainOption){
        this.taskBuilder = new TaskBuilder(this,this.timeScale,this.table,option.task || {});
        ComponentManager.getInstance(this).componentRegister(TaskBuilder.type,this.taskBuilder);
        this.taskBuilder.refresh();
    }

    private initMark(option:MainOption){
        if (!option.mark){
            return;
        }
        this.mark = new Mark(this,option.mark);
        this.mark.refresh();
        ComponentManager.getInstance(this).componentRegister(Mark.type,this.mark);
    }

    private initResize(dom:HTMLElement) {
        let that = this;
        window.addEventListener("resize",(e) => {
            that.resize();
        })
    }

    private resize(){
        let dom = this.dom;
        let zr = this.zrInstance;
        let container = this.container;
        let width = dom.clientWidth,height = dom.clientHeight;
        zr.resize({width:width,height:height});
        container.resize(width,height);
        EventManager.getInstance().publishedEvent(new ResizeEvent());
        if (this.table){
            let boundingRect = this.table.container.getBoundingRect();
            this.timeScale.container.setPosition([boundingRect.width,this.timeScale.container.y]);
        }
        EventManager.getInstance().publishedEvent(new ResizeEvent());
    }

    private initListener() {
        let eventManager = EventManager.getInstance();
        eventManager.removeListener(this.container);
        this.publishDefaultEvent();
    }

    private publishDefaultEvent(){
        EventManager.getInstance().publishedEvent(new ResizeEvent());
    }

    private onceRendered() {
        this.initListener();
        this.container.__content.eachChild((c) => {
            c.setPosition([0,0]);
        })
        if (this.table){
            let boundingRect = this.table.container.getBoundingRect();
            this.timeScale.container.setPosition([boundingRect.width,this.timeScale.container.y]);
        }
        // this.timeScale.container.handleEvent(new ResizeEvent());
        // this.timeScale.coord.refresh();
        this.zrInstance.on("click", (e) => {
            ContextMenu.getInstance().hide();
        })
        this.zrInstance.on("contextmenu", (e) => {
            if (!e.target){
                ContextMenu.getInstance().hide();
            }
        })
        this.zrInstance.on("mousedown", (e) => {
            ContextMenu.getInstance().hide();
        })
    }

    private initApi() {
        this.tableApi = new TableApi(this.table);
        this.timeScaleApi = new TimeScaleApi(this.timeScale);
        this.taskApi = new TaskApi(this.taskBuilder);
    }
}

class TableApi{

    private table:Table;

    constructor(table:Table) {
        this.table = table;
    }

    /**
     * 获取table组件选中的行
     */
    public getSelections():Row[]{
        return this.table.getSelection();
    }

    /**
     * 刷新table组件，同时会刷新任务视图
     */
    public refresh():void{
        this.table.refresh();
    }

    /**
     * 更新table组件数据，同时更新任务视图
     * @param data
     */
    public updateData(data:RowData[]):void{
        this.table.updateData(data);
    }

    /**
     * 取消选中所有选中的行
     */
    public clearSelections():void{
        this.table.clearSelections();
    }

    /**
     * 全选所有行
     */
    public selectAll():void{
        this.table.selectAll();
    }

    /**
     * 导出当前table数据为json文件
     */
    public exportRowsToJSON():void{
        let data = this.table.getCurrentData();
        let eleLink = document.createElement('a');
        eleLink.download = 'data.json';
        eleLink.style.display = 'none';
        let blob = new Blob([JSON.stringify(data, undefined, 4)], {type: 'text/json'})
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
    }

    /**
     * 数据过滤，仅从缓存中过滤数据，不会重新加载数据
     * @param filter
     */
    public filter(filter:string):void{
        this.table.filterData(filter);
    }

}

class TimeScaleApi{

    private timeScale:TimeScale;

    constructor(timeScale:TimeScale) {
        this.timeScale = timeScale;
    }

    /**
     * 刷新时间刻度组件，同时刷新任务视图
     */
    public refresh():void{
        this.timeScale.refresh();
    }

    /**
     * 设置时间范围,设置完后会自动刷
     * @param start
     * @param end
     */
    public setDateRange(start:string|Date,end:string|Date):void{
        if (!start || !end){
            return;
        }
        this.timeScale.setDateRange(start,end);
    }

    /**
     * 时间刻度缩放
     * @param multiple 大于1表示放大，小于1且大于零表示缩小
     */
    public zoom(multiple:number):void{
        this.timeScale.zoom(multiple);
    }

    /**
     * 计算日期所在的位置
     * @param date
     * @return 返回值为相对于时间组件的水平距离
     */
    public dateToX(date:Date):number{
        return this.timeScale.coord.dateToX(date);
    }

    /**
     * 计算指定x所代表的日期
     * @param x x为相对于时间组件的水平距离
     */
    public xToDate(x:number):Date{
        return this.timeScale.coord.xToDate(x);
    }

    /**
     * 设置时间单位，即多长时间占一格
     * @param timeBase 时间基数
     * @param timeUnit 时间单位 值为 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'
     */
    public setTimeUnit(timeBase:number,timeUnit:DateType):void{
        this.timeScale.setTimeUnit(timeBase,timeUnit);
    }

}

class TaskApi{

    private taskBuilder:TaskBuilder;

    constructor(taskBuilder:TaskBuilder) {
        this.taskBuilder = taskBuilder;
    }

    /**
     * 获取当前选中的任务
     */
    public getSelections():TaskItem[]{
        return this.taskBuilder.getSelections();
    }

    /**
     * 刷新任务/重新加载任务
     */
    public refresh():void{
        this.taskBuilder.table.refresh();
    }

}