import {
  getLocalStorageItem,
  saveTodos,
  saveProjectsAndTodos,
} from './Storage';

const Todos = (function Todos() {
  const todos = getLocalStorageItem('todos');

  function getSetTodoProperty(projectId) {
    return function setTodoProperty(key, value, projects) {
      if (this[key] === value) return;
      const project = projects.getProjectById(projectId);
      const todoIndex = project.todos.findIndex((todo) => todo.id === this.id);
      project.todos[todoIndex][key] = value;
      this[key] = value;
      saveProjectsAndTodos(projects.getProjects(), todos);
    };
  }

  // Re-add functions. LocalStorage doesn't save functions
  if (todos.length) {
    todos.forEach((todo) => {
      todo.setTodoProperty = getSetTodoProperty(todo.projectId);
    });
  }

  function createTodo(title, description, dueDate, priority, projectId) {
    return {
      title,
      description,
      dueDate,
      priority,
      projectId,
    };
  }
  const getTodos = () => todos;
  const getTodoById = (id) => todos.find((todo) => todo.id === id);
  const deleteTodo = (index) => todos.splice(index, 1);
  return { createTodo, getTodoById, getTodos, deleteTodo };
})();
export default Todos;
