import {
  formatDistance,
  subDays,
  addDays,
  formatDistanceStrict,
  set,
} from "date-fns";

const APP = (function () {
  const todos = getLocalStorageItem("todos");
  const inbox = getLocalStorageItem("inbox");
  const projects = getLocalStorageItem("projects");

  function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorageItem(key) {
    const item = JSON.parse(localStorage.getItem(key));
    // if item exists in the local storage, return it. else empty array.
    return item ? item : [];
  }

  // Pushes todo object into array and sets local storage
  function createTodo(projectName, title, description, dueDate, priority) {
    todos.push({ projectName, title, description, dueDate, priority });
    setLocalStorageItem("todos", todos);
    return { projectName, title, description, dueDate, priority };
  }

  function createProject(name) {
    const projectTodos = [];
    function addTodo(projectName, title, description, dueDate, priority) {
      const todo = createTodo(
        projectName,
        title,
        description,
        dueDate,
        priority
      );
      projectTodos.push(todo);
    }
    projects.push({ name, todos: projectTodos, addTodo });
    setLocalStorageItem("projects", projects);
    return { name, todos: projectTodos, addTodo };
  }

  function removeProject(index) {
    projects.splice(index, 1);
  }

  const getTodos = () => todos;
  const getProjects = () => projects;
  const getInbox = () => inbox;

  return { createTodo, createProject, getTodos, getProjects, getInbox };
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
  const menu = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  // Shows LocalStorage projects
  for (let project of APP.getProjects()) displayProject(project.name);

  function switchTab(title, todos) {
    // Resets main content
    main.textContent = "";

    const header = document.createElement("h1");
    const d = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
    const fill = "#0369a1";
    const addSymbol = createSVG(d, fill);
    const ADD_TASK = document.createElement("button");
    ADD_TASK.appendChild(addSymbol);
    ADD_TASK.appendChild(document.createTextNode("Add Task"));

    const todosContainer = document.createElement("div");
    todosContainer.classList.add("todos");
    todos = todos ? todos : [];
    for (const todo of todos) {
      let todoElement = document.createElement("div");
      // append todo
    }

    header.textContent = title;
    main.appendChild(header);
    main.appendChild(todosContainer);
    main.appendChild(ADD_TASK);
  }
  switchTab("Inbox");

  function removeAllActiveClass() {
    links.forEach((e) => e.classList.remove("active"));
    projects.childNodes.forEach((e) => e.classList.remove("active"));
  }

  function displayProject(title) {
    const d =
      "M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z";
    const fill = "currentColor";
    const SVG = createSVG(d, fill);
    const text = document.createElement("span");
    text.textContent = title;
    text.classList.add("project-title");

    const project = document.createElement("div");
    project.classList.add("project");
    project.appendChild(SVG);
    project.appendChild(text);
    projects.appendChild(project);
  }

  main.addEventListener("click", (e) => {
    if (e.target.closest("button")) {
      // add task
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      removeAllActiveClass();
      link.classList.toggle("active");
      switchTab(link.textContent);
    });
  });
  projects.addEventListener("click", (e) => {
    const project = e.target.closest(".project");
    const projectsContainer = document.querySelector(".projects");
    // Highlights clicked.
    removeAllActiveClass();
    project.classList.add("active");
    // Gets index of project
    const index = Array.from(projectsContainer.children).indexOf(project);

    const projects = APP.getProjects();
    const projectName = projects[index]["name"];
    switchTab(projectName);
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
  // Adds project to localstorage and displays it.
  submit.addEventListener("click", () => {
    const name = document.querySelector("#name").value;
    if (!name) return;
    modal.classList.remove("open");
    APP.createProject(name);
    displayProject(name);
  });

  // Toggle sidebar showing
  menu.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("sidebar-hidden");
    sidebar.classList.toggle("hidden");
  });

  // Helper Functions

  function createSVG(d, fill) {
    const SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    SVG.setAttribute("viewBox", "0 0 24 24");
    path.setAttribute("fill", fill);
    path.setAttribute("d", d);
    SVG.appendChild(path);
    return SVG;
  }
  function createTodoElement(title, dueDate) {}
})();
