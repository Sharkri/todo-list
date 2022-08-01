export default function loadHeader(element) {
  let header = document.createElement("div");
  header.classList.add("header");
  let headerText = document.createElement("h1");
  headerText.textContent = "Todo List";
  header.appendChild(headerText);
  element.appendChild(header);
}
