(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function n(n){t(1,arguments);var r=e(n);return r.setHours(0,0,0,0),r}function r(e,r){t(2,arguments);var o=n(e),a=n(r);return o.getTime()===a.getTime()}function o(e){return t(1,arguments),r(e,Date.now())}var a={};function i(){return a}function u(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function d(n,r){t(2,arguments);var o=e(n),a=e(r),i=o.getTime()-a.getTime();return i<0?-1:i>0?1:i}function s(t,e){if(null==t)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}function c(t){return s({},t)}var l={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function m(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth,r=t.formats[n]||t.formats[t.defaultWidth];return r}}var f,h={date:m({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:m({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:m({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},g={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function v(t){return function(e,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&t.formattingValues){var o=t.defaultFormattingWidth||t.defaultWidth,a=null!=n&&n.width?String(n.width):o;r=t.formattingValues[a]||t.formattingValues[o]}else{var i=t.defaultWidth,u=null!=n&&n.width?String(n.width):t.defaultWidth;r=t.values[u]||t.values[i]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function w(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,o=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],a=e.match(o);if(!a)return null;var i,u=a[0],d=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],s=Array.isArray(d)?p(d,(function(t){return t.test(u)})):y(d,(function(t){return t.test(u)}));i=t.valueCallback?t.valueCallback(s):s,i=n.valueCallback?n.valueCallback(i):i;var c=e.slice(u.length);return{value:i,rest:c}}}function y(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n}function p(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n}const b={code:"en-US",formatDistance:function(t,e,n){var r,o=l[t];return r="string"==typeof o?o:1===e?o.one:o.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:h,formatRelative:function(t,e,n,r){return g[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:v({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:v({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:v({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:v({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:v({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(f={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(f.matchPattern);if(!n)return null;var r=n[0],o=t.match(f.parsePattern);if(!o)return null;var a=f.valueCallback?f.valueCallback(o[0]):o[0];a=e.valueCallback?e.valueCallback(a):a;var i=t.slice(r.length);return{value:a,rest:i}}),era:w({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:w({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:w({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:w({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:w({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var T=6e4,C=1440,S=43200,M=525600;function D(n,r,o){var a,l,m;t(2,arguments);var f=i(),h=null!==(a=null!==(l=null==o?void 0:o.locale)&&void 0!==l?l:f.locale)&&void 0!==a?a:b;if(!h.formatDistance)throw new RangeError("locale must contain localize.formatDistance property");var g=d(n,r);if(isNaN(g))throw new RangeError("Invalid time value");var v,w,y=s(c(o),{addSuffix:Boolean(null==o?void 0:o.addSuffix),comparison:g});g>0?(v=e(r),w=e(n)):(v=e(n),w=e(r));var p,D=String(null!==(m=null==o?void 0:o.roundingMethod)&&void 0!==m?m:"round");if("floor"===D)p=Math.floor;else if("ceil"===D)p=Math.ceil;else{if("round"!==D)throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");p=Math.round}var x,k=w.getTime()-v.getTime(),E=k/T,P=u(w)-u(v),L=(k-P)/T,q=null==o?void 0:o.unit;if("second"===(x=q?String(q):E<1?"second":E<60?"minute":E<C?"hour":L<S?"day":L<M?"month":"year")){var j=p(k/1e3);return h.formatDistance("xSeconds",j,y)}if("minute"===x){var U=p(E);return h.formatDistance("xMinutes",U,y)}if("hour"===x){var W=p(E/60);return h.formatDistance("xHours",W,y)}if("day"===x){var N=p(L/C);return h.formatDistance("xDays",N,y)}if("month"===x){var Y=p(L/S);return 12===Y&&"month"!==q?h.formatDistance("xYears",1,y):h.formatDistance("xMonths",Y,y)}if("year"===x){var O=p(L/M);return h.formatDistance("xYears",O,y)}throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'")}function x(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function k(n,r){t(2,arguments);var o=e(n),a=x(r);return isNaN(a)?new Date(NaN):a?(o.setDate(o.getDate()+a),o):o}function E(e,n){t(2,arguments);var r=x(n);return k(e,-r)}var P=864e5;function L(e,r){t(2,arguments);var o=n(e),a=n(r),i=o.getTime()-u(o),d=a.getTime()-u(a);return Math.round((i-d)/P)}function q(e){return t(1,arguments),e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)}function j(n){if(t(1,arguments),!q(n)&&"number"!=typeof n)return!1;var r=e(n);return!isNaN(Number(r))}function U(n,r){t(2,arguments);var o=e(n).getTime(),a=x(r);return new Date(o+a)}function W(e,n){t(2,arguments);var r=x(n);return U(e,-r)}var N=864e5;function Y(n){t(1,arguments);var r=1,o=e(n),a=o.getUTCDay(),i=(a<r?7:0)+a-r;return o.setUTCDate(o.getUTCDate()-i),o.setUTCHours(0,0,0,0),o}function O(n){t(1,arguments);var r=e(n),o=r.getUTCFullYear(),a=new Date(0);a.setUTCFullYear(o+1,0,4),a.setUTCHours(0,0,0,0);var i=Y(a),u=new Date(0);u.setUTCFullYear(o,0,4),u.setUTCHours(0,0,0,0);var d=Y(u);return r.getTime()>=i.getTime()?o+1:r.getTime()>=d.getTime()?o:o-1}function H(e){t(1,arguments);var n=O(e),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var o=Y(r);return o}var A=6048e5;function F(n,r){var o,a,u,d,s,c,l,m;t(1,arguments);var f=i(),h=x(null!==(o=null!==(a=null!==(u=null!==(d=null==r?void 0:r.weekStartsOn)&&void 0!==d?d:null==r||null===(s=r.locale)||void 0===s||null===(c=s.options)||void 0===c?void 0:c.weekStartsOn)&&void 0!==u?u:f.weekStartsOn)&&void 0!==a?a:null===(l=f.locale)||void 0===l||null===(m=l.options)||void 0===m?void 0:m.weekStartsOn)&&void 0!==o?o:0);if(!(h>=0&&h<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var g=e(n),v=g.getUTCDay(),w=(v<h?7:0)+v-h;return g.setUTCDate(g.getUTCDate()-w),g.setUTCHours(0,0,0,0),g}function R(n,r){var o,a,u,d,s,c,l,m;t(1,arguments);var f=e(n),h=f.getUTCFullYear(),g=i(),v=x(null!==(o=null!==(a=null!==(u=null!==(d=null==r?void 0:r.firstWeekContainsDate)&&void 0!==d?d:null==r||null===(s=r.locale)||void 0===s||null===(c=s.options)||void 0===c?void 0:c.firstWeekContainsDate)&&void 0!==u?u:g.firstWeekContainsDate)&&void 0!==a?a:null===(l=g.locale)||void 0===l||null===(m=l.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==o?o:1);if(!(v>=1&&v<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var w=new Date(0);w.setUTCFullYear(h+1,0,v),w.setUTCHours(0,0,0,0);var y=F(w,r),p=new Date(0);p.setUTCFullYear(h,0,v),p.setUTCHours(0,0,0,0);var b=F(p,r);return f.getTime()>=y.getTime()?h+1:f.getTime()>=b.getTime()?h:h-1}function z(e,n){var r,o,a,u,d,s,c,l;t(1,arguments);var m=i(),f=x(null!==(r=null!==(o=null!==(a=null!==(u=null==n?void 0:n.firstWeekContainsDate)&&void 0!==u?u:null==n||null===(d=n.locale)||void 0===d||null===(s=d.options)||void 0===s?void 0:s.firstWeekContainsDate)&&void 0!==a?a:m.firstWeekContainsDate)&&void 0!==o?o:null===(c=m.locale)||void 0===c||null===(l=c.options)||void 0===l?void 0:l.firstWeekContainsDate)&&void 0!==r?r:1),h=R(e,n),g=new Date(0);g.setUTCFullYear(h,0,f),g.setUTCHours(0,0,0,0);var v=F(g,n);return v}var I=6048e5;function B(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const Q=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return B("yy"===e?r%100:r,e.length)},G=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):B(n+1,2)},V=function(t,e){return B(t.getUTCDate(),e.length)},X=function(t,e){return B(t.getUTCHours()%12||12,e.length)},J=function(t,e){return B(t.getUTCHours(),e.length)},_=function(t,e){return B(t.getUTCMinutes(),e.length)},$=function(t,e){return B(t.getUTCSeconds(),e.length)},Z=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return B(Math.floor(r*Math.pow(10,n-3)),e.length)};function K(t,e){var n=t>0?"-":"+",r=Math.abs(t),o=Math.floor(r/60),a=r%60;if(0===a)return n+String(o);var i=e||"";return n+String(o)+i+B(a,2)}function tt(t,e){return t%60==0?(t>0?"-":"+")+B(Math.abs(t)/60,2):et(t,e)}function et(t,e){var n=e||"",r=t>0?"-":"+",o=Math.abs(t);return r+B(Math.floor(o/60),2)+n+B(o%60,2)}const nt={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),o=r>0?r:1-r;return n.ordinalNumber(o,{unit:"year"})}return Q(t,e)},Y:function(t,e,n,r){var o=R(t,r),a=o>0?o:1-o;return"YY"===e?B(a%100,2):"Yo"===e?n.ordinalNumber(a,{unit:"year"}):B(a,e.length)},R:function(t,e){return B(O(t),e.length)},u:function(t,e){return B(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return B(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return B(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return G(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return B(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,o,a){var i=function(n,r){t(1,arguments);var o=e(n),a=F(o,r).getTime()-z(o,r).getTime();return Math.round(a/I)+1}(n,a);return"wo"===r?o.ordinalNumber(i,{unit:"week"}):B(i,r.length)},I:function(n,r,o){var a=function(n){t(1,arguments);var r=e(n),o=Y(r).getTime()-H(r).getTime();return Math.round(o/A)+1}(n);return"Io"===r?o.ordinalNumber(a,{unit:"week"}):B(a,r.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):V(t,e)},D:function(n,r,o){var a=function(n){t(1,arguments);var r=e(n),o=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var a=r.getTime(),i=o-a;return Math.floor(i/N)+1}(n);return"Do"===r?o.ordinalNumber(a,{unit:"dayOfYear"}):B(a,r.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var o=t.getUTCDay(),a=(o-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(a);case"ee":return B(a,2);case"eo":return n.ordinalNumber(a,{unit:"day"});case"eee":return n.day(o,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(o,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(o,{width:"short",context:"formatting"});default:return n.day(o,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var o=t.getUTCDay(),a=(o-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(a);case"cc":return B(a,e.length);case"co":return n.ordinalNumber(a,{unit:"day"});case"ccc":return n.day(o,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(o,{width:"narrow",context:"standalone"});case"cccccc":return n.day(o,{width:"short",context:"standalone"});default:return n.day(o,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),o=0===r?7:r;switch(e){case"i":return String(o);case"ii":return B(o,e.length);case"io":return n.ordinalNumber(o,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,o=t.getUTCHours();switch(r=12===o?"noon":0===o?"midnight":o/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,o=t.getUTCHours();switch(r=o>=17?"evening":o>=12?"afternoon":o>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return X(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):J(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):B(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):B(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):_(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):$(t,e)},S:function(t,e){return Z(t,e)},X:function(t,e,n,r){var o=(r._originalDate||t).getTimezoneOffset();if(0===o)return"Z";switch(e){case"X":return tt(o);case"XXXX":case"XX":return et(o);default:return et(o,":")}},x:function(t,e,n,r){var o=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return tt(o);case"xxxx":case"xx":return et(o);default:return et(o,":")}},O:function(t,e,n,r){var o=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+K(o,":");default:return"GMT"+et(o,":")}},z:function(t,e,n,r){var o=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+K(o,":");default:return"GMT"+et(o,":")}},t:function(t,e,n,r){var o=r._originalDate||t;return B(Math.floor(o.getTime()/1e3),e.length)},T:function(t,e,n,r){return B((r._originalDate||t).getTime(),e.length)}};var rt=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},ot=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},at={p:ot,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],o=r[1],a=r[2];if(!a)return rt(t,e);switch(o){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",rt(o,e)).replace("{{time}}",ot(a,e))}};const it=at;var ut=["D","DD"],dt=["YY","YYYY"];function st(t){return-1!==ut.indexOf(t)}function ct(t){return-1!==dt.indexOf(t)}function lt(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var mt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,ft=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ht=/^'([^]*?)'?$/,gt=/''/g,vt=/[a-zA-Z]/;function wt(n,r,o){var a,d,s,c,l,m,f,h,g,v,w,y,p,T,C,S,M,D;t(2,arguments);var k=String(r),E=i(),P=null!==(a=null!==(d=null==o?void 0:o.locale)&&void 0!==d?d:E.locale)&&void 0!==a?a:b,L=x(null!==(s=null!==(c=null!==(l=null!==(m=null==o?void 0:o.firstWeekContainsDate)&&void 0!==m?m:null==o||null===(f=o.locale)||void 0===f||null===(h=f.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==l?l:E.firstWeekContainsDate)&&void 0!==c?c:null===(g=E.locale)||void 0===g||null===(v=g.options)||void 0===v?void 0:v.firstWeekContainsDate)&&void 0!==s?s:1);if(!(L>=1&&L<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var q=x(null!==(w=null!==(y=null!==(p=null!==(T=null==o?void 0:o.weekStartsOn)&&void 0!==T?T:null==o||null===(C=o.locale)||void 0===C||null===(S=C.options)||void 0===S?void 0:S.weekStartsOn)&&void 0!==p?p:E.weekStartsOn)&&void 0!==y?y:null===(M=E.locale)||void 0===M||null===(D=M.options)||void 0===D?void 0:D.weekStartsOn)&&void 0!==w?w:0);if(!(q>=0&&q<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!P.localize)throw new RangeError("locale must contain localize property");if(!P.formatLong)throw new RangeError("locale must contain formatLong property");var U=e(n);if(!j(U))throw new RangeError("Invalid time value");var N=u(U),Y=W(U,N),O={firstWeekContainsDate:L,weekStartsOn:q,locale:P,_originalDate:U},H=k.match(ft).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,it[e])(t,P.formatLong):t})).join("").match(mt).map((function(t){if("''"===t)return"'";var e=t[0];if("'"===e)return yt(t);var a=nt[e];if(a)return null!=o&&o.useAdditionalWeekYearTokens||!ct(t)||lt(t,r,String(n)),null!=o&&o.useAdditionalDayOfYearTokens||!st(t)||lt(t,r,String(n)),a(Y,t,P.localize,O);if(e.match(vt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return t})).join("");return H}function yt(t){var e=t.match(ht);return e?e[1].replace(gt,"'"):t}const pt=function(){const t=a("todos"),e=a("projects");let n=t.length?t.at(-1).id:-1,r=e.length?e.at(-1).id:-1;e.length||u("Inbox");for(const t of e)t.addTodo=d(t.todos,t.id),t.removeTodo=s();function o(t,e){localStorage.setItem(t,JSON.stringify(e))}function a(t){return JSON.parse(localStorage.getItem(t))||[]}function i(e,r,o,a,i){const u=++n;return console.log(n),t.push({title:e,description:r,dueDate:o,priority:a,id:u,projectId:i}),l(),{title:e,description:r,dueDate:o,priority:a,id:u,projectId:i}}function u(t){const n=[],o=++r,a=d(n,o),i=s();return e.push({name:t,todos:n,addTodo:a,removeTodo:i,id:o}),l(),{name:t,todos:n,addTodo:a,removeTodo:i,id:o}}function d(t,e){return function(n,r,o,a){const u=i(n,r,o,a,e);return t.push(u),l(),u}}function s(){return function(e){const n=c(this.todos,"id",e),r=c(t,"id",e);t.splice(r,1),this.todos.splice(n,1),l()}}function c(t,e,n){return t.findIndex((t=>t[e]==n))}function l(){o("projects",e),o("todos",t)}const m=t=>e[t];return{createTodo:i,createProject:u,removeProject:function(t){const n=c(e,"id",t),r=m(n);e.splice(n,1);let o=[...r.todos];for(const t of o)r.removeTodo(t.id);l()},getTodos:()=>t,getProjects:()=>e,getProject:m,getProjectById:t=>e.find((e=>e.id==t))}}();!function(){const n=document.querySelector(".modal"),a=document.querySelector(".modal-form"),d=document.querySelector(".add-todo-form"),s=document.querySelector(".add-project-modal"),c=document.querySelector(".add-todo-modal"),l=document.querySelector(".delete-modal"),m=document.querySelectorAll(".cancel"),f=document.querySelector(".submit"),h=document.querySelector(".submit-todo"),g=document.querySelector(".delete"),v=document.querySelector(".open-project > svg"),w=document.getElementsByClassName("project"),y=document.querySelector(".projects"),p=document.querySelector(".add-todo"),T=document.querySelector(".todos"),C=document.getElementsByClassName("todo"),S=document.querySelector(".projectTab"),M=document.querySelectorAll(".links div"),P=document.querySelector(".hamburger"),q=document.querySelector(".sidebar"),j=document.querySelector(".main-content");for(let t of pt.getProjects().slice(1))H(t.name);function U(t,e=[]){document.querySelector(".main-header").textContent=t,Y(e)}function N(){const t=pt.getProjects();let e=[];for(const n of t)for(const t of n.todos)o(new Date(t.dueDate))&&e.push(t);return e}function Y(t=[]){Array.from(C).forEach((t=>t.remove()));for(const e of t)R(e)}const O=pt.getProject(0);function H(t){const e=document.createElement("div"),n=document.createElement("div"),r=document.createElement("button");e.classList.add("project"),n.classList.add("project-left"),r.classList.add("project-right");const o=J("M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z","currentColor"),a=document.createElement("span");a.title=t,a.textContent=t,a.classList.add("project-title");const i=J("M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z","currentColor");i.classList.add("delete-svg"),n.appendChild(o),n.appendChild(a),r.appendChild(i),e.appendChild(n),e.appendChild(r),y.appendChild(e)}U("Inbox",O.todos),j.addEventListener("click",(t=>{if("mark-todo-complete"==t.target.className){console.log("marking complete.."),console.log(pt.getProjects());const e=pt.getProjectById(t.target.getAttribute("project-index-number")),n=t.target.getAttribute("todo-index-number");console.log({todoId:n,project:e,e:t.target}),e.removeTodo(n);const r=V();r.classList.contains("today")?Y(N()):r.classList.contains("upcoming")?Y(pt.getTodos()):Y(e.todos)}})),p.addEventListener("click",(t=>{d.reset(),A.classList.remove("valid"),A.classList.remove("error"),F.classList.remove("visible"),n.classList.add("open"),c.classList.add("open");const e=document.querySelector("#project");e.textContent="";for(const t of pt.getProjects()){let n=t.name,o=G(n);o>250&&(r=o>1200?4:o>800?12:20,n=n.substring(0,r)+"...");let a=z(n);e.appendChild(a)}var r;const o=X();-1!=o&&(e.children[o].selected=!0)})),M.forEach((t=>{t.addEventListener("click",(()=>{I(t);const e=t.innerText;console.log(N()),U(e,"Inbox"==e?O.todos:"Today"==e?N():pt.getTodos())}))})),y.addEventListener("click",(t=>{t.target.closest(".project-right")&&B(l),I(t.target.closest(".project"));const e=X(),n=pt.getProject(e);console.log(n.id),console.log(pt.getTodos()),U(n.name,n.todos)})),S.addEventListener("click",(t=>{if(t.target.contains(v))return y.classList.toggle("closed"),void v.classList.toggle("rotated");B(s),a.reset()})),m.forEach((t=>{t.addEventListener("click",Q)})),f.addEventListener("click",(()=>{const t=document.querySelector("#name").value;t&&(Q(),pt.createProject(t),H(t))}));const A=document.querySelector("#todo-title"),F=document.querySelector(".title-error-text");function R(n){const a=function(n,a,d,s,c){const l=document.createElement("div"),m=document.createElement("div");if(c){const t=document.createElement("span");t.textContent=c,t.title=c,t.classList.add("todo-description"),m.appendChild(t)}if(s){s=new Date(s);const n=document.createElement("span");let a=function(n){if(o(n)||function(e){return t(1,arguments),r(e,E(Date.now(),1))}(n)||function(e){return t(1,arguments),r(e,k(Date.now(),1))}(n))return function(n,r,o){var a,d,s,c,l,m,f,h,g,v;t(2,arguments);var w=e(n),y=e(r),p=i(),T=null!==(a=null!==(d=null==o?void 0:o.locale)&&void 0!==d?d:p.locale)&&void 0!==a?a:b,C=x(null!==(s=null!==(c=null!==(l=null!==(m=null==o?void 0:o.weekStartsOn)&&void 0!==m?m:null==o||null===(f=o.locale)||void 0===f||null===(h=f.options)||void 0===h?void 0:h.weekStartsOn)&&void 0!==l?l:p.weekStartsOn)&&void 0!==c?c:null===(g=p.locale)||void 0===g||null===(v=g.options)||void 0===v?void 0:v.weekStartsOn)&&void 0!==s?s:0);if(!T.localize)throw new RangeError("locale must contain localize property");if(!T.formatLong)throw new RangeError("locale must contain formatLong property");if(!T.formatRelative)throw new RangeError("locale must contain formatRelative property");var S,M=L(w,y);if(isNaN(M))throw new RangeError("Invalid time value");S=M<-6?"other":M<-1?"lastWeek":M<0?"yesterday":M<1?"today":M<2?"tomorrow":M<7?"nextWeek":"other";var D=W(w,u(w)),k=W(y,u(y)),E=T.formatRelative(S,D,k,{locale:T,weekStartsOn:C});return wt(w,E,{locale:T,weekStartsOn:C})}(n,new Date);let a=n.getFullYear()==(new Date).getFullYear();return wt(n,`MMM d ${a?"":"yyyy"} h:mm a`)}(s);const d=function(e,n){return t(1,arguments),D(e,Date.now(),n)}(s,{addSuffix:!0});n.textContent=a,n.title=`Due date: ${d}`,n.classList.add("todo-date"),m.appendChild(n)}const f=document.createElement("span");f.title=n,f.textContent=n,f.classList.add("todo-title");const h=document.createElement("button");return h.setAttribute("todo-index-number",a),h.setAttribute("project-index-number",d),h.classList.add("mark-todo-complete"),l.classList.add("todo"),m.classList.add("todo-info"),l.appendChild(h),m.prepend(f),l.appendChild(m),l}(n.title,n.id,n.projectId,n.dueDate,n.description);n.priority,T.appendChild(a)}function z(t){let e=document.createElement("option");return e.textContent=t,e.value=t,e}function I(t){document.querySelector(".active").classList.remove("active"),t.classList.add("active")}function B(t){n.classList.toggle("open"),t.classList.toggle("open"),document.body.classList.toggle("modal-open")}function Q(){n.classList.remove("open");for(let t=0;t<n.childElementCount;t++)n.children[t].classList.remove("open")}function G(t){const e=(G.canvas||(G.canvas=document.createElement("canvas"))).getContext("2d");return e.font="14px Montserrat",e.measureText(t).width}function V(){return document.querySelector(".active")}function X(){const t=document.querySelector(".project.active");return Array.from(w).indexOf(t)}function J(t,e){const n=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill",e),r.setAttribute("d",t),n.appendChild(r),n}A.addEventListener("keyup",(t=>{const e=t.target.checkValidity(),n=t.target.classList;e&&n.contains("error")?(n.add("valid"),n.remove("error"),F.classList.remove("visible")):!e&&n.contains("valid")&&(n.remove("valid"),n.add("error"),F.classList.add("visible"))})),h.addEventListener("click",(()=>{const t=document.querySelector("#todo-title").value;if(!t)return A.classList.add("error"),F.classList.add("visible"),void A.focus();const e=document.querySelector("#due-date").value||null,n=document.querySelector("#description").value||"",r=document.querySelector("#priority").value,a=document.querySelector("#project").selectedIndex,i=pt.getProject(a),u=i.addTodo(t,n,e,r,i.todos),d=V().classList;d.contains("today")?o(new Date(e))&&R(u):(X()==a||d.contains("upcoming"))&&R(u),Q()})),g.addEventListener("click",(()=>{let t=X(),e=pt.getProject(t).id,n=w[t];console.log(n,t,e),pt.removeProject(e),console.log(t,n),y.removeChild(n),Q(),U("Inbox",O.todos),document.querySelector(".inbox").classList.add("active")})),P.addEventListener("click",(()=>{document.querySelector("body").classList.toggle("sidebar-hidden"),q.classList.toggle("hidden"),document.querySelector(".todos").classList.toggle("sidebar-hidden")}))}()})();