import {
  formatDistance,
  subDays,
  addDays,
  formatDistanceStrict,
} from "date-fns";

const APP = (function () {
  const todos = getLocalStorageItem("todos");

  function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorageItem(key) {
    let item = JSON.parse(localStorage.getItem(key));
    // if item exists in the local storage, return it. else empty array.
    return item ? item : [];
  }

  function createTodo(title, description, dueDate, priority) {
    return { title, description, dueDate, priority };
  }

  return { getLocalStorageItem };
})();
const DOM = (function () {
  // initial selected
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
  const svgArrow = document.querySelector(".openProject > svg");
  projects.addEventListener("click", (e) => {
    console.log(e.target.contains(svgArrow));
    // If add new project button was clicked
    if (!e.target.contains(svgArrow)) {
      document.querySelector(".modal").classList.toggle("open");
      document.querySelector(".formModal").classList.toggle("open");
    }
    svgArrow.classList.toggle("rotated");
    // show projects
  });
})();
