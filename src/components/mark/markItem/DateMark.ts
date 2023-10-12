import MarkItem from "./MarkItem";
import {Element, Group, Line, Text} from "zrender";
import {PathStyleProps} from "zrender/src/graphic/Path";
import {TextStyleProps} from "zrender/src/graphic/Text";
import ComponentManager from "../../ComponentManager";
import TimeScale from "../../timeScale/TimeScale";
import {moment} from "../../../types";

export default class DateMark extends MarkItem{

    static type = 'DateMark';

    type:string = DateMark.type;

    date:Date;

    line:Line;

    text:Text;

    group:Group;

    length:number;

    lineStyle:PathStyleProps;

    textStyle:TextStyleProps;

    content:string;

    constructor(arg) {
        super();
        this.date = moment(arg.date).toDate();
        this.lineStyle = arg.lineStyle;
        this.textStyle = arg.textStyle;
        this.length = arg.length;
        this.content = arg.text;
    }

    paint(): Element {
        let that = this;
        let timeScale = ComponentManager.getInstance(this.jcGantt).getComponent<TimeScale>(TimeScale.type);
        let h = timeScale.getTimeLineHeight();
        let coord = timeScale.coord;
        let x = coord.dateToX(this.date);
        this.group = new Group({silent:true});
        this.line = new Line({
            shape:{
                x1:x,
                y1:h,
                x2:x,
                y2:that.length
            },
            style:{
                lineWidth:1.2,
                lineDash:'dashed',
                stroke:"#000",
                ...that.lineStyle
            }
        });
        this.text = new Text({
            style:{
                x:x,
                y:that.length,
                text:that.content,
                padding:5,
                backgroundColor:"#acacac",
                align:"center",
                ...that.textStyle
            }
        })
        this.group.add(this.line);
        this.group.add(this.text);
        return this.group;
    }

}