import JCGantt from "./src/JCGantt";

function createGantt(dom,option,theme,forceTheme){
    return new JCGantt(dom,option,theme,forceTheme);
}