(()=>{"use strict";function e(e,t){const d=document.createElementNS("http://www.w3.org/2000/svg","svg"),n=document.createElementNS("http://www.w3.org/2000/svg","path");return d.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill",e),n.setAttribute("d",t),d.appendChild(n),d}let t=document.querySelector("#content");var d;t.appendChild(function(){let e=document.createElement("div");return e.classList.add("header"),e}()),t.appendChild(function(){let e=document.createElement("div");return e.classList.add("main"),e}()),t.appendChild(function(){let t=document.createElement("div");t.classList.add("sidebar");let d=document.createElement("div");d.classList.add("links");let n=document.createElement("div"),c=e("currentColor","M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z");n.appendChild(c),n.appendChild(document.createTextNode("Inbox"));let a=document.createElement("div"),l=e("currentColor","M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z");a.appendChild(l),a.appendChild(document.createTextNode("Today"));let o=document.createElement("div"),r=e("currentColor","M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"),i=document.createTextNode("View All");o.appendChild(r),o.appendChild(i);let s=document.createElement("div"),p=document.createElement("div");p.classList.add("openProject"),s.classList.add("projects");let u=e("currentColor","M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"),H=document.createElement("button"),m=e("currentColor","M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z");return H.classList.add("add-project"),H.appendChild(m),p.appendChild(u),p.appendChild(document.createTextNode("Projects")),s.appendChild(p),s.appendChild(H),n.classList.add("inbox"),a.classList.add("today"),o.classList.add("upcoming"),d.appendChild(n),d.appendChild(a),d.appendChild(o),t.appendChild(d),t.appendChild(s),t}()),d="todos",JSON.parse(localStorage.getItem(d)),function(){const e=document.querySelectorAll(".links div");e[0].classList.toggle("active"),e.forEach((t=>t.addEventListener("click",(d=>{e.forEach((e=>e.classList.remove("active"))),t.classList.toggle("active")}))));const t=document.querySelector(".projects"),d=document.querySelector(".openProject > svg");t.addEventListener("click",(e=>{console.log(e.target.contains(d)),e.target.contains(d)&&d.classList.toggle("rotated")}))}()})();