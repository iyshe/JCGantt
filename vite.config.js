import {defineConfig} from "vite";
import {resolve} from "path";
const replace = require('@rollup/plugin-replace');
import externalGlobals from "rollup-plugin-external-globals"; "rollup-plugin-external-globals";

export default defineConfig({
    server:{
        port:8099
    },
    plugins:[
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    build:{
        target:"es2015",
        // minify:"terser",
        /*terserOptions:{
            compress:{
                drop_console:true,
                drop_debugger:true
            },
            keep_classnames:true,
            keep_fnames:true
        },*/
        lib:{
            entry:resolve(__dirname,'src/JCGantt.ts'),
            name:'JCGantt',
            formats:['iife','es','cjs']
        },
        outDir:'jcGantt',
        rollupOptions:{
            external:['zrender','moment'],
            plugins:[
                externalGlobals({
                    moment:"moment",
                    zrender:"zrender"
                })
            ]
        }
    }
})