import Component from "../Component";
import {Element, Group, ZRenderType} from "zrender";
import Option from "../Option";
import TaskModel from "./TaskModel";
import TaskView from "./TaskView";
import Table from "../table/Table";
import TimeScale from "../timeScale/TimeScale";
import Container from "../../container/Container";
import TaskOption from "./TaskOption";
import AxisPoint from "../tooltip/AxisPoint";
import ComponentManager from "../ComponentManager";
import {ThemeItem} from "../../types";
import {applyTo} from "../../util/JCUtil";
import {clone} from "zrender/lib/core/util";
import TaskItem from "./TaskItem";
import JCGantt from "../../JCGantt";

export default class TaskBuilder implements Component{

    public static type = 'TaskBuilder';

    type = TaskBuilder.type;

    jcGantt:JCGantt;

    _uiInstance: Element[];

    zrInstance: ZRenderType;

    model:TaskModel;

    view:TaskView;

    table:Table;

    timeScale:TimeScale;

    container:Container;

    aXisPoint:AxisPoint;

    selections:TaskItem[] = [];

    static defaultOption:TaskOption = {

        textStyle:(task,row) => {
            return {
                fontSize:12,
                fontWeight:"bold"
            }
        },

        taskStyle:(task,row) => {
            return {
                fill:"#5cb3cc80",
                stroke:"#5cb3cc"
            }
        }

    }

    constructor(jcGantt:JCGantt,timeScale:TimeScale,table:Table,option:TaskOption) {
        let opt = {
            ...TaskBuilder.defaultOption,
            ...option
        }
        this.jcGantt = jcGantt;
        this.timeScale = timeScale;
        this.timeScale.taskBuilder = this;
        this.table = table;
        this.table.taskBuilder = this;
        this.container = timeScale.getTaskContainer();
        this.model = new TaskModel(opt);
        this.model.setBuilder(this);
        this.view = new TaskView();
        this.aXisPoint = new AxisPoint(this.container);
        this.aXisPoint.jcGantt = this.jcGantt;
        ComponentManager.getInstance(this.jcGantt).componentRegister(this.aXisPoint.type,this.aXisPoint);
    }

    public setTheme(theme: ThemeItem, forceTheme?: boolean) {
        this.model.originOption = clone(this.model.option);
        if (theme){
            applyTo(theme.task,this.model.originOption,forceTheme);
        }
        this.model.fullOption = this.model.originOption;
        this.refresh();
    }

    refresh(): void {
        let that = this;
        this.selections = [];
        this.container.removeAll();
        this.model.refresh();
        this._uiInstance = this.view.render(this.model,null);
        this._uiInstance.forEach((u) => {
            that.container.add(u);
        })
        this.aXisPoint.addToContainer();
        this.aXisPoint.setEnd(0,this.timeScale.getTimeLineHeight());
    }

    setOption(option: Option): void {
    }

    public clearSelections():void{
        if (this.selections.length){
            this.selections.forEach(s => {
                s.unSelect();
            })
            this.selections = [];
        }
    }

    public removeSelection(task:TaskItem):void{
        task.unSelect();
        this.selections.splice(this.selections.indexOf(task),1);
    }

    public selectTask(task:TaskItem):void{
        if (!task){
            return;
        }
        this.clearSelections();
        this.addTaskToSelection(task);
    }

    public ctrlSelect(task:TaskItem):void{
        if (this.selections.length == 0){
            return this.selectTask(task);
        }
        if (this.selections.indexOf(task) >= 0){
            this.removeSelection(task);
            return;
        }
        this.addTaskToSelection(task);
    }

    public getSelections():TaskItem[]{
        return this.selections;
    }

    private addTaskToSelection(task: TaskItem) {
        if (this.selections.indexOf(task) >= 0){
            return;
        }
        task.select();
        this.selections.push(task);
    }
}