(function(e){function t(t){for(var a,c,i=t[0],o=t[1],s=t[2],d=0,f=[];d<i.length;d++)c=i[d],l[c]&&f.push(l[c][0]),l[c]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);u&&u(t);while(f.length)f.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,i=1;i<n.length;i++){var o=n[i];0!==l[o]&&(a=!1)}a&&(r.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},l={app:0},r=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var u=o;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),l=n.n(a);l.a},"1d69":function(e,t,n){},3429:function(e,t,n){},3652:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h1",{staticClass:"title"},[e._v("TRISTZEE")]),n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Game")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/Score"}},[e._v("Score")])],1),n("router-view")],1)},r=[],c=(n("034f"),n("2877")),i={},o=Object(c["a"])(i,l,r,!1,null,null,null),s=o.exports,u=n("8c4f"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game"},[n("GameTable")],1)},f=[],v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game-table"},[n("Dice"),n("button",{staticClass:"btn",on:{click:e.rollDice}},[e._v("Roll Dice")]),n("button",{staticClass:"btn",on:{click:e.resetRoll}},[e._v("Reset")])],1)},p=[],b=n("cebc"),m=n("2f62"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dice"},e._l(e.dice,function(e){return n("div",{key:e.id},[n("Die",{attrs:{value:e.value}})],1)}),0)},_=[],j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"die"},[n("div",{staticClass:"dot a",class:[{hidden:e.value<=3}]}),n("div",{staticClass:"b"}),n("div",{staticClass:"dot c",class:[{hidden:1===e.value}]}),n("div",{staticClass:"dot d",class:[{hidden:6!==e.value}]}),n("div",{staticClass:"dot e",class:[{hidden:e.value%2===0}]}),n("div",{staticClass:"dot f",class:[{hidden:6!==e.value}]}),n("div",{staticClass:"dot g",class:[{hidden:1===e.value}]}),n("div",{staticClass:"h"}),n("div",{staticClass:"dot i",class:[{hidden:e.value<=3}]})])},y=[],O=(n("c5f6"),{props:{value:Number}}),g=O,C=(n("7a04"),Object(c["a"])(g,j,y,!1,null,"2a5cc1b5",null)),w=C.exports,x={components:{Die:w},computed:Object(b["a"])({},Object(m["c"])(["dice"]))},S=x,T=(n("6e08"),Object(c["a"])(S,h,_,!1,null,"46b38172",null)),k=T.exports,E={name:"GameTable",components:{Dice:k},computed:Object(b["a"])({},Object(m["c"])(["gameRunning","players","rollNumber"])),methods:Object(b["a"])({},Object(m["b"])(["rollDice","resetRoll"]))},D=E,R=(n("9199"),Object(c["a"])(D,v,p,!1,null,"7e700b6c",null)),$=R.exports,G={name:"Game",components:{GameTable:$}},M=G,N=Object(c["a"])(M,d,f,!1,null,null,null),P=N.exports,J=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},I=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v("Score!")])])}],Z={},q=Object(c["a"])(Z,J,I,!1,null,null,null),z=q.exports;a["a"].use(u["a"]);var A=new u["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Game",component:P},{path:"/Score",name:"score",component:z}]});a["a"].use(m["a"]);var B=new m["a"].Store({state:{gameRunning:!1,players:[{id:1,name:"Tristin",score:{1:null,2:null,3:null,4:null,5:null,6:null}}],dice:[{id:1,value:1,held:!1},{id:2,value:2,held:!1},{id:3,value:3,held:!1},{id:4,value:4,held:!1},{id:5,value:5,held:!1}],rollNumber:1},mutations:{rollDice:function(e){e.rollNumber<=3?e.dice.map(function(e){return e.held?null:e.value=Math.floor(6*Math.random()+1)}):alert("Too many turns, you jerk"),e.rollNumber++},resetRoll:function(e){e.rollNumber=1}},actions:{}});a["a"].config.productionTip=!1,new a["a"]({router:A,store:B,render:function(e){return e(s)}}).$mount("#app")},"64a9":function(e,t,n){},"6e08":function(e,t,n){"use strict";var a=n("3429"),l=n.n(a);l.a},"7a04":function(e,t,n){"use strict";var a=n("1d69"),l=n.n(a);l.a},9199:function(e,t,n){"use strict";var a=n("3652"),l=n.n(a);l.a}});
//# sourceMappingURL=app.689fb2e0.js.map