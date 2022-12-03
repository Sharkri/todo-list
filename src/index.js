import {
  format,
  formatDistanceToNowStrict,
  formatRelative,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns';
import Projects from './projects';
import {
  signOutUser,
  signIn,
  listenForAuthChange,
  listenForCollectionChange,
} from './backend';
// declare selector
const modalContainer = document.querySelector('.modal');
const modalForm = document.querySelector('.modal-form');
const todoForm = document.querySelector('.add-todo-form');
const addProjectModal = document.querySelector('.add-project-modal');
const addTodoModal = document.querySelector('.add-todo-modal');
const deleteModal = document.querySelector('.delete-modal');
const cancel = document.querySelectorAll('.cancel');
const submitProject = document.querySelector('.submit');
const submitTodo = document.querySelector('.submit-todo');
const deleteProjectConfirm = document.querySelector('.delete');
const toggleProjectsOpen = document.querySelector('.open-project > svg');
const projectElems = document.getElementsByClassName('project');
const projectsContainer = document.querySelector('.projects');
const addTodo = document.querySelector('.add-todo');
const todoElements = document.getElementsByClassName('todo');
const projectTab = document.querySelector('.projectTab');
const links = document.querySelectorAll('.links div');
const menu = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const mainContent = document.querySelector('.main-content');
const low = document.querySelector('.low');
const medium = document.querySelector('.medium');
const high = document.querySelector('.high');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('.search-results');
const selectProject = document.querySelector('#project');
const titleInput = document.querySelector('#todo-title');
const titleErrorText = document.querySelector('.title-error-text');

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (text != null) element.textContent = text;
  if (className != null) element.classList.add(className);
  return element;
}

function createSVG(d, fill, className) {
  const SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  SVG.setAttribute('viewBox', '0 0 24 24');
  path.setAttribute('fill', fill);
  path.setAttribute('d', d);
  SVG.appendChild(path);
  if (className) SVG.setAttribute('class', className);
  return SVG;
}

function setMainHeader(title) {
  const header = document.querySelector('.main-header');
  header.textContent = title;
}

function getFormattedDate(date) {
  if (isToday(date) || isYesterday(date) || isTomorrow(date)) {
    return formatRelative(date, new Date());
  }
  const isCurrentYear = date.getFullYear() === new Date().getFullYear();
  // if isCurrentYear omit year, else show year
  return format(date, `MMM d ${isCurrentYear ? '' : 'yyyy'} h:mm a`);
}

function createTodoElement(title, todoId, projectId, dueDate, description) {
  const todoContainer = createElement('div', 'todo');
  todoContainer.setAttribute('todo-id', todoId);
  todoContainer.setAttribute('project-id', projectId);
  // todo info. contains title, description and due date
  const todoInfo = createElement('div', 'todo-info');

  // mark todo complete button
  const markComplete = createElement('button', 'mark-todo-complete');
  const check = createSVG(
    'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
    'currentColor',
    'checkmark'
  );
  markComplete.appendChild(check);

  // todo title / name
  const todoTitle = createElement('span', 'todo-title', title);
  todoTitle.title = title;
  todoInfo.appendChild(todoTitle);

  // if description exists show description
  if (description) {
    const todoDescription = createElement(
      'span',
      'todo-description',
      description
    );
    todoDescription.title = description;
    todoInfo.appendChild(todoDescription);
  }

  // if duedate exists show duedate
  if (dueDate) {
    const newDate = new Date(dueDate);
    const formattedDate = getFormattedDate(newDate);
    const todoDueDate = createElement('span', 'todo-date', formattedDate);
    // Show time left in title e.g. "Due date: in 4 hours"
    const timeLeft = formatDistanceToNowStrict(newDate, { addSuffix: true });
    todoDueDate.title = `Due date: ${timeLeft}`;
    todoInfo.appendChild(todoDueDate);
  }

  // edit todo button
  const edit = createElement('button', 'edit-todo');
  const editIcon = createSVG(
    'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
    'currentColor'
  );
  edit.appendChild(editIcon);

  todoContainer.append(markComplete, todoInfo, edit);
  return todoContainer;
}

function toggleDropdown(dropdownClicked) {
  // if dropdown already open, close it.
  if (dropdownClicked.classList.contains('open')) {
    dropdownClicked.classList.remove('open');
    return;
  }
  const dropdowns = Array.from(document.getElementsByClassName('dropdown'));
  // close all dropdowns to avoid multiple open at same time
  dropdowns.forEach((dropdown) => dropdown.classList.remove('open'));
  // Toggle the dropdown on the element clicked
  dropdownClicked.classList.toggle('open');
}

function displayProject(title, id) {
  const project = createElement('div', 'project');
  project.setAttribute('project-id', id);
  const projectLeft = createElement('div', 'project-left');
  const projectRight = createElement('button', 'project-right');

  const LIST_SVG = createSVG(
    'M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z',
    'currentColor'
  );
  const projectTitle = createElement('span', 'project-title', title);
  projectTitle.title = title;

  const DELETE_SVG = createSVG(
    'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
    'currentColor'
  );

  const deleteButton = createElement('button', 'delete-project');
  const deleteProject = createElement('span', undefined, 'Delete Project');
  deleteButton.append(DELETE_SVG, deleteProject);

  const EDIT_SVG = createSVG(
    'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
    'currentColor'
  );
  const editButton = createElement('button', 'edit-project');
  const editText = createElement('span', undefined, 'Edit Project');
  editButton.append(EDIT_SVG, editText);

  // Append edit and delete options to dropdown
  const dropdown = createElement('div', 'dropdown');
  dropdown.append(editButton, deleteButton);

  const DOTS_SVG = createSVG(
    'M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z',
    'currentColor',
    'project-options'
  );
  DOTS_SVG.onclick = () => toggleDropdown(dropdown);

  projectLeft.append(LIST_SVG, projectTitle);
  projectRight.append(DOTS_SVG, dropdown);

  project.append(projectLeft, projectRight);
  projectsContainer.appendChild(project);
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
  if (todo.priority === 'High') priority = high;
  else if (todo.priority === 'Medium') priority = medium;
  else priority = low;
  priority.classList.add('visible');
  priority.appendChild(todoElement);
}

function refreshTodos(todos = []) {
  Array.from(todoElements).forEach((todo) => todo.remove());
  todos.forEach((todo) => displayTodo(todo));
  // If no todos in high/medium/low priority todos then remove visible
  if (high.children.length < 2) high.classList.remove('visible');
  if (medium.children.length < 2) medium.classList.remove('visible');
  if (low.children.length < 2) low.classList.remove('visible');
}

async function editTodo(
  todoId,
  prevProjectId,
  newProjectId,
  title,
  description,
  dueDate,
  priority
) {
  // if moved todo to other project
  if (prevProjectId !== newProjectId) {
    // Remove todo from original project
    Projects.removeTodo(prevProjectId, todoId);
    // Add todo to new project
    Projects.addTodo(newProjectId, title, description, dueDate, priority);
    return;
  }
  // if same project, just change todo values.
  Projects.changeTodoAttributes(
    newProjectId,
    todoId,
    title,
    description || '',
    dueDate,
    priority
  );
}

async function getTodosToday() {
  const todos = await Projects.getAllTodos();
  return todos.filter((todo) => isToday(new Date(todo.dueDate)));
}

function setSelectedOption(element, index) {
  if (index !== -1) element.children[index].selected = true;
}

const truncateStr = (string, length) => `${string.substring(0, length)}...`;

function getTextWidth(text) {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas || (getTextWidth.canvas = createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = '14px Montserrat';
  const metrics = context.measureText(text);
  return metrics.width;
}

function getTruncatedString(string) {
  const textWidth = getTextWidth(string);
  if (textWidth <= 250) return string;

  // Truncate string if too long
  if (textWidth > 1200) return truncateStr(string, 4);
  if (textWidth > 800) return truncateStr(string, 12);
  return truncateStr(string, 20);
}

async function addProjectOptions(selected) {
  selectProject.textContent = '';

  const projects = await Projects.getProjects();
  projects.forEach((project) => {
    // truncate name if too long
    const truncatedProjectName = getTruncatedString(project.name);
    const option = document.createElement('option');
    option.textContent = truncatedProjectName;
    option.value = project.id;
    selectProject.appendChild(option);
  });
  setSelectedOption(selectProject, selected);
}

function toggleModal(modalElement) {
  modalContainer.classList.toggle('open');
  modalElement.classList.toggle('open');
  document.body.classList.toggle('modal-open');
}

function openTodoModal(selected) {
  todoForm.reset();
  toggleModal(addTodoModal);
  // Resets to title input default state
  titleInput.classList.remove('valid');
  titleInput.classList.remove('error');
  titleErrorText.classList.remove('visible');

  addProjectOptions(selected);
}

function setModalEditing(isEditing, modal, headerText, btnText) {
  const header = modal.querySelector(`.modal-header`);
  const button = modal.querySelector(`button[type='submit']`);
  header.textContent = headerText;
  button.textContent = btnText;
  if (isEditing) modal.classList.add('editing');
  else modal.classList.remove('editing');
}

function closeAllModals() {
  modalContainer.classList.remove('open');
  addTodoModal.classList.remove('editing');
  for (let i = 0; i < modalContainer.childElementCount; i += 1) {
    modalContainer.children[i].classList.remove('open');
  }
}

function getActive() {
  const active = document.querySelector('.active');
  return active;
}

function getActiveProjectIndex() {
  const project = document.querySelector('.project.active');
  // Search in projects the index of current active project
  return Array.from(projectElems).indexOf(project);
}

function getActiveProjectId() {
  const project = document.querySelector('.project.active');
  return project.getAttribute('project-id');
}

function setActiveClass(element) {
  const active = document.querySelector('.active');
  if (active) active.classList.remove('active');
  element.classList.add('active');
}

function addSearchOption(text, attributeName, attributeValue, className) {
  const searchResult = createElement('li', className, text);
  if (attributeName) searchResult.setAttribute(attributeName, attributeValue);
  searchResults.appendChild(searchResult);
}

async function query(search) {
  const occurrences = [];
  const projects = await Projects.getProjects();
  projects.forEach((project) => {
    if (project.name.toLowerCase().includes(search.toLowerCase())) {
      occurrences.push(project);
    }
  });
  // Sort occurences from A-Z
  return occurrences.sort((a, b) => a.name.localeCompare(b.name));
}

function switchTab(title, todos) {
  setMainHeader(title);
  refreshTodos(todos || []);
}

document.onclick = (e) => {
  // if clicked off close search results
  if (!e.target.closest('.search-container')) {
    searchResults.classList.remove('found');
  }
  if (!e.target.closest('.project-options')) {
    const dropdowns = Array.from(document.getElementsByClassName('dropdown'));
    dropdowns.forEach((dropdown) => dropdown.classList.remove('open'));
  }
};

searchInput.addEventListener('input', async (e) => {
  if (!e.target.value) {
    searchResults.classList.remove('found');
    return;
  }
  const occurrences = await query(e.target.value);
  // Reset search results found.
  searchResults.textContent = '';
  searchResults.classList.add('found');
  // if no occurences found, show "No results found."
  if (!occurrences.length) {
    addSearchOption('No results found.', false, false, 'search-result');
    return;
  }

  // else add found search results.
  occurrences.forEach((occurrence) => {
    const text = occurrence.name;
    const projectId = occurrence.id;
    addSearchOption(text, 'project-id', projectId, 'search-result');
  });
});

searchResults.addEventListener('click', async (e) => {
  searchResults.classList.remove('found');
  const name = e.target.textContent;
  const id = e.target.getAttribute('project-id');
  if (!id) return;
  const { todos } = (await Projects.getProjectById(id)).project;
  const project = document.querySelector(`.project[project-id="${id}"]`);
  setActiveClass(project);
  switchTab(name, todos);
  searchInput.value = '';
});

mainContent.addEventListener('click', async (e) => {
  const todoElement = e.target.closest('.todo');
  if (todoElement == null) return;

  const projectId = todoElement.getAttribute('project-id');
  const todoId = +todoElement.getAttribute('todo-id');
  // Mark Complete
  if (e.target.closest('.mark-todo-complete')) {
    await Projects.removeTodo(projectId, todoId);
  }
  // Edit Todo
  if (!e.target.closest('.edit-todo')) return;
  const projectIndex = await Projects.getIndexOf(projectId);
  openTodoModal(projectIndex);
  setModalEditing(true, addTodoModal, 'Edit Todo', 'Update Todo');
  addTodoModal.setAttribute('project-id', projectId);
  addTodoModal.setAttribute('todo-id', todoId);

  const todo = await Projects.getTodoById(projectId, todoId);

  const title = addTodoModal.querySelector('#todo-title');
  const dueDate = addTodoModal.querySelector('#due-date');
  const description = addTodoModal.querySelector('#description');
  const priority = addTodoModal.querySelector('#priority');

  title.value = todo.title;
  dueDate.value = todo.dueDate;
  description.value = todo.description;

  // Set selected to current todo priority selected
  if (todo.priority === 'High') setSelectedOption(priority, 2);
  else if (todo.priority === 'Medium') setSelectedOption(priority, 1);
  // Don't need to set priority to low since by default it already is low
});

addTodo.addEventListener('click', () => {
  const selectedIndex = getActiveProjectIndex();
  openTodoModal(selectedIndex);
  setModalEditing(false, addTodoModal, 'Add Todo', 'Add Todo');
});

links.forEach((link) => {
  link.addEventListener('click', async () => {
    // Highlights link
    setActiveClass(link);
    // Use innerText instead of textContent because of whitespace
    const title = link.innerText;

    switch (title) {
      case 'Inbox':
        switchTab(title, (await getInbox()).todos);
        break;
      case 'Today':
        switchTab(title, await getTodosToday());
        break;
      // View all
      default:
        switchTab(title, await Projects.getAllTodos());
    }
  });
});

projectsContainer.addEventListener('click', async (e) => {
  const projectElement = e.target.closest('.project');

  // if delete button clicked, show confirm modal
  if (e.target.closest('.delete-project')) toggleModal(deleteModal);
  else if (e.target.closest('.edit-project')) {
    // Find the closest project clicked then get its attribute projectId
    const projectId = projectElement.getAttribute('project-id');
    addProjectModal.setAttribute('project-id', projectId);

    const name = addProjectModal.querySelector('#name');
    const { project } = await Projects.getProjectById(projectId);
    name.value = project.name;

    toggleModal(addProjectModal);
    setModalEditing(true, addProjectModal, 'Edit Project', 'Update');
  }
  // if already project is already active then no need to switch to it
  if (projectElement.classList.contains('active')) return;
  // highlight project clicked
  setActiveClass(projectElement);
  const projectId = projectElement.getAttribute('project-id');
  const { project } = await Projects.getProjectById(projectId);
  switchTab(project.name, project.todos);
});

projectTab.addEventListener('click', (e) => {
  if (e.target.contains(toggleProjectsOpen)) {
    // toggle show project
    projectsContainer.classList.toggle('closed');
    toggleProjectsOpen.classList.toggle('rotated');
    return;
  }
  // Show add project modal
  toggleModal(addProjectModal);
  // change status to not editing
  setModalEditing(false, addProjectModal, 'Add Project', 'Add');
  modalForm.reset();
});

cancel.forEach((btn) => btn.addEventListener('click', closeAllModals));

submitProject.addEventListener('click', () => {
  const projectName = document.querySelector('#name').value;
  if (!projectName) return;

  closeAllModals();
  // check if editing project name
  if (addProjectModal.classList.contains('editing')) {
    const projectId = addProjectModal.getAttribute('project-id');
    const selectedProject = Projects.getProjectById(projectId);
    // return if new name is same as current
    if (selectedProject.name === projectName) return;
    Projects.setProjectName(projectId, projectName);
    return;
  }
  // if not editing, else create a new project
  Projects.createProject(projectName);
});

titleInput.addEventListener('keyup', (e) => {
  const isValid = e.target.checkValidity();
  const { classList } = e.target;
  // if input is in error state and changed to valid, add valid class
  if (isValid && classList.contains('error')) {
    classList.add('valid');
    classList.remove('error');
    titleErrorText.classList.remove('visible');
  } else if (!isValid && classList.contains('valid')) {
    classList.remove('valid');
    classList.add('error');
    titleErrorText.classList.add('visible');
  }
});

submitTodo.addEventListener('click', async () => {
  const title = document.querySelector('#todo-title').value;
  if (!title) {
    titleInput.classList.add('error');
    titleErrorText.classList.add('visible');
    titleInput.focus();
    return;
  }
  const dueDate = document.querySelector('#due-date').value || null;
  const description = document.querySelector('#description').value || '';
  const priority = document.querySelector('#priority').value;
  const projectId = document.querySelector('#project').value;
  const isEditingTodo = addTodoModal.classList.contains('editing');

  if (isEditingTodo) {
    const todoId = +addTodoModal.getAttribute('todo-id');
    const previousProjectId = addTodoModal.getAttribute('project-id');
    editTodo(
      todoId,
      previousProjectId,
      projectId,
      title,
      description,
      dueDate,
      priority
    );
  } else {
    // if not editing todo then create todo instead
    Projects.addTodo(projectId, title, description, dueDate, priority);
  }

  closeAllModals();
});

deleteProjectConfirm.addEventListener('click', () => {
  // Remove project from database
  const projectId = getActiveProjectId();
  Projects.removeProject(projectId);
  // Close modal after deleting project
  closeAllModals();
});

// Toggle sidebar showing
menu.addEventListener('click', () => {
  document.body.classList.toggle('sidebar-hidden');
  nav.classList.toggle('hidden');
  document.querySelector('.todos').classList.toggle('sidebar-hidden');
});

const signInButton = document.querySelector('.sign-in');
const signOutButton = document.querySelector('.sign-out');
// user's profile pic, username and sign out button
const userInfo = document.querySelector('.user');

signInButton.addEventListener('click', signIn);
signOutButton.addEventListener('click', signOutUser);

const initializeInbox = () => Projects.createProject('Inbox', 'inbox');
const getInbox = () => Projects.getProject(0);

function deleteProjectFromDOM(id) {
  const project = document.querySelector(`[project-id="${id}"]`);
  project.remove();
}

function updateProjectNameInDOM(projectId, newName) {
  const project = document.querySelector(`.project[project-id="${projectId}"]`);

  const projectName = project.querySelector('.project-title');
  projectName.textContent = newName;
  setMainHeader(newName);
}

function addProjectToDOM(change) {
  const project = change.doc.data();
  // if inbox was just added (initial load), switch to inbox tab
  if (project.type === 'inbox') {
    const inbox = document.querySelector('.inbox');
    inbox.setAttribute('project-id', project.id);
    switchTab(project.name, project.todos);
  } else {
    displayProject(project.name, change.doc.id);
  }
}

async function updateProjectTodos(project) {
  const active = getActive();
  const activeProjectId = active.getAttribute('project-id');
  const currentTab = active.classList;

  if (currentTab.contains('today')) {
    refreshTodos(await getTodosToday());
  } else if (currentTab.contains('view-all')) {
    refreshTodos(await Projects.getAllTodos());
  } else if (project.id === activeProjectId) {
    refreshTodos(project.todos);
  }
}

function onProjectCollectionChange(snapshot) {
  const docChanges = snapshot.docChanges();
  if (!docChanges.length) {
    initializeInbox();
    return;
  }
  docChanges.forEach(async (change) => {
    const project = change.doc.data();

    switch (change.type) {
      case 'added':
        addProjectToDOM(change);
        break;

      case 'modified':
        updateProjectNameInDOM(project.id, project.name);
        updateProjectTodos(project);
        break;

      case 'deleted':
        {
          deleteProjectFromDOM(project.id);
          // After deletion, switch to inbox tab by default
          const inbox = await getInbox();
          const inboxElement = document.querySelector('.inbox');

          switchTab('Inbox', inbox.todos);
          setActiveClass(inboxElement);
        }
        break;

      default:
        console.error('Unknown change type');
    }
  });
}

function setUserSignedIn(user) {
  if (user) {
    const username = userInfo.querySelector('.user-name');
    const userPic = userInfo.querySelector('.user-pic');
    username.textContent = user.displayName;
    userPic.src = user.photoURL || '/images/profile_placeholder.png';
    userInfo.classList.remove('hidden');
    signInButton.classList.add('hidden');
  } else {
    userInfo.classList.add('hidden');
    signInButton.classList.remove('hidden');
  }
}
function onAuthChange(user) {
  if (!user) {
    setUserSignedIn(false);
    return;
  }

  setUserSignedIn(user);
  listenForCollectionChange(
    `users/${user.uid}/projects`,
    onProjectCollectionChange
  );
}

// Listen for auth state change
listenForAuthChange(onAuthChange);
