import Component from "../Component";
import {Element, ZRenderType} from "zrender";
import MarkOption from "./MarkOption";
import {ThemeItem} from "../../types";
import MarkModel from "./MarkModel";
import MarkView from "./MarkView";
import Container from "../../container/Container";
import ComponentManager from "../ComponentManager";
import TimeScale from "../timeScale/TimeScale";
import {clone} from "zrender/lib/core/util";
import JCGantt from "../../JCGantt";

export default class Mark implements Component{

    static type = 'Mark';

    type = Mark.type;

    jcGantt:JCGantt;

    _uiInstance: Element[];

    zrInstance: ZRenderType;

    model:MarkModel;

    view:MarkView;

    option:MarkOption;

    container:Container;

    constructor(jcGantt:JCGantt,option:MarkOption) {
        this.jcGantt = jcGantt;
        this.option = clone(option);
        this.model = new MarkModel(option);
        this.model.jcGantt = this.jcGantt;
        this.view = new MarkView();
        this.container = ComponentManager.getInstance(this.jcGantt).getComponent<TimeScale>(TimeScale.type).getMarkContainer();
    }

    refresh(): void {
        if (!this.container){
            this.container = ComponentManager.getInstance(this.jcGantt).getComponent<TimeScale>(TimeScale.type).getMarkContainer();
        }
        this.container.removeAll();
        this.model.refresh();
        this._uiInstance = this.view.render(this.model,null);
        this._uiInstance.forEach(u => {
            this.container.add(u);
        })
    }

    setOption(option: MarkOption): void {
    }

    setTheme(theme: ThemeItem, forceTheme?: boolean): void {
    }

}