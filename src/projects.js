import {
  addToDatabase,
  deleteInDatabase,
  getCollectionDocs,
  getDocData,
  getUser,
  updateDatabase,
} from './backend';

import Todos from './todos';

const Projects = (function Projects() {
  const projects = [];

  function findIndex(array, key, valueToFind) {
    return array.findIndex((item) => item[key] === valueToFind);
  }
  const getProjects = () => {
    const user = getUser();
    return getCollectionDocs(`users/${user.uid}/projects/`);
  };
  async function getProject(id) {
    const { uid } = getUser();
    const projectPath = `users/${uid}/projects/${id}`;
    const project = await getDocData(projectPath);

    return { projectPath, project };
  }

  const getProjectById = (id) => projects.find((project) => project.id === id);

  async function setProjectName(projectId, name) {
    const { project, projectPath } = await getProject(projectId);
    project.name = name;
    updateDatabase(projectPath, project);
  }

  async function addTodo(projectId, title, description, dueDate, priority) {
    const { project, projectPath } = await getProject(projectId);

    const todo = Todos.createTodo(
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
    const { project, projectPath } = await getProject(projectId);
    const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    project.todos.splice(todoIndex, 1);

    updateDatabase(projectPath, project);
  }

  async function changeTodoAttribute(projectId, todoId, key, value) {
    const { project, projectPath } = await getProject(projectId);
    // Find the todo and then change its value
    project.todos.find((todo) => todo.id === todoId)[key] = value;

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
    getProject,
    getProjectById,
    findIndex,
    addTodo,
    setProjectName,
    removeTodo,
    changeTodoAttribute,
  };
})();

export default Projects;
