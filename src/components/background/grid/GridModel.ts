import Model from "../../Model";
import GridOption from "./GridOption";
import {GridMetaData, LineData} from "../types";
import TimeScale from "../../timeScale/TimeScale";
import {Group} from "zrender";
import Table from "../../table/Table";
import {PathStyleProps} from "zrender/src/graphic/Path";

export default class GridModel extends Model<GridOption>{

    timeScale:TimeScale;

    table:Table;

    metaData:GridMetaData;

    constructor(option?:GridOption,timeScale?:TimeScale) {
        super(option || {},option || {});
        this.timeScale = timeScale;
    }

    public setTimeScale(timeScale:TimeScale):void{
        this.timeScale = timeScale;
    }

    public setTable(table:Table):void{
        this.table = table;
    }

    public refresh(): void {
        this.initMetaData();
    }

    private initMetaData():void{
        let col = this.initCol();
        let row = {value:[]};
        if (this.table){
            row = this.initRow();
        }
        this.metaData = {
            col:col,
            row:row
        }
    }

    private initCol():{value:LineData[],style?:PathStyleProps}{
        let height = 100;
        if (this.table){
            height = this.table.getHeight();
        }
        let col:LineData[] = [];
        let scaleGroup = this.timeScale.tierContainer.getContainerByName(this.timeScale.type).childAt(0);
        let children = scaleGroup.children();
        let scale = <Group>children.reduce((max, current) =>
            (<Group>max).childCount() >= (<Group>current).childCount() ? max : current
        );
        let colStyle = {...(this.originOption.style || {}),...(this.originOption.colStyle || {})};
        scale.eachChild(el => {
            col.push({
                x1:el.x,
                x2:el.x,
                y1:0,
                y2:height,
            })
        });
        return {
            value:col,
            style:colStyle
        }
    }

    private initRow():{value:LineData[],style?:PathStyleProps}{
        // let width = this.timeScale.tierContainer.getContainer(2).getBoundingRect().width;
        let width = this.timeScale.getTimeLineWidth();
        let row:LineData[] = [];
        let boundingRect,yPos;
        let rowStyle = {...(this.originOption.style || {}),...(this.originOption.rowStyle || {})};
        let rowGroup = this.table.rowGroup;
        let rh = rowGroup.y + rowGroup.parent.y;
        rowGroup.eachChild((c) => {
            boundingRect = c.getBoundingRect();
            yPos = rh + c.y + boundingRect.height;
            row.push({
                x1:0,
                x2:width || 1000,
                y1:yPos,
                y2:yPos
            })
        })
        return {
            value:row,
            style:rowStyle
        }
    }

}