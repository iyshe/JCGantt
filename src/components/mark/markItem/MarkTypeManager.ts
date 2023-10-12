import MarkItem from "./MarkItem";
import DateMark from "./DateMark";
import {isFunction} from "zrender/lib/core/util";
import {PathStyleProps} from "zrender/src/graphic/Path";
import {TextStyleProps} from "zrender/src/graphic/Text";

export default class MarkTypeManager{

    private static typeMap:Map<string,(arg:any) => MarkItem> = new Map<string, (arg: any) => MarkItem>()
        .set(DateMark.type,(arg:{date:Date,lineStyle?:PathStyleProps,textStyle?:TextStyleProps}) => new DateMark(arg));

    private constructor() {
    }

    public static registerMarkType(type:string,func:(arg:any) => MarkItem):void{
        MarkTypeManager.typeMap.set(type,func);
    }

    public static getMarkItem(type:string,arg:any):MarkItem{
        let res = null;
        let func = MarkTypeManager.typeMap.get(type);
        if (isFunction(func)){
            res = func(arg);
        }
        return res;
    }

}
