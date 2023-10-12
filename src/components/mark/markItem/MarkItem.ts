import {Element} from "zrender";
import JCGantt from "../../../JCGantt";

export default abstract class MarkItem {

    type:string;

    jcGantt?:JCGantt;

    abstract paint():Element;

}