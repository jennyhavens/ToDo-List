import { TaskManager } from "./tasks.js";
import { TaskUI } from "./task-UI.js";
import { ProjectManager, Project } from "./projects.js";
import { ProjectUI } from "./project-UI.js";
import { themeSwitch } from "./darkmode.js";

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
      title: "Add a New Project",
      description:
        'Find the "+" next to "Projects" and add your own project to get your tasks added and productivity started!',
      dueDate: Date.now() + 8.64e7, // +8.64e+7 is 24 hours in miliseconds, adding it to now results in a due date one day from now.
      priority: "low",
      notes: "",
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      projectID: defaultProject.id,
      title: "Add Tasks to Projects",
      description:
        'Practice adding tasks to your new project or the General Tasks project. Find the big "+" at the top of the project page and practice adding a task or two.',
      dueDate: Date.now() + 8.64e7, // +8.64e+7 is 24 hours in miliseconds, adding it to now results in a due date one day from now.
      priority: "low",
      notes:
        'Once your tasks are added you can view them on the project page or "All Tasks" section. Tasks can be edited or deleted once they are created using the icons. If you would like a fresh start you can clear all local storage with the button at the top of the page.',
      completed: false,
    }
  );
  _projectManager.saveToLocalStorage();
  _taskManager.saveToLocalStorage();
}

document.addEventListener("DOMContentLoaded", initializeApp);

const clearStorageButton = document.getElementById("clearStorage");
clearStorageButton.onclick = () => {
  const userConfirmed = confirm(
    "Warning: this will clear all projects and tasks that you have made since using this app. Are you sure you want to clear?"
  );
  if (userConfirmed) {
    localStorage.clear();
    window.location.reload();
  }
};
