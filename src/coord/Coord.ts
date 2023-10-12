import TimeScale from "../components/timeScale/TimeScale";
import {DateType,moment} from "../types";

export default class Coord{

    timeScale:TimeScale;

    startDate:Date;

    startPosition:number;

    // 一个精度单位所占的长度
    accuracy:number;

    //精度单位
    accuracyUnit:DateType;

    constructor(timeScale?:TimeScale) {
        this.timeScale = timeScale;
        // this.refresh();
    }

    public refresh():void{
        this.initStartPosition();
        this.initAccuracy();
    }

    public setTimeScale(timeScale:TimeScale):void{
        this.timeScale = timeScale;
    }

    public xToDate(x:number):Date{
        let count = Math.floor(x/this.accuracy);
        return moment(this.timeScale.model.start).add(count,this.accuracyUnit).toDate();
    }

    public dateToX(date:Date):number{
        if (!date){
            return;
        }
        let during = Math.ceil(moment(date).diff(moment(this.startDate),this.accuracyUnit));
        return during * this.accuracy;
    }

    private initStartPosition():void{
        this.startDate = this.timeScale.model.start;
        this.startPosition = this.timeScale.container.x;
    }

    private initAccuracy():void{
        this.accuracyUnit = this.timeScale.model.fullOption.accuracy;
        let dotBit = 10000000000000;
        let realWidth = this.timeScale.getTimeLineWidth();
        let during = moment(this.timeScale.model.end).diff(moment(this.timeScale.model.start), this.accuracyUnit);
        this.accuracy = Math.round((realWidth/during) * dotBit)/dotBit;
    }

    private initEvent():void {
        let that = this;
        this.timeScale.container.onclick = (e => {
            let offset = that.timeScale.container.__content.x;
            let curPos = e.event.zrX - that.startPosition - offset;
            console.log(curPos,that.xToDate(curPos).toLocaleString());
        })
    }
}