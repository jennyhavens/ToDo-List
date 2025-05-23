import { TaskManager } from "./task-manager.js";
import { TaskUI } from "./task-UI.js";
import { sideBar } from "./sidebar.js";
import { mainStage } from "./main-stage.js";
import { ProjectManager } from "./project-manager.js";
import { ProjectUI } from "./project-UI.js";

import "./task-manager.js";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new TaskManager();
  const taskUI = new TaskUI(taskManager);
});

document.addEventListener("DOMContentLoaded", () => {
  const projectManager = new ProjectManager();
  const projectUI = new ProjectUI(projectManager);
});

const cont = document.querySelector(".content");

cont.appendChild(sideBar);
cont.appendChild(mainStage);

console.log("I'm working");
