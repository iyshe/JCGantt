import {PathStyleProps} from "zrender/src/graphic/Path";

export interface GridMetaData{

    row?:{
        value:LineData[],
        style?:PathStyleProps
    };

    col?:{
        value:LineData[],
        style?:PathStyleProps
    };

}

export interface LineData{

    x1:number;

    y1:number;

    x2:number;

    y2:number;

}