import {Element, Group, Rect} from "zrender";
import {clone} from "zrender/lib/core/util";
import Row from "./Row";
import Table from "../Table";
import TierContainer from "../../../container/TierContainer";
import RowBuilder from "./RowBuilder";
import Container from "../../../container/Container";
import StackContainer from "../../../container/StackContainer";
import {RowData} from "../Types";

export default class TableItem{

    table:Table;

    tableRect:Rect;

    container:TierContainer;

    rowBuilder:RowBuilder;

    rows:Row[] = [];

    rowWrapper:Container;

    constructor(table:Table) {
        this.table = table;
        this.container = new TierContainer(2);
        this.tableRect = new Rect({
            shape:{
                width:table.container.__width,
                height:table.container.__height
            },
            style:{
                fill:"none",
                ...table.option.style
            }
        });
        this.container.addTo(this.tableRect,1);
        this.rowBuilder = new RowBuilder(this.table);
        this.rowBuilder.init(table.option.column,table.option.row,this.tableRect);
        this.rows = [];
    }

    public async render(cache?:boolean){
        let that = this;
        let rowBuilder = this.rowBuilder;
        let head = {};
        let cols = this.table.option.column;
        cols.forEach((c) => {
            head[c.prop] = c.name;
        })
        let headHeight;
        let headStyle = this.table.option.headStyle;
        if (this.table.timescale){
            headHeight = this.table.timescale.tierContainer.getContainer(2).realHeight;
            headStyle.textStyle.height = headHeight;
            headStyle.textStyle.lineHeight = headHeight;
        }
        !cache && this.addRow(new Group({silent:true}).add(rowBuilder.createRow(head,0,headStyle).container));
        if (cache){
            let data = this.table.rows;
            this.renderRow(data);
        }else {
            await this.table.getData().then((data) => {
                that.renderRowData(data);
                /*let wrapper = new Group();
                let sc = new StackContainer();
                let row,keyId = 1;
                data.forEach((d) => {
                    row = rowBuilder.createRow(d,keyId++)
                    that.rows.push(row);
                    sc.addVertical(row.container);
                })
                wrapper.add(sc);
                // 这里设置clipPath是为了不让表格体在滚动是遮挡表头
                wrapper.setClipPath(new Rect({
                    shape:{
                        x:0,
                        y:0,
                        width:wrapper.getBoundingRect().width,
                        height:wrapper.getBoundingRect().height
                    }
                }))
                that.addRow(wrapper);*/
            });
        }
        // return this.container;
    }

    private renderRowData(data:RowData[]):void{
        let that = this;
        let rowBuilder = this.rowBuilder;
        let wrapper = new Group();
        this.rowWrapper = new StackContainer();
        let sc = this.rowWrapper;
        let row,keyId = 1;
        data.forEach((d) => {
            row = rowBuilder.createRow(d,keyId++)
            that.rows.push(row);
            sc.addVertical(row.container);
        })
        wrapper.add(sc);
        // 这里设置clipPath是为了不让表格体在滚动是遮挡表头
        wrapper.setClipPath(new Rect({
            shape:{
                x:0,
                y:0,
                width:wrapper.getBoundingRect().width,
                height:wrapper.getBoundingRect().height
            }
        }))
        that.addRow(wrapper);
    }

    private renderRow(data:Row[]):void{
        // let that = this;
        // let rowBuilder = this.rowBuilder;
        // let wrapper = new Group();
        // let sc = new StackContainer();
        // let row,keyId = 1,d:RowData;
        let wrapper = this.rowWrapper;
        wrapper.removeAll();
        data.forEach((r) => {
            if (r.ignore){
                return;
            }
            wrapper.addVertical(r.container);

            // d = r.data;
            // row = rowBuilder.createRow(d,keyId++)
            // that.rows.push(row);
            // sc.addVertical(row.container);
        })
        this.rows = data;
        // wrapper.add(sc);
        // // 这里设置clipPath是为了不让表格体在滚动是遮挡表头
        // wrapper.setClipPath(new Rect({
        //     shape:{
        //         x:0,
        //         y:0,
        //         width:wrapper.getBoundingRect().width,
        //         height:wrapper.getBoundingRect().height
        //     }
        // }))
        // that.addRow(wrapper);
    }

    public addRow(row:Element):void{
        this.container.addVerticalTo(row,2);
        this.updateTableRect();
    }

    public getRowGroup():Group{
        return this.container.getContainer(2).childAt(1).childAt(0);
    }

    public getHeadGroup():Group{
        return this.container.getContainer(2).childAt(0);
    }

    public updateTableRect():void{
        let height = this.container.getContainer(2).getBoundingRect().height;
        let width = this.container.getContainer(2).getBoundingRect().width;
        let shape = this.tableRect.shape;
        shape.height = height;
        shape.width = width;
        this.tableRect.attr("shape",shape);
    }

}