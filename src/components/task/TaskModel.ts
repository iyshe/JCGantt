import Model from "../Model";
import Option from "../Option";
import TaskBuilder from "./TaskBuilder";
import {moment} from "../../types";
import TaskItem from "./TaskItem";
import TaskOption from "./TaskOption";

export default class TaskModel extends Model<Option>{

    taskBuilder:TaskBuilder;

    items:TaskItem[] = [];

    option:TaskOption;

    constructor(option:TaskOption) {
        super(option,option);
        this.option = option;
    }

    refresh(): void {
        if (!this.taskBuilder){
            return
        }
        let that = this;
        this.items = [];
        let coord = this.taskBuilder.timeScale.coord;
        let data = this.taskBuilder.table.rows;
        let end = this.taskBuilder.timeScale.model.end;
        let mEnd = moment(end);
        let taskItem;
        data.forEach((d) => {
            if (d.ignore){
                return;
            }
            if (d.data.tasks){
                let tasks = d.data.tasks;
                tasks.forEach((t) => {
                    if (end && moment(t.start).isAfter(mEnd)){
                        return;
                    }
                    let xStart = coord.dateToX(moment(t.start).toDate());
                    let xEnd = coord.dateToX(moment(t.end).toDate());
                    let height = d.container.getBoundingRect().height - 8;
                    let y = d.getY() + 4;
                    taskItem = new TaskItem(this.taskBuilder.jcGantt,that.taskBuilder.timeScale.getTaskContainer(),that.originOption,d,t,xStart,y,(xEnd - xStart),height);
                    d.tasks.push(taskItem);
                    that.items.push(taskItem);
                })
            }
        })
    }

    public setBuilder(taskBuilder:TaskBuilder):void{
        this.taskBuilder = taskBuilder;
    }

}