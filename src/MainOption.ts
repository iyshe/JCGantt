import {TimeScaleOption} from "./components/timeScale/TimeScaleOption";
import TableOption from "./components/table/TableOption";
import TaskOption from "./components/task/TaskOption";
import MarkOption from "./components/mark/MarkOption";

export default interface MainOption{

    timeLine?:TimeScaleOption;

    // scroll?:ScrollOption;

    table?:TableOption;

    task?:TaskOption;

    mark?:MarkOption;

}