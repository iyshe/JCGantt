import {isString,isFunction} from "zrender/lib/core/util";
import {moment} from "../../types";

export function dateFormatHandle(formatter:string | Function,start:Date,end:Date){
    if (isString(formatter)){
        return moment(start).format(formatter);
    }else if (isFunction(formatter)){
        return formatter(start,end);
    }
}