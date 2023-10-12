import Model from "../Model";
import {ScaleOption, TimeScaleOption} from "./TimeScaleOption";
import {DateType,moment} from "../../types";
import {StyleProperties, TimeMetaData} from "./types";
import {dateFormatHandle} from "./TimeScaleUtil";
import {TextProps} from "zrender";
import {clone, isArray, isFunction} from "zrender/lib/core/util";
import {TextStyleProps} from "zrender/src/graphic/Text";
import TimeScale from "./TimeScale";

export default class TimeScaleModel extends Model<TimeScaleOption>{

    static type = 'timeScale' as const;

    type = TimeScaleModel.type;

    metaDataMap:Map<DateType,TimeMetaData[]>;

    metaDataList:TimeMetaData[][];

    styleProperties:StyleProperties;

    start:Date;

    end:Date;

    minUnit:DateType;
    originMinUnit:DateType;

    timeBase:number = 1;
    _timeBase:number = 1;
    _timeUnit:DateType;

    option:TimeScaleOption;

    constructor(option?:TimeScaleOption) {
        super(option,new TimeScaleOption(option));
        this.option = clone(option);
        // this.refresh();
    }

    public refresh():void {
        this.init();
    }

    init():void{
        const {start,end} = this.getStartAndEnd();
        this.start = start,this.end = end;
        this.initMetaDataMap(start,end);
        this.initMetaDataList();
    }

    private initMetaDataMap(start:Date,end:Date):void{
        let that = this;
        this.metaDataMap = new Map<DateType, TimeMetaData[]>();
        let scales = this.fullOption.scales;
        let minScale = this.getMinAccuracyScale(scales);
        this.originMinUnit = minScale ? minScale.symbol : "day";
        let tu = this.unitConversion(this._timeBase,this._timeUnit || this.originMinUnit);
        this.timeBase =Math.floor(tu.timeBase);
        this.minUnit = tu.timeUnit;
        let formatter = tu.formatter;
        scales.forEach(sc => {
            if (!that.metaDataMap.get(sc.symbol)){
                if (sc.symbol == that.originMinUnit){
                    that.metaDataMap.set(sc.symbol,that.createMinTimeMetaData(sc,this.timeBase,that.minUnit,formatter,start,end));
                }else {
                    that.metaDataMap.set(sc.symbol,that.createTimeMetaData(sc,this.timeBase,that.minUnit,start,end));
                }
            }
        })
    }

    private initMetaDataList():void{
        let that = this;
        this.metaDataList = [];
        this.fullOption.scales.forEach(sc => {
            that.metaDataList.push(that.metaDataMap.get(sc.symbol));
        })
    }

    private getMinAccuracyScale(scales:ScaleOption[]):ScaleOption{
        if (scales && scales.length > 0){
            return scales.reduce((max,current) => {
                return (TimeScaleOption.accuracyMap.get(max.symbol) - TimeScaleOption.accuracyMap.get(current.symbol)) <= 0 ? max : current;
            })
        }
        return null;
    }

    private getStartAndEnd():{start:Date,end:Date}{
        let start = this.fullOption.start,end = this.fullOption.end,days = this.fullOption.days;
        if (!end){
            start = moment(start).toDate();
            end = moment(start).add(Math.abs(days),"d").toDate();
        }else {
            end = moment(end).toDate();
            if (days > 0){
                start = moment(end).subtract(Math.abs(days),"d").toDate();
            }else {
                start = moment(start).toDate();
            }
        }
        start = moment(start).startOf("d").toDate();
        end = moment(end).startOf("d").toDate();
        return {start:start,end:end};
    }

    private createMinTimeMetaData(scale:ScaleOption,timeBase:number,minUnit:DateType,formatter:string,start:Date,end:Date):TimeMetaData[]{
        let res = [];
        if (!formatter && scale.symbol != minUnit){
            formatter = TimeScale.defaultFormatter[minUnit];
        }
        // let startTime = moment(start).startOf(minUnit),endTime = moment(end).endOf(minUnit),date = moment(start).startOf(minUnit),endDate = null,startDate = null;
        let startTime = moment(start),endTime = moment(end),date = moment(start),endDate = null,startDate = null;
        let commonStyle:TextStyleProps = scale.commonStyle || {};
        while (date.isBetween(startTime,endTime,"second","[)")){
            startDate = date.clone();
            endDate = moment.min([date.add(timeBase,minUnit).startOf(minUnit),endTime]);
            let metaData:TimeMetaData = {
                symbol:minUnit,
                start:startDate.toDate(),
                end:endDate.toDate(),
                counts:endDate.diff(startDate,minUnit)/timeBase || 1,
                baseWidth:this.fullOption.baseWidth,
                text:dateFormatHandle(formatter || scale.formatter,startDate.toDate(),endDate.toDate()),
            }
            metaData.style = {
                ...commonStyle,
                ...((isFunction(scale.style)) ? <TextStyleProps>(scale.style(metaData)) : {})
            }
            this.initStyleProperties(metaData,minUnit);
            res.push(metaData);
        }
        return res;
    }

    private createTimeMetaData(scale:ScaleOption,timeBase:number,minUnit:DateType,start:Date,end:Date):TimeMetaData[]{
        let res = [];
        let startTime = moment(start),endTime = moment(end),date = moment(start),endDate = null,startDate = null;
        let commonStyle:TextStyleProps = scale.commonStyle || {};
        while (date.isBetween(startTime,endTime,"second","[)")){
            startDate = date.clone();
            endDate = moment.min([date.add(1,scale.symbol).startOf(scale.symbol),endTime]);
            let metaData:TimeMetaData = {
                symbol:scale.symbol,
                start:startDate.toDate(),
                end:endDate.toDate(),
                counts:endDate.diff(startDate,minUnit)/timeBase || 1,
                baseWidth:this.fullOption.baseWidth,
                text:dateFormatHandle(scale.formatter,startDate.toDate(),endDate.toDate()),
            }
            metaData.style = {
                ...commonStyle,
                ...((isFunction(scale.style)) ? <TextStyleProps>(scale.style(metaData)) : {})
            }
            // this.initStyleProperties(metaData,minUnit);
            res.push(metaData);
        }
        return res;
    }

    private initStyleProperties(metaData:TimeMetaData,minUnit:DateType):void{
        if (!this.styleProperties && metaData.symbol == minUnit){
            let padding = 0;
            if (isArray(metaData.style.padding)){
                if (metaData.style.padding.length > 2){
                    padding = metaData.style.padding[1] + metaData.style.padding[3];
                }else {
                    padding = metaData.style.padding[1];
                }
            }else {
                padding = metaData.style.padding || 0;
            }
            this.styleProperties = {
                border:(metaData.style.borderWidth || 0.5) * 2,
                padding:padding
            }
        }
    }

    public unitConversion(timeBase:number,timeUint:DateType,formatter?:string):{timeBase:number,timeUnit:DateType,formatter:string}{
        switch (timeUint){
            case "year":
            {
                if (timeBase < 1){
                    timeBase = 12 * timeBase;
                    timeUint = "month";
                    formatter = "YY年MM月";
                }else {
                    return {
                        timeBase:timeBase,
                        timeUnit:timeUint,
                        formatter:formatter
                    }
                }
                return this.unitConversion(timeBase,timeUint,formatter);
            };break;
            case "month":
            {
                if (timeBase >= 12){
                    timeBase = Math.floor(timeBase/12);
                    timeUint = "year";
                    formatter = "YY年"
                }else if (timeBase < 1){
                    timeBase = timeBase * 30;
                    timeUint = "day";
                    formatter = "MM月DD日"
                }else {
                    return {
                        timeBase:timeBase,
                        timeUnit:timeUint,
                        formatter:formatter
                    }
                }
                return this.unitConversion(timeBase,timeUint,formatter);
            };break;
            case "day":
            {
                if (timeBase >= 30){
                    timeBase = Math.floor(timeBase/30);
                    timeUint = "month";
                    formatter = "MM月"
                }else if (timeBase < 1){
                    timeBase =24 * timeBase;
                    timeUint = "hour";
                    formatter = "DD日HH时"
                }else {
                    return {
                        timeBase:timeBase,
                        timeUnit:timeUint,
                        formatter:formatter
                    }
                }
                return this.unitConversion(timeBase,timeUint,formatter);
            };break;
            case "hour":
            {
                if (timeBase >= 24){
                    timeBase = Math.floor(timeBase/24);
                    timeUint = 'day';
                    formatter = "DD日"
                }else if (timeBase < 1){
                    timeBase = 60 * timeBase;
                    timeUint = 'minute';
                    formatter = "HH时mm分"
                }else {
                    return {
                        timeBase:timeBase,
                        timeUnit:timeUint,
                        formatter:formatter
                    }
                }
                return this.unitConversion(timeBase,timeUint,formatter);
            };break;
            case "minute":
            {
                if (timeBase >= 60){
                    timeBase = Math.floor(timeBase/60);
                    timeUint = 'hour';
                    formatter = "HH时";
                }else if (timeBase < 1){
                    timeBase = timeBase * 60;
                    timeUint = 'second';
                    formatter = "mm分ss秒"
                }else {
                    return {
                        timeBase:timeBase,
                        timeUnit:timeUint,
                        formatter:formatter
                    }
                }
                return this.unitConversion(timeBase,timeUint,formatter);
            };break;
            case "second":
            {
                if (timeBase >= 60){
                    timeBase = Math.floor(timeBase/60);
                    timeUint = "minute";
                    formatter = "mm分"
                }else if (timeBase < 1){
                    timeBase = 1;
                }else {
                    return {
                        timeUnit:timeUint,
                        timeBase:timeBase,
                        formatter:formatter
                    }
                }
                return this.unitConversion(timeBase,timeUint,formatter);
            };break;
        }
    }

}