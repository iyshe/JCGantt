import {ColumnOption, RowData, RowOption, RowStyle} from "../Types";
import Row from "./Row";
import {Element, Rect} from "zrender";
import Table from "../Table";

export default class RowBuilder{

    colOpt:ColumnOption[];

    rowOpt:RowOption;

    background:Rect;

    table:Table;

    constructor(table:Table) {
        this.table = table;
    }

    public createRow(data:RowData,keyId:number,additionStyle?:RowStyle):Row{
        return new Row(data,this,keyId,additionStyle);
    }

    public createHead(){

    }

    public init(colOpt:ColumnOption[],rowOpt:RowOption,background:Rect):void{
        this.colOpt = colOpt;
        this.rowOpt = rowOpt;
        this.background = background;
    }

}