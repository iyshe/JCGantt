import {PathStyleProps} from "zrender/src/graphic/Path";
import Option from "../../Option";

export default interface GridOption extends Option{

    style?:PathStyleProps;

    rowStyle?:PathStyleProps

    colStyle?:PathStyleProps

    backGroundColor?:string

}
