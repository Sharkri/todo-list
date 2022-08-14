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

  function createProject(projectName) {
    projects.push({ projectName });
    setLocalStorageItem("projects", projects);
    return { projectName };
  }

  const getTodos = () => todos;
  const getProjects = () => projects;

  return { createTodo, createProject, getTodos, getProjects };
})();
const DOM = (function () {
  // initial selected
  const links = document.querySelectorAll(".links div");
  links[0].classList.toggle("active");

  links.forEach((link) =>
    link.addEventListener("click", () => {
      removeAllActiveClass(links);
      removeAllActiveClass(projects.childNodes);
      // highlight clicked link
      link.classList.toggle("active");
    })
  );

  function removeAllActiveClass(element) {
    element.forEach((e) => e.classList.remove("active"));
  }
  // declare selector
  const modal = document.querySelector(".modal");
  const modalForm = document.querySelector(".modal-form");
  const cancel = document.querySelector(".cancel");
  const submit = document.querySelector(".submit");
  const svgArrow = document.querySelector(".open-project > svg");
  const projects = document.querySelector(".projects");
  // Initial load for Local Storage
  for (let project of APP.getProjects()) appendProject(project.projectName);

  const projectTab = document.querySelector(".projectTab");

  projectTab.addEventListener("click", (e) => {
    // show projects
    if (e.target.contains(svgArrow)) {
      svgArrow.classList.toggle("rotated");
      return;
    }
    modal.classList.toggle("open");
    modalForm.reset();
  });

  function appendProject(projectName) {
    let project = document.createElement("div");
    project.classList.add("project");
    project.appendChild(document.createTextNode(projectName));
    projects.appendChild(project);
  }

  cancel.addEventListener("click", () => modal.classList.toggle("open"));
  submit.addEventListener("click", () => {
    let name = document.querySelector("#name");
    if (!name.value) return;
    modal.classList.toggle("open");
    APP.createProject(name.value);
    appendProject(name.value);
  });
  projects.addEventListener("click", (e) => {
    removeAllActiveClass(links);
    removeAllActiveClass(projects.childNodes);
    e.target.classList.add("active");
  });
})();
