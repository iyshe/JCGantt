import {Element, Group, ZRenderType} from "zrender";
import Model from "./Model";
import Option from "./Option";

interface View{

    render(model:Model<Option>,zr:ZRenderType):Element[];

}

export default View;