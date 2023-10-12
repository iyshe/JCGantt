import {Element, Group} from "zrender";
import Container from "./Container";

export default class StackContainer extends Container{

    static type = 'StackContainer';

    type = StackContainer.type;

    addHorizon(child:Group):Group{
        child["hv"] = 'horizon';
        let width = this.getBoundingRect().width;
        if (child){
            child.setPosition([width,0])
        }
        return this.add(child);
    }

    addVertical(child:Element):Group{
        child["hv"] = 'verity';
        let height = this.getBoundingRect().height;
        if (child){
            child.setPosition([0,height])
        }
        return this.add(child);
    }

    public getLastChild(hv:string):Container{
        let children;
        this.eachChild((c) => {
            if (c instanceof Container && c["hv"] === hv){
                children = c;
            }
        })
        return children;
    }

    public refresh():void {
    }

}