import View from "../View";
import ScrollModel from "./ScrollModel";
import ScrollOption from "./ScrollOption";
import {Group, Rect, ZRenderType} from "zrender";
import Thumb from "./Thumb";
import ScrollItem from "./ScrollItem";

export default class ScrollView implements View{

    render(model: ScrollModel<ScrollOption>, zr: ZRenderType): Group[] {
        let res:Group[] = []
        model.horizon && res.push(this.paintHorizon(model));
        model.vertical && res.push(this.paintVertical(model));
        return res;
    }

    private paintHorizon(model: ScrollModel<ScrollOption>):Group {
        let track = new Rect({
            shape:{
                width:model.horizon.trackLength,
                height:model.horizon.height
            },
            style:{
                fill:"#acacac60",
                ...model.horizon.trackStyle
            }
        });
        let thumb = new Thumb({
            shape:{
                y:2,
                x:2,
                width:model.horizon.thumbLength,
                height:model.horizon.height - 4
            },
            style:{
                fill:"#acacac",
                ...model.horizon.thumbStyle
            }
        },'horizon');
        let scrollItem = new ScrollItem(track,thumb,"horizon",model.scroll);
        scrollItem.setHoverOffset(model.originOption.hoverOffset);
        model.scroll.setHorizonScroll(scrollItem);
        model.container.addBottom(scrollItem);
        return scrollItem;
    }

    private paintVertical(model: ScrollModel<ScrollOption>):Group {
        let track = new Rect({
            shape:{
                height:model.vertical.trackLength,
                width:model.vertical.width
            },
            style:{
                fill:"#acacac60",
                ...model.vertical.trackStyle
            }
        });
        let thumb = new Thumb({
            shape:{
                y:2,
                x:2,
                height:model.vertical.thumbLength,
                width:model.vertical.width - 4
            },
            style:{
                fill:"#acacac",
                ...model.vertical.thumbStyle
            },
            draggable:true
        },"vertical");
        let scrollItem = new ScrollItem(track,thumb,"vertical",model.scroll);
        scrollItem.setHoverOffset(model.originOption.hoverOffset);
        model.scroll.setVerticalScroll(scrollItem);
        model.container.addRight(scrollItem);
        return scrollItem;
    }
}