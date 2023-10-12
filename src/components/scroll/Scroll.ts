import ScrollModel from "./ScrollModel";
import ScrollView from "./ScrollView";
import {Element, ZRenderType} from "zrender";
import ScrollOption from "./ScrollOption";
import FixedContainer from "../../container/FixedContainer";
import Component from "../Component";
import ScrollItem from "./ScrollItem";
import {ScrollType} from "./types";
import {ThemeItem} from "../../types";
import JCGantt from "../../JCGantt";

export class Scroll implements Component{

    jcGantt:JCGantt;

    _uiInstance:Element[];

    model:ScrollModel;

    view:ScrollView;

    zrInstance:ZRenderType;

    horizonScroll:ScrollItem;

    verticalScroll:ScrollItem;

    verticalTarget:Element;

    verticalPos:number[];

    horizonTarget:Element;

    horizonPos:number[];

    // 关联滚动条，当前滚动条滚动时会同时滚动关联的滚动条
    items: Set<{type:ScrollType, scroll:Scroll }> = new Set<{type: ScrollType; scroll: Scroll}>();

    constructor(option?:ScrollOption,container?:FixedContainer) {
        this.model = new ScrollModel(option,option);
        this.model.setScroll(this);
        this.view = new ScrollView();
        this.model.setContainer(container);
    }

    setView(view:ScrollView):void{
        this.view = view;
    }

    setModel(model:ScrollModel):void{
        this.model = model;
    }

    public setTheme(theme: ThemeItem) {
    }

    public setTarget(type:ScrollType,target:Element){
        if (type == 'horizon'){
            this.horizonTarget = target;
            this.horizonPos = [target.x,target.y];
        } else {
            this.verticalTarget = target;
            this.verticalPos = [target.x,target.y];
        }
    }

    public setVerticalScroll(scrollItem:ScrollItem){
        this.verticalScroll = scrollItem;
        scrollItem.scroll = this;
    }

    public setHorizonScroll(scrollItem:ScrollItem){
        this.horizonScroll = scrollItem;
        scrollItem.scroll = this;
    }

    public refresh():void{
        this._uiInstance && this._uiInstance.forEach(t => {
            t.parent.remove(t);
        });
        this.model.refresh();
        this._uiInstance = this.view.render(this.model,null);
        this.resetPosition();
    }

    public horizonMove(offset:number,noSlave?:boolean):number{
        return this.horizonScroll.thumb.scrollTo(offset,noSlave);
    }

    public verticalMove(offset:number,noSlave?:boolean):number{
        return this.verticalScroll.thumb.scrollTo(offset,noSlave);
    }

    public moveTo(type:ScrollType,offset:number,noSlave?:boolean):number{
        if (type == 'horizon'){
            return this.horizonMove(offset,noSlave);
        }else {
            return this.verticalMove(offset,noSlave);
        }
        return 0;
    }

    public resetPosition(){
        this.horizonTarget ?
            this.horizonTarget.setPosition(this.horizonPos || [0,0]) :
            this._uiInstance[0] && this._uiInstance[0].parent.childAt(0).setPosition([0,0]);
        this.verticalTarget ?
            this.verticalTarget.setPosition(this.verticalPos || [0,0]) :
            this._uiInstance[1] && this._uiInstance[1].parent.childAt(0).setPosition([0,0]);
    }

    setOption(option: ScrollOption): void {
        this.model.fullOption = option;
        this.model.originOption = option;
    }

}