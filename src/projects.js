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

  function getRemoveTodo() {
    return function removeTodo(todoId) {
      const projectTodoIndex = findIndex(this.todos, 'id', todoId);
      const todoIndex = findIndex(Todos.getTodos(), 'id', todoId);
      Todos.deleteTodo(todoIndex);
      this.todos.splice(projectTodoIndex, 1);
    };
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

  // // On load, re adds function. Because JSON can't store functions
  // projects.forEach((project) => {
  //   project.addTodo = getAddTodoFunction(project.todos, project.id);
  //   project.removeTodo = getRemoveTodo();
  //   project.setProjectName = getSetProjectName();
  // });

  function removeProject(projectId) {
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
    addTodo,
    setProjectName,
  };
})();

export default Projects;
