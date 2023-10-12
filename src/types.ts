import _moment from "moment";
import {RowData, RowStyle, Task} from "./components/table/Types";
import {TextStyleProps} from "zrender/src/graphic/Text";
import {PathStyleProps} from "zrender/src/graphic/Path";
import {TimeMetaData} from "./components/timeScale/types";
_moment.suppressDeprecationWarnings = true;
_moment.locale('zh-cn',{
    week : {
        dow : 1,
    }
});

const constant = {
    cellWidth:75,
    cellHeight:35
}

export {_moment as moment};

export type DateType = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

export {constant};

const colors = {
    info:"#909399",
    error:"#F56C6C",
    warn:"#E6A23C",
    success:"#67C23A",
    冰川蓝:"#84A3BC",
    蜜橙:"#FFBE90",
    珊瑚粉:"#E2A9A1"
}

export {colors};

export type TipType = 'warn' | 'success' | 'error' | 'info';

export interface ThemeItem{

    timeLine?:{
        grid?:{
            style?:PathStyleProps,
            rowStyle?:PathStyleProps,
            colStyle?:PathStyleProps,
            backgroundColor?:string
        },
        scales?:{
            commonStyle?:TextStyleProps,
            style?:((metaDate:TimeMetaData) => TextStyleProps)
        },
        scroll?:{
            trackStyle?:PathStyleProps,
            thumbStyle?:PathStyleProps
        }
    },

    table?:{
        row?:{
            commonStyle?:RowStyle,
            hoverStyle?:RowStyle,
            selectStyle?:(data:RowData) => RowStyle;
        },
        style?:PathStyleProps,
        headStyle?:RowStyle,
        scroll?:{
            trackStyle?:PathStyleProps,
            thumbStyle?:PathStyleProps
        }
    },

    task?:{
        textStyle?:(task:Task,row:RowData) => TextStyleProps;
        taskStyle?:(task:Task,row:RowData) => PathStyleProps;
    }

}