import {Group, Rect, RectProps} from "zrender";
import Thumb from "./Thumb";
import {ScrollType} from "./types";
import Animator from "zrender/lib/animation/Animator";
import AnimateManager from "../../animator/AnimateManager";
import {Scroll} from "./Scroll";

export default class ScrollItem extends Group{

    type:ScrollType;

    hovered:boolean;

    scroll:Scroll;

    track:Rect;
    trackLength:number;
    trackPosition:number;

    thumb:Thumb;
    thumbLength:number;
    thumbPosition:number;

    offset:number;

    static duration = 120;

    static mouseoverHandler = {
        "horizon":(item:ScrollItem,offsetLength) => {
            let animateManager = AnimateManager.getInstance();
            let trackAnimate:Animator<any> = null;
            trackAnimate = animateManager.getAnimate(item.track,'mouseover');
            if (!trackAnimate){
                trackAnimate = animateManager.addAnimate(item.track,'mouseover',item.track.animate("shape",false)
                    .when(ScrollItem.duration,{
                        y:item.trackPosition - offsetLength,
                        height:item.trackLength + offsetLength
                    })
                    .done(() => {
                        item.track.attr<RectProps>({
                            shape:{
                                y:item.trackPosition - offsetLength,
                                height:item.trackLength + offsetLength
                            }
                        });
                    }))
            }
            let thumbAnimate:Animator<any> = null;
            thumbAnimate = animateManager.getAnimate(item.thumb,'mouseover');
            if (!thumbAnimate){
                thumbAnimate = animateManager.addAnimate(item.thumb,'mouseover',item.thumb.animate("shape",false)
                    .when(ScrollItem.duration,{
                        y:item.thumbPosition - offsetLength,
                        height:item.thumbLength + offsetLength
                    })
                    .done(() => {
                        item.thumb.attr<RectProps>({
                            shape:{
                                y:item.thumbPosition - offsetLength,
                                height:item.thumbLength + offsetLength
                            }
                        })
                    }))
            }
            item.track.updateDuringAnimation('shape');
            item.thumb.updateDuringAnimation('shape');
            trackAnimate.start();
            thumbAnimate.start();
        },
        "vertical":(item:ScrollItem,offsetLength) => {
            let animateManager = AnimateManager.getInstance();
            let trackAnimate:Animator<any> = null;
            trackAnimate = animateManager.getAnimate(item.track,'mouseover');
            if (!trackAnimate){
                trackAnimate = animateManager.addAnimate(item.track,'mouseover',item.track.animate("shape",false)
                    .when(ScrollItem.duration,{
                        x:item.trackPosition - offsetLength,
                        width:item.trackLength + offsetLength
                    })
                    .done(() => {
                        item.track.attr<RectProps>({
                            shape:{
                                x:item.trackPosition - offsetLength,
                                width:item.trackLength + offsetLength
                            }
                        });
                    }))
            }
            let thumbAnimate:Animator<any> = null;
            thumbAnimate = animateManager.getAnimate(item.thumb,'mouseover');
            if (!thumbAnimate){
                thumbAnimate = animateManager.addAnimate(item.thumb,'mouseover',item.thumb.animate("shape",false)
                    .when(ScrollItem.duration,{
                        x:item.thumbPosition - offsetLength,
                        width:item.thumbLength + offsetLength
                    })
                    .done(() => {
                        item.thumb.attr<RectProps>({
                            shape:{
                                x:item.thumbPosition - offsetLength,
                                width:item.thumbLength + offsetLength
                            }
                        })
                    }))
            }
            item.track.updateDuringAnimation('shape');
            item.thumb.updateDuringAnimation('shape');
            trackAnimate.start();
            thumbAnimate.start();
        }
    }

    static mouseoutHandler = {
        "horizon":(item:ScrollItem,offsetLength) => {
            let animateManager = AnimateManager.getInstance();
            let trackAnimate:Animator<any> = null;
            trackAnimate = animateManager.getAnimate(item.track,'mouseout');
            if (!trackAnimate){
                trackAnimate = animateManager.addAnimate(item.track,'mouseout',item.track.animate("shape",false)
                    .when(ScrollItem.duration,{
                        y:item.trackPosition,
                        height:item.trackLength
                    })
                    .done(() => {
                        item.track.attr<RectProps>({
                            shape:{
                                y:item.trackPosition,
                                height:item.trackLength
                            }
                        });
                    }))
            }
            let thumbAnimate:Animator<any> = null;
            thumbAnimate = animateManager.getAnimate(item.thumb,'mouseout');
            if (!thumbAnimate){
                thumbAnimate = animateManager.addAnimate(item.thumb,'mouseout',item.thumb.animate("shape",false)
                    .when(ScrollItem.duration,{
                        y:item.thumbPosition,
                        height:item.thumbLength
                    })
                    .done(() => {
                        item.thumb.attr<RectProps>({
                            shape:{
                                y:item.thumbPosition,
                                height:item.thumbLength
                            }
                        })
                    }))
            }
            item.track.updateDuringAnimation('shape');
            item.thumb.updateDuringAnimation('shape');
            trackAnimate.start();
            thumbAnimate.start();
        },
        "vertical":(item:ScrollItem,offsetLength) => {
            let animateManager = AnimateManager.getInstance();
            let trackAnimate:Animator<any> = null;
            trackAnimate = animateManager.getAnimate(item.track,'mouseout');
            if (!trackAnimate){
                trackAnimate = animateManager.addAnimate(item.track,'mouseout',item.track.animate("shape",false)
                    .when(ScrollItem.duration,{
                        x:item.trackPosition,
                        width:item.trackLength
                    })
                    .done(() => {
                        item.track.attr<RectProps>({
                            shape:{
                                x:item.trackPosition,
                                width:item.trackLength
                            }
                        });
                    }))
            }
            let thumbAnimate:Animator<any> = null;
            thumbAnimate = animateManager.getAnimate(item.thumb,'mouseout');
            if (!thumbAnimate){
                thumbAnimate = animateManager.addAnimate(item.thumb,'mouseout',item.thumb.animate("shape",false)
                    .when(ScrollItem.duration,{
                        x:item.thumbPosition,
                        width:item.thumbLength
                    })
                    .done(() => {
                        item.thumb.attr<RectProps>({
                            shape:{
                                x:item.thumbPosition,
                                width:item.thumbLength
                            }
                        })
                    }))
            }
            item.track.updateDuringAnimation('shape');
            item.thumb.updateDuringAnimation('shape');
            trackAnimate.start();
            thumbAnimate.start();
        }
    }
    
    constructor(track:Rect,thumb:Thumb,type:ScrollType,scroll:Scroll) {
        super();
        this.scroll = scroll;
        this.track = track;
        this.thumb = thumb;
        this.type = type;
        this.thumb.scroll = this.scroll;
        this.init();
    }

    public setHoverOffset(offset:number):void{
        this.offset = offset;
        this.init();
    }

    public init():void{
        this.type == 'horizon' ? this.trackLength = this.track.shape.height : this.trackLength = this.track.shape.width;
        this.type == 'horizon' ? this.thumbLength = this.thumb.shape.height : this.thumbLength = this.thumb.shape.width;
        this.type == 'horizon' ? this.trackPosition = this.track.shape.y : this.trackPosition = this.track.shape.x;
        this.type == 'horizon' ? this.thumbPosition = this.thumb.shape.y : this.thumbPosition = this.thumb.shape.x;
        this.add(this.track);
        this.add(this.thumb);
        this.initHover();
    }

    private initHover():void {
        let offsetLength = this.offset || 8;
        let that = this;
        this.onmouseover = (e) => {
            if (that.hovered){
                return;
            }
            e.event.preventDefault();
            ScrollItem.mouseoverHandler[this.type](that,offsetLength);
            this.hovered = true;
        }
        this.onmouseout = (e) => {
            if (this.thumb.contain(e.event.zrX,e.event.zrY) || this.track.contain(e.event.zrX,e.event.zrY)){
                return;
            }
            e.event.preventDefault();
            ScrollItem.mouseoutHandler[this.type](that,offsetLength);
            this.hovered = false;
        }
    }
}