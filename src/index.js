import {
  formatDistance,
  subDays,
  addDays,
  formatDistanceStrict,
  set,
} from "date-fns";

const APP = (function () {
  const todos = getLocalStorageItem("todos");
  const projects = getLocalStorageItem("projects");

  function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorageItem(key) {
    let item = JSON.parse(localStorage.getItem(key));
    // if item exists in the local storage, return it. else empty array.
    return item ? item : [];
  }

  function createTodo(projectName, title, description, dueDate, priority) {
    todos.push({ projectName, title, description, dueDate, priority });
    setLocalStorageItem("todos", todos);
    return { projectName, title, description, dueDate, priority };
  }

  function createProject(name) {
    projects.push({ name, todos: [] });
    setLocalStorageItem("projects", projects);
    return { name, todos: [] };
  }

  const getTodos = () => todos;
  const getProjects = () => projects;

  return { createTodo, createProject, getTodos, getProjects };
})();
const DOM = (function () {
  // declare selector
  const modal = document.querySelector(".modal");
  const modalForm = document.querySelector(".modal-form");
  const cancel = document.querySelector(".cancel");
  const submit = document.querySelector(".submit");
  const svgArrow = document.querySelector(".open-project > svg");
  const projects = document.querySelector(".projects");
  const main = document.querySelector(".main");
  const projectTab = document.querySelector(".projectTab");
  const links = document.querySelectorAll(".links div");
  // Shows LocalStorage projects
  for (let project of APP.getProjects()) appendProject(project.name);

  function switchTab(title) {
    // Resets main content
    main.textContent = "";

    const header = document.createElement("h1");
    const addTask = document.createElement("button");
    const todos = document.createElement("div");

    todos.classList.add("todos");
    header.textContent = title;
    addTask.textContent = "+ Add Task";
    main.appendChild(header);
    main.appendChild(todos);
    main.appendChild(addTask);
  }
  switchTab("Inbox");

  function removeAllActiveClass() {
    links.forEach((e) => e.classList.remove("active"));
    projects.childNodes.forEach((e) => e.classList.remove("active"));
  }

  function appendProject(title) {
    const SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    SVG.setAttribute("viewBox", "0 0 24 24");
    path.setAttribute("fill", "currentColor");
    path.setAttribute(
      "d",
      "M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z"
    );
    SVG.appendChild(path);
    let project = document.createElement("div");
    project.classList.add("project");
    project.appendChild(SVG);
    project.appendChild(document.createTextNode(title));
    projects.appendChild(project);
  }

  links.forEach((link) =>
    link.addEventListener("click", () => {
      removeAllActiveClass();
      link.classList.toggle("active");
      switchTab(link.textContent);
    })
  );

  projects.addEventListener("click", (e) => {
    removeAllActiveClass();
    e.target.classList.add("active");
    // Gets index of project
    let index = Array.from(e.target.parentNode.children).indexOf(e.target);
    const projects = APP.getProjects();
    switchTab(projects[index]["name"]);
    console.log(projects, index);
  });

  projectTab.addEventListener("click", (e) => {
    if (e.target.contains(svgArrow)) {
      // toggle show project
      projects.classList.toggle("closed");
      svgArrow.classList.toggle("rotated");
      return;
    }
    modal.classList.toggle("open");
    modalForm.reset();
  });

  cancel.addEventListener("click", () => modal.classList.remove("open"));
  submit.addEventListener("click", () => {
    let name = document.querySelector("#name");
    if (!name.value) return;
    modal.classList.remove("open");
    APP.createProject(name.value);
    appendProject(name.value);
  });
})();
