import { APP } from ".";

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorageItem(key) {
  const item = JSON.parse(localStorage.getItem(key));
  // if item exists in the local storage, return it. else empty array.
  return item ? item : [];
}

const saveTodos = () => setLocalStorageItem("todos", APP.getTodos());
const saveProjects = () => setLocalStorageItem("projects", APP.getProjects());
function saveProjectsAndTodos() {
  saveTodos();
  saveProjects();
}
export {
  setLocalStorageItem,
  getLocalStorageItem,
  saveProjectsAndTodos,
  saveTodos,
  saveProjects,
};
