(this["webpackJsonpfootball-stats-api"]=this["webpackJsonpfootball-stats-api"]||[]).push([[0],{186:function(t,e,a){"use strict";a.r(e);var o=a(2),n=a.n(o),r=a(68),s=a.n(r),c=(a(76),a(17)),i=a.n(c),l=a(8),u=a(46),d=a(13),b=a.p+"static/media/logo.6ce24c58.svg",h=(a(78),a(3)),p=a(0),f=a(1),m=a(5),j=a(4),v=a(71),g=a(6),O={showTrendLines:!1,showAllDataPoints:!0,showYears:{2016:!1,2017:!1,2018:!1,2019:!1,2020:!0,2021:!0}},x=function(t){Object(m.a)(a,t);var e=Object(j.a)(a);function a(){var t,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{pointsPerYear:{points2016:[],points2017:[],points2018:[],points2019:[],points2020:[],points2021:[]}};return Object(p.a)(this,a),(t=e.call(this,o)).handleShowTrendLines=function(){t.setState((function(t){var e=Object(h.a)({},t);return e.showTrendLines=!t.showTrendLines,e.showYears=Object(h.a)({},t.showYears),console.warn("handleShowTrendLines"),console.warn(JSON.stringify(e)),e}))},t.handleShowAllDataPoints=function(){t.setState((function(t){var e=Object(h.a)({},t);return e.showAllDataPoints=!t.showAllDataPoints,e.showYears=Object(h.a)({},t.showYears),console.warn("showAllDataPoints"),console.warn(JSON.stringify(e)),e}))},t.handleShowYear=function(e){t.setState((function(t){var a=Object(h.a)({},t);return a.showYears=Object(h.a)({},t.showYears),a.showYears[e]=!t.showYears[e],console.warn("handleShowYear : "+e),console.warn(JSON.stringify(a)),a}))},t.state=O,t}return Object(f.a)(a,[{key:"render",value:function(){var t=this,e="255, 0, 0",a="rgba(".concat(e,", 1)"),o="rgba(".concat(e,", 0.4)"),n="85, 85, 85",r="rgba(".concat(n,", 1)"),s="rgba(".concat(n,", 0.4)"),c="0, 100, 0",i="rgba(".concat(c,", 1)"),l="rgba(".concat(c,", 0.4)"),u="rgba(".concat("220, 220, 220",", 1)"),d="0, 0, 255",b="rgba(".concat(d,", 1)"),p="rgba(".concat(d,", 0.4)"),f="75, 192, 192",m="rgba(".concat(f,", 1)"),j="rgba(".concat(f,", 0.4)"),O="255, 165, 0",x="rgba(".concat(O,", 1)"),w="rgba(".concat(O,", 0.4)"),k={fill:!1,lineTension:.1,borderCapStyle:"butt",borderDash:[3,3],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBorderColor:u,pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10},C={2016:[],2017:[],2018:[],2019:[],2020:[],2021:[]},y=this.props.pointsPerYear;for(var S in C)if(Object.prototype.hasOwnProperty.call(C,S))for(var T=C[S],N=0;N<y[S].length;N++){var D=(0===N?0:T[N-1])+y[S][N];T.push(D)}for(var B=this.state.showAllDataPoints?y[2016].length:Math.max(y[2021].length+10,12),Y=[],P=0;P<B;P++){var F=P%5!==0&&1!==P&&23!==P&&46!==P||45===P?"":P.toString(10);Y.push(F)}var L={labels:Y,datasets:[]};if(this.state.showYears[2016]&&L.datasets&&L.datasets.push(Object(h.a)(Object(h.a)({},k),{},{label:"2016-",backgroundColor:p,borderColor:b,pointBorderColor:b,pointHoverBackgroundColor:b,data:C[2016].slice(0,B)})),this.state.showYears[2017]&&L.datasets&&L.datasets.push(Object(h.a)(Object(h.a)({},k),{},{label:"2017-",backgroundColor:s,borderColor:r,pointBorderColor:r,pointHoverBackgroundColor:r,data:C[2017].slice(0,B)})),this.state.showYears[2018]&&L.datasets&&L.datasets.push(Object(h.a)(Object(h.a)({},k),{},{label:"2018-",backgroundColor:l,borderColor:i,pointBorderColor:i,pointHoverBackgroundColor:i,data:C[2018].slice(0,B)})),this.state.showYears[2019]&&L.datasets&&L.datasets.push(Object(h.a)(Object(h.a)({},k),{},{label:"2019-",backgroundColor:l,borderColor:i,pointBorderColor:i,pointHoverBackgroundColor:i,borderDash:[],data:C[2019].slice(0,B)})),this.state.showYears[2020]&&L.datasets&&L.datasets.push(Object(h.a)(Object(h.a)({},k),{},{label:"2020-",backgroundColor:s,borderColor:r,pointBorderColor:r,pointHoverBackgroundColor:r,borderDash:[],data:C[2020].slice(0,B)})),this.state.showYears[2021]&&L.datasets&&L.datasets.push(Object(h.a)(Object(h.a)({},k),{},{label:"2021-",backgroundColor:o,borderColor:a,pointBorderColor:a,pointHoverBackgroundColor:a,borderDash:[],data:C[2021].slice(0,B),borderWidth:4})),this.state.showTrendLines){for(var A=[],H=0;H<B;H++){var E=1.61*H;A.push(E)}for(var I=[],R=0;R<B;R++){var W=1*R;I.push(W)}L.datasets&&(L.datasets.push(Object(h.a)(Object(h.a)({},k),{},{label:"Playoffs",backgroundColor:j,borderColor:m,pointBorderColor:m,pointHoverBackgroundColor:m,borderDash:[5,15],data:A})),L.datasets.push(Object(h.a)(Object(h.a)({},k),{},{label:"Relegation",backgroundColor:w,borderColor:x,pointBorderColor:x,pointHoverBackgroundColor:x,borderDash:[5,15],data:I})))}return Object(g.jsxs)("div",{style:{position:"relative",height:"80vh"},children:[Object(g.jsxs)("div",{className:"custom-control custom-checkbox",style:{margin:"10px 30px 5px 25px"},children:[Object(g.jsx)("label",{className:"custom-control-label",children:"Show: "})," ",Object(g.jsx)("input",{type:"checkbox",className:"custom-control-input",id:"customCheck1",onChange:function(){return t.handleShowTrendLines()}}),Object(g.jsx)("label",{className:"custom-control-label",htmlFor:"customCheck1",children:"Trend Lines"}),Object(g.jsx)("input",{type:"checkbox",className:"custom-control-input",id:"customCheck2",onChange:function(){return t.handleShowAllDataPoints()},checked:this.state.showAllDataPoints}),Object(g.jsx)("label",{className:"custom-control-label",htmlFor:"customCheck2",children:"All Points"}),Object.keys(C).map((function(e){return!isNaN(+e)&&Object(g.jsxs)("div",{style:{display:"inline"},children:[Object(g.jsx)("input",{type:"checkbox",className:"custom-control-input",id:"show".concat(e,"Checkbox"),onChange:function(){return t.handleShowYear(+e)},style:{marginLeft:"10px"},checked:t.state.showYears[e]}),Object(g.jsxs)("label",{className:"custom-control-label",htmlFor:"show".concat(e,"Checkbox"),children:[e,"-"]})]},+e)}))]}),Object(g.jsx)(v.a,{data:L,options:{maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0},scaleLabel:{display:!0,labelString:"Points Total"}}],xAxes:[{scaleLabel:{display:!0,labelString:"Games Played"}}]}}})]})}}]),a}(o.Component),w={linkText:"bristol-city",fullName:"Bristol City"};var k=function(){var t=function(t){var e=t.homeTeam.name.full===S.fullName?t.homeTeam:t.awayTeam;return"loss"===e.eventOutcome?0:"win"===e.eventOutcome?3:1},e=Object(o.useState)(void 0),a=Object(d.a)(e,2),n=(a[0],a[1],Object(o.useState)(void 0)),r=Object(d.a)(n,2),s=r[0],c=r[1],h=Object(o.useState)([]),p=Object(d.a)(h,2),f=p[0],m=p[1],j=Object(o.useState)([]),v=Object(d.a)(j,2),O=v[0],k=v[1],C=Object(o.useState)(w),y=Object(d.a)(C,2),S=y[0],T=y[1],N=Object(o.useState)(!1),D=Object(d.a)(N,2),B=D[0],Y=D[1];return Object(o.useEffect)((function(){(function(){var t=Object(u.a)(i.a.mark((function t(){var e,a,o,n,r,s,c,u,d,b,h,p,f;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:({}),e=["premier-league","championship","league-one","league-two"],a=[],o=[],n=0;case 5:if(!(n<e.length)){t.next=22;break}return r=e[n],s="https://push.api.bbci.co.uk/batch?t=/data/bbc-morph-sport-tables-data/competition/".concat(r,"/sport/football/version/2.0.2?timeout=5"),t.next=10,fetch(s);case 10:return c=t.sent,t.next=13,c.json();case 13:u=t.sent,d=null===u||void 0===u?void 0:u.payload[0].body.sportTables.tables[0].rows,b=d.map((function(t){return t.cells[2].td.abbrLink})),h=b.map((function(t){return t.link.split("/").slice(-1)[0]})),a.push.apply(a,Object(l.a)(b)),o.push.apply(o,Object(l.a)(h));case 19:n++,t.next=5;break;case 22:p=a.map((function(t){if(void 0!==t)return{linkText:t.link.split("/").slice(-1)[0],fullName:t.text}})),o.sort(),m(o),(f=p.filter((function(t){return void 0!==t}))).sort((function(t,e){return void 0===t||void 0===e?0:t.fullName<e.fullName?-1:t.fullName>e.fullName?1:0})),k(f);case 28:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]),Object(o.useEffect)((function(){(function(){var e=Object(u.a)(i.a.mark((function e(){var a,o,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Y(!0),a={},2016,o=2021,n=i.a.mark((function e(o){var n,r,s,c,l,u,d,b,h;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(o,"-08-01"),r="".concat(o+1,"-07-31"),s=(new Date).toISOString().substr(0,10),c="https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F".concat(r,"%2FstartDate%2F").concat(n,"%2Fteam%2F").concat(S.linkText,"%2FtodayDate%2F").concat(s,"%2Fversion%2F2.4.6?timeout=5"),e.next=6,fetch(c);case 6:return l=e.sent,e.next=9,l.json();case 9:u=e.sent,d=null===u||void 0===u?void 0:u.payload[0].body.matchData[0].tournamentDatesWithEvents,b=[],h=["premier-league","championship","league-one","league-two"],d&&u.payload[0].body.matchData.forEach((function(t){Object.keys(t.tournamentDatesWithEvents).forEach((function(e){return t.tournamentDatesWithEvents[e][0].events.forEach((function(t){-1===h.indexOf(t.tournamentSlug)&&"RESULT"===t.eventProgress.status&&console.warn(t.tournamentSlug),h.indexOf(t.tournamentSlug)>-1&&"RESULT"===t.eventProgress.status&&b.push(t)}))}))})),b.sort((function(t,e){return t.startTime<e.startTime?-1:t.startTime>e.startTime?1:0})),a[o]=b.map((function(e){return t(e)})),a[o].unshift(0);case 17:case"end":return e.stop()}}),e)})),r=2016;case 6:if(!(r<=o)){e.next=11;break}return e.delegateYield(n(r),"t0",8);case 8:r++,e.next=6;break;case 11:c(a),Y(!1);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[S]),Object(g.jsxs)("div",{children:[f&&Object(g.jsx)("select",{name:"teamNameInfoItems",id:"teamNameInfoItems",onChange:function(t){var e,a=t.target.value,o={linkText:a,fullName:(null===(e=O.find((function(t){return(null===t||void 0===t?void 0:t.linkText)==a})))||void 0===e?void 0:e.fullName)||"NA"};T(o)},children:O.map((function(t){return Object(g.jsx)("option",{value:null===t||void 0===t?void 0:t.linkText,selected:(null===t||void 0===t?void 0:t.linkText)==S.linkText,children:null===t||void 0===t?void 0:t.fullName},(null===t||void 0===t?void 0:t.linkText)||1)}))}),s&&!B&&Object(g.jsx)(x,{pointsPerYear:s}),!s||B&&Object(g.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"400px",border:"3px solid white"},children:Object(g.jsx)("img",{src:b,className:"App-logo",alt:"logo"})}),Object(g.jsx)("div",{})]})},C=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,187)).then((function(e){var a=e.getCLS,o=e.getFID,n=e.getFCP,r=e.getLCP,s=e.getTTFB;a(t),o(t),n(t),r(t),s(t)}))};s.a.render(Object(g.jsx)(n.a.StrictMode,{children:Object(g.jsx)(k,{})}),document.getElementById("root")),C()},76:function(t,e,a){},78:function(t,e,a){}},[[186,1,2]]]);
//# sourceMappingURL=main.f074fcb3.chunk.js.map