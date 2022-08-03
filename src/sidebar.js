export default function sidebar() {
  let sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  let links = document.createElement("div");
  links.classList.add("links");

  let inbox = document.createElement("div");
  let inboxIcon = createSVG(
    "currentColor",
    "M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"
  );
  let inboxText = document.createTextNode("Inbox");
  inbox.appendChild(inboxIcon);
  inbox.appendChild(inboxText);

  let today = document.createElement("div");
  let calendarIcon = createSVG(
    "currentColor",
    "M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z"
  );
  let todayText = document.createTextNode("Today");
  today.appendChild(calendarIcon);
  today.appendChild(todayText);

  let upcoming = document.createElement("div");
  let upcomingCalendar = createSVG(
    "currentColor",
    "M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"
  );
  let upcomingText = document.createTextNode("View All");
  upcoming.appendChild(upcomingCalendar);
  upcoming.appendChild(upcomingText);

  let projects = document.createElement("div");
  projects.classList.add("projects");
  let arrow = createSVG(
    "currentColor",
    "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
  );
  let projectText = document.createTextNode("Project");
  projects.appendChild(arrow);
  projects.appendChild(projectText);

  inbox.classList.add("inbox");
  today.classList.add("today");
  upcoming.classList.add("upcoming");
  links.appendChild(inbox);
  links.appendChild(today);
  links.appendChild(upcoming);

  sidebar.appendChild(links);
  sidebar.appendChild(projects);
  return sidebar;
}
function createSVG(color, d) {
  const SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  SVG.setAttribute("viewBox", "0 0 24 24");
  path.setAttribute("fill", color);
  path.setAttribute("d", d);
  SVG.appendChild(path);
  return SVG;
}
