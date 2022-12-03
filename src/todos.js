function createTodo(title, description, dueDate, priority, projectId, id) {
  return {
    title,
    description,
    dueDate,
    priority,
    projectId,
    id,
  };
}

export default createTodo;
