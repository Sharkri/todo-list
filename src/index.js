import header from "./header";
import main from "./mainContent";
import sidebar from "./sidebar";
let content = document.querySelector("#content");
// Initial load
content.appendChild(header());
content.appendChild(main());
content.appendChild(sidebar());

const APP = (function () {
  function createTodo(title, description, dueDate, priority) {
    return { title, description, dueDate, priority };
  }
  return { createTodo };
})();
const DOM = (function () {})();
