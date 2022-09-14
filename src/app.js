import {
  saveTodos,
  saveProjects,
  getLocalStorageItem,
  saveProjectsAndTodos,
} from "./Storage";

const APP = (function () {
  function getSetTodoProperty(projectId) {
    return function (key, value) {
      const project = getProjectById(projectId);
      const todoIndex = findIndex(project.todos, "id", this.id);
      project["todos"][todoIndex][key] = value;
      this[key] = value;
      saveProjectsAndTodos(projects, todos);
    };
  }

  function getSetProjectName() {
    return function (name) {
      this.name = name;
      saveProjects(projects);
    };
  }

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
    project.addTodo = getAddTodoFunction(project.todos, project.id);
    project.removeTodo = getRemoveTodo();
    project.setProjectName = getSetProjectName();
  }

  if (todos.length) {
    for (const todo of todos) {
      todo.setTodoProperty = getSetTodoProperty(todo.projectId);
    }
  }

  function createTodo(title, description, dueDate, priority, projectId) {
    const id = ++todoIdCount;
    console.log(todoIdCount);
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

  function createProject(name) {
    const todos = [];
    const id = ++projectIdCount;
    const addTodo = getAddTodoFunction(todos, id);
    const removeTodo = getRemoveTodo();
    const setProjectName = getSetProjectName();
    projects.push({ name, todos, addTodo, removeTodo, id, setProjectName });
    saveProjectsAndTodos(projects, todos);
    return { name, todos, addTodo, removeTodo, id, setProjectName };
  }

  function getAddTodoFunction(todos, id) {
    return function (title, description, dueDate, priority) {
      const todo = createTodo(title, description, dueDate, priority, id);
      todos.push(todo);
      saveProjects(projects);
      return todo;
    };
  }

  function getRemoveTodo() {
    return function (todoId) {
      const projectTodoIndex = findIndex(this.todos, "id", todoId);
      const todoIndex = findIndex(todos, "id", todoId);
      todos.splice(todoIndex, 1);
      this.todos.splice(projectTodoIndex, 1);
      saveProjectsAndTodos(projects, todos);
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
    saveProjectsAndTodos(projects, todos);
  }

  function findIndex(array, key, valueToFind) {
    return array.findIndex((item) => item[key] == valueToFind);
  }

  const getTodos = () => todos;
  const getTodoById = (id) => todos.find((todo) => todo.id == id);
  const getProjects = () => projects;
  const getProject = (index) => projects[index];
  const getProjectById = (id) => projects.find((project) => project.id == id);
  return {
    createTodo,
    createProject,
    removeProject,
    getTodos,
    getProjects,
    getProject,
    getProjectById,
    getTodoById,
    findIndex,
  };
})();
export { APP };
