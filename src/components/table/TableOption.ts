import Option from "../Option";
import {ColumnOption, RowData, RowOption, RowStyle} from "./Types";
import {PathStyleProps} from "zrender/src/graphic/Path";
import ScrollOption from "../scroll/ScrollOption";
import {ContextMenuItem} from "../contextmenu/types";

export default interface TableOption extends Option{

    show?:boolean;

    width:number | string;

    height:number | string;

    column:ColumnOption[];

    row:RowOption;

    data?:RowData[];

    loadData?:(start:Date,end:Date,resolve:Function) => RowData[];

    style?:PathStyleProps;

    headStyle?:RowStyle;

    scroll?:ScrollOption;

    contextmenu?:ContextMenuItem[];

}