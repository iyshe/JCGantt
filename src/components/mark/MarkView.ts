import View from "../View";
import MarkModel from "./MarkModel";
import MarkOption from "./MarkOption";
import {Element, Group, ZRenderType} from "zrender";

export default class MarkView implements View{

    public render(model: MarkModel<MarkOption>, zr: ZRenderType): Element[] {
        let group = new Group();
        model.items.forEach((item) => {
            group.add(item.paint());
        })
        return [group];
    }

}