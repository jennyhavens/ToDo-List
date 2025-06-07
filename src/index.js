import { TaskManager } from "./tasks.js";
import { TaskUI } from "./task-UI.js";
import { ProjectManager, Project } from "./projects.js";
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

  //Constructors for task and project manager handle
  // deserializing save data and populating saved tasks/projects.
  //But if we don't have any projects at all, populate the examples.
  if (_projectManager.projects.length === 0) {
    addDefaultProject();
  }

  _taskUI = new TaskUI(_taskManager, _projectManager);
  _projectUI = new ProjectUI(_projectManager, _taskManager, _taskUI);

  _taskUI.renderTasks("all");
  _projectUI.renderProjects();
}

function addDefaultProject() {
  const defaultProject = new Project("General Tasks");

  _projectManager.projects.push(defaultProject);

  _taskManager.tasks.push(
    {
      id: crypto.randomUUID(),
      projectID: defaultProject.id,
      title: "Practice task 1",
      description: "",
      dueDate: Date.now() + 8.64e7, // +8.64e+7 is 24 hours in miliseconds, adding it to now results in a due date one day from now.
      priority: "low",
      notes: "",
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      projectID: defaultProject.id,
      title: "Practice task 2",
      description: "",
      dueDate: Date.now() + 8.64e7, // +8.64e+7 is 24 hours in miliseconds, adding it to now results in a due date one day from now.
      priority: "low",
      notes: "",
      completed: false,
    }
  );
  _projectManager.saveToLocalStorage();
  _taskManager.saveToLocalStorage();
}

document.addEventListener("DOMContentLoaded", initializeApp);

const clearStorageButton = document.getElementById("clearStorage");
clearStorageButton.onclick = () => {
  localStorage.clear();
  window.location.reload();
};
