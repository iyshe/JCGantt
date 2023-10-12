import Option from "./Option";
import {clone} from "zrender/lib/core/util";

export default abstract class Model<T extends Option> {

    originOption?:T;

    fullOption?:T;

    constructor(option:T,fullOption?:T){
        this.originOption = clone(option);
        this.fullOption = fullOption;
    }

    abstract refresh():void;

}