import Model from "../Model";
import MarkOption from "./MarkOption";
import MarkItem from "./markItem/MarkItem";
import MarkTypeManager from "./markItem/MarkTypeManager";
import JCGantt from "../../JCGantt";

export default class MarkModel extends Model<MarkOption>{

    items:MarkItem[] = [];

    jcGantt:JCGantt;

    constructor(option:MarkOption) {
        super(option,option);
    }

    public init():void{
        let that = this;
        this.items = [];
        if (this.originOption.marks){
            let item = null;
            this.originOption.marks.forEach((m) => {
                item = MarkTypeManager.getMarkItem(m.type,m.arg);
                if (item){
                    item.jcGantt = that.jcGantt;
                    that.items.push(item);
                }
            })
        }
    }

    refresh(): void {
        this.init();
    }

    setOption(option:MarkOption){
        this.originOption = option;
    }

}