import {DateType} from "../../types";
import {TextStyleProps} from "zrender/src/graphic/Text";

export interface TimeData{

    symbol:DateType;

    year:TimeMetaData[];

    month:TimeMetaData[];

    week:TimeMetaData[];

    day:TimeMetaData[];
}

export interface TimeMetaData{

    symbol?:DateType;

    key?:string;

    start:Date;

    end:Date;

    text:string;

    counts?:number;

    baseWidth?:number;

    style?:TextStyleProps;
}

export interface StyleProperties{

    border?:number;

    padding?:number;
}