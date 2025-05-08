const sideBar = document.createElement("div");
sideBar.classList.add("sidebar");

const taskNav = document.createElement("div");
taskNav.classList.add("task-nav");

const homeBtn = document.createElement("button");
homeBtn.classList.add("home-btn");
homeBtn.textContent = "Home";

const myTasks = document.createElement("button");
myTasks.classList.add("my-tasks");
myTasks.textContent = "My Tasks";

const calView = document.createElement("button");
calView.classList.add("cal-view");
calView.textContent = "Calendar";

const projContainer = document.createElement("div");
projContainer.classList.add("project-container");

const projectHead = document.createElement("h2");
projectHead.classList.add("project-head");
projectHead.textContent = "Projects";

const projectList = ["Project 1", "Project 2", "Project 3"];
const projects = document.createElement("ul");
projects.classList.add("projects");
projectList.forEach((newProject) => {
  const div = document.createElement("div");
  const listBtns = document.createElement("button");
  projects.appendChild(div);
  listBtns.textContent = newProject;
  div.appendChild(listBtns);
});

sideBar.appendChild(taskNav);
sideBar.appendChild(projContainer);

taskNav.appendChild(homeBtn);
taskNav.appendChild(myTasks);
taskNav.appendChild(calView);

projContainer.appendChild(projectHead);
projContainer.appendChild(projects);

export { sideBar };
