import { TaskManager } from "./tasks.js";
import { TaskUI } from "./task-UI.js";
import { ProjectManager } from "./projects.js";
import { ProjectUI } from "./project-UI.js";

import "./styles.css";

let _taskManager = null;
let _projectManager = null;
let _taskUI = null;
let _projectUI = null;

document.addEventListener("DOMContentLoaded", () => {
  //Assign the task manager to a variable that can be used elsewhere later.
  _taskManager = new TaskManager();
  _projectManager = new ProjectManager();

  _taskUI = new TaskUI(_taskManager, _projectManager);
  _projectUI = new ProjectUI(_projectManager, _taskManager, _taskUI);

  //Add the things here.
});

document.addEventListener("DOMContentLoaded", () => {});

const cont = document.querySelector(".content");

console.log("I'm working");
