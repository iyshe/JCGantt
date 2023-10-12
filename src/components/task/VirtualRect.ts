import { Rect} from "zrender";

export default class VirtualRect extends Rect{

    source:Rect;

    constructor(source:Rect) {
        super();
        this.source = source;
        this.init();
    }

    private init():void{
        if (!this.source){
            return;
        }
        let boundingRect = this.source.getBoundingRect();
        this.shape = {
            x: 0, y: 0,
            width:boundingRect.width,
            height:boundingRect.height
        };
        this.zlevel = 999;
        this.style = this.source.style
    }

}