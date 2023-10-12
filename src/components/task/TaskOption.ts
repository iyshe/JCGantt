import Option from "../Option";
import {RowData, Task} from "../table/Types";
import {TextStyleProps} from "zrender/src/graphic/Text";
import {PathStyleProps} from "zrender/src/graphic/Path";

export default interface TaskOption extends Option{

    text?:(task:Task,row:RowData) => string;

    textStyle?:(task:Task,row:RowData) => TextStyleProps;

    taskStyle?:(task:Task,row:RowData) => PathStyleProps;

    tooltip?:(task:Task,row:RowData) => string;

    allowDrag?:(task:Task,sourceRow:RowData,targetTask:Task,targetRow:RowData,date:Date) => {allow:boolean,messageX?:string,messageY?:string};

    onDrag?:(task:Task,sourceRow:RowData,targetTask:Task,targetRow:RowData,date:Date,resolve:Function) => void;

}