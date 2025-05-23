const sideBar = document.createElement("div");
sideBar.classList.add("sidebar");

const allTasksSection = document.createElement("div");
allTasksSection.classList.add("all-tasks-section");

const allTasks = document.createElement("button");
allTasks.className = "all-tasks-btn";
allTasks.textContent = "All Tasks";

const newProject = document.createElement("button");
newProject.className = "new-project-btn";
newProject.textContent = "New Project";

const projectDialog = document.createElement("dialog");
projectDialog.className = "project-dialog";

const projectHeader = document.createElement("h2");
projectHeader.className = "project-header";
projectHeader.textContent = "Projects: ";

const projectContainer = document.createElement("div");
projectContainer.className = "project-container";

const projectList = document.createElement("div");
projectList.className = "project-list";

sideBar.appendChild(allTasksSection);
sideBar.appendChild(projectContainer);

allTasksSection.appendChild(allTasks);

projectContainer.appendChild(projectHeader);
projectContainer.appendChild(newProject);
projectContainer.appendChild(projectList);

export { sideBar };
export { allTasks };
export { newProject };
export { projectContainer };
