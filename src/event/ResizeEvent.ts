import {JCEvent} from "./types";

export default class ResizeEvent implements JCEvent{

    static type = "resize";

    type = ResizeEvent.type;

    source: any;

    constructor(source?:any) {
        this.source = source;
    }

}