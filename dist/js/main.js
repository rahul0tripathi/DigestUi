"use strict";function asyncGeneratorStep(t,e,n,a,o,i,c){try{var s=t[i](c),r=s.value}catch(t){return void n(t)}s.done?e(r):Promise.resolve(r).then(a,o)}function _asyncToGenerator(s){return function(){var t=this,c=arguments;return new Promise(function(e,n){var a=s.apply(t,c);function o(t){asyncGeneratorStep(a,e,n,o,i,"next",t)}function i(t){asyncGeneratorStep(a,e,n,o,i,"throw",t)}o(void 0)})}}function getDefaultConfig(){return $("#global_config_editor_id").data("ace").element[0].value}$(document).ready(function(){$(".modal").modal()});var _apis=[],_host=null;$(document).ready(function(){$(".sidenav").sidenav();$("#global_config_editor_id").val(JSON.stringify({headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblBhcmFtcyI6eyJpZCI6IjAwMTA2ZDRlLWFmZjEtNGI3My04MWY2LWNmZTBhZDVhNWNjYSIsInBob25lIjo2Mjk0NDU4NTgzfSwiaWF0IjoxNTc4ODk1MTA3fQ.cS3oldXH1gnNRLlRLEvp1dZbmxCn_HbNWNq5ollus-w","Cache-Control":"no-cache","Digest-token":"<calculated>",Host:"<calculated>","User-Agent":"DigestJsRuntime/7.24.0",Accept:"*/*","Accept-Encoding":"gzip, deflate, br",Connection:"keep-alive"}},null,"\t")),$("#global_config_editor_id").ace({theme:"solarized_dark",lang:"json",height:"300px",width:"auto"});var a={client_info:$(".client-info"),api_list:$(".api-list")};function o(t,e){if("GET"!=t&&"POST"!=t&&"DELETE"!=t&&"PUT"!=t)return"";var n,a,o=shortid(),i={id:o,method:t,route:e};_apis.push(i),a='\n          <div class="card-panel row test-apis" style="font-size:15px;margin:10px">\n          <div class=\'col s12 m2 method\'>'.concat((n=i).method,"</div>\n          <div class='col s12 m6  route' style=\"overflow-x:scroll; \">").concat(n.route,'</div>\n          <div class=\'col s12 m4\'><div class="switch" >\n          <label>\n            Off\n            <input id="testOn_').concat(n.id,'" type="checkbox" class="testOn" >\n            <span class="lever"></span>\n            On\n          </label>\n        </div></div>\n          </div>'),$(".test-api-list").append(a);var c=e.split("/");return c.forEach(function(t,e){":"==t[0]&&(c[e]="<input placeholder='".concat(t,"'  id=\"input_").concat(o,"_").concat(t,'" class="params" type="text" style="display:inline; width:60px; font-family: \'Open Sans\', sans-serif; font-size:15px">'))}),c=c.join("/"),'\n<div class="card-panel api-panel row api holder_'.concat(o,"\">\n<div class='col s12 m3'>").concat(t,"</div>\n<div class='col s12 m6 route'>").concat(c,'</div>\n<div class=\'col s12 m3 trigger_cont\'>\n<span class="material-icons trigger_btn" id="').concat(o,'">\nplay_arrow\n</span><span class="material-icons edit" style="margin-left:10px" id="edit>').concat(o,'">create</span></div>\n\n\n</div>\n\n\n')}var t=axios.create({baseURL:"http://".concat(window.location.hostname,":5432/api")});function e(n){t.get("/eaters").then(function(e){Object.keys(e.data).forEach(function(t){_host="http://".concat(e.data[t].host,":").concat(e.data[t].port),n&&a.client_info.prepend("\n           <p style='display:inline'> <span class='material-icons' style='color:#07c149; vertical-align:middle'>\n            fiber_manual_record \n            </span>\n    <a>".concat(t,"</a></p><p style='display:inline; margin-left:10px'>\n    <span class=\"material-icons\" style=' vertical-align:middle'>\n    dns \n    </span><a>  http://").concat(e.data[t].host,":").concat(e.data[t].port,"</a></p>\n            ")),e.data[t].routes.forEach(function(t){a.api_list.append(o(t.method,t.route))})})}).catch(function(t){return console.log(t)})}e(!0),$("#sync_apis").click(function(){M.toast({html:"Syncing Apis"}),$(".api-list").html(""),$(".test-api-list").html(""),e(!1)})});var createLog=function(t){var e=shortid();$(".logger").prepend('\n  <div class= "row " style="padding:20px;">\n  <div style="color:white;font-size:14px;"><a class="logger_tag">[digest.js]:['.concat((new Date).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(:[\d]{2})(.*)/,"$1$3"),"]:[").concat(t.config.url,']</a>\n<pre id = "').concat(e,"\" style='display:inline'></pre>\n  </div></div>\n    ")),$("#".concat(e)).text(JSON.stringify(t,void 0,2))};function gettestscript(){return $("#test-editor").data("ace").element[0].value}$(document).ready(function(){}),$(document).ready(function(){$("#test-editor").val('import http from "k6/http";\n    import { check, sleep } from "k6";\n    export let options = {\n      vus: 0,\n      duration: "1s"\n    };\n    export default function() {\n      let res =  http.get(#digest.selected<:id=abcd>#);\n      check(res, {\n        "is status 200": r => r.status === 200\n      });\n     sleep(1)\n    };\n         '),$("#test-editor").ace({theme:"solarized_dark",lang:"javascript",height:"100%","font-size":"15px"}),$("#run_test").click(function(){try{var a;for(b=!1,i=0;i<_apis.length&&(console.log(i),$("#testOn_".concat(_apis[i].id)).prop("checked")&&(a=_apis[i],b=!0),1!=b);i++);console.log(a);var t=gettestscript().split("#");for(i=0;i<t.length;i++)if("digest"==t[i].split(".")[0]){if(configs=[],regex=new RegExp("<(.*?)>"),t[i].split("&&").forEach(function(t){if(null!=regex.exec(t)){console.log("hello");var e=regex.exec(t)[1].split("=");configs.push({data:e[0],val:e[1]})}}),0<configs.length){var o=a.route.split("/");o.forEach(function(e,t){var n=configs.find(function(t){return t.data==e});n&&(o[t]=n.val)}),a.route=o.join("/")}t[i]=_host+a.route}var e=t.join('"'),c=shortid();M.toast({html:'<span class="material-icons" style="color:#05dc5c">\n        notification_important\n        </span> Test '.concat(c," has been deployed"),classes:"rounded"}),$(".test_logger").prepend('<div class="row"><div class="metaData" style="color:#05dc5c">['.concat((new Date).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(:[\d]{2})(.*)/,"$1$3"),"]:[").concat(_host+a.route,"] Test ").concat(c," has been deployed</div><br></div>")),axios.post("http://localhost:5432/api/runTest",{script:e,testId:c}).then(function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(n="",i=0;i<e.data.length;i++)"\n"==e.data[i]||"\r"==e.data[i]?n+="<br>&nbsp;":" "==e.data[i]?n+="&nbsp;":n+=e.data[i];M.toast({html:'<span class="material-icons" style="color:#05dc5c">\n        notification_important\n        </span> Test '.concat(c," has Completed"),classes:"rounded"}),$(".test_logger").prepend('<div class="row"><div class="metaData" style="color:#05dc5c">['.concat((new Date).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(:[\d]{2})(.*)/,"$1$3"),"]:[").concat(_host+a.route,"] Test ").concat(c," has completed with the following results</div><br>").concat(n,"</div>"));case 4:case"end":return t.stop()}},t)}));return function(t){return e.apply(this,arguments)}}()).catch(function(t){console.log(t)})}catch(t){M.toast({html:'<span class="material-icons" style="color:#ff0051">\n        error\n        </span>  '.concat(t),classes:"rounded"})}})});var wildcard={headers:{},body:{},documentation:{api:"",explanation:"This is a simple Api"}};function getEditorValue(t){return $("#editorview_".concat(t)).data("ace").element[0].value}function getValue(t){return val=null,$("input[type=text]").each(function(){$(this).attr("id")==t&&(val=$(this).val())}),val}$(document).on("change","input",function(t){id=t.target.id.split("_"),val=getValue(t.target.id),console.log(val),_apis.forEach(function(t){if(t.id==id[1]){var n=t.route.split("/");n.forEach(function(t,e){t==id[2]&&("?"===t.slice(-1)&&(val+="?"),n[e]=val)}),n=n.join("/"),t.route=n}})}),$(document).ready(function(){$(".api-list").on("click",".api>.trigger_cont > .trigger_btn",function(e){try{var t=_apis.find(function(t){return t.id===e.target.id}),n={headers:{custom:!1}};if(body=!1,$("#editorview_".concat(t.id)).length){n=JSON.parse(getEditorValue(t.id)),console.log("no custom Headers");var a=JSON.parse(getDefaultConfig()).headers;Object.keys(a).forEach(function(t){n.headers[t]=a[t]}),"POST"==t.method&&(body=!0)}else{a=JSON.parse(getDefaultConfig()).headers;Object.keys(a).forEach(function(t){n.headers[t]=a[t]})}console.log(n),axios.post("http://localhost:5432/api/fire",{target:_host,data:t,headers:null==n?null:n.headers,body:body?n.body:null}).then(function(t){createLog(t.data)})}catch(e){M.toast({html:'<span class="material-icons" style="color:#ff0051">\n        error\n        </span>  '.concat(e),classes:"rounded"})}}),$(".api-list").on("click",".api>.trigger_cont > .edit",function(t){var e=t.target.id.split(">")[1];$("#editorview_".concat(e)).length?($(".holder_".concat(e," > .row > .ace_editor")).toggle(),$("#editorview_".concat(e)).css("display","none")):(console.log(e),$(".holder_".concat(e)).append('<div class ="row " style="margin-top:40px"><textarea id = \'editorview_'.concat(e,'\' class="editor"  rows="4" style="width: 100%; height:300px; overflow-x:scroll">').concat(JSON.stringify(wildcard,null,"\t"),"</textarea></div>")),$("#editorview_".concat(e)).ace({theme:"solarized_dark",lang:"json"}))})}),$(document).ready(function(){$(".nav_tab").click(function(t){var e=$(event.target).attr("show");$(event.target).attr("show")?($(".tab").fadeOut(300),$(".selector_nav").fadeOut(300),$("#".concat(e,"_select")).fadeIn(300),$(".".concat(e)).fadeIn(300),M.toast({html:'<span class="material-icons" style="color:#05dc5c">\n       notification_important\n       </span>Switched to '.concat(e),classes:"rounded"})):M.toast({html:'<span class="material-icons" style="color:#05dc5c">\n        notification_important\n        </span> Coming Soon !',classes:"rounded"})})});