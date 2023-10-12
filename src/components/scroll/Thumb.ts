import {Rect} from "zrender";
import {RectProps} from "zrender/src/graphic/shape/Rect";
import {ScrollType} from "./types";
import FixedContainer from "../../container/FixedContainer";
import {Scroll} from "./Scroll";

export default class Thumb extends Rect{

    type:ScrollType;

    isMouseDown:boolean;

    scroll:Scroll;

    constructor(opts?: RectProps,type?:ScrollType) {
        super(opts);
        this.type = type;
        this.draggable = false;
        this.initEvent();
    }

    public initEvent():void{
        let that = this;
        let rateWidth,rateHeight;
        that.onmousedown = (e => {
            e.event.preventDefault();
            let parent = <FixedContainer>(that.parent.parent);
            rateWidth = parent.realWidth/parent.__width;
            rateHeight = parent.realHeight/parent.__height;
            that.isMouseDown = true;
            document.onmousemove = (e => {
                e.preventDefault();
                if (that.isMouseDown){
                    that.dirty();
                    let offset = 0;
                    if (that.type === "horizon"){
                        let target = that.scroll.horizonTarget || parent.childAt(0);
                        if (that.x + e.movementX + that.getBoundingRect().width > parent.__width || that.x + e.movementX < 0){
                            return;
                        }
                        offset = e.movementX;
                        that.setPosition([that.x + e.movementX,that.y]);
                        target.setPosition([target.x - e.movementX * rateWidth,target.y]);
                    }
                    if (that.type === "vertical"){
                        let target = that.scroll.verticalTarget || parent.childAt(0);
                        if (that.y + e.movementY + that.getBoundingRect().height > parent.__height || that.y + e.movementY < 0){
                            return;
                        }
                        offset = e.movementY;
                        that.setPosition([that.x,that.y + e.movementY]);
                        target.setPosition([target.x,target.y - e.movementY * rateHeight]);
                    }
                    let items = that.scroll.items;
                    if (items){
                        items.forEach((sc) => {
                            if (that.type == sc.type){
                                sc.scroll.moveTo(sc.type,offset,true);
                            }
                        })
                    }
                }
            });
            document.onmouseup = (e => {
                e.preventDefault();
                that.isMouseDown = false;
                document.onmousemove = null;
                document.onmouseup = null;
            })
        });
    }

    public scrollTo(offset:number,noSlave?:boolean):number{
        let that = this;
        let rateWidth,rateHeight;
        let parent = <FixedContainer>(that.parent.parent);
        if (!parent){
            return;
        }
        rateWidth = parent.realWidth/parent.__width;
        rateHeight = parent.realHeight/parent.__height;

        let offsetPos = 0;
        that.dirty();
        if (that.type === "horizon"){
            let target = that.scroll.horizonTarget || parent.childAt(0);
            if (that.x + offset + that.getBoundingRect().width > parent.__width || that.x + offset < 0){
                return;
            }
            offsetPos = offset * rateWidth;
            that.setPosition([that.x + offset,that.y]);
            target.setPosition([target.x - offsetPos,target.y]);
        }
        if (that.type === "vertical"){
            let target = that.scroll.verticalTarget || parent.childAt(0);
            if (that.y + offset + that.getBoundingRect().height > parent.__height || that.y + offset < 0){
                return;
            }
            offsetPos = offset * rateHeight;
            that.setPosition([that.x,that.y + offset]);
            target.setPosition([target.x,target.y - offsetPos]);
        }
        if (!noSlave){
            let items = that.scroll.items;
            if (items){
                items.forEach((sc) => {
                    if (that.type == sc.type){
                        sc.scroll.moveTo(sc.type,offset,true);
                    }
                })
            }
        }
        return offsetPos;
    }

}