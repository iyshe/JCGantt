export interface ContextMenuItem{
    icon?:string;
    text?:string;
    cls?:string;
    style?:() => any;
    disabled?:() => boolean;
    handler?:() => void;
}