import Component from "../../Component";
import {Element, Group, ZRenderType} from "zrender";
import GridOption from "./GridOption";
import GridModel from "./GridModel";
import GridView from "./GridView";
import TimeScale from "../../timeScale/TimeScale";
import Container from "../../../container/Container";
import Table from "../../table/Table";
import {ThemeItem} from "../../../types";
import JCGantt from "../../../JCGantt";

export default class Grid implements Component{

    jcGantt:JCGantt;

    _uiInstance: Element[];

    zrInstance: ZRenderType;

    model:GridModel;

    view:GridView;

    timeScale:TimeScale;

    table:Table;

    container:Container;

    constructor(option?:GridOption,timeScale?:TimeScale) {
        this.timeScale = timeScale;
        this.model = new GridModel(option,timeScale);
        this.view = new GridView();
    }

    public setTimeScale(timeScale:TimeScale):void{
        this.timeScale = timeScale;
        this.model.setTimeScale(timeScale);
    }

    public setTable(table:Table):void{
        this.table = table;
        this.model.setTable(table);
    }

    public setContainer(container:Container):void{
        this.container = container;
    }

    refresh(): void {
        if (!this.container){
            return;
        }
        let that = this;
        this.container.removeAll();
        this.model.refresh();
        this._uiInstance = this.view.render(this.model,this.zrInstance);
        this._uiInstance.forEach( u => {
            that.container.addVertical(<Group>u);
        })
    }

    setOption(option: GridOption): void {
        this.model.originOption = option;
        this.model.fullOption = option;
    }

    public setTheme(theme: ThemeItem) {
    }

}