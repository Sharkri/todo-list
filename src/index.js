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
const DOM = (function () {
  const links = document.querySelectorAll(".links div");
  links[0].classList.toggle("active");

  links.forEach((link) =>
    link.addEventListener("click", (e) => {
      removeAllActiveClass();
      link.classList.toggle("active");
    })
  );

  function removeAllActiveClass() {
    links.forEach((element) => element.classList.remove("active"));
  }

  const projects = document.querySelector(".projects");
  const svgArrow = document.querySelector(".projects > svg");
  projects.addEventListener("click", () => {
    svgArrow.classList.toggle("rotated");
    // show projects
  });
})();
