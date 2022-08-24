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
    setLocalStorageItem("projects", projects);
  }

  const getTodos = () => todos;
  const getProjects = () => projects;
  const getInbox = () => inbox;

  return {
    createTodo,
    createProject,
    removeProject,
    getTodos,
    getProjects,
    getInbox,
  };
})();
const DOM = (function () {
  // declare selector
  const modal = document.querySelector(".modal");
  const modalForm = document.querySelector(".modal-form");
  const addProjectModal = document.querySelector(".add-project-modal");
  const deleteModal = document.querySelector(".delete-modal");
  const cancel = document.querySelectorAll(".cancel");
  const submit = document.querySelector(".submit");
  const deleteButton = document.querySelector(".delete");
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

  function displayProject(title) {
    const project = document.createElement("div");
    const projectLeft = document.createElement("div");
    const projectRight = document.createElement("button");
    project.classList.add("project");
    projectLeft.classList.add("project-left");
    projectRight.classList.add("project-right");

    const LIST_SVG = createSVG(
      "M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z",
      "currentColor"
    );
    const projectTitle = document.createElement("span");
    projectTitle.textContent = title;
    projectTitle.classList.add("project-title");

    const DELETE_SVG = createSVG(
      "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",
      "currentColor"
    );

    projectLeft.appendChild(LIST_SVG);
    projectLeft.appendChild(projectTitle);
    projectRight.appendChild(DELETE_SVG);
    project.appendChild(projectLeft);
    project.appendChild(projectRight);
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
    // if delete button clicked, show confirm modal
    if (e.target.closest(".project-right")) {
      modal.classList.add("open");
      deleteModal.classList.add("open");
    }

    const project = e.target.closest(".project");
    // Highlights clicked.
    removeAllActiveClass();
    project.classList.add("active");
    const index = getActiveProjectIndex();
    const APP_PROJECTS = APP.getProjects();
    const projectName = APP_PROJECTS[index]["name"];
    const projectTodos = APP_PROJECTS[index]["todos"];
    switchTab(projectName, projectTodos);
  });

  projectTab.addEventListener("click", (e) => {
    if (e.target.contains(svgArrow)) {
      // toggle show project
      projects.classList.toggle("closed");
      svgArrow.classList.toggle("rotated");
      return;
    }
    modal.classList.toggle("open");
    addProjectModal.classList.toggle("open");
    console.log(addProjectModal.classList);

    modalForm.reset();
  });

  cancel.forEach((btn) => btn.addEventListener("click", closeAllModals));
  // Adds project to localstorage and displays it.
  submit.addEventListener("click", () => {
    const name = document.querySelector("#name").value;
    if (!name) return;
    closeAllModals();
    APP.createProject(name);
    displayProject(name);
  });

  deleteButton.addEventListener("click", () => {
    let inbox = document.querySelector(".inbox");
    let projectIndex = getActiveProjectIndex();
    let project = projects.children[projectIndex];
    // Remove project from app and dom
    APP.removeProject(projectIndex);
    projects.removeChild(project);
    closeAllModals();
    // default to inbox tab
    switchTab("Inbox");
    inbox.classList.add("active");
  });

  // Toggle sidebar showing
  menu.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("sidebar-hidden");
    sidebar.classList.toggle("hidden");
  });

  // Helper Functions

  function removeAllActiveClass() {
    const active = document.querySelectorAll(".active");
    active.forEach((element) => element.classList.remove("active"));
  }
  function closeAllModals() {
    modal.classList.remove("open");
    addProjectModal.classList.remove("open");
    deleteModal.classList.remove("open");
  }

  function getActiveProjectIndex() {
    const project = document.querySelector(".project.active");
    // Search in projectsContainer the index of active project
    return Array.from(projects.children).indexOf(project);
  }

  function createSVG(d, fill) {
    const SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    SVG.setAttribute("viewBox", "0 0 24 24");
    path.setAttribute("fill", fill);
    path.setAttribute("d", d);
    SVG.appendChild(path);
    return SVG;
  }
  function createTodoElement(title, dueDate) {
    return "TOODOOOO";
  }
})();
