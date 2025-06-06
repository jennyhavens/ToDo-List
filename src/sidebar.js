const allTasksSection = document.createElement("div");
allTasksSection.classList.add("all-tasks-section");

const allTasksBtn = document.createElement("button");
allTasksBtn.className = "all-tasks-btn";
allTasksBtn.textContent = "All Tasks";

const projectDialog = document.createElement("dialog");
projectDialog.className = "project-dialog";

const projectContainer = document.createElement("div");
projectContainer.className = "project-container";

const projectList = document.createElement("div");
projectList.className = "project-list";

sideBar.appendChild(allTasksSection);
sideBar.appendChild(projectContainer);

allTasksSection.appendChild(allTasksBtn);

projectContainer.appendChild(projectList);

export { allTasksBtn };
export { projectContainer };
