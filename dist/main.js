(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function n(n){e(1,arguments);var r=t(n);return r.setHours(0,0,0,0),r}function r(t,r){e(2,arguments);var o=n(t),a=n(r);return o.getTime()===a.getTime()}function o(t){return e(1,arguments),r(t,Date.now())}var a={};function i(){return a}function u(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}function s(n,r){e(2,arguments);var o=t(n),a=t(r),i=o.getTime()-a.getTime();return i<0?-1:i>0?1:i}function d(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function c(e){return d({},e)}var l={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function m(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth,r=e.formats[n]||e.formats[e.defaultWidth];return r}}var f,h={date:m({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:m({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:m({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},g={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function v(e){return function(t,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,a=null!=n&&n.width?String(n.width):o;r=e.formattingValues[a]||e.formattingValues[o]}else{var i=e.defaultWidth,u=null!=n&&n.width?String(n.width):e.defaultWidth;r=e.values[u]||e.values[i]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function w(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,o=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],a=t.match(o);if(!a)return null;var i,u=a[0],s=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(s)?y(s,(function(e){return e.test(u)})):p(s,(function(e){return e.test(u)}));i=e.valueCallback?e.valueCallback(d):d,i=n.valueCallback?n.valueCallback(i):i;var c=t.slice(u.length);return{value:i,rest:c}}}function p(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}function y(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}const b={code:"en-US",formatDistance:function(e,t,n){var r,o=l[e];return r="string"==typeof o?o:1===t?o.one:o.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:h,formatRelative:function(e,t,n,r){return g[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:v({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:v({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:v({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:v({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:v({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(f={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(f.matchPattern);if(!n)return null;var r=n[0],o=e.match(f.parsePattern);if(!o)return null;var a=f.valueCallback?f.valueCallback(o[0]):o[0];a=t.valueCallback?t.valueCallback(a):a;var i=e.slice(r.length);return{value:a,rest:i}}),era:w({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:w({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:w({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:w({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:w({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var T=6e4,C=1440,S=43200,M=525600;function x(n,r,o){var a,l,m;e(2,arguments);var f=i(),h=null!==(a=null!==(l=null==o?void 0:o.locale)&&void 0!==l?l:f.locale)&&void 0!==a?a:b;if(!h.formatDistance)throw new RangeError("locale must contain localize.formatDistance property");var g=s(n,r);if(isNaN(g))throw new RangeError("Invalid time value");var v,w,p=d(c(o),{addSuffix:Boolean(null==o?void 0:o.addSuffix),comparison:g});g>0?(v=t(r),w=t(n)):(v=t(n),w=t(r));var y,x=String(null!==(m=null==o?void 0:o.roundingMethod)&&void 0!==m?m:"round");if("floor"===x)y=Math.floor;else if("ceil"===x)y=Math.ceil;else{if("round"!==x)throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");y=Math.round}var D,k=w.getTime()-v.getTime(),L=k/T,E=u(w)-u(v),P=(k-E)/T,q=null==o?void 0:o.unit;if("second"===(D=q?String(q):L<1?"second":L<60?"minute":L<C?"hour":P<S?"day":P<M?"month":"year")){var j=y(k/1e3);return h.formatDistance("xSeconds",j,p)}if("minute"===D){var U=y(L);return h.formatDistance("xMinutes",U,p)}if("hour"===D){var W=y(L/60);return h.formatDistance("xHours",W,p)}if("day"===D){var N=y(P/C);return h.formatDistance("xDays",N,p)}if("month"===D){var Y=y(P/S);return 12===Y&&"month"!==q?h.formatDistance("xYears",1,p):h.formatDistance("xMonths",Y,p)}if("year"===D){var O=y(P/M);return h.formatDistance("xYears",O,p)}throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'")}function D(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function k(n,r){e(2,arguments);var o=t(n),a=D(r);return isNaN(a)?new Date(NaN):a?(o.setDate(o.getDate()+a),o):o}function L(t,n){e(2,arguments);var r=D(n);return k(t,-r)}var E=864e5;function P(t,r){e(2,arguments);var o=n(t),a=n(r),i=o.getTime()-u(o),s=a.getTime()-u(a);return Math.round((i-s)/E)}function q(t){return e(1,arguments),t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function j(n){if(e(1,arguments),!q(n)&&"number"!=typeof n)return!1;var r=t(n);return!isNaN(Number(r))}function U(n,r){e(2,arguments);var o=t(n).getTime(),a=D(r);return new Date(o+a)}function W(t,n){e(2,arguments);var r=D(n);return U(t,-r)}var N=864e5;function Y(n){e(1,arguments);var r=1,o=t(n),a=o.getUTCDay(),i=(a<r?7:0)+a-r;return o.setUTCDate(o.getUTCDate()-i),o.setUTCHours(0,0,0,0),o}function O(n){e(1,arguments);var r=t(n),o=r.getUTCFullYear(),a=new Date(0);a.setUTCFullYear(o+1,0,4),a.setUTCHours(0,0,0,0);var i=Y(a),u=new Date(0);u.setUTCFullYear(o,0,4),u.setUTCHours(0,0,0,0);var s=Y(u);return r.getTime()>=i.getTime()?o+1:r.getTime()>=s.getTime()?o:o-1}function H(t){e(1,arguments);var n=O(t),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var o=Y(r);return o}var A=6048e5;function F(n,r){var o,a,u,s,d,c,l,m;e(1,arguments);var f=i(),h=D(null!==(o=null!==(a=null!==(u=null!==(s=null==r?void 0:r.weekStartsOn)&&void 0!==s?s:null==r||null===(d=r.locale)||void 0===d||null===(c=d.options)||void 0===c?void 0:c.weekStartsOn)&&void 0!==u?u:f.weekStartsOn)&&void 0!==a?a:null===(l=f.locale)||void 0===l||null===(m=l.options)||void 0===m?void 0:m.weekStartsOn)&&void 0!==o?o:0);if(!(h>=0&&h<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var g=t(n),v=g.getUTCDay(),w=(v<h?7:0)+v-h;return g.setUTCDate(g.getUTCDate()-w),g.setUTCHours(0,0,0,0),g}function R(n,r){var o,a,u,s,d,c,l,m;e(1,arguments);var f=t(n),h=f.getUTCFullYear(),g=i(),v=D(null!==(o=null!==(a=null!==(u=null!==(s=null==r?void 0:r.firstWeekContainsDate)&&void 0!==s?s:null==r||null===(d=r.locale)||void 0===d||null===(c=d.options)||void 0===c?void 0:c.firstWeekContainsDate)&&void 0!==u?u:g.firstWeekContainsDate)&&void 0!==a?a:null===(l=g.locale)||void 0===l||null===(m=l.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==o?o:1);if(!(v>=1&&v<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var w=new Date(0);w.setUTCFullYear(h+1,0,v),w.setUTCHours(0,0,0,0);var p=F(w,r),y=new Date(0);y.setUTCFullYear(h,0,v),y.setUTCHours(0,0,0,0);var b=F(y,r);return f.getTime()>=p.getTime()?h+1:f.getTime()>=b.getTime()?h:h-1}function z(t,n){var r,o,a,u,s,d,c,l;e(1,arguments);var m=i(),f=D(null!==(r=null!==(o=null!==(a=null!==(u=null==n?void 0:n.firstWeekContainsDate)&&void 0!==u?u:null==n||null===(s=n.locale)||void 0===s||null===(d=s.options)||void 0===d?void 0:d.firstWeekContainsDate)&&void 0!==a?a:m.firstWeekContainsDate)&&void 0!==o?o:null===(c=m.locale)||void 0===c||null===(l=c.options)||void 0===l?void 0:l.firstWeekContainsDate)&&void 0!==r?r:1),h=R(t,n),g=new Date(0);g.setUTCFullYear(h,0,f),g.setUTCHours(0,0,0,0);var v=F(g,n);return v}var I=6048e5;function B(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const V=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return B("yy"===t?r%100:r,t.length)},Q=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):B(n+1,2)},G=function(e,t){return B(e.getUTCDate(),t.length)},X=function(e,t){return B(e.getUTCHours()%12||12,t.length)},J=function(e,t){return B(e.getUTCHours(),t.length)},_=function(e,t){return B(e.getUTCMinutes(),t.length)},$=function(e,t){return B(e.getUTCSeconds(),t.length)},Z=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return B(Math.floor(r*Math.pow(10,n-3)),t.length)};function K(e,t){var n=e>0?"-":"+",r=Math.abs(e),o=Math.floor(r/60),a=r%60;if(0===a)return n+String(o);var i=t||"";return n+String(o)+i+B(a,2)}function ee(e,t){return e%60==0?(e>0?"-":"+")+B(Math.abs(e)/60,2):te(e,t)}function te(e,t){var n=t||"",r=e>0?"-":"+",o=Math.abs(e);return r+B(Math.floor(o/60),2)+n+B(o%60,2)}const ne={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),o=r>0?r:1-r;return n.ordinalNumber(o,{unit:"year"})}return V(e,t)},Y:function(e,t,n,r){var o=R(e,r),a=o>0?o:1-o;return"YY"===t?B(a%100,2):"Yo"===t?n.ordinalNumber(a,{unit:"year"}):B(a,t.length)},R:function(e,t){return B(O(e),t.length)},u:function(e,t){return B(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return B(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return B(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return Q(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return B(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,o,a){var i=function(n,r){e(1,arguments);var o=t(n),a=F(o,r).getTime()-z(o,r).getTime();return Math.round(a/I)+1}(n,a);return"wo"===r?o.ordinalNumber(i,{unit:"week"}):B(i,r.length)},I:function(n,r,o){var a=function(n){e(1,arguments);var r=t(n),o=Y(r).getTime()-H(r).getTime();return Math.round(o/A)+1}(n);return"Io"===r?o.ordinalNumber(a,{unit:"week"}):B(a,r.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):G(e,t)},D:function(n,r,o){var a=function(n){e(1,arguments);var r=t(n),o=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var a=r.getTime(),i=o-a;return Math.floor(i/N)+1}(n);return"Do"===r?o.ordinalNumber(a,{unit:"dayOfYear"}):B(a,r.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var o=e.getUTCDay(),a=(o-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(a);case"ee":return B(a,2);case"eo":return n.ordinalNumber(a,{unit:"day"});case"eee":return n.day(o,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(o,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(o,{width:"short",context:"formatting"});default:return n.day(o,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var o=e.getUTCDay(),a=(o-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(a);case"cc":return B(a,t.length);case"co":return n.ordinalNumber(a,{unit:"day"});case"ccc":return n.day(o,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(o,{width:"narrow",context:"standalone"});case"cccccc":return n.day(o,{width:"short",context:"standalone"});default:return n.day(o,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),o=0===r?7:r;switch(t){case"i":return String(o);case"ii":return B(o,t.length);case"io":return n.ordinalNumber(o,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,o=e.getUTCHours();switch(r=12===o?"noon":0===o?"midnight":o/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,o=e.getUTCHours();switch(r=o>=17?"evening":o>=12?"afternoon":o>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return X(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):J(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):B(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):B(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):_(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):$(e,t)},S:function(e,t){return Z(e,t)},X:function(e,t,n,r){var o=(r._originalDate||e).getTimezoneOffset();if(0===o)return"Z";switch(t){case"X":return ee(o);case"XXXX":case"XX":return te(o);default:return te(o,":")}},x:function(e,t,n,r){var o=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return ee(o);case"xxxx":case"xx":return te(o);default:return te(o,":")}},O:function(e,t,n,r){var o=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+K(o,":");default:return"GMT"+te(o,":")}},z:function(e,t,n,r){var o=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+K(o,":");default:return"GMT"+te(o,":")}},t:function(e,t,n,r){var o=r._originalDate||e;return B(Math.floor(o.getTime()/1e3),t.length)},T:function(e,t,n,r){return B((r._originalDate||e).getTime(),t.length)}};var re=function(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}},oe=function(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}},ae={p:oe,P:function(e,t){var n,r=e.match(/(P+)(p+)?/)||[],o=r[1],a=r[2];if(!a)return re(e,t);switch(o){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",re(o,t)).replace("{{time}}",oe(a,t))}};const ie=ae;var ue=["D","DD"],se=["YY","YYYY"];function de(e){return-1!==ue.indexOf(e)}function ce(e){return-1!==se.indexOf(e)}function le(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var me=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,fe=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,he=/^'([^]*?)'?$/,ge=/''/g,ve=/[a-zA-Z]/;function we(n,r,o){var a,s,d,c,l,m,f,h,g,v,w,p,y,T,C,S,M,x;e(2,arguments);var k=String(r),L=i(),E=null!==(a=null!==(s=null==o?void 0:o.locale)&&void 0!==s?s:L.locale)&&void 0!==a?a:b,P=D(null!==(d=null!==(c=null!==(l=null!==(m=null==o?void 0:o.firstWeekContainsDate)&&void 0!==m?m:null==o||null===(f=o.locale)||void 0===f||null===(h=f.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==l?l:L.firstWeekContainsDate)&&void 0!==c?c:null===(g=L.locale)||void 0===g||null===(v=g.options)||void 0===v?void 0:v.firstWeekContainsDate)&&void 0!==d?d:1);if(!(P>=1&&P<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var q=D(null!==(w=null!==(p=null!==(y=null!==(T=null==o?void 0:o.weekStartsOn)&&void 0!==T?T:null==o||null===(C=o.locale)||void 0===C||null===(S=C.options)||void 0===S?void 0:S.weekStartsOn)&&void 0!==y?y:L.weekStartsOn)&&void 0!==p?p:null===(M=L.locale)||void 0===M||null===(x=M.options)||void 0===x?void 0:x.weekStartsOn)&&void 0!==w?w:0);if(!(q>=0&&q<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!E.localize)throw new RangeError("locale must contain localize property");if(!E.formatLong)throw new RangeError("locale must contain formatLong property");var U=t(n);if(!j(U))throw new RangeError("Invalid time value");var N=u(U),Y=W(U,N),O={firstWeekContainsDate:P,weekStartsOn:q,locale:E,_originalDate:U},H=k.match(fe).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,ie[t])(e,E.formatLong):e})).join("").match(me).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return pe(e);var a=ne[t];if(a)return null!=o&&o.useAdditionalWeekYearTokens||!ce(e)||le(e,r,String(n)),null!=o&&o.useAdditionalDayOfYearTokens||!de(e)||le(e,r,String(n)),a(Y,e,E.localize,O);if(t.match(ve))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("");return H}function pe(e){var t=e.match(he);return t?t[1].replace(ge,"'"):e}const ye=function(){function e(e){return function(t,n){const r=h(e),o=l(r.todos,"id",this.id);r.todos[o][t]=n,this[t]=n,m()}}const t=i("todos"),n=i("projects");let r=t.length?t.at(-1).id:-1,o=n.length?n.at(-1).id:-1;n.length||s("Inbox");for(const e of n)e.addTodo=d(e.todos,e.id),e.removeTodo=c();if(t.length)for(const n of t)n.setTodoValue=e(n.projectId);function a(e,t){localStorage.setItem(e,JSON.stringify(t))}function i(e){return JSON.parse(localStorage.getItem(e))||[]}function u(n,o,a,i,u){const s=++r;console.log(r);const d=e(u);return t.push({title:n,description:o,dueDate:a,priority:i,id:s,projectId:u,setTodoValue:d}),m(),{title:n,description:o,dueDate:a,priority:i,id:s,projectId:u,setTodoValue:d}}function s(e){const t=[],r=++o,a=d(t,r),i=c();return n.push({name:e,todos:t,addTodo:a,removeTodo:i,id:r}),m(),{name:e,todos:t,addTodo:a,removeTodo:i,id:r}}function d(e,t){return function(n,r,o,a){const i=u(n,r,o,a,t);return e.push(i),m(),i}}function c(){return function(e){const n=l(this.todos,"id",e),r=l(t,"id",e);t.splice(r,1),this.todos.splice(n,1),m()}}function l(e,t,n){return e.findIndex((e=>e[t]==n))}function m(){a("projects",n),a("todos",t)}const f=e=>n[e],h=e=>n.find((t=>t.id==e));return{createTodo:u,createProject:s,removeProject:function(e){const t=l(n,"id",e),r=f(t);n.splice(t,1);let o=[...r.todos];for(const e of o)r.removeTodo(e.id);m()},getTodos:()=>t,getProjects:()=>n,getProject:f,getProjectById:h}}();!function(){const n=document.querySelector(".modal"),a=document.querySelector(".modal-form"),s=document.querySelector(".add-todo-form"),d=document.querySelector(".add-project-modal"),c=document.querySelector(".add-todo-modal"),l=document.querySelector(".delete-modal"),m=document.querySelectorAll(".cancel"),f=document.querySelector(".submit"),h=document.querySelector(".submit-todo"),g=document.querySelector(".delete"),v=document.querySelector(".open-project > svg"),w=document.getElementsByClassName("project"),p=document.querySelector(".projects"),y=document.querySelector(".add-todo"),T=document.getElementsByClassName("todo"),C=document.querySelector(".projectTab"),S=document.querySelectorAll(".links div"),M=document.querySelector(".hamburger"),E=document.querySelector(".sidebar"),q=document.querySelector(".main-content"),j=document.querySelector(".low"),U=document.querySelector(".medium"),N=document.querySelector(".high"),Y=document.querySelector("#search-input"),O=document.querySelector(".search-results");for(let e of ye.getProjects().slice(1))z(e.name,e.id);function H(e,t=[]){document.querySelector(".main-header").textContent=e,F(t)}function A(){const e=ye.getProjects();let t=[];for(const n of e)for(const e of n.todos)o(new Date(e.dueDate))&&t.push(e);return t}function F(e=[]){Array.from(T).forEach((e=>e.remove()));for(const t of e)V(t);N.children.length<2&&N.classList.remove("visible"),U.children.length<2&&U.classList.remove("visible"),j.children.length<2&&j.classList.remove("visible")}const R=ye.getProject(0);function z(e,t){const n=document.createElement("div");n.setAttribute("project-index-number",t);const r=document.createElement("div"),o=document.createElement("button");n.classList.add("project"),r.classList.add("project-left"),o.classList.add("project-right");const a=ee("M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z","currentColor"),i=document.createElement("span");i.title=e,i.textContent=e,i.classList.add("project-title");const u=ee("M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z","currentColor");u.classList.add("delete-svg"),r.appendChild(a),r.appendChild(i),o.appendChild(u),n.appendChild(r),n.appendChild(o),p.appendChild(n)}H("Inbox",R.todos),document.onclick=e=>{e.target.closest(".search-container")||O.classList.remove("found")},Y.addEventListener("input",(e=>{if(!e.target.value)return O.classList.remove("found");const t=function(e){e=e.toLowerCase();let t=[],n=ye.getProjects(),r=ye.getTodos();for(const r of n)r.name.toLowerCase().includes(e)&&t.push(r);for(const n of r)n.title.toLowerCase().includes(e)&&t.push(n);return t}(e.target.value);if(console.log(t),O.textContent="",!t.length)return K("No results found.",!1,!1,"search-result"),void O.classList.add("found");for(const e of t)K(e.title||e.name,"project-index-number",e.id,"search-result");O.classList.add("found")})),O.addEventListener("click",(e=>{const t=e.target.textContent,n=e.target.getAttribute("project-index-number");if(!n)return;const r=ye.getProjectById(n).todos;G(document.querySelector(`.project[project-index-number="${n}"]`)),H(t,r),O.classList.remove("found"),Y.value=""})),q.addEventListener("click",(e=>{if(e.target.closest(".mark-todo-complete")){const t=e.target.closest(".mark-todo-complete"),n=ye.getProjectById(t.getAttribute("project-index-number")),r=t.getAttribute("todo-index-number");n.removeTodo(r);const o=$();o.classList.contains("today")?F(A()):o.classList.contains("upcoming")?F(ye.getTodos()):F(n.todos)}else e.target.closest(".todo")})),y.addEventListener("click",(e=>{s.reset(),I.classList.remove("valid"),I.classList.remove("error"),B.classList.remove("visible"),X(c);const t=document.querySelector("#project");t.textContent="";for(const e of ye.getProjects()){let r=e.name,o=_(r);o>250&&(n=o>1200?4:o>800?12:20,r=r.substring(0,n)+"...");let a=Q(r);t.appendChild(a)}var n;const r=Z();-1!=r&&(t.children[r].selected=!0)})),S.forEach((e=>{e.addEventListener("click",(()=>{G(e);const t=e.innerText;console.log(A()),H(t,"Inbox"==t?R.todos:"Today"==t?A():ye.getTodos())}))})),p.addEventListener("click",(e=>{e.target.closest(".project-right")&&X(l),G(e.target.closest(".project"));const t=Z(),n=ye.getProject(t);console.log(n.id),console.log(ye.getTodos()),H(n.name,n.todos)})),C.addEventListener("click",(e=>{if(e.target.contains(v))return p.classList.toggle("closed"),void v.classList.toggle("rotated");X(d),a.reset()})),m.forEach((e=>{e.addEventListener("click",J)})),f.addEventListener("click",(()=>{const e=document.querySelector("#name").value;e&&(J(),z(e,ye.createProject(e).id))}));const I=document.querySelector("#todo-title"),B=document.querySelector(".title-error-text");function V(n){const a=function(n,a,s,d,c){const l=document.createElement("div"),m=document.createElement("div");if(c){const e=document.createElement("span");e.textContent=c,e.title=c,e.classList.add("todo-description"),m.appendChild(e)}if(d){d=new Date(d);const n=document.createElement("span");let a=function(n){if(o(n)||function(t){return e(1,arguments),r(t,L(Date.now(),1))}(n)||function(t){return e(1,arguments),r(t,k(Date.now(),1))}(n))return function(n,r,o){var a,s,d,c,l,m,f,h,g,v;e(2,arguments);var w=t(n),p=t(r),y=i(),T=null!==(a=null!==(s=null==o?void 0:o.locale)&&void 0!==s?s:y.locale)&&void 0!==a?a:b,C=D(null!==(d=null!==(c=null!==(l=null!==(m=null==o?void 0:o.weekStartsOn)&&void 0!==m?m:null==o||null===(f=o.locale)||void 0===f||null===(h=f.options)||void 0===h?void 0:h.weekStartsOn)&&void 0!==l?l:y.weekStartsOn)&&void 0!==c?c:null===(g=y.locale)||void 0===g||null===(v=g.options)||void 0===v?void 0:v.weekStartsOn)&&void 0!==d?d:0);if(!T.localize)throw new RangeError("locale must contain localize property");if(!T.formatLong)throw new RangeError("locale must contain formatLong property");if(!T.formatRelative)throw new RangeError("locale must contain formatRelative property");var S,M=P(w,p);if(isNaN(M))throw new RangeError("Invalid time value");S=M<-6?"other":M<-1?"lastWeek":M<0?"yesterday":M<1?"today":M<2?"tomorrow":M<7?"nextWeek":"other";var x=W(w,u(w)),k=W(p,u(p)),L=T.formatRelative(S,x,k,{locale:T,weekStartsOn:C});return we(w,L,{locale:T,weekStartsOn:C})}(n,new Date);let a=n.getFullYear()==(new Date).getFullYear();return we(n,`MMM d ${a?"":"yyyy"} h:mm a`)}(d);const s=function(t,n){return e(1,arguments),x(t,Date.now(),n)}(d,{addSuffix:!0});n.textContent=a,n.title=`Due date: ${s}`,n.classList.add("todo-date"),m.appendChild(n)}const f=document.createElement("span");f.title=n,f.textContent=n,f.classList.add("todo-title");const h=document.createElement("button");h.setAttribute("todo-index-number",a),h.setAttribute("project-index-number",s),h.classList.add("mark-todo-complete");const g=ee("M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z","currentColor");return g.classList.add("checkmark"),h.appendChild(g),l.classList.add("todo"),m.classList.add("todo-info"),l.appendChild(h),m.prepend(f),l.appendChild(m),l}(n.title,n.id,n.projectId,n.dueDate,n.description);let s;s="High"==n.priority?N:"Medium"==n.priority?U:j,s.appendChild(a),s.classList.add("visible")}function Q(e){let t=document.createElement("option");return t.textContent=e,t.value=e,t}function G(e){document.querySelector(".active").classList.remove("active"),e.classList.add("active")}function X(e){n.classList.toggle("open"),e.classList.toggle("open"),document.body.classList.toggle("modal-open")}function J(){n.classList.remove("open");for(let e=0;e<n.childElementCount;e++)n.children[e].classList.remove("open")}function _(e){const t=(_.canvas||(_.canvas=document.createElement("canvas"))).getContext("2d");return t.font="14px Montserrat",t.measureText(e).width}function $(){return document.querySelector(".active")}function Z(){const e=document.querySelector(".project.active");return Array.from(w).indexOf(e)}function K(e,t,n,r){console.log(e,r);const o=document.createElement("li");o.textContent=e,r&&o.classList.add(r),t&&o.setAttribute(t,n),O.appendChild(o)}function ee(e,t){const n=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill",t),r.setAttribute("d",e),n.appendChild(r),n}I.addEventListener("keyup",(e=>{const t=e.target.checkValidity(),n=e.target.classList;t&&n.contains("error")?(n.add("valid"),n.remove("error"),B.classList.remove("visible")):!t&&n.contains("valid")&&(n.remove("valid"),n.add("error"),B.classList.add("visible"))})),h.addEventListener("click",(()=>{const e=document.querySelector("#todo-title").value;if(!e)return I.classList.add("error"),B.classList.add("visible"),void I.focus();const t=document.querySelector("#due-date").value||null,n=document.querySelector("#description").value||"",r=document.querySelector("#priority").value,a=document.querySelector("#project").selectedIndex,i=ye.getProject(a),u=i.addTodo(e,n,t,r,i.todos),s=$().classList;if(s.contains("today")&&o(new Date(t)))return V(u);(Z()==a||s.contains("upcoming"))&&V(u),J()})),g.addEventListener("click",(()=>{let e=Z(),t=ye.getProject(e).id,n=w[e];console.log(n,e,t),ye.removeProject(t),console.log(e,n),p.removeChild(n),J(),H("Inbox",R.todos),document.querySelector(".inbox").classList.add("active")})),M.addEventListener("click",(()=>{document.querySelector("body").classList.toggle("sidebar-hidden"),E.classList.toggle("hidden"),document.querySelector(".todos").classList.toggle("sidebar-hidden")}))}()})();