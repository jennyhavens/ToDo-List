import { TaskManager } from "./tasks.js";
import { TaskUI } from "./task-UI.js";
import { ProjectManager } from "./projects.js";
import { ProjectUI } from "./project-UI.js";

import "./styles.css";

const cont = document.querySelector(".content");

let _taskManager = null;
let _projectManager = null;
let _taskUI = null;
let _projectUI = null;

function initializeApp() {
  _taskManager = new TaskManager();
  _projectManager = new ProjectManager();

  _taskUI = new TaskUI(_taskManager, _projectManager);
  _projectUI = new ProjectUI(_projectManager, _taskManager, _taskUI);

  _taskUI.renderTasks("all");
  _projectUI.renderProjects();
}

document.addEventListener("DOMContentLoaded", initializeApp);

const clearStorageButton = document.getElementById("clearStorage");
clearStorageButton.onclick = () => {
  localStorage.clear();
  window.location.reload();
};
