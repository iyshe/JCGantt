import {PathStyleProps} from "zrender/src/graphic/Path";

export interface ScrollData{

    type:ScrollType;
    
    width?:number;

    height?:number;

    trackLength:number;

    thumbLength:number;

    trackStyle?:PathStyleProps;

    thumbStyle?:PathStyleProps;

}

export type ScrollType = 'horizon' | 'vertical';