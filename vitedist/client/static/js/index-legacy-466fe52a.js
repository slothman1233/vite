!function(){function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function t(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var r=document.createElement("style");r.innerHTML=".home-layout[data-v-5a715a5a]{height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.home-layout .con-box[data-v-5a715a5a]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow-y:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.home-layout .con-box .app-con[data-v-5a715a5a]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow-y:auto;padding:20px;background:#fff}\n",document.head.appendChild(r),System.register(["./vendor-legacy-69d3dede.js","./index-legacy-c4e2aa34.js"],(function(r){"use strict";var n,o,a,i,l,c,d,s,u,f,b,p,x;return{setters:[function(e){n=e.a0,o=e.a1,a=e.a2,i=e.M,l=e.a3,c=e.a4,d=e.a5,s=e.W,u=e.O,f=e.Q,b=e.c},function(e){p=e._,x=e.u}],execute:function(){var y={name:"layoutHeader",components:{},setup:function(){x();var r=n({isCollapseWidth:!1});return function(r){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach((function(e){t(r,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))}))}return r}({},o(r))}},m=s(" header ");var h={class:"home-layout"},v={class:"con-box"};r("default",p({name:"DefaultLayout",components:{Header:p(y,[["render",function(e,t,r,n,o,s){var u=a("el-header");return i(),l(u,{class:"layout-header",height:"50",style:d({position:"relative",width:"100%","z-index":"2",padding:"0","padding-right":e.isCollapseWidth?"64px":"200px"})},{default:c((function(){return[m]})),_:1},8,["style"])}]])},setup:function(){return{}}},[["render",function(e,t,r,n,o,l){var c=a("Header"),d=a("router-view");return i(),u("div",h,[f("div",v,[b(c),b(d,{class:"app-con"})])])}],["__scopeId","data-v-5a715a5a"]]))}}}))}();
