import { addToDatabase, deleteInDatabase, getUser } from './backend';
import {
  saveProjects,
  getLocalStorageItem,
  saveProjectsAndTodos,
} from './Storage';

import Todos from './todos';

const Projects = (function Projects() {
  const projects = getLocalStorageItem('projects');
  function findIndex(array, key, valueToFind) {
    return array.findIndex((item) => item[key] === valueToFind);
  }
  const getProjects = () => projects;
  const getProject = (index) => projects[index];
  const getProjectById = (id) => projects.find((project) => project.id === id);

  function getSetProjectName() {
    return function setProjectName(name) {
      this.name = name;
      saveProjects(projects);
    };
  }
  function getAddTodoFunction(todos, id) {
    return function addTodo(title, description, dueDate, priority) {
      const todo = Todos.createTodo(title, description, dueDate, priority, id);
      todos.push(todo);
      saveProjects(projects);
      return todo;
      // ADD TO DATABASE INSTEAD
    };
  }
  function getRemoveTodo() {
    return function removeTodo(todoId) {
      const projectTodoIndex = findIndex(this.todos, 'id', todoId);
      const todoIndex = findIndex(Todos.getTodos(), 'id', todoId);
      Todos.deleteTodo(todoIndex);
      this.todos.splice(projectTodoIndex, 1);
      saveProjectsAndTodos(projects, Todos.getTodos());
    };
  }

  function createProject(name) {
    // projectIdCount += 1;
    // const id = projectIdCount.toString();
    // const addTodo = getAddTodoFunction(todos, id);
    // const removeTodo = getRemoveTodo();
    // const setProjectName = getSetProjectName();
    // projects.push({ name, todos, addTodo, removeTodo, id, setProjectName });
    // saveProjectsAndTodos(projects, Todos.getTodos());
    // return { name, todos, addTodo, removeTodo, id, setProjectName };
    const user = getUser();
    addToDatabase(`users/${user.uid}/projects`, { name, todos: [] });
  }

  if (!projects.length) createProject('Inbox');
  // On load, re adds function. Because JSON can't store functions
  projects.forEach((project) => {
    project.addTodo = getAddTodoFunction(project.todos, project.id);
    project.removeTodo = getRemoveTodo();
    project.setProjectName = getSetProjectName();
  });

  function removeProject(projectId) {
    // const projectIndex = findIndex(projects, 'id', projectId);
    // const project = getProject(projectIndex);
    // projects.splice(projectIndex, 1);
    // // need to copy todos cause splicing removes from original
    // const copiedTodos = [...project.todos];
    // // Remove all of project todos
    // copiedTodos.forEach((todo) => project.removeTodo(todo.id));
    // saveProjectsAndTodos(projects, Todos.getTodos());
    const user = getUser();
    deleteInDatabase(`users/${user.uid}/projects`, projectId);
  }

  return {
    createProject,
    removeProject,
    getProjects,
    getProject,
    getProjectById,
    findIndex,
  };
})();
export default Projects;
