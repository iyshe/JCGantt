import Option from "../Option";
import {MarkItemOption} from "./types";

export default interface MarkOption extends Option{

    marks?:MarkItemOption[]

}