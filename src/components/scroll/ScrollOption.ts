import Option from "../Option";
import {PathStyleProps} from "zrender/src/graphic/Path";

export default interface ScrollOption extends Option{

    thickness?:number;

    hoverOffset?:number;

    trackStyle?:PathStyleProps;

    thumbStyle?:PathStyleProps;

}