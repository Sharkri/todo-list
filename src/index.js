const APP = (function () {
  function createTodo(title, description, dueDate, priority) {
    return { title, description, dueDate, priority };
  }
  return { createTodo };
})();
const DOM = (function () {})();
