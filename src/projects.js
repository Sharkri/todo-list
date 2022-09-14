import {
  saveProjects,
  getLocalStorageItem,
  saveProjectsAndTodos,
} from "./Storage";

import { Todos } from "./todos";

const Projects = (function () {
  function getSetProjectName() {
    return function (name) {
      this.name = name;
      saveProjects(projects);
    };
  }

  const projects = getLocalStorageItem("projects");
  let projectIdCount = projects.length ? projects.at(-1).id : -1;

  if (!projects.length) createProject("Inbox");
  // On load, re adds function. Because JSON can't store functions
  for (const project of projects) {
    project.addTodo = getAddTodoFunction(project.todos, project.id);
    project.removeTodo = getRemoveTodo();
    project.setProjectName = getSetProjectName();
  }

  function createProject(name) {
    const todos = [];
    const id = ++projectIdCount;
    const addTodo = getAddTodoFunction(todos, id);
    const removeTodo = getRemoveTodo();
    const setProjectName = getSetProjectName();
    projects.push({ name, todos, addTodo, removeTodo, id, setProjectName });
    saveProjectsAndTodos(projects, Todos.getTodos());
    return { name, todos, addTodo, removeTodo, id, setProjectName };
  }

  function getAddTodoFunction(todos, id) {
    return function (title, description, dueDate, priority) {
      const todo = Todos.createTodo(title, description, dueDate, priority, id);
      todos.push(todo);
      saveProjects(projects);
      return todo;
    };
  }

  function getRemoveTodo() {
    return function (todoId) {
      const projectTodoIndex = findIndex(this.todos, "id", todoId);
      const todoIndex = findIndex(Todos.getTodos(), "id", todoId);
      Todos.deleteTodo(todoIndex);
      this.todos.splice(projectTodoIndex, 1);
      saveProjectsAndTodos(projects, Todos.getTodos());
    };
  }

  function removeProject(projectId) {
    const projectIndex = findIndex(projects, "id", projectId);
    const project = getProject(projectIndex);
    projects.splice(projectIndex, 1);
    // need to copy todos cause splicing removes from original
    let copiedTodos = [...project.todos];
    // Remove all of project todos
    for (const todo of copiedTodos) project.removeTodo(todo.id);
    saveProjectsAndTodos(projects, Todos.getTodos());
  }

  function findIndex(array, key, valueToFind) {
    return array.findIndex((item) => item[key] == valueToFind);
  }

  const getProjects = () => projects;
  const getProject = (index) => projects[index];
  const getProjectById = (id) => projects.find((project) => project.id == id);
  return {
    createProject,
    removeProject,
    getProjects,
    getProject,
    getProjectById,
    findIndex,
  };
})();
export { Projects };
