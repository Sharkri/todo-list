import { Projects } from "./projects";
import {
  getLocalStorageItem,
  saveTodos,
  saveProjectsAndTodos,
} from "./Storage";

const Todos = (function () {
  function getSetTodoProperty(projectId) {
    return function (key, value) {
      const project = Projects.getProjectById(projectId);
      const todoIndex = project.todos.findIndex((todo) => todo.id == this.id);
      project["todos"][todoIndex][key] = value;
      this[key] = value;
      saveProjectsAndTodos(Projects.getProjects(), todos);
    };
  }

  const todos = getLocalStorageItem("todos");
  let todoIdCount = todos.length ? todos.at(-1).id : -1;
  // Re-add functions. LocalStorage doesn't save functions
  if (todos.length) {
    for (const todo of todos) {
      todo.setTodoProperty = getSetTodoProperty(todo.projectId);
    }
  }

  function createTodo(title, description, dueDate, priority, projectId) {
    const id = ++todoIdCount;
    const setTodoProperty = getSetTodoProperty(projectId);
    todos.push({
      title,
      description,
      dueDate,
      priority,
      id,
      projectId,
      setTodoProperty,
    });
    saveTodos(todos);
    return {
      title,
      description,
      dueDate,
      priority,
      id,
      projectId,
      setTodoProperty,
    };
  }
  const getTodos = () => todos;
  const getTodoById = (id) => todos.find((todo) => todo.id == id);
  const deleteTodo = (index) => todos.splice(index, 1);
  return { createTodo, getTodoById, getTodos, deleteTodo };
})();
export { Todos };
