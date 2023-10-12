import {moment, ThemeItem} from "./types";
import MainOption from "./MainOption";
import {applyTo} from "./util/JCUtil";
import {RowData, RowStyle} from "./components/table/Types";
import {clone, isString} from "zrender/lib/core/util";

export default class Theme {

    public static 冰川蜜橙:string = "冰川蜜橙";
    public static 青行未启:string = "青行未启";
    public static 稚艾霓粉:string = "稚艾霓粉";
    public static 西子退红:string = "西子退红";
    public static 秋波虎牙:string = "秋波虎牙";
    public static 冰河时代:string = "冰河时代";
    public static 紫罗兰:string = "紫罗兰";
    public static 橘绿之泉:string = "橘绿之泉";
    public static 橘子糖:string = "橘子糖";
    public static 玫瑰之后:string = "玫瑰之后";
    public static 墨尔本晴:string = "墨尔本晴";

    private static themeMap = new Map<string,ThemeItem>()
        .set(Theme.冰川蜜橙,Theme.quickTheme("#84A3BC","#FFBE90","#E2A9A1"))
        .set(Theme.稚艾霓粉,Theme.quickTheme("#CF929E","#E3EB98","#c5dc4a"))
        .set(Theme.青行未启,Theme.quickTheme("#55bb8a","#9eccab","#84C08E"))
        .set(Theme.西子退红,Theme.quickTheme("#87C0CA","#F0CFE3","#efb3e4"))
        .set(Theme.秋波虎牙,Theme.quickTheme("#8ABCD1","#E9D1B5","#d7ad7b"))
        .set(Theme.冰河时代,Theme.quickTheme("#2971BF","#6EE5E3","#CCE6D9"))
        .set(Theme.紫罗兰,Theme.quickTheme("#9A2BD5","#DDCDE8","#5916AF"))
        .set(Theme.橘绿之泉,Theme.quickTheme("#63D999","#17bf70","#266c56"))
        .set(Theme.橘子糖,Theme.quickTheme("#85C8DF","#FFE6B2","#d7ad7b"))
        .set(Theme.玫瑰之后,Theme.quickTheme("#F88C48","#A7CCFF","#E9BDBF"))
        .set(Theme.墨尔本晴,Theme.quickTheme("#FF9F27","#6CD1E4","#E8DF88"))

    /**
     * 注册一个主题
     * @param name 主题名称
     * @param option 主题配置
     * @param force 如果主题名称重复，是否覆盖
     */
    public static registerTheme(name:string,option:ThemeItem,force?:boolean):void{
        if (Theme.themeMap.has(name) && !force){
            return;
        }
        Theme.themeMap.set(name,option);
    }

    public static getTheme(name:string):ThemeItem{
        return Theme.themeMap.get(name);
    }

    public static applyTheme(opt:MainOption,theme:string | ThemeItem,forceTheme:boolean){
        if (isString(theme)){
            theme = Theme.getTheme(theme);
        }
        if (!theme){
            return;
        }
        let t = clone(theme);
        let scales = t.timeLine.scales;
        delete t.timeLine.scales;
        applyTo(t,opt,forceTheme);
        if (opt.timeLine.scales){
            opt.timeLine.scales.forEach(s => {
                applyTo(scales,s,forceTheme);
            })
        }
    }

    public static quickTheme(bgColor:string,mainColor,minorColor:string):ThemeItem{
        return {
            timeLine:{
                grid:{
                    backgroundColor:"#fff",
                    style:{
                        stroke:bgColor
                    }
                },
                scales:{
                    commonStyle:{
                        backgroundColor:bgColor,
                        borderColor:mainColor
                    },
                    style:null
                },
                scroll:{
                    trackStyle:{
                        // fill:bgColor + "50"
                        fill:"#acacac80"
                    },
                    thumbStyle:{
                        fill:mainColor,
                    }
                }
            },
            task:{
                taskStyle:(task,row) => {
                    return {
                        fill:mainColor,
                        stroke:minorColor,
                        shadowBlur:3,
                        shadowOffsetX: 2,
                        shadowOffsetY: 1,
                        // shadowColor: minorColor
                        shadowColor: "#acacac"
                    }
                },
            },
            table:{
                headStyle:{
                    textStyle:{
                        backgroundColor:bgColor,
                        borderColor:mainColor
                    }
                },
                row:{
                    commonStyle:{
                        rowStyle:{
                            fill:mainColor,
                            stroke:minorColor
                        }
                    },
                    hoverStyle:{
                        rowStyle:{
                            fill:bgColor + 90,
                            stroke:minorColor
                        }
                    },
                    selectStyle:() => {
                        return{
                            rowStyle:{
                                fill:bgColor,
                                stroke:minorColor
                            }
                        }
                    }
                },
                scroll:{
                    trackStyle:{
                        // fill:bgColor + "50"
                        fill:"#acacac80"
                    },
                    thumbStyle:{
                        fill:mainColor,
                    }
                }
            }
        }
    }

}