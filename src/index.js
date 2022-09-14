import {
  format,
  formatDistanceToNowStrict,
  formatRelative,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";

import { APP } from "./app";

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
  const todoElements = document.getElementsByClassName("todo");
  const projectTab = document.querySelector(".projectTab");
  const links = document.querySelectorAll(".links div");
  const menu = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  const low = document.querySelector(".low");
  const medium = document.querySelector(".medium");
  const high = document.querySelector(".high");
  const search = document.querySelector("#search-input");
  const searchResults = document.querySelector(".search-results");
  const selectProject = document.querySelector("#project");

  // Shows LocalStorage projects excluding first project (inbox)
  for (let project of APP.getProjects().slice(1)) {
    displayProject(project.name, project.id);
  }

  function switchTab(title, todos = []) {
    setMainHeader(title);
    refreshTodos(todos);
  }

  function setMainHeader(title) {
    const header = document.querySelector(".main-header");
    header.textContent = title;
  }

  function getTodosToday() {
    const projects = APP.getProjects();
    let todayTodos = [];
    for (const project of projects) {
      for (const todo of project.todos) {
        let todoDueDate = new Date(todo.dueDate);
        if (isToday(todoDueDate)) todayTodos.push(todo);
      }
    }
    return todayTodos;
  }

  function refreshTodos(todos = []) {
    Array.from(todoElements).forEach((todo) => todo.remove());
    for (const todo of todos) displayTodo(todo);
    // If no todos in high/medium/low priority todos then remove visible
    if (high.children.length < 2) high.classList.remove("visible");
    if (medium.children.length < 2) medium.classList.remove("visible");
    if (low.children.length < 2) low.classList.remove("visible");
  }

  // Initial Load
  const inbox = APP.getProject(0);
  switchTab("Inbox", inbox.todos);

  function query(search) {
    search = search.toLowerCase();
    let occurrences = [];
    let projects = APP.getProjects();
    for (const project of projects) {
      if (project.name.toLowerCase().includes(search)) {
        occurrences.push(project);
      }
    }
    // Sort occurences from A-Z
    return occurrences.sort((a, b) => a.name.localeCompare(b.name));
  }

  function displayProject(title, id) {
    const project = createElement("div", "project");
    project.setAttribute("project-index-number", id);
    const projectLeft = createElement("div", "project-left");
    const projectRight = createElement("button", "project-right");

    const DELETE_SVG = createSVG(
      "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",
      "currentColor"
    );
    const deleteButton = createElement("button", "delete-project");
    let deleteProject = createElement("span", undefined, "Delete Project");
    deleteButton.appendChild(DELETE_SVG);
    deleteButton.appendChild(deleteProject);

    const EDIT_SVG = createSVG(
      "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
      "currentColor"
    );
    const editButton = createElement("button", "edit-project");
    const editText = createElement("span", undefined, "Edit Project");
    editButton.appendChild(EDIT_SVG);
    editButton.appendChild(editText);

    const dropdown = createElement("div", "dropdown");
    dropdown.appendChild(editButton);
    dropdown.appendChild(deleteButton);

    const DOTS_SVG = createSVG(
      "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z",
      "currentColor"
    );
    DOTS_SVG.classList.add("project-options");
    DOTS_SVG.onclick = () => toggleDropdown(dropdown);

    const LIST_SVG = createSVG(
      "M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z",
      "currentColor"
    );
    const projectTitle = createElement("span", "project-title", title);
    projectTitle.title = title;

    projectLeft.appendChild(LIST_SVG);
    projectLeft.appendChild(projectTitle);
    projectRight.appendChild(DOTS_SVG);
    projectRight.appendChild(dropdown);

    project.appendChild(projectLeft);
    project.appendChild(projectRight);
    projectsContainer.appendChild(project);
  }

  function toggleDropdown(dropdownClicked) {
    // if dropdown already open, close it.
    if (dropdownClicked.classList.contains("open")) {
      dropdownClicked.classList.remove("open");
      return;
    }
    let dropdowns = document.getElementsByClassName("dropdown");
    // close all dropdowns to avoid multiple open at same time
    for (const dropdown of dropdowns)
      if (dropdown) dropdown.classList.remove("open");

    // Toggle the dropdown on the element clicked
    dropdownClicked.classList.toggle("open");
  }

  document.onclick = (e) => {
    // if clicked off close search results
    if (!e.target.closest(".search-container")) {
      searchResults.classList.remove("found");
    }
    if (!e.target.closest(".project-options")) {
      let dropdowns = document.getElementsByClassName("dropdown");
      for (const dropdown of dropdowns) dropdown.classList.remove("open");
    }
  };

  search.addEventListener("input", (e) => {
    if (!e.target.value) return searchResults.classList.remove("found");
    const occurrences = query(e.target.value);
    searchResults.textContent = "";
    if (!occurrences.length) {
      addSearchOption("No results found.", false, false, "search-result");
      searchResults.classList.add("found");
      return;
    }

    for (const occurrence of occurrences) {
      let text = occurrence.name;
      let projectId = occurrence.id;
      addSearchOption(text, "project-index-number", projectId, "search-result");
    }
    searchResults.classList.add("found");
  });

  searchResults.addEventListener("click", (e) => {
    const name = e.target.textContent;
    const id = e.target.getAttribute("project-index-number");
    if (!id) return;
    const todos = APP.getProjectById(id).todos;
    const project = document.querySelector(
      `.project[project-index-number="${id}"]`
    );
    setActiveClass(project);
    switchTab(name, todos);
    searchResults.classList.remove("found");
    search.value = "";
  });

  mainContent.addEventListener("click", (e) => {
    const todoElement = e.target.closest(".todo");
    if (!todoElement) return;
    const projectId = todoElement.getAttribute("project-index-number");
    const todoId = todoElement.getAttribute("todo-index-number");

    if (e.target.closest(".mark-todo-complete")) {
      const project = APP.getProjectById(projectId);
      project.removeTodo(todoId);

      const activeClass = getActive().classList;
      if (activeClass.contains("today")) refreshTodos(getTodosToday());
      else if (activeClass.contains("view-all")) refreshTodos(APP.getTodos());
      else refreshTodos(project.todos);
      return;
    }
    // Edit Todo
    if (!e.target.closest(".edit-todo")) return;
    const projects = APP.getProjects();
    const todo = APP.getTodoById(todoId);
    const selectedIndex = APP.findIndex(projects, "id", todo.projectId);
    openTodoModal(selectedIndex);
    updateModalEditing(true, "add-todo-modal", "Edit Todo", "Update Todo");

    const title = document.querySelector("#todo-title");
    const dueDate = document.querySelector("#due-date");
    const description = document.querySelector("#description");
    const priority = document.querySelector("#priority");

    // Set all input values to corresponding todo value
    title.value = todo.title;
    dueDate.value = todo.dueDate;
    description.value = todo.description;

    // Set selected to current todo priority selected
    if (todo.priority == "High") setSelectedOption(priority, 2);
    else if (todo.priority == "Medium") setSelectedOption(priority, 1);

    addTodoModal.setAttribute("todo-index-number", todoId);
  });

  addTodo.addEventListener("click", (e) => {
    const selectedIndex = getActiveProjectIndex();
    openTodoModal(selectedIndex);
    updateModalEditing(false, "add-todo-modal", "Add Todo", "Add Todo");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveClass(link);
      const title = link.innerText;
      console.log(getTodosToday());

      if (title == "Inbox") switchTab(title, inbox.todos);
      else if (title == "Today") switchTab(title, getTodosToday());
      else switchTab(title, APP.getTodos());
    });
  });
  projectsContainer.addEventListener("click", (e) => {
    // if delete button clicked, show confirm modal
    if (e.target.closest(".delete-project")) toggleModal(deleteModal);
    else if (e.target.closest(".edit-project")) {
      const projectId = e.target
        .closest(".project")
        .getAttribute("project-index-number");
      addProjectModal.setAttribute("project-index-number", projectId);
      toggleModal(addProjectModal);
      updateModalEditing(true, "add-project-modal", "Edit Project", "Update");
      const name = document.querySelector("#name");
      name.value = APP.getProjectById(projectId).name;
    }
    // highlight project clicked
    setActiveClass(e.target.closest(".project"));
    const index = getActiveProjectIndex();
    const project = APP.getProject(index);
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
    // change status to not editing
    updateModalEditing(false, "add-project-modal", "Add Project", "Add");
    modalForm.reset();
  });

  cancel.forEach((btn) => btn.addEventListener("click", closeAllModals));
  // Adds project to localstorage and displays it.
  submit.addEventListener("click", () => {
    const name = document.querySelector("#name").value;
    if (!name) return;
    closeAllModals();
    // check if editing project name
    if (addProjectModal.classList.contains("editing")) {
      let id = addProjectModal.getAttribute("project-index-number");
      let project = APP.getProjectById(id);
      // return if new name is same as current
      if (project.name == name) return;
      project.setProjectName(name);
      // find index from project id matching id
      let index = Array.from(projectsContainer.children).findIndex(
        (project) => project.getAttribute("project-index-number") == id
      );
      // need to show on dom / screen as well
      const projectTitles = document.getElementsByClassName("project-title");
      projectTitles[index].textContent = name;
      setMainHeader(name);
      return;
    }
    // else create a new project
    const project = APP.createProject(name);
    displayProject(name, project.id);
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
      titleInput.focus();
      return;
    }
    const dueDate = document.querySelector("#due-date").value || null;
    const description = document.querySelector("#description").value || "";
    const priority = document.querySelector("#priority").value;
    const selectedIndex = document.querySelector("#project").selectedIndex;
    const project = APP.getProject(selectedIndex);
    let isEditingTodo = addTodoModal.classList.contains("editing");
    const active = getActive();
    const currentClass = active.classList;
    if (isEditingTodo) {
      console.log(project, selectedIndex);
      let todoId = addTodoModal.getAttribute("todo-index-number");
      editTodo(todoId, project.id, title, description, dueDate, priority);
      // if tab is today refresh with todays todo
      if (currentClass.contains("today")) refreshTodos(getTodosToday());
      // if tab is view all refresh with all todos
      else if (currentClass.contains("view-all")) refreshTodos(APP.getTodos());
      else {
        // get current active project todo
        let project = APP.getProjectById(
          active.getAttribute("project-index-number")
        );
        refreshTodos(project.todos);
      }
      return closeAllModals();
    }
    const todo = project.addTodo(
      title,
      description,
      dueDate,
      priority,
      project.todos
    );

    // if tab is on today, and date selected isToday then display.
    if (currentClass.contains("today")) {
      if (isToday(new Date(dueDate))) displayTodo(todo);
    } else if (
      getActiveProjectIndex() == selectedIndex ||
      currentClass.contains("view-all")
    ) {
      displayTodo(todo);
    }
    closeAllModals();
  });

  deleteButton.addEventListener("click", () => {
    let projectIndex = getActiveProjectIndex();
    let projectId = APP.getProject(projectIndex).id;
    let selectedProject = projects[projectIndex];
    console.log(selectedProject, projectIndex, projectId);
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

  function updateModalEditing(isEditing, modalName, headerText, btnText) {
    const modal = document.querySelector(`.${modalName}`);
    const header = document.querySelector(`.${modalName} > .modal-header`);
    const button = document.querySelector(
      `.${modalName} button[type='submit']`
    );
    header.textContent = headerText;
    button.textContent = btnText;
    isEditing
      ? modal.classList.add("editing")
      : modal.classList.remove("editing");
  }

  function editTodo(todoId, projectId, title, description, dueDate, priority) {
    let todo = APP.getTodoById(todoId);
    let project = APP.getProjectById(projectId);
    // check if todo value is not the same
    if (todo.title !== title) todo.setTodoProperty("title", title);
    if (todo.description !== description)
      todo.setTodoProperty("description", description || "");
    if (todo.dueDate !== dueDate) todo.setTodoProperty("dueDate", dueDate);
    if (todo.priority !== priority) todo.setTodoProperty("priority", priority);

    // check if same project selected
    if (todo.projectId === projectId) return;
    todo.setTodoProperty("projectId", projectId);

    // Remove todo from original project
    for (const project of APP.getProjects()) {
      for (const todo of project.todos) {
        if (todo.id == todoId) project.removeTodo(todo.id);
      }
    }
    project.addTodo(title, description, dueDate, priority);
  }

  function addProjectOptions(selected) {
    selectProject.textContent = "";
    for (const project of APP.getProjects()) {
      let name = getTruncatedString(project.name);
      let option = document.createElement("option");
      option.textContent = name;
      option.value = name;

      selectProject.appendChild(option);
    }
    setSelectedOption(selectProject, selected);
  }

  function setSelectedOption(element, index) {
    if (index == -1) return;
    element.children[index].selected = true;
  }

  function displayTodo(todo) {
    const todoElement = createTodoElement(
      todo.title,
      todo.id,
      todo.projectId,
      todo.dueDate,
      todo.description
    );

    // Find which priority to append to and show
    let priority;
    if (todo.priority == "High") priority = high;
    else if (todo.priority == "Medium") priority = medium;
    else priority = low;

    priority.classList.add("visible");
    priority.appendChild(todoElement);
  }

  function getTruncatedString(string) {
    let textWidth = getTextWidth(string);
    if (textWidth > 250) {
      // Truncate string if too long
      if (textWidth > 1200) string = truncateStr(string, 4);
      else if (textWidth > 800) string = truncateStr(string, 12);
      else string = truncateStr(string, 20);
    }
    return string;
  }

  const truncateStr = (string, length) => string.substring(0, length) + "...";

  function setActiveClass(element) {
    const active = document.querySelector(".active");
    active.classList.remove("active");
    element.classList.add("active");
  }

  function openTodoModal(selected) {
    todoForm.reset();
    toggleModal(addTodoModal);
    // Resets to title input default state
    titleInput.classList.remove("valid");
    titleInput.classList.remove("error");
    titleErrorText.classList.remove("visible");

    addProjectOptions(selected);
    setSelectedOption(selectProject, selected);
  }

  function toggleModal(modalElement) {
    modal.classList.toggle("open");
    modalElement.classList.toggle("open");
    document.body.classList.toggle("modal-open");
  }

  function closeAllModals() {
    modal.classList.remove("open");
    addTodoModal.classList.remove("editing");
    for (let i = 0; i < modal.childElementCount; i++) {
      modal.children[i].classList.remove("open");
    }
  }
  function getTextWidth(text) {
    // re-use canvas object for better performance
    const canvas =
      getTextWidth.canvas || (getTextWidth.canvas = createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = "14px Montserrat";
    const metrics = context.measureText(text);
    return metrics.width;
  }

  function getActive() {
    const active = document.querySelector(".active");
    return active;
  }

  function getActiveProjectIndex() {
    const project = document.querySelector(".project.active");
    // Search in projects the index of current active project
    return Array.from(projects).indexOf(project);
  }

  function addSearchOption(text, attributeName, attributeValue, className) {
    console.log(text, className);
    const searchResult = createElement("li", className, text);
    if (attributeName) searchResult.setAttribute(attributeName, attributeValue);
    searchResults.appendChild(searchResult);
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

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (text !== undefined) element.textContent = text;
    if (className !== undefined) element.classList.add(className);
    return element;
  }

  function createTodoElement(title, todoId, projectId, dueDate, description) {
    const todoContainer = createElement("div", "todo");
    todoContainer.setAttribute("todo-index-number", todoId);
    todoContainer.setAttribute("project-index-number", projectId);
    // todo info. contains title, description and due date
    const todoInfo = createElement("div", "todo-info");

    // mark todo complete button
    const markComplete = createElement("button", "mark-todo-complete");
    const check = createSVG(
      "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
      "currentColor"
    );
    check.classList.add("checkmark");
    markComplete.appendChild(check);

    // todo title / name
    const todoTitle = createElement("span", "todo-title", title);
    todoTitle.title = title;
    todoInfo.appendChild(todoTitle);

    // if description exists show description
    if (description) {
      const todoDescription = createElement(
        "span",
        "todo-description",
        description
      );
      todoDescription.title = description;
      todoInfo.appendChild(todoDescription);
    }

    // if duedate exists show duedate
    if (dueDate) {
      dueDate = new Date(dueDate);
      let formattedDate = getFormattedDate(dueDate);
      const todoDueDate = createElement("span", "todo-date", formattedDate);
      // Show time left in title e.g. "Due date: in 4 hours"
      const timeLeft = formatDistanceToNowStrict(dueDate, { addSuffix: true });
      todoDueDate.title = `Due date: ${timeLeft}`;
      todoInfo.appendChild(todoDueDate);
    }

    // edit todo button
    const edit = createElement("button", "edit-todo");
    const editIcon = createSVG(
      "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",
      "currentColor"
    );
    edit.appendChild(editIcon);

    todoContainer.appendChild(markComplete);
    todoContainer.appendChild(todoInfo);
    todoContainer.appendChild(edit);
    return todoContainer;
  }

  function getFormattedDate(date) {
    if (isToday(date) || isYesterday(date) || isTomorrow(date)) {
      return formatRelative(date, new Date());
    }
    let isCurrentYear = date.getFullYear() == new Date().getFullYear();
    // if isCurrentYear omit year, else show year
    return format(date, `MMM d ${isCurrentYear ? "" : "yyyy"} h:mm a`);
  }
})();
