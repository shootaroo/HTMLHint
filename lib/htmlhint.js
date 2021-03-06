/*!
 * HTMLHint v0.9.4
 * https://github.com/yaniswang/HTMLHint
 *
 * (c) 2013 Yanis Wang <yanis.wang@gmail.com>.
 * MIT Licensed
 */
var HTMLHint=function(a){var b={};return b.version="0.9.4",b.rules={},b.defaultRuleset={"tagname-lowercase":!0,"attr-lowercase":!0,"attr-value-double-quotes":!0,"doctype-first":!0,"tag-pair":!0,"spec-char-escape":!0,"id-unique":!0,"src-not-empty":!0},b.addRule=function(a){b.rules[a.id]=a},b.verify=function(c,d){d===a&&(d=b.defaultRuleset);var e,f=new HTMLParser,g=new b.Reporter(c.split(/\r?\n/),d),h=b.rules;for(var i in d)d[i]&&(e=h[i],e!==a&&e.init(f,g,d[i]));return f.parse(c),g.messages},b.getFormatter=function(a){return require("../lib/formatters/"+a)},b}();"object"==typeof exports&&exports&&(exports.HTMLHint=HTMLHint),function(a){var b=function(){var a=this;a._init.apply(a,arguments)};b.prototype={_init:function(a,b){var c=this;c.lines=a,c.ruleset=b,c.messages=[]},error:function(a,b,c,d,e){this.report("error",a,b,c,d,e)},warn:function(a,b,c,d,e){this.report("warning",a,b,c,d,e)},info:function(a,b,c,d,e){this.report("info",a,b,c,d,e)},report:function(a,b,c,d,e,f){var g=this;g.messages.push({type:a,message:b,raw:f,evidence:g.lines[c-1],line:c,col:d,rule:{id:e.id,description:e.description,link:"https://github.com/yaniswang/HTMLHint/wiki/"+e.id}})}},a.Reporter=b}(HTMLHint);var HTMLParser=function(a){var b=function(){var a=this;a._init.apply(a,arguments)};return b.prototype={_init:function(){var a=this;a._listeners={},a._mapCdataTags=a.makeMap("script,style"),a._arrBlocks=[]},makeMap:function(a){for(var b={},c=a.split(","),d=0;d<c.length;d++)b[c[d]]=!0;return b},parse:function(b){function c(b,c,d,e){var f=d-s+1;e===a&&(e={}),e.raw=c,e.pos=d,e.line=t,e.col=f,u.push(e),l.fire(b,e);for(var g;g=p.exec(c);)t++,s=d+p.lastIndex}var d,e,f,g,h,i,j,k,l=this,m=l._mapCdataTags,n=/<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"']+))?)*?)\s*(\/?))>/g,o=/\s*([\w\-:]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"']+)))?/g,p=/\r?\n/g,q=0,r=0,s=0,t=1,u=l._arrBlocks;for(l.fire("start",{pos:0,line:1,col:1});d=n.exec(b);)if(e=d.index,e>q&&(k=b.substring(q,e),h?j.push(k):c("text",k,q)),q=n.lastIndex,!(f=d[1])||(h&&f===h&&(k=j.join(""),c("cdata",k,r,{tagName:h,attrs:i}),h=null,i=null,j=null),h))if(h)j.push(d[0]);else if(f=d[4]){g=[];for(var v,w=d[5],x=0;v=o.exec(w);){var y=v[1],z=v[2]?v[2]:v[4]?v[4]:"",A=v[3]?v[3]:v[5]?v[5]:v[6]?v[6]:"";g.push({name:y,value:A,quote:z,index:v.index,raw:v[0]}),x+=v[0].length}x===w.length?(c("tagstart",d[0],e,{tagName:f,attrs:g,close:d[6]}),m[f]&&(h=f,i=g.concat(),j=[],r=q)):c("text",d[0],e)}else(d[2]||d[3])&&c("comment",d[0],e,{content:d[2]||d[3],"long":d[2]?!0:!1});else c("tagend",d[0],e,{tagName:f});b.length>q&&(k=b.substring(q,b.length),c("text",k,q)),l.fire("end",{pos:q,line:t,col:q-s+1})},addListener:function(b,c){for(var d,e=this._listeners,f=b.split(/[,\s]/),g=0,h=f.length;h>g;g++)d=f[g],e[d]===a&&(e[d]=[]),e[d].push(c)},fire:function(b,c){c===a&&(c={}),c.type=b;var d=this,e=[],f=d._listeners[b],g=d._listeners.all;f!==a&&(e=e.concat(f)),g!==a&&(e=e.concat(g));for(var h=0,i=e.length;i>h;h++)e[h].call(d,c)},removeListener:function(b,c){var d=this._listeners[b];if(d!==a)for(var e=0,f=d.length;f>e;e++)if(d[e]===c){d.splice(e,1);break}},fixPos:function(a,b){var c,d=a.raw.substr(0,b),e=d.split(/\r?\n/),f=e.length-1,g=a.line;return f>0?(g+=f,c=e[f].length+1):c=a.col+b,{line:g,col:c}},getMapAttrs:function(a){for(var b,c={},d=0,e=a.length;e>d;d++)b=a[d],c[b.name]=b.value;return c}},b}();"object"==typeof exports&&exports&&(exports.HTMLParser=HTMLParser),HTMLHint.addRule({id:"attr-lowercase",description:"Attribute name must be lowercase.",init:function(a,b){var c=this;a.addListener("tagstart",function(a){for(var d,e=a.attrs,f=a.col+a.tagName.length+1,g=0,h=e.length;h>g;g++){d=e[g];var i=d.name;i!==i.toLowerCase()&&b.error("Attribute name [ "+i+" ] must be lower case.",a.line,f+d.index,c,d.raw)}})}}),HTMLHint.addRule({id:"attr-value-double-quotes",description:"Attribute value must closed by double quotes.",init:function(a,b){var c=this;a.addListener("tagstart",function(a){for(var d,e=a.attrs,f=a.col+a.tagName.length+1,g=0,h=e.length;h>g;g++)d=e[g],(""!==d.value&&'"'!==d.quote||""===d.value&&"'"===d.quote)&&b.error("The value of attribute [ "+d.name+" ] must closed by double quotes.",a.line,f+d.index,c,d.raw)})}}),HTMLHint.addRule({id:"attr-value-not-empty",description:"Attribute must set value.",init:function(a,b){var c=this;a.addListener("tagstart",function(a){for(var d,e=a.attrs,f=a.col+a.tagName.length+1,g=0,h=e.length;h>g;g++)d=e[g],""===d.quote&&""===d.value&&b.warn("The attribute [ "+d.name+" ] must set value.",a.line,f+d.index,c,d.raw)})}}),HTMLHint.addRule({id:"csslint",description:"Scan css with csslint.",init:function(a,b,c){var d=this;a.addListener("cdata",function(a){if("style"===a.tagName.toLowerCase()){var e;if(e="object"==typeof exports&&require?require("csslint").CSSLint.verify:CSSLint.verify,void 0!==c){var f=a.line-1,g=a.col-1;try{var h=e(a.raw,c).messages;h.forEach(function(a){var c=a.line;b["warning"===a.type?"warn":"error"]("["+a.rule.id+"] "+a.message,f+c,(1===c?g:0)+a.col,d,a.evidence)})}catch(i){}}}})}}),HTMLHint.addRule({id:"doctype-first",description:"Doctype must be first.",init:function(a,b){var c=this,d=function(e){"start"===e.type||"text"===e.type&&/^\s*$/.test(e.raw)||(("comment"!==e.type&&e.long===!1||/^DOCTYPE\s+/i.test(e.content)===!1)&&b.error("Doctype must be first.",e.line,e.col,c,e.raw),a.removeListener("all",d))};a.addListener("all",d)}}),HTMLHint.addRule({id:"doctype-html5",description:"Doctype must be html5.",init:function(a,b){function c(a){a.long===!1&&"doctype html"!==a.content.toLowerCase()&&b.warn("Doctype must be html5.",a.line,a.col,e,a.raw)}function d(){a.removeListener("comment",c),a.removeListener("tagstart",d)}var e=this;a.addListener("all",c),a.addListener("tagstart",d)}}),HTMLHint.addRule({id:"head-script-disabled",description:"The script tag can not be used in head.",init:function(a,b){function c(a){"script"===a.tagName.toLowerCase()&&b.warn("The script tag can not be used in head.",a.line,a.col,e,a.raw)}function d(b){"head"===b.tagName.toLowerCase()&&(a.removeListener("tagstart",c),a.removeListener("tagstart",d))}var e=this;a.addListener("tagstart",c),a.addListener("tagend",d)}}),HTMLHint.addRule({id:"id-class-value",description:"Id and class value must meet some rules.",init:function(a,b,c){var d,e=this,f={underline:{regId:/^[a-z\d]+(_[a-z\d]+)*$/,message:"Id and class value must lower case and split by underline."},dash:{regId:/^[a-z\d]+(-[a-z\d]+)*$/,message:"Id and class value must lower case and split by dash."},hump:{regId:/^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,message:"Id and class value must meet hump style."}};if(d="string"==typeof c?f[c]:c,d&&d.regId){var g=d.regId,h=d.message;a.addListener("tagstart",function(a){for(var c,d=a.attrs,f=a.col+a.tagName.length+1,i=0,j=d.length;j>i;i++)if(c=d[i],"id"===c.name.toLowerCase()&&g.test(c.value)===!1&&b.warn(h,a.line,f+c.index,e,c.raw),"class"===c.name.toLowerCase())for(var k,l=c.value.split(/\s+/g),m=0,n=l.length;n>m;m++)k=l[m],k&&g.test(k)===!1&&b.warn(h,a.line,f+c.index,e,k)})}}}),HTMLHint.addRule({id:"id-unique",description:"Id must be unique.",init:function(a,b){var c=this,d={};a.addListener("tagstart",function(a){for(var e,f,g=a.attrs,h=a.col+a.tagName.length+1,i=0,j=g.length;j>i;i++)if(e=g[i],"id"===e.name.toLowerCase()){f=e.value,f&&(void 0===d[f]?d[f]=1:d[f]++,d[f]>1&&b.error("Id redefinition of [ "+f+" ].",a.line,h+e.index,c,e.raw));break}})}}),HTMLHint.addRule({id:"img-alt-require",description:"Alt of img tag must be set value.",init:function(a,b){var c=this;a.addListener("tagstart",function(a){if("img"===a.tagName.toLowerCase()){for(var d=a.attrs,e=!1,f=0,g=d.length;g>f;f++)if("alt"===d[f].name.toLowerCase()){e=!0;break}e===!1&&b.warn("Alt of img tag must be set value.",a.line,a.col,c,a.raw)}})}}),HTMLHint.addRule({id:"jshint",description:"Scan script with jshint.",init:function(a,b,c){var d=this;a.addListener("cdata",function(e){if("script"===e.tagName.toLowerCase()){var f=a.getMapAttrs(e.attrs),g=f.type;if(void 0!==f.src||g&&/^(text\/javascript)$/i.test(g)===!1)return;var h;if(h="object"==typeof exports&&require?require("jshint").JSHINT:JSHINT,void 0!==c){var i=e.line-1,j=e.col-1,k=e.raw.replace(/\t/g," ");try{var l=h(k,c);l===!1&&h.errors.forEach(function(a){var c=a.line;b.warn(a.reason,i+c,(1===c?j:0)+a.character,d,a.evidence)})}catch(m){}}}})}}),HTMLHint.addRule({id:"spec-char-escape",description:"Special characters must be escaped.",init:function(a,b){var c=this;a.addListener("text",function(d){for(var e,f=d.raw,g=/[<>]/g;e=g.exec(f);){var h=a.fixPos(d,e.index);b.error("Special characters must be escaped : [ "+e[0]+" ].",h.line,h.col,c,d.raw)}})}}),HTMLHint.addRule({id:"src-not-empty",description:"Src of img(script,link) must set value.",init:function(a,b){var c=this;a.addListener("tagstart",function(a){for(var d,e=a.tagName,f=a.attrs,g=a.col+e.length+1,h=0,i=f.length;i>h;h++)d=f[h],(/^(img|script|embed|bgsound|iframe)$/.test(e)===!0&&"src"===d.name||"link"===e&&"href"===d.name||"object"===e&&"data"===d.name)&&""===d.value&&b.error("[ "+d.name+"] of [ "+e+" ] must set value.",a.line,g+d.index,c,d.raw)})}}),HTMLHint.addRule({id:"style-disabled",description:"Style tag can not be use.",init:function(a,b){var c=this;a.addListener("tagstart",function(a){"style"===a.tagName.toLowerCase()&&b.warn("Style tag can not be use.",a.line,a.col,c,a.raw)})}}),HTMLHint.addRule({id:"tag-pair",description:"Tag must be paired.",init:function(a,b){var c=this,d=[],e=a.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");a.addListener("tagstart",function(a){var b=a.tagName.toLowerCase();void 0!==e[b]||a.close||d.push(b)}),a.addListener("tagend",function(a){for(var e=a.tagName.toLowerCase(),f=d.length-1;f>=0&&d[f]!==e;f--);if(f>=0){for(var g=[],h=d.length-1;h>f;h--)g.push("</"+d[h]+">");g.length>0&&b.error("Tag must be paired, Missing: [ "+g.join("")+" ]",a.line,a.col,c,a.raw),d.length=f}else b.error("Tag must be paired, No start tag: [ "+a.raw+" ]",a.line,a.col,c,a.raw)}),a.addListener("end",function(a){for(var e=[],f=d.length-1;f>=0;f--)e.push("</"+d[f]+">");e.length>0&&b.error("Tag must be paired, Missing: [ "+e.join("")+" ]",a.line,a.col,c,"")})}}),HTMLHint.addRule({id:"tag-self-close",description:"The empty tag must closed by self.",init:function(a,b){var c=this,d=a.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");a.addListener("tagstart",function(a){var e=a.tagName.toLowerCase();void 0!==d[e]&&(a.close||b.warn("The empty tag : [ "+e+" ] must closed by self.",a.line,a.col,c,a.raw))})}}),HTMLHint.addRule({id:"tagname-lowercase",description:"Tagname must be lowercase.",init:function(a,b){var c=this;a.addListener("tagstart,tagend",function(a){var d=a.tagName;d!==d.toLowerCase()&&b.error("Tagname [ "+d+" ] must be lower case.",a.line,a.col,c,a.raw)})}});