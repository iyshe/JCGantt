import View from "../View";
import TimeScaleModel from "./TimeScaleModel";
import {TimeScaleOption} from "./TimeScaleOption";
import {Group, Text, ZRenderType} from "zrender";
import {StyleProperties, TimeMetaData} from "./types";
import StackContainer from "../../container/StackContainer";
import {constant} from "../../types";
import {addHover} from "../../util/JCUtil";
import {TextStyleProps} from "zrender/src/graphic/Text";
import {lift} from "zrender/lib/tool/color";
import Tooltip from "../tooltip/Tooltip";

export default class TimeScaleView implements View{

    render(model: TimeScaleModel<TimeScaleOption>,zr:ZRenderType): Group[] {
        if (!model){
            return [];
        }
        let that = this;
        let group = new StackContainer();
        model.metaDataList.forEach((md:TimeMetaData[],index) => {
            let scaleGroup = new StackContainer();
            md.forEach((m,index) => {
                scaleGroup.addHorizon(that.paint(m,model.styleProperties));
            });
            group.addVertical(scaleGroup);
        });
        return [group];
    }

    private paint(metaData:TimeMetaData,styleProperties:StyleProperties):Group{
        let g = new Group();
        g.dirty();
        let style = {...(metaData.style)};
        let width = metaData.baseWidth || constant.cellWidth,height = style.height || constant.cellHeight;
        let realWidth =
            width * metaData.counts +
            (
                metaData.counts * (styleProperties.border + styleProperties.padding) -
                ((style.padding || 0) + (style.borderWidth || 0.5) * 2)
            );
        let text = null;
        g.add(
            (text = new Text({
                style:{
                    text:metaData.text,
                    width:realWidth,
                    x:0.5 * realWidth,
                    height:height,
                    align:"center",
                    lineHeight:height,
                    fontSize:12,
                    backgroundColor: "#1ba78480",
                    borderColor:"#1ba784",
                    overflow:"truncate",
                    borderWidth:0.5,
                    borderRadius: 3,
                    ...metaData.style
                }
            }))
        );
        addHover<TextStyleProps>(text,"style",{
            backgroundColor:lift(text.style.backgroundColor,0.2)
        });
        Tooltip.initElement(g,metaData.text);
        return g;
    }

}