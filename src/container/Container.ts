import {Element, Group} from "zrender";
import {JCEventListener} from "../event/types";
import ResizeEvent from "../event/ResizeEvent";
import Component from "../components/Component";

export default abstract class Container extends Group implements JCEventListener<ResizeEvent>{

    type:string;

    eventType:string = ResizeEvent.type;

    realWidth:number;

    realHeight:number;

    /**
     * 该属性目的在于当容器触发resize事件后，同步刷新该容器所指定的组件
     */
    component?:Component;

    /**
     * 在当前容器添加元素
     * @param child
     */
    add(child: Element): Group {
        let group = super.add(child);
        this.realWidth = super.getBoundingRect().width;
        this.realHeight = super.getBoundingRect().height;
        return group;
    }
    addHorizon(child:Element):Group{
        return this.add(child);
    }

    addVertical(child:Element):Group{
        return this.add(child);
    }

    /**
     * 在当前容器的内容区域添加内容
     * @param child
     */
    addContent(child: Element): Group {
        return this.add(child);
    }

    // todo refresh方法待实现
    abstract refresh():void;

    setComponent(component:Component){
        this.component = component;
    }

    resize(width?:number | string,height?:number | string):void{}

    handleEvent(event: ResizeEvent) {
        this.resize();
        (this.component && this.component.refresh());
    }

}