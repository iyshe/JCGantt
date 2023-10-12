import {moment} from "./src/types";
import JCGantt from "./src/JCGantt";
// import data from "./data.json"

let rows = [];

var jcGantt = new JCGantt("main",{
    timeLine:{
        days:100,
        baseWidth:40,
        scales:[
            {
                symbol:"year",
                formatter:"YY年"
            },
            {
                symbol:"week",
                formatter:"W周",
            },
            {
                symbol:"month",
                formatter:"M月"
            },
            {
                symbol:"day",
                formatter:"D日",
                /*style:metaDate => {
                    let start = moment(metaDate.start);
                    if (start.day() == 6 || start.day() == 0){
                        return {
                            backgroundColor:"#acacac"
                        }
                    }
                }*/
            }
        ],
        grid:{
            style:{
                lineWidth:0.5
            },
        },
        contextmenu:[
            {
                icon:"/delete.png",
                text:"修改任务"
            },
            {
                icon:"/delete.png",
                text:"删除任务",
                disabled:() => {
                    return jcGantt.taskApi.getSelections().length == 0;
                },
                handler:() => {
                    let selections = jcGantt.taskApi.getSelections();
                    if (selections.length){
                        selections.forEach(s => {
                            let tasks = s.row.data.tasks;
                            tasks.splice(tasks.indexOf(s.task),1);
                        })
                    }
                    jcGantt.taskApi.refresh();
                }
            }
        ]
    },
    table:{
        column:[
            {
                name:"教师姓名",
                prop:"name",
                width:100,
            },
            {
                name:"学科",
                prop:"class",
                width:50
            },
            {
                name:"教龄",
                prop:"experience",
                width:100
            },
            {
                name:"联系电话",
                prop:"phone",
                width:150
            }
        ],
        row:{
            height:40,
            commonStyle:{
                textStyle:{
                    borderWidth:0.5
                }
            },
            hoverStyle:{
                rowStyle:{
                    fill:"#1ba78460"
                },
                textStyle:{
                    fill:"#fff"
                }
            },
            selectStyle:(row) => {
                return {
                    rowStyle:{
                        fill:"#5cb3cc"
                    }
                }
            },
            quickTip:(row) => {
                return row.name;
            }
        },
        headStyle:{
            rowStyle:{
                stroke:"none",
                fill:"none"
            },
            textStyle:{
                backgroundColor:"#f5960080",
                borderWidth:0.5,
                borderColor:"#acacac",
                fontWeight:"bold"
            }
        },
        loadData:async function (start, end, resolve){
            if (!rows.length){
                await fetch("./data.json").then((res) => res.json()).then((data) => {rows = (data || [])})
            }
            resolve(rows);
        },
        contextmenu:[
            {
                text:"添加任务"
            },
            {
                icon:"/delete.png",
                text:"删除行",
                disabled:() => {
                    let selections = jcGantt.tableApi.getSelections();
                    return (!selections || selections.length == 0);
                },
                handler:() =>{
                    let selections = jcGantt.tableApi.getSelections();
                    let str = '';
                    for (let i = 0,len = selections.length; i < len; i++) {
                        str += `[${selections[i].data.name}]`
                    }
                    alert(str);
                }
            },
            {
                icon:"/delete.png",
                text:"删除行"
            },
            {
                icon:"/delete.png",
                text:"删除行"
            },
        ]
    },
    task:{
        taskStyle:(task,row) => {
                let day = moment(task.start).day();
                if (day == 6 || day == 0){
                    return {
                        fill:"#acacac80",
                        stroke:"#acacac",
                        shadowBlur:5,
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                        shadowColor: "#acacac"
                    }
                }
                return {
                    fill:"#5cb3cc80",
                    stroke:"#5cb3cc",
                    shadowBlur:5,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowColor: "#5cb3cc"
                }
            },
        allowDrag:((task, sourceRow,targetTask, targetRow, date) => {
            /*if (moment(date).day() == 6 || moment(date).day() == 0){
                return {
                    allow:false,
                    messageX:"当前为周末"
                };
            }*/
            if (targetTask && targetTask != task){
                return {
                    allow: false,
                    messageX: `与学生${targetTask.text}的时间重复`
                }
            }
            if (moment(date).isBefore(moment())){
                return {
                    allow:false,
                    messageX:"请拖动至正确的时间下"
                };
            }
            if (!targetRow){
                return {
                    allow:false,
                    messageY:"请拖动至一行上"
                }
            }
            return {
                allow: true
            };
        }),
        onDrag:((task, sourceRow,targetTask, targetRow, date,resolve) => {
            setTimeout(function (){
                let during = moment(task.end).diff(task.start,"second");
                // task.start = moment(date).startOf('day'),task.end = moment(task.start).add(during,"second").toDate();
                task.start = date,task.end = moment(task.start).add(during,"second").toDate();
                targetRow.tasks.push(task);
                sourceRow.tasks.splice(sourceRow.tasks.indexOf(task),1);
                resolve();
            },50);
        }),
        tooltip:(((task, row) => {
            return `<ul style="margin-left: 15px;">
                        <li style="padding: 5px;color: #f59600"><strong style="margin-right: 5px">学生名称:</strong>${task.text}</li>
                        <li style="padding: 5px"><strong style="margin-right: 5px">教师名称:</strong>${row.name}</li>
                        <li style="padding: 5px"><strong style="margin-right: 5px">学科科目:</strong>${row.class}</li>
                        <li style="padding: 5px"><strong style="margin-right: 5px">开始时间:</strong>${task.start.toLocaleString()}</li>
                        <li style="padding: 5px"><strong style="margin-right: 5px">结束时间:</strong>${task.end.toLocaleString()}</li>
                    <ul>`
        }))
    },
    mark:{
        marks:[
            {
                type:"DateMark",
                arg:{
                    date:'2023/10/30 12:00:00',
                    text:"10月30日12时",
                    length:300,
                    lineStyle:{
                        stroke: "#0f0"
                    },
                    textStyle:{
                        backgroundColor:"#0f0",
                        borderRadius:5
                    }
                }
            },
            {
                type:"DateMark",
                arg:{
                    date:'2023/10/31 12:00:00',
                    text:"10月31日12时",
                    length:200,
                    lineStyle:{
                        stroke: "#0ff"
                    },
                    textStyle:{
                        backgroundColor:"#0ff",
                        borderRadius:5
                    }
                }
            },
            {
                type:"DateMark",
                arg:{
                    date:new Date(),
                    text:"now",
                    length:300,
                    lineStyle:{
                        stroke: "#ff0"
                    },
                    textStyle:{
                        backgroundColor:"#ff0",
                        borderRadius:5
                    }
                }
            }
        ]
    }
});

var jcGantt2 = new JCGantt("main2",{
    timeLine:{
        days:100,
        baseWidth:40,
        scales:[
            {
                symbol:"year",
                formatter:"YY年"
            },
            {
                symbol:"week",
                formatter:"W周",
            },
            {
                symbol:"month",
                formatter:"M月"
            },
            {
                symbol:"day",
                formatter:"D日",
                /*style:metaDate => {
                    let start = moment(metaDate.start);
                    if (start.day() == 6 || start.day() == 0){
                        return {
                            backgroundColor:"#acacac"
                        }
                    }
                }*/
            }
        ],
        grid:{
            style:{
                lineWidth:0.5
            },
        },
        contextmenu:[
            {
                icon:"/delete.png",
                text:"修改任务"
            },
            {
                icon:"/delete.png",
                text:"删除任务",
                disabled:() => {
                    return jcGantt.taskApi.getSelections().length == 0;
                },
                handler:() => {
                    let selections = jcGantt.taskApi.getSelections();
                    if (selections.length){
                        selections.forEach(s => {
                            let tasks = s.row.data.tasks;
                            tasks.splice(tasks.indexOf(s.task),1);
                        })
                    }
                    jcGantt.taskApi.refresh();
                }
            }
        ]
    },
    table:{
        column:[
            {
                name:"教师姓名",
                prop:"name",
                width:100,
            },
            {
                name:"学科",
                prop:"class",
                width:50
            },
            {
                name:"教龄",
                prop:"experience",
                width:100
            },
            {
                name:"联系电话",
                prop:"phone",
                width:150
            }
        ],
        row:{
            height:40,
            commonStyle:{
                textStyle:{
                    borderWidth:0.5
                }
            },
            hoverStyle:{
                rowStyle:{
                    fill:"#1ba78460"
                },
                textStyle:{
                    fill:"#fff"
                }
            },
            selectStyle:(row) => {
                return {
                    rowStyle:{
                        fill:"#5cb3cc"
                    }
                }
            },
            quickTip:(row) => {
                return row.name;
            }
        },
        headStyle:{
            rowStyle:{
                stroke:"none",
                fill:"none"
            },
            textStyle:{
                backgroundColor:"#f5960080",
                borderWidth:0.5,
                borderColor:"#acacac",
                fontWeight:"bold"
            }
        },
        loadData:async function (start, end, resolve){
            if (!rows.length){
                await fetch("./data.json").then((res) => res.json()).then((data) => {rows = (data || [])})
            }
            resolve(rows);
        },
        contextmenu:[
            {
                text:"添加任务"
            },
            {
                icon:"/delete.png",
                text:"删除行",
                disabled:() => {
                    let selections = jcGantt.tableApi.getSelections();
                    return (!selections || selections.length == 0);
                },
                handler:() =>{
                    let selections = jcGantt.tableApi.getSelections();
                    let str = '';
                    for (let i = 0,len = selections.length; i < len; i++) {
                        str += `[${selections[i].data.name}]`
                    }
                    alert(str);
                }
            },
            {
                icon:"/delete.png",
                text:"删除行"
            },
            {
                icon:"/delete.png",
                text:"删除行"
            },
        ]
    },
    task:{
        taskStyle:(task,row) => {
            let day = moment(task.start).day();
            if (day == 6 || day == 0){
                return {
                    fill:"#acacac80",
                    stroke:"#acacac",
                    shadowBlur:5,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowColor: "#acacac"
                }
            }
            return {
                fill:"#5cb3cc80",
                stroke:"#5cb3cc",
                shadowBlur:5,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: "#5cb3cc"
            }
        },
        allowDrag:((task, sourceRow,targetTask, targetRow, date) => {
            /*if (moment(date).day() == 6 || moment(date).day() == 0){
                return {
                    allow:false,
                    messageX:"当前为周末"
                };
            }*/
            if (targetTask && targetTask != task){
                return {
                    allow: false,
                    messageX: `与学生${targetTask.text}的时间重复`
                }
            }
            if (moment(date).isBefore(moment())){
                return {
                    allow:false,
                    messageX:"请拖动至正确的时间下"
                };
            }
            if (!targetRow){
                return {
                    allow:false,
                    messageY:"请拖动至一行上"
                }
            }
            return {
                allow: true
            };
        }),
        onDrag:((task, sourceRow,targetTask, targetRow, date,resolve) => {
            setTimeout(function (){
                let during = moment(task.end).diff(task.start,"second");
                // task.start = moment(date).startOf('day'),task.end = moment(task.start).add(during,"second").toDate();
                task.start = date,task.end = moment(task.start).add(during,"second").toDate();
                targetRow.tasks.push(task);
                sourceRow.tasks.splice(sourceRow.tasks.indexOf(task),1);
                resolve();
            },50);
        }),
        tooltip:(((task, row) => {
            return `<ul style="margin-left: 15px;">
                        <li style="padding: 5px;color: #f59600"><strong style="margin-right: 5px">学生名称:</strong>${task.text}</li>
                        <li style="padding: 5px"><strong style="margin-right: 5px">教师名称:</strong>${row.name}</li>
                        <li style="padding: 5px"><strong style="margin-right: 5px">学科科目:</strong>${row.class}</li>
                        <li style="padding: 5px"><strong style="margin-right: 5px">开始时间:</strong>${task.start.toLocaleString()}</li>
                        <li style="padding: 5px"><strong style="margin-right: 5px">结束时间:</strong>${task.end.toLocaleString()}</li>
                    <ul>`
        }))
    },
    mark:{
        marks:[
            {
                type:"DateMark",
                arg:{
                    date:'2023/10/30 12:00:00',
                    text:"10月30日12时",
                    length:200,
                    lineStyle:{
                        stroke: "#0f0"
                    },
                    textStyle:{
                        backgroundColor:"#0f0",
                        borderRadius:5
                    }
                }
            },
            {
                type:"DateMark",
                arg:{
                    date:'2023/10/31 12:00:00',
                    text:"10月31日12时",
                    length:300,
                    lineStyle:{
                        stroke: "#0ff"
                    },
                    textStyle:{
                        backgroundColor:"#0ff",
                        borderRadius:5
                    }
                }
            },
            {
                type:"DateMark",
                arg:{
                    date:new Date(),
                    text:"now",
                    length:200,
                    lineStyle:{
                        stroke: "#ff0"
                    },
                    textStyle:{
                        backgroundColor:"#ff0",
                        borderRadius:5
                    }
                }
            }
        ]
    }
});

let res = {};

res.toJson = function(){
    jcGantt.tableApi.exportRowsToJSON();
}

res.zoom = function (multiple){
    jcGantt.timeScaleApi.zoom(multiple);
}

res.updateDate = function (){
    jcGantt.timeScaleApi.setDateRange(document.getElementById("start").value,document.getElementById("end").value)
}

res.updateTimeUnit = function (){
    jcGantt.timeScaleApi.setTimeUnit(document.getElementById("timeBase").value || 1,
        document.getElementById("timeUnit").value || 'day')
}

res.setTheme = function (){
    let value = document.getElementById("theme").value;
    jcGantt.setTheme(value,true);
}

res.getTasks = function (){
    console.log(jcGantt.taskApi.getSelections());
}

res.filterRow = function (){
    jcGantt.tableApi.filter(`object.name=="${event.target.value}"`);
}

export {res}