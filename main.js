(()=>{"use strict";function e(e,t){const d=document.createElementNS("http://www.w3.org/2000/svg","svg"),n=document.createElementNS("http://www.w3.org/2000/svg","path");return d.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill",e),n.setAttribute("d",t),d.appendChild(n),d}let t=document.querySelector("#content");t.appendChild(function(){let e=document.createElement("div");return e.classList.add("header"),e}()),t.appendChild(function(){let e=document.createElement("div");return e.classList.add("main"),e}()),t.appendChild(function(){let t=document.createElement("div");t.classList.add("sidebar");let d=document.createElement("div");d.classList.add("links");let n=document.createElement("div"),c=e("currentColor","M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"),l=document.createTextNode("Inbox");n.appendChild(c),n.appendChild(l);let a=document.createElement("div"),i=e("currentColor","M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z"),o=document.createTextNode("Today");a.appendChild(i),a.appendChild(o);let r=document.createElement("div"),s=e("currentColor","M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"),p=document.createTextNode("View All");r.appendChild(s),r.appendChild(p);let u=document.createElement("div");u.classList.add("projects");let m=e("currentColor","M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"),H=document.createTextNode("Project");return u.appendChild(m),u.appendChild(H),n.classList.add("inbox"),a.classList.add("today"),r.classList.add("upcoming"),d.appendChild(n),d.appendChild(a),d.appendChild(r),t.appendChild(d),t.appendChild(u),t}()),function(){const e=document.querySelectorAll(".links div");e[0].classList.toggle("active"),e.forEach((t=>t.addEventListener("click",(d=>{e.forEach((e=>e.classList.remove("active"))),t.classList.toggle("active")}))));const t=document.querySelector(".projects"),d=document.querySelector(".projects > svg");t.addEventListener("click",(()=>{d.classList.toggle("rotated")}))}()})();