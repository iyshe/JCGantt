import View from "../../View";
import GridModel from "./GridModel";
import GridOption from "./GridOption";
import {Group, Line, Rect, ZRenderType} from "zrender";
import {LineData} from "../types";
import {PathStyleProps} from "zrender/src/graphic/Path";

export default class GridView implements View{

    render(model: GridModel<GridOption>, zr: ZRenderType): Group[] {
        let group = new Group({
            silent:false
        });
        let metaData = model.metaData;
        metaData.row && (group.add(this.paintRow(metaData.row)));
        metaData.col && (group.add(this.paintCol(metaData.col)));
        let r = group.getBoundingRect();
        group.add(new Rect({
            shape:{
                width:r.width,
                height:r.height,
            },
            style:{
                fill:model.originOption.backGroundColor || "#ffffff00"
            },
            zlevel:-1
        }))
        return [group];
    }

    private paintRow(rowLine: {value:LineData[],style?:PathStyleProps}):Group {
        let group = new Group();
        rowLine.value.forEach(row => {
            group.add(
                new Line({
                    shape:row,
                    style:{
                        stroke:"#acacac",
                        lineDash:"dashed",
                        lineWidth:1,
                        ...rowLine.style
                    }
                })
            )
        })
        return group;
    }

    private paintCol(colLine: {value:LineData[],style?:PathStyleProps}):Group {
        let group = new Group();
        colLine.value.forEach(col => {
            group.add(
                new Line({
                    shape:col,
                    style:{
                        stroke:"#acacac",
                        lineDash:"dashed",
                        lineWidth:1,
                        ...colLine.style
                    }
                })
            )
        })
        return group;
    }
}