import { format, formatDistanceToNowStrict } from "date-fns";

const APP = (function () {
  const todos = getLocalStorageItem("todos");
  const projects = getLocalStorageItem("projects");
  // if todo exists, get number to count up from
  let todoIdCount = todos.length ? todos.at(-1).id : -1;
  let projectIdCount = projects.length ? projects.at(-1).id : -1;
  if (!projects.length) {
    createProject("Inbox");
  }
  // On load, re adds function. Because JSON can't store functions
  for (const project of projects) {
    project.addTodo = getAddTodoFunction(project.todos);
    project.removeTodo = getRemoveTodo();
  }

  function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorageItem(key) {
    const item = JSON.parse(localStorage.getItem(key));
    // if item exists in the local storage, return it. else empty array.
    return item ? item : [];
  }

  function createTodo(title, description, dueDate, priority) {
    const id = ++todoIdCount;
    console.log(todoIdCount);
    todos.push({ title, description, dueDate, priority, id });
    saveToLocalStorage();
    return { title, description, dueDate, priority, id };
  }

  function createProject(name) {
    const todos = [];
    const id = ++projectIdCount;
    const addTodo = getAddTodoFunction(todos);
    const removeTodo = getRemoveTodo();
    projects.push({ name, todos, addTodo, removeTodo, id });
    saveToLocalStorage();
    return { name, todos, addTodo, removeTodo, id };
  }

  function getAddTodoFunction(todos) {
    return function (title, description, dueDate, priority) {
      const todo = createTodo(title, description, dueDate, priority);
      todos.push(todo);
      saveToLocalStorage();
      return todo;
    };
  }

  function getRemoveTodo() {
    return function (todoId) {
      const projectTodoIndex = findIndex(this.todos, "id", todoId);
      const todoIndex = findIndex(todos, "id", todoId);
      todos.splice(todoIndex, 1);
      this.todos.splice(projectTodoIndex, 1);
      saveToLocalStorage();
    };
  }

  function removeProject(projectId) {
    const projectIndex = findIndex(projects, "id", projectId);
    const project = getProject(projectIndex);
    projects.splice(projectIndex, 1);
    // Remove all of project todos
    for (const todo of project.todos) project.removeTodo(todo.id);
    saveToLocalStorage();
  }

  function findIndex(array, key, valueToFind) {
    return array.findIndex((item) => item[key] == valueToFind);
  }

  function saveToLocalStorage() {
    setLocalStorageItem("projects", projects);
    setLocalStorageItem("todos", todos);
  }

  const getTodos = () => todos;
  const getProjects = () => projects;
  const getProject = (index) => projects[index];
  return {
    createTodo,
    createProject,
    removeProject,
    getTodos,
    getProjects,
    getProject,
  };
})();
const DOM = (function () {
  // declare selector
  const modal = document.querySelector(".modal");
  const modalForm = document.querySelector(".modal-form");
  const todoForm = document.querySelector(".add-todo-form");
  const addProjectModal = document.querySelector(".add-project-modal");
  const addTodoModal = document.querySelector(".add-todo-modal");
  const deleteModal = document.querySelector(".delete-modal");
  const cancel = document.querySelectorAll(".cancel");
  const submit = document.querySelector(".submit");
  const submitTodo = document.querySelector(".submit-todo");
  const deleteButton = document.querySelector(".delete");
  const svgArrow = document.querySelector(".open-project > svg");
  const projects = document.getElementsByClassName("project");
  const projectsContainer = document.querySelector(".projects");
  const addTodo = document.querySelector(".add-todo");
  const todosContainer = document.querySelector(".todos");
  const projectTab = document.querySelector(".projectTab");
  const links = document.querySelectorAll(".links div");
  const menu = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  // Shows LocalStorage projects
  for (let project of APP.getProjects().slice(1)) displayProject(project.name);

  function switchTab(title, todos = []) {
    const header = document.querySelector(".main-header");
    header.textContent = title;
    todosContainer.textContent = "";
    for (const todo of todos) displayTodo(todo);
  }
  // Initial Load
  const inbox = APP.getProject(0);
  switchTab("Inbox", inbox.todos);

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
    projectTitle.title = title;
    projectTitle.textContent = title;
    projectTitle.classList.add("project-title");

    const DELETE_SVG = createSVG(
      "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",
      "currentColor"
    );
    DELETE_SVG.classList.add("delete-svg");

    projectLeft.appendChild(LIST_SVG);
    projectLeft.appendChild(projectTitle);
    projectRight.appendChild(DELETE_SVG);
    project.appendChild(projectLeft);
    project.appendChild(projectRight);
    projectsContainer.appendChild(project);
  }

  mainContent.addEventListener("click", (e) => {
    if (e.target.className == "mark-todo-complete") {
      console.log("marking complete..");
      const project = APP.getProject(getActiveProjectIndex());
      const todoId = e.target.getAttribute("data-index-number");
      console.log({ todoId });
      project.removeTodo(todoId);
      switchTab(project.name, project.todos);
    }
  });

  addTodo.addEventListener("click", (e) => {
    todoForm.reset();
    resetTitleInput();

    modal.classList.add("open");
    addTodoModal.classList.add("open");
    const select = document.querySelector("#project");
    select.textContent = "";

    for (const project of APP.getProjects()) {
      let projectName = project.name;
      let textWidth = getTextWidth(projectName);
      // Truncate string if too long
      if (textWidth > 250) {
        if (textWidth > 1200) projectName = truncateStr(projectName, 4);
        else if (textWidth > 800) projectName = truncateStr(projectName, 12);
        else projectName = truncateStr(projectName, 20);
      }

      let option = createOption(projectName);
      select.appendChild(option);
    }

    // Set selected option to current project
    const selectedIndex = getActiveProjectIndex();
    select.children[selectedIndex].selected = true;
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveClass(link);
      const headerTitle = link.innerText;
      const todos = headerTitle == "Inbox" ? inbox.todos : [];
      switchTab(headerTitle, todos);
    });
  });
  projectsContainer.addEventListener("click", (e) => {
    // if delete button clicked, show confirm modal
    if (e.target.closest(".project-right")) toggleModal(deleteModal);
    // highlight project clicked
    setActiveClass(e.target.closest(".project"));
    const index = getActiveProjectIndex();
    const project = APP.getProject(index);
    console.log(project.id);
    console.log(APP.getTodos());
    switchTab(project.name, project.todos);
  });

  projectTab.addEventListener("click", (e) => {
    if (e.target.contains(svgArrow)) {
      // toggle show project
      projectsContainer.classList.toggle("closed");
      svgArrow.classList.toggle("rotated");
      return;
    }
    // Show add project modal
    toggleModal(addProjectModal);
    modalForm.reset();
  });

  cancel.forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });
  // Adds project to localstorage and displays it.
  submit.addEventListener("click", () => {
    const name = document.querySelector("#name").value;
    if (!name) return;
    closeAllModals();
    APP.createProject(name);
    displayProject(name);
  });

  const titleInput = document.querySelector("#todo-title");
  const titleErrorText = document.querySelector(".title-error-text");
  titleInput.addEventListener("keyup", (e) => {
    const isValid = e.target.checkValidity();
    const classList = e.target.classList;
    if (isValid && classList.contains("error")) {
      classList.add("valid");
      classList.remove("error");

      titleErrorText.classList.remove("visible");
    } else if (!isValid && classList.contains("valid")) {
      classList.remove("valid");
      classList.add("error");

      titleErrorText.classList.add("visible");
    }
  });

  submitTodo.addEventListener("click", () => {
    const title = document.querySelector("#todo-title").value;
    if (!title) {
      titleInput.classList.add("error");
      titleErrorText.classList.add("visible");
      return;
    }
    const dueDate = document.querySelector("#due-date").value || null;
    const description = document.querySelector("#description").value || "";
    const priority = document.querySelector("#priority").value;
    const selectedIndex = document.querySelector("#project").selectedIndex;
    const project = APP.getProject(selectedIndex);
    const todo = project.addTodo(
      title,
      description,
      dueDate,
      priority,
      project.todos
    );
    let activeIndex = getActiveProjectIndex();
    if (activeIndex == selectedIndex) displayTodo(todo);
    closeAllModals();
  });

  deleteButton.addEventListener("click", () => {
    let projectIndex = getActiveProjectIndex();
    let projectId = APP.getProject(projectIndex).id;
    let selectedProject = projects[projectIndex];
    console.log(selectedProject, projectIndex);
    // Remove project from app and dom
    APP.removeProject(projectId);
    console.log(projectIndex, selectedProject);
    projectsContainer.removeChild(selectedProject);
    closeAllModals();
    // default to inbox tab
    switchTab("Inbox", inbox.todos);
    document.querySelector(".inbox").classList.add("active");
  });

  // Toggle sidebar showing
  menu.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("sidebar-hidden");
    sidebar.classList.toggle("hidden");
    document.querySelector(".todos").classList.toggle("sidebar-hidden");
  });

  // Helper Functions

  function displayTodo(todo) {
    console.log({ todo });
    const todoElement = createTodoElement(
      todo.title,
      todo.id,
      todo.dueDate || null
    );
    todosContainer.appendChild(todoElement);
  }

  function truncateStr(string, length) {
    return string.substring(0, length) + "...";
  }

  function createOption(name) {
    let option = document.createElement("option");
    option.textContent = name;
    option.value = name;
    return option;
  }

  function setActiveClass(element) {
    const active = document.querySelector(".active");
    active.classList.remove("active");

    element.classList.add("active");
  }

  function resetTitleInput() {
    titleInput.classList.remove("valid");
    titleInput.classList.remove("error");
    titleErrorText.classList.remove("visible");
  }

  function toggleModal(modalElement) {
    modal.classList.toggle("open");
    modalElement.classList.toggle("open");
    document.body.classList.toggle("modal-open");
  }

  function closeAllModals() {
    modal.classList.remove("open");
    for (let i = 0; i < modal.childElementCount; i++) {
      modal.children[i].classList.remove("open");
    }
  }

  function getTextWidth(text) {
    // re-use canvas object for better performance
    const canvas =
      getTextWidth.canvas ||
      (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = "14px Montserrat";
    const metrics = context.measureText(text);
    return metrics.width;
  }

  function getActiveProjectIndex() {
    const project = document.querySelector(".project.active");
    // Search in projects the index of current active project
    return Array.from(projects).indexOf(project);
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
  function createTodoElement(title, id, dueDate) {
    const todoContainer = document.createElement("div");
    const todoInfo = document.createElement("div");
    if (dueDate) {
      dueDate = new Date(dueDate);
      let isCurrentYear = dueDate.getFullYear() == new Date().getFullYear();
      // if isCurrentYear omit year, else show year
      const formattedDateToNow = format(
        dueDate,
        `MMM d ${isCurrentYear ? "" : "yyyy"} h:mm a`
      );
      const title = formatDistanceToNowStrict(dueDate, { addSuffix: true });

      const todoDueDate = document.createElement("span");
      todoDueDate.textContent = formattedDateToNow;
      todoDueDate.title = `Due date: ${title}`;
      todoDueDate.classList.add("todo-date");
      todoInfo.appendChild(todoDueDate);
    }

    const todoTitle = document.createElement("span");
    todoTitle.title = title;
    todoTitle.textContent = title;
    todoTitle.classList.add("todo-title");

    const markComplete = document.createElement("button");
    markComplete.setAttribute("data-index-number", id);
    markComplete.classList.add("mark-todo-complete");

    todoContainer.classList.add("todo");
    todoInfo.classList.add("todo-info");
    todoContainer.appendChild(markComplete);
    todoInfo.prepend(todoTitle);
    todoContainer.appendChild(todoInfo);
    return todoContainer;
  }
})();
