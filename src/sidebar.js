const allTasksSection = document.createElement("div");
allTasksSection.classList.add("all-tasks-section");

const allTasksBtn = document.createElement("button");
allTasksBtn.className = "all-tasks-btn";
allTasksBtn.textContent = "All Tasks";

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

allTasksSection.appendChild(allTasksBtn);

projectContainer.appendChild(projectHeader);
projectContainer.appendChild(newProject);
projectContainer.appendChild(projectList);

export { allTasksBtn };
export { newProject };
export { projectContainer };
