import Option from "./Option";
import {Element, ZRenderType} from "zrender";
import {ThemeItem} from "../types";
import JCGantt from "../JCGantt";

export default interface Component{

    _uiInstance:Element[];

    zrInstance:ZRenderType;

    jcGantt:JCGantt;

    refresh():void;

    setOption(option:Option):void;

    setTheme(theme:ThemeItem,forceTheme?:boolean):void;

}