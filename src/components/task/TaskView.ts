import View from "../View";
import TaskModel from "./TaskModel";
import Option from "../Option";
import {Element, Group, ZRenderType} from "zrender";

export default class TaskView implements View{

    render(model: TaskModel<Option>, zr: ZRenderType): Element[] {
        let items = model.items;
        return items;
    }

}