(()=>{"use strict";const e=function(){const e=d("todos"),t=d("projects");let o=e.length?e.at(-1).id:-1,n=t.length?t.at(-1).id:-1;t.length||s("Inbox");for(const e of t)e.addTodo=l(e.todos),e.removeTodo=i();function c(e,t){localStorage.setItem(e,JSON.stringify(t))}function d(e){return JSON.parse(localStorage.getItem(e))||[]}function r(t,n,c,d){const r=++o;return console.log(o),e.push({title:t,description:n,dueDate:c,priority:d,id:r}),u(),{title:t,description:n,dueDate:c,priority:d,id:r}}function s(e){const o=[],c=++n,d=l(o),r=i();return t.push({name:e,todos:o,addTodo:d,removeTodo:r,id:c}),u(),{name:e,todos:o,addTodo:d,removeTodo:r,id:c}}function l(e){return function(t,o,n,c){const d=r(t,o,n,c);return e.push(d),u(),d}}function i(){return function(t){const o=a(this.todos,"id",t),n=a(e,"id",t);e.splice(n,1),this.todos.splice(o,1),u()}}function a(e,t,o){return e.findIndex((e=>e[t]==o))}function u(){c("projects",t),c("todos",e)}const m=e=>t[e];return{createTodo:r,createProject:s,removeProject:function(e){const o=a(t,"id",e),n=m(o);t.splice(o,1);for(const e of n.todos)n.removeTodo(e.id);u()},getTodos:()=>e,getProjects:()=>t,getProject:m}}();!function(){const t=document.querySelector(".modal"),o=document.querySelector(".modal-form"),n=document.querySelector(".add-todo-form"),c=document.querySelector(".add-project-modal"),d=document.querySelector(".add-todo-modal"),r=document.querySelector(".delete-modal"),s=document.querySelectorAll(".cancel"),l=document.querySelector(".submit"),i=document.querySelector(".submit-todo"),a=document.querySelector(".delete"),u=document.querySelector(".open-project > svg"),m=document.getElementsByClassName("project"),p=document.querySelector(".projects"),g=document.querySelector(".add-todo"),f=document.querySelector(".todos"),v=document.querySelector(".projectTab"),y=document.querySelectorAll(".links div"),L=document.querySelector(".hamburger"),S=document.querySelector(".sidebar"),h=document.querySelector(".main-content");for(let t of e.getProjects().slice(1))E(t.name);function q(e,t=[]){document.querySelector(".main-header").textContent=e,f.textContent="";for(const e of t)b(e)}const j=e.getProject(0);function E(e){const t=document.createElement("div"),o=document.createElement("div"),n=document.createElement("button");t.classList.add("project"),o.classList.add("project-left"),n.classList.add("project-right");const c=A("M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z","currentColor"),d=document.createElement("span");d.textContent=e,d.classList.add("project-title");const r=A("M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z","currentColor");r.classList.add("delete-svg"),o.appendChild(c),o.appendChild(d),n.appendChild(r),t.appendChild(o),t.appendChild(n),p.appendChild(t)}function b(e){const t=function(e,t,o){o=o||"1984/10/10";const n=new Date(o);console.log(n);const c=document.createElement("div"),d=document.createElement("span");d.textContent=e;const r=document.createElement("button");return r.classList.add("mark-todo-complete"),c.classList.add("todo"),r.setAttribute("data-index-number",t),c.appendChild(r),c.appendChild(d),c}(e.title,e.id,e.dueDate||null);f.appendChild(t)}function C(e){let t=document.createElement("option");return t.textContent=e,t.value=e,t}function x(){document.querySelector(".active").classList.remove("active")}function H(){t.classList.remove("open");for(let e=0;e<t.childElementCount;e++)t.children[e].classList.remove("open")}function k(){const e=document.querySelector(".project.active");return Array.from(m).indexOf(e)}function A(e,t){const o=document.createElementNS("http://www.w3.org/2000/svg","svg"),n=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill",t),n.setAttribute("d",e),o.appendChild(n),o}q("Inbox",j.todos),h.addEventListener("click",(t=>{if("mark-todo-complete"==t.target.className){console.log("marking complete..");const o=e.getProject(k()),n=t.target.getAttribute("data-index-number");console.log({todoId:n}),o.removeTodo(n),q(o.name,o.todos)}})),g.addEventListener("click",(o=>{n.reset(),t.classList.add("open"),d.classList.add("open");const c=document.querySelector("#project");c.textContent="";for(const t of e.getProjects()){let e=t.name;e.length>19&&(e=e.substring(0,19)+"...");let o=C(e);c.appendChild(o)}const r=k();c.children[r].selected=!0})),y.forEach((e=>{e.addEventListener("click",(()=>{x(),e.classList.toggle("active");const t=e.innerText;q(t,"Inbox"==t?j.todos:[])}))})),p.addEventListener("click",(o=>{o.target.closest(".project-right")&&(t.classList.add("open"),r.classList.add("open")),x(),o.target.closest(".project").classList.add("active");const n=k(),c=e.getProject(n);console.log(c.id),console.log(e.getTodos()),q(c.name,c.todos)})),v.addEventListener("click",(e=>{if(e.target.contains(u))return p.classList.toggle("closed"),void u.classList.toggle("rotated");t.classList.toggle("open"),c.classList.toggle("open"),o.reset()})),s.forEach((e=>{e.addEventListener("click",H)})),l.addEventListener("click",(()=>{const t=document.querySelector("#name").value;t&&(H(),e.createProject(t),E(t))})),i.addEventListener("click",(()=>{const t=document.querySelector("#todo-title").value;if(!t)return;const o=document.querySelector("#description").value||"",n=document.querySelector("#due-date").value||"",c=document.querySelector("#priority").value,d=document.querySelector("#project").selectedIndex,r=e.getProject(d);b(r.addTodo(t,o,n,c,r.todos)),H()})),a.addEventListener("click",(()=>{let t=k(),o=e.getProject(t).id,n=m[t];console.log(n,t),e.removeProject(o),console.log(t,n),p.removeChild(n),H(),q("Inbox",j.todos),document.querySelector(".inbox").classList.add("active")})),L.addEventListener("click",(()=>{document.querySelector("body").classList.toggle("sidebar-hidden"),S.classList.toggle("hidden")}))}()})();