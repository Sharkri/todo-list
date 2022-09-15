function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorageItem(key) {
  const item = JSON.parse(localStorage.getItem(key));
  // if item exists in the local storage, return it. else empty array.
  return item || [];
}

function saveTodos(todos) {
  setLocalStorageItem('todos', todos);
}

function saveProjects(projects) {
  setLocalStorageItem('projects', projects);
}

function saveProjectsAndTodos(projects, todos) {
  saveTodos(todos);
  saveProjects(projects);
}

export { getLocalStorageItem, saveTodos, saveProjects, saveProjectsAndTodos };
