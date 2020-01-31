(function(){if($("html").hasClass("bilibili-helper"))return false;var adModeOn=false;var biliHelper=new Object;var ff_status={},ff_status_id=0,ff_embed_stack=null,ff_embed_stack_style=null;function formatInt(e,l){var t="";for(i=1;i<=l-(e+"").length;i++){t+="0"}return t+e}function parseSafe(e){return e.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function parseTime(e){return formatInt(parseInt(e/6e4),2)+":"+formatInt(parseInt(e/1e3%60),2)}function inject_css(e,i){var l=document.createElement("style");l.setAttribute("id",e);l.setAttribute("type","text/css");l.appendChild(document.createTextNode(i));if(document.head){document.head.appendChild(l)}else{document.documentElement.appendChild(l)}}function disable(){var e=document.getElementById("bilibili_helper");if(e)e.parentNode.removeChild(e)}function enable(e){disable();if(e){inject_css("bilibili_helper",e);if(window.location.hostname=="space.bilibili.com"){$('link[type="text/css"]').each(function(e,i){if($(i).attr("href").indexOf("space.css")!=-1)disable()})}}}function notifyCidHack(e){var i=parseInt(/Chrome\/([\d\.apre]+)/.exec(window.navigator.userAgent)[1]);if(biliHelper.cidHack){chrome.extension.sendMessage({command:"cidHack",cid:biliHelper.cid,type:biliHelper.cidHack},function(l){if(i<37&&!biliHelper.outdateNotice){biliHelper.outdateNotice=true;biliHelper.favorHTML5=true;if(confirm("您的 Chrome 版本过旧，可能无法完成播放器替换。\n扩展支持的最低版本: Chrome 37\n您正在使用的版本: Chrome "+/Chrome\/([\d\.apre]+)/.exec(window.navigator.userAgent)[1]+"\n您想要下载新版吗？")){window.open("http://dlsw.baidu.com/sw-search-sp/soft/9d/14744/ChromeStandaloneSetup.1413788677.exe")}}if(typeof e==="function")e()})}else{if(typeof e==="function")e()}}function adMode(e){var i=document.getElementById("bilibili_helper_ad_mode");if(i)i.parentNode.removeChild(i);if(adModeOn==true){adModeOn=false}else{adModeOn=true;inject_css("bilibili_helper_ad_mode",e)}return adModeOn}function addTitleLink(e,i){if(i=="off")return e;return e.replace(/(\d+)/g,function(e,l,t,r){for(var a=t;a>=0;a--){if(r[a]=="】")break;else if(r[a]=="【")return e}var o=r.substring(0,t)+(parseInt(e)-1).toString()+r.substring(t+e.length,r.length),n=r.substring(0,t)+(parseInt(e)+1).toString()+r.substring(t+e.length,r.length);o=o.replace(/(#)/g," ");n=n.replace(/(#)/g," ");if(i=="without"){o=o.replace(/(\【.*?\】)/g,"");n=n.replace(/(\【.*?\】)/g,"")}return'<span class="titleNumber" previous = "'+o+'" next = "'+n+'">'+e+"</span>"})}function intilize_style(){chrome.extension.sendMessage({command:"getCSS",url:document.URL},function(e){if(e.result=="ok")enable(e.css)})}function miniPlayer(){var e=$("#bofqi"),i=e.offset().top+e.height()+100,l=0,t=!1;$('<input type="checkbox" id="checkbox_miniplayer" /><label class="no-select" for="checkbox_miniplayer">开启迷你播放器</label>').appendTo(".common .b-head");var r=$("#checkbox_miniplayer");1!=ChatGetSettings("b_miniplayer")&&null!=ChatGetSettings("b_miniplayer")||r.attr("checked",!0);r.change(function(){var l=$(this).is(":checked")?1:0;ChatSaveSettings("b_miniplayer",l);0==l?(t=!0,o()):(i==e.offset().top+e.height()+100||e.hasClass("float")||(i=e.offset().top+e.height()+100),$(window).scrollTop()>i&&(t=!1,a()))});var a=function(){if(!e.hasClass("float")&&!t&&0!=$(".comm").find("ul").length){var i=$('<div class="dami"></div>').insertBefore(e);e.hasClass("wide")&&i.addClass("wide");$('<div class="move"><div class="gotop">回到顶部</div><div class="t">点击按住拖动</div><div class="close">关闭</div></div>').prependTo(e);0<$(".huodong_bg").length&&$(".huodong_bg").hide();i=0<$(".rat").length?$(".rat").offset().left:$(".v_small").offset().left;e.addClass("float").css({left:i,opacity:0}).stop().animate({opacity:1},300);730>=$(window).height()&&e.css({top:"inherit",bottom:"5px"})}},o=function(){n();$(".move",e).remove();$(".dami").remove();e.removeClass("float");e.css({left:"",top:"",bottom:""});0<$(".huodong_bg").length&&$(".huodong_bg").show()},n=function(){l=0;$(".mmask").remove();$(document).unbind("mousemove");$("body,#bofqi").removeClass("noselect");$(".move",e).removeClass("on")};$(document).scroll(function(){0!=ChatGetSettings("b_miniplayer")&&(i==e.offset().top+e.height()+100||e.hasClass("float")||(i=e.offset().top+e.height()+100),$(window).scrollTop()>i?a():(t&&(t=!1),e.hasClass("float")&&o()))});e.hover(function(){e.hasClass("float")&&!l&&$(".move",e).show()},function(){l||$(".move",e).hide()});$(e).delegate(".move","mousedown",function(i){l=1;$("body,#bofqi").addClass("noselect");$(this).addClass("on");$('<div class="mmask"></div>').appendTo("body");var t=i.pageX-$(this).offset().left,r=i.pageY-$(this).offset().top;$(document).bind("mousemove",function(i){var l=i.clientX-t,a=i.clientY-r<=$(window).height()-e.height()?i.clientY-r:$(window).height()-e.height(),a=i.clientY-r>=$(window).height()-e.height()-5?$(window).height()-e.height()-5:0>=i.clientY-r?0:i.clientY-r;e.css({left:l,top:a})})});$(e).delegate(".move","mouseup",function(e){n()});$(e).delegate(".move .close","click",function(e){t=!0;o()});$(e).delegate(".move .gotop","click",function(e){$("html,body").animate({scrollTop:$(".viewbox").offset().top},300)})}chrome.extension.onMessage.addListener(function(e,i,l){switch(e.command){case"update":intilize_style();l({result:"ok"});return true;case"checkAdMode":l({result:"ok",mode:adModeOn});return true;case"adMode":l({result:"ok",mode:adMode(e.css)});return true;case"copyright":biliHelper.copyright=true;return true;case"error":if(biliHelper.cidHack==0){biliHelper.cidHack=1;biliHelper.switcher[biliHelper.switcher.current]()}else if(biliHelper.cidHack==1&&biliHelper.copyright){biliHelper.cidHack=2;biliHelper.switcher[biliHelper.switcher.current]()}else if(biliHelper.switcher.current!="original"){biliHelper.switcher["original"]()}return true;default:l({result:"unknown"});return false}});var finishUp=function(e){chrome.extension.sendMessage({command:"getDownloadLink",cid:biliHelper.cid,cidHack:e||biliHelper.cidHack},function(i){var l=i["download"],t=i["playback"];biliHelper.downloadUrls=[];biliHelper.playbackUrls=[];if(l.result=="error"){if(typeof l.message=="string"){if(l.message.indexOf("地区")>-1){biliHelper.copyright=true;if(e||biliHelper.cidHack!=2){finishUp(2)}}biliHelper.error="错误: "+l.message}}else{if(typeof l.durl["url"]==="undefined"){biliHelper.downloadUrls=l.durl}else{biliHelper.downloadUrls.push(l.durl)}if(typeof t.durl["url"]==="undefined"){biliHelper.playbackUrls=t.durl}else{biliHelper.playbackUrls.push(t.durl)}$("#loading-notice").fadeOut(300);if(biliHelper.favorHTML5&&biliHelper.cid&&biliHelper.playbackUrls&&biliHelper.playbackUrls.length==1&&biliHelper.playbackUrls[0].url.indexOf("m3u8")<0){$("#loading-notice").fadeOut(300,function(){biliHelper.switcher.html5()})}else if(biliHelper.replacePlayer){$("#loading-notice").fadeOut(300,function(){biliHelper.switcher.swf()})}else{$("#loading-notice").fadeOut(300)}}})};var biliHelperFunc=function(){intilize_style();$("html").addClass("bilibili-helper");var bili_reg=/\/video\/av([0-9]+)\/(?:index_([0-9]+)\.html)?$/,urlResult=bili_reg.exec(document.URL.split("#")[0]);if(urlResult){biliHelper.avid=urlResult[1];biliHelper.page=urlResult[2];biliHelper.cidHack=0;if(typeof biliHelper.page==="undefined"){biliHelper.page=1}else{biliHelper.page=parseInt(biliHelper.page)}biliHelper.pageOffset=0;chrome.extension.sendMessage({command:"init"},function(e){biliHelper.genPage=false;biliHelper.copyright=false;if(!$(".z").length){biliHelper.genPage=true;biliHelper.redirectUrl=decodeURIComponent(__GetCookie("redirectUrl"))}if($(".z .z-msg").length>0&&$(".z .z-msg").text().indexOf("版权")>-1){biliHelper.genPage=true;biliHelper.copyright=true}if($("#bofqi div")>0&&$("#bofqi div").text().indexOf("版权")>-1){biliHelper.copyright=true}if($('meta[name="redirect"]').length){biliHelper.redirectUrl=$('meta[name="redirect"]').attr("content")}biliHelper.version=e.version;var l=$('<div class="block helper" id="bilibili_helper"><span class="title"><div class="icon"></div>哔哩哔哩助手</span><div class="info"><div class="main">加载中，请稍候…</div><div class="version">哔哩哔哩助手 '+biliHelper.version+' by <a href="http://weibo.com/guguke" target="_blank">@啾咕咕www</a></div></div></div>');l.find(".title").click(function(){var e=$(this).closest(".block").find(".info"),l=e.find(".main");if(e.hasClass("active")){e.removeClass("active")}else{l.empty();var t=$('<div class="section video"><h3>视频信息</h3><p><span></span><span>aid: '+biliHelper.avid+"</span><span>pg: "+biliHelper.page+"</span></p></div>");if(biliHelper.cid){t.find("p").append($("<span>cid: "+biliHelper.cid+"</span>"))}l.append(t);if(!biliHelper.cid&&biliHelper.error){var r=$('<div class="section error"><h3>Cid 获取失败</h3><p><span></span><span>'+parseSafe(biliHelper.error)+"</span></p></div>");l.append(r)}if(biliHelper.redirectUrl){var a=$('<div class="section redirect"><h3>生成页选项</h3><p><a class="b-btn w" href="'+biliHelper.redirectUrl+'">前往原始跳转页</a></p></div>');l.append(a)}if(biliHelper.cid&&biliHelper.playbackUrls&&biliHelper.playbackUrls.length==1&&biliHelper.playbackUrls[0].url.indexOf("m3u8")<0||biliHelper.replacePlayer&&typeof biliHelper.cid!=="undefined"){var o=$('<div class="section switcher"><h3>播放器切换</h3><p></p></div>');o.find("p").append($('<a class="b-btn w" type="original">原始播放器</a><a class="b-btn w" type="swf">SWF 播放器</a><a class="b-btn w" type="iframe">Iframe 播放器</a><a class="b-btn w" type="html5">HTML5 播放器</a>').click(function(){$(".arc-tool-bar .helper .section.switcher a.b-btn").addClass("w");biliHelper.switcher[$(this).attr("type")]();$(this).removeClass("w")}));if(biliHelper.redirectUrl){o.find('a[type="original"]').remove()}if(!biliHelper.replacePlayer||!biliHelper.cid){o.find('a[type="iframe"],a[type="swf"]').remove()}if(!biliHelper.cid||!biliHelper.playbackUrls||biliHelper.playbackUrls.length!=1||biliHelper.playbackUrls[0].url.indexOf("m3u8")>=0){o.find('a[type="html5"]').remove()}o.find('a.b-btn[type="'+biliHelper.switcher.current+'"]').removeClass("w");l.append(o)}if(typeof biliHelper.downloadUrls!=="undefined"||biliHelper.error){if(typeof biliHelper.downloadUrls!=="object"||!biliHelper.downloadUrls.length){var n=biliHelper.error||"视频地址获取失败",s=$('<div class="section downloder"><h3>视频下载</h3><p><span></span>'+n+"</p></div>")}else{var s=$('<div class="section downloder"><h3>视频下载</h3><p></p></div>');for(i in biliHelper.downloadUrls){var d=biliHelper.downloadUrls[i];if(typeof d=="object")s.find("p").append($('<a class="b-btn w" rel="noreferrer"></a>').text("分段 "+(parseInt(i)+1)).attr("download","av"+biliHelper.avid+"p"+biliHelper.page+"_"+i).attr("title",isNaN(parseInt(d.filesize/1048576+.5))?"长度: "+parseTime(d.length):"长度: "+parseTime(d.length)+" 大小: "+parseInt(d.filesize/1048576+.5)+" MB").attr("href",d.url))}}}else{var s=$('<div class="section downloder"><h3>视频下载</h3><p><span></span>视频地址获取中，请稍等…</p></div>')}l.append(s);e.addClass("active")}});if(!biliHelper.genPage)$(".player-wrapper .arc-tool-bar").append(l);biliHelper.originalPlayer=$("#bofqi").html();if(e.replace=="on"&&($("#bofqi object").length>0&&$("#bofqi object").attr("data")!="http://static.hdslb.com/play.swf"&&$("#bofqi object").attr("data")!="https://static-s.bilibili.com/play.swf"&&$("#bofqi object").attr("data")!="http://static.hdslb.com/letv.swf"&&$("#bofqi object").attr("data")!="http://static.hdslb.com/play_old.swf")||$("#bofqi embed").length>0&&$("#bofqi embed").attr("src")!="http://static.hdslb.com/play.swf"&&$("#bofqi embed").attr("src")!="https://static-s.bilibili.com/play.swf"&&$("#bofqi embed").attr("src")!="http://static.hdslb.com/letv.swf"&&$("#bofqi embed").attr("src")!="http://static.hdslb.com/play_old.swf"||$("#bofqi iframe").length>0&&($("#bofqi iframe").attr("src").indexOf("bilibili.com")<0||$("#bofqi iframe").attr("src").indexOf("iqiyi")>0)||$("#bofqi object").length+$("#bofqi embed").length+$("#bofqi iframe").length==0){biliHelper.replacePlayer=true}else{biliHelper.replacePlayer=false}if(e.html5=="on"){biliHelper.favorHTML5=true}else{biliHelper.favorHTML5=false}if(biliHelper.replacePlayer||biliHelper.favorHTML5){var t=$('<div id="loading-notice">正在尝试替换播放器…<span id="cancel-replacing">取消</span></div>');t.find("#cancel-replacing").click(function(){$("#loading-notice").fadeOut(300);biliHelper.replacePlayer=false;biliHelper.favorHTML5=false});$("#bofqi").append(t)}biliHelper.switcher={current:"original",original:function(){this.current="original";notifyCidHack(function(){$("#bofqi").html(biliHelper.originalPlayer);if($("#bofqi embed").attr("width")==950)$("#bofqi embed").attr("width",980)})},swf:function(){this.current="swf";notifyCidHack(function(){$("#bofqi").html('<object type="application/x-shockwave-flash" class="player" data="http://static.hdslb.com/play.swf" id="player_placeholder" style="visibility: visible;"><param name="allowfullscreeninteractive" value="true"><param name="allowfullscreen" value="true"><param name="quality" value="high"><param name="allowscriptaccess" value="always"><param name="wmode" value="opaque"><param name="flashvars" value="cid='+biliHelper.cid+"&aid="+biliHelper.avid+'"></object>')})},iframe:function(){this.current="iframe";notifyCidHack(function(){$("#bofqi").html('<iframe height="536" width="980" class="player" src="https://secure.bilibili.com/secure,cid='+biliHelper.cid+"&aid="+biliHelper.avid+'" scrolling="no" border="0" frameborder="no" framespacing="0" onload="window.securePlayerFrameLoaded=true"></iframe>')})},html5:function(){this.current="html5";$("#bofqi").html('<div id="bilibili_helper_html5_player" class="player"><video id="bilibili_helper_html5_player_video" autobuffer="true" poster="'+biliHelper.videoPic+'"><source src="'+biliHelper.playbackUrls[0].url+'" type="video/mp4"></video></div>');var e=ABP.create(document.getElementById("bilibili_helper_html5_player"),{src:{playlist:[{video:document.getElementById("bilibili_helper_html5_player_video"),comments:"http://comment.bilibili.com/"+biliHelper.cid+".xml"}]},width:"100%",height:"100%"});e.playerUnit.addEventListener("wide",function(){$("#bofqi").addClass("wide")});e.playerUnit.addEventListener("normal",function(){$("#bofqi").removeClass("wide")});var i=0;$(window).scroll(function(){if(i!=$("#bofqi").width()){i=$("#bofqi").width();if(e&&e.cmManager){e.cmManager.setBounds()}}})}};work()});var work=function(){chrome.extension.sendMessage({command:"getVideoInfo",avid:biliHelper.avid,pg:biliHelper.page+biliHelper.pageOffset},function(response){var videoInfo=response.videoInfo,error=false;biliHelper.videoPic=videoInfo.pic;if($("#alist a").length){var maxPage=0;$("#alist a").each(function(e,i){var l=bili_reg.exec($(i).attr("href"));if(l&&l[2]){var t=parseInt(l[2]);if(t>maxPage){maxPage=t}}});if(maxPage>videoInfo.pages&&biliHelper.pageOffset>videoInfo.pages-maxPage){biliHelper.pageOffset=videoInfo.pages-maxPage;work();return false}}if(typeof videoInfo.code!=="undefined"){if(biliHelper.page!=1){chrome.extension.sendMessage({command:"getVideoInfo",avid:biliHelper.avid,pg:1},function(e){var i=e.videoInfo;if(i.pages==biliHelper.page-1){biliHelper.pageOffset-=1;work();return false}})}else{biliHelper.error="错误"+videoInfo.code+": "+videoInfo.error;$("#loading-notice").fadeOut(300)}}else{biliHelper.cid=videoInfo.cid}if(biliHelper.genPage){$.get(chrome.extension.getURL("template.html"),function(e){var i=e.replace(/%avid%/g,biliHelper.avid).replace(/%page%/g,biliHelper.page).replace(/%tid%/g,videoInfo.tid).replace(/%mid%/g,videoInfo.mid).replace(/%pic%/g,videoInfo.pic).replace(/%title%/g,parseSafe(videoInfo.title)).replace(/%sp_title%/g,videoInfo.sp_title?parseSafe(videoInfo.sp_title):"").replace(/%sp_title_uri%/g,videoInfo.sp_title?encodeURIComponent(videoInfo.sp_title):"").replace(/%spid%/g,videoInfo.spid).replace(/%season_id%/g,videoInfo.season_id).replace(/%created_at%/g,videoInfo.created_at).replace(/%description%/g,parseSafe(videoInfo.description)).replace(/%redirectUrl%/g,biliHelper.redirectUrl).replace(/%tags%/g,JSON.stringify(videoInfo.tag.split(",")));document.open();document.write(i);document.close()});biliHelperFunc();return false}if(biliHelper.replacePlayer){miniPlayer()}window.postMessage?(c=function(a){"https://secure.bilibili.com"!=a.origin&&"https://ssl.bilibili.com"!=a.origin||"secJS:"!=a.data.substr(0,6)||eval(a.data.substr(6));"undefined"!=typeof console&&console.log(a.origin+": "+a.data)},window.addEventListener?window.addEventListener("message",c,!1):window.attachEvent&&window.attachEvent("onmessage",c)):setInterval(function(){if(evalCode=__GetCookie("__secureJS")){__SetCookie("__secureJS",""),eval(evalCode)}},1e3);if(biliHelper.cid&&!biliHelper.favorHTML5){$("#loading-notice").fadeOut(300,function(){biliHelper.switcher.swf()})}if(!biliHelper.cid){biliHelper.error="错误"+videoInfo.code+": "+videoInfo.error;return false}finishUp();$(".viewbox .info h2").html(addTitleLink($(".viewbox .info h2").attr("title"),response.rel_search));$(".titleNumber").click(function(){var e=new MessageBox;e.show(this,'点击搜索相关视频：<br /><a target="_blank" href="http://www.bilibili.com/search?orderby=default&keyword='+encodeURIComponent($(this).attr("previous"))+'">'+$(this).attr("previous")+'</a><br /><a target="_blank" href="http://www.bilibili.com/search?orderby=ranklevel&keyword='+encodeURIComponent($(this).attr("next"))+'">'+$(this).attr("next")+"</a>",1e3)})})}}};$(document).ready(biliHelperFunc)})();