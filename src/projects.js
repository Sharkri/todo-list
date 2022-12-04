import {
  addToDatabase,
  deleteInDatabase,
  getCollectionDocs,
  getDocData,
  getUser,
  updateDatabase,
} from './backend';

import createTodo from './todos';

const Projects = (function Projects() {
  function findIndex(array, key, valueToFind) {
    return array.findIndex((item) => item[key] === valueToFind);
  }
  const getProjects = () => {
    const user = getUser();
    return getCollectionDocs(`users/${user.uid}/projects/`);
  };

  async function getAllTodos() {
    const projects = await getProjects();
    return projects.flatMap((project) => project.todos);
  }

  async function getProject(index) {
    const projects = await getProjects();
    return projects[index];
  }

  async function getProjectById(id) {
    const { uid } = getUser();
    const projectPath = `users/${uid}/projects/${id}`;
    const project = await getDocData(projectPath);

    return { projectPath, project };
  }

  async function getTodoById(projectId, todoId) {
    const { project } = await getProjectById(projectId);
    return project.todos.find((todo) => todo.id === todoId);
  }

  async function getIndexOf(projectId) {
    const projects = await getProjects();
    return projects.findIndex((project) => project.id === projectId);
  }

  async function setProjectName(projectId, name) {
    const { project, projectPath } = await getProjectById(projectId);
    project.name = name;
    updateDatabase(projectPath, project);
  }

  async function addTodo(projectId, title, description, dueDate, priority) {
    const { project, projectPath } = await getProjectById(projectId);

    const todo = createTodo(
      title,
      description,
      dueDate,
      priority,
      projectId,
      project.currentTodoId
    );
    // Add new todo into todos array
    project.todos.push(todo);
    project.currentTodoId += 1;
    // Update database
    updateDatabase(projectPath, project);
    return todo;
  }

  async function removeTodo(projectId, todoId) {
    const { project, projectPath } = await getProjectById(projectId);
    const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    project.todos.splice(todoIndex, 1);

    updateDatabase(projectPath, project);
    return project;
  }

  async function editTodo(projectId, todoId, newTodo) {
    const { project, projectPath } = await getProjectById(projectId);
    const { title, description, dueDate, priority } = newTodo;
    const todo = project.todos.find(({ id }) => id === todoId);

    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;

    updateDatabase(projectPath, project);
  }

  async function createProject(name, type) {
    const project = { name, todos: [], currentTodoId: 0 };
    if (type) project.type = type;

    const user = getUser();
    // Add project to database
    const addedDoc = await addToDatabase(`users/${user.uid}/projects`, project);
    // add document project id
    updateDatabase(addedDoc.path, { ...project, id: addedDoc.id });
  }

  function removeProject(projectId) {
    const user = getUser();
    deleteInDatabase(`users/${user.uid}/projects`, projectId);
  }

  return {
    createProject,
    removeProject,
    getProjects,
    getProjectById,
    findIndex,
    addTodo,
    setProjectName,
    removeTodo,
    editTodo,
    getAllTodos,
    getProject,
    getTodoById,
    getIndexOf,
  };
})();

export default Projects;
