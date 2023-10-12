import {PathStyleProps} from "zrender/src/graphic/Path";
import {TextStyleProps} from "zrender";
import {Dictionary} from "zrender/lib/core/types";

export interface ColumnOption{

    show?:boolean;

    name:string;

    prop:string;

    width?:number;

    style?:(value:any) => TextStyleProps;

}

export interface RowOption{

    height?:number;

    commonStyle?:RowStyle

    style?:(data:RowData) => RowStyle;

    quickTip?:(data:RowData) => string;

    hoverStyle?:RowStyle;

    selectStyle?:(data:RowData) => RowStyle;

}

export interface RowStyle{

    rowStyle?:PathStyleProps;

    textStyle?:TextStyleProps;

}

export interface RowData extends Dictionary<string>{
    tasks?:Task[]
}

export interface Task extends Dictionary<string>{

    start:Date | string;

    end:Date | string;

    text?:string;

}