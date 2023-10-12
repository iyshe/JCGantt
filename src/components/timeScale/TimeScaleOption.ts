import {constant, DateType} from "../../types";
import Option from "../Option";
import {TimeMetaData} from "./types";
import {TextProps, TextStyleProps} from "zrender";
import GridOption from "../background/grid/GridOption";
import ScrollOption from "../scroll/ScrollOption";
import {ContextMenuItem} from "../contextmenu/types";

export interface ITimeScaleOption extends Option{

    width?:number | string;

    height?:number | string;

    start?:Date | string;

    end?:Date | string;

    days?:number;

    baseWidth?:number;

    accuracy?:DateType;

    grid?:GridOption;

    scales?:ScaleOption[];

    scroll?:ScrollOption;

    contextmenu?:ContextMenuItem[];

}

export class TimeScaleOption implements ITimeScaleOption{

    static defaultDays = -60;

    static readonly accuracyMap = new Map<DateType,number>()
        .set("second",1)
        .set("minute",60)
        .set("hour",60*60)
        .set("day",60*60*24)
        .set("week",60*60*24*7)
        .set("month",30*60*60*24*7)
        .set("year",365*30*60*60*24*7);

    width?:number | string;

    height?:number | string;

    start?:(Date | string) = new Date();

    end?:Date | string;

    days?:number = TimeScaleOption.defaultDays;

    accuracy?:DateType = "second";

    baseWidth?:number = constant.cellWidth;

    grid?:GridOption;

    scales?:ScaleOption[] = [new ScaleOption()];

    scroll?:ScrollOption;

    contextmenu?:ContextMenuItem[];

    constructor(option:TimeScaleOption) {
        if (option){
            let scales = [];
            option.scales && option.scales.forEach((s:ScaleOption) => {
                scales.push(new ScaleOption(s));
            })
            for (let key in option) {
                this[key] = option[key];
            }
            if (scales.length > 0){
                this.scales = scales;
            }
        }
    }

    getAccuracy():number{
        return TimeScaleOption.accuracyMap.get(this.accuracy);
    }

}

interface IScaleOption extends Option{

    symbol?:DateType;

    formatter?:Function | string;

    commonStyle?:TextStyleProps;

    style?:((metaDate:TimeMetaData) => TextStyleProps)

}

export class ScaleOption implements IScaleOption{

    symbol?:DateType = "day";

    formatter?:Function | string = 'YY/MM/DD';

    commonStyle?:TextStyleProps;

    style?:((metaDate:TimeMetaData) => TextStyleProps)

    constructor(option?:ScaleOption) {
        if (option) {
            for (let key in option) {
                this[key] = option[key];
            }
        }
    }

}