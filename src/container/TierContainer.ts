import Container from "./Container";
import StackContainer from "./StackContainer";
import {Element} from "zrender";

export default class TierContainer extends Container{

    /**
     * 层数 默认为1
     */
    private tier:number;

    private tierList:Container[] = [];

    private tierNameMap:Map<string | number,number> = new Map();

    constructor(tier?:number) {
        super();
        this.tier = tier || 1;
        this.initTiers();
    }

    /** public **/

    public addTier(container:Container,tierName?:string):void{
        if (container){
            if (this.tierNameMap.has(tierName)){
                throw new Error(`The container named ${tierName} is exited.(名为${tierName}的容器已存在)`);
            }
            this.tier++;
            this.tierNameMap.set(tierName,this.tier);
            this.tierList.push(container);
            this.add(container);
        }
    }

    public addTo(element:Element,tier:number){
        let container = this.getContainer<Container>(tier);
        if (!container){
            throw new Error(`The container of tier ${tier} is not exit.(层级为${tier}的容器不存在)`);
        }
        container.add(element);
    }

    public addToByName(element:Element,tierName:string){
        let container = this.getContainerByName<Container>(tierName);
        if (!container){
            throw new Error(`The container named ${tierName} is not exit.(名为为${tierName}的容器不存在)`);
        }
        container.add(element);
    }

    public addHorizonTo(child:Element,tier:number){
        let container = this.getContainer<Container>(tier);
        if (!container){
            throw new Error(`The container of tier ${tier} is not exit.(层级为${tier}的容器不存在)`);
        }
        container.addHorizon(child);
    }

    public addHorizonToByName(child:Element,tierName:string){
        let container = this.getContainerByName<Container>(tierName);
        if (!container){
            throw new Error(`The container named ${tierName} is not exit.(名为为${tierName}的容器不存在)`);
        }
        container.addHorizon(child);
    }

    public addVerticalTo(child:Element,tier:number){
        let container = this.getContainer<Container>(tier);
        if (!container){
            throw new Error(`The container of tier ${tier} is not exit.(层级为${tier}的容器不存在)`);
        }
        container.addVertical(child);
    }

    public addVerticalToByName(child:Element,tierName:string){
        let container = this.getContainerByName<Container>(tierName);
        if (!container){
            throw new Error(`The container named ${tierName} is not exit.(名为为${tierName}的容器不存在)`);
        }
        container.addVertical(child);
    }

    public getContainer<T>(tier:number):T{
        return <T>this.tierList[tier - 1];
    }

    public getContainerByName<T>(tierName:string):T{
        let tier = this.tierNameMap.get(tierName);
        if (tier){
            return <T>this.tierList[tier - 1];
        }
        return null;
    }

    public refresh(): void {
        this.tierList.forEach(t => {
            t.refresh();
        })
    }

    public setTierName(tier:number,name:string){
        this.tierNameMap.set(name,tier);
        this.tierNameMap.delete(tier);
    }

    public setTierContainer(tier:number,container:Container){
        if (tier <= 0){
            throw new Error("Value of tier required a number greater than zero.(tier需要是一个大于零的数)");
        }
        this.tierList[tier - 1] = container;
        this.reAddChild();
    }

    public setTierContainerByName(tierName:string,container:Container){
        let tier = this.tierNameMap.get(tierName);
        if (tier){
            throw new Error(`The container named ${tierName} is not exit.(名为${tierName}的容器不存在)`);
        }
        this.tierList[tier - 1] = container;
    }

    /** private **/

    private initTiers():void {
        let container = null;
        for (let i = 0; i < this.tier; i++) {
            this.tierList.push((container = new StackContainer()));
            this.tierNameMap.set(i + 1,i + 1);
            this.add(container);
        }
    }

    private reAddChild(){
        this.removeAll();
        let that = this;
        this.tierList.forEach((tier) => {
            that.add(tier);
        })
    }
}