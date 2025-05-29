// import { Project } from "./project-manager.js";
// import { TaskUI } from "./task-UI.js";

// export class ProjectUI {
//   constructor(projectManager, taskUI) {
//     this.projectManager = projectManager;
//     this.taskUI = taskUI;
//     this.projectList = document.querySelector(".project-list");
//     this.projectDialog = document.getElementById("projectDialog");
//     this.projectForm = document.getElementById("projectForm");
//     this.newProject = document.querySelector(".new-project-btn");
//     this.closeProjectBtn = document.getElementById("closeProjectBtn");

//     this.setupEventListeners();
//   }

//   setupEventListeners() {
//     this.newProject.onclick = () => {
//       this.projectDialog.showModal();
//       this.resetForm();
//     };

//     this.closeProjectBtn.onclick = () => {
//       this.projectDialog.close();
//     };

//     this.projectForm.onsubmit = (event) => {
//       event.preventDefault();
//       const projectNameInput = document.getElementById("projectName");
//       const projectName = projectNameInput.value.trim();
//       const project = new Project(projectName);
//       this.projectManager.addProject(project);
//       this.renderProjects();
//       this.resetForm();
//       this.projectDialog.close();
//     };
//   }

//   renderProjects() {
//     this.projectList.innerHTML = "";
//     this.projectManager.getProjects().forEach((project, index) => {
//       const projectDiv = this.createProjectElement(project, index);
//       this.projectList.appendChild(projectDiv);
//     });
//   }

//   createProjectElement(project, index) {
//     const projectDiv = document.createElement("div");
//     projectDiv.className = "project";
//     projectDiv.dataset.index = index;

//     const nameElement = document.createElement("button");
//     nameElement.className = "project-name";
//     nameElement.textContent = project.projectName;
//     nameElement.onclick = () => {
//       this.taskUI.renderTasks(project);
//     };
//     projectDiv.appendChild(nameElement);

//     const editProject = document.createElement("button");
//     editProject.className = "edit-project";
//     editProject.textContent = "edit";
//     editProject.onclick = () => {
//       this.projectManager.setEditIndex(index);
//       this.populateForm(project);
//       this.projectDialog.showModal();
//     };
//     projectDiv.appendChild(editProject);

//     const deleteProject = document.createElement("button");
//     deleteProject.className = "delete-project";
//     deleteProject.textContent = "delete";
//     deleteProject.onclick = () => {
//       this.projectManager.deleteProject(index);
//       this.renderProjects();
//     };
//     projectDiv.appendChild(deleteProject);

//     return projectDiv;
//   }

//   populateForm(project) {
//     document.getElementById("projectName").value = project.projectName;
//   }

//   resetForm() {
//     this.projectForm.reset();
//     this.projectManager.resetEditIndex();
//   }
// }

import { Project } from "./project-manager.js";
import { TaskUI } from "./task-UI.js";

export class ProjectUI {
  constructor(projectManager, taskManager, taskUI) {
    this.projectManager = projectManager;
    this.taskUI = taskUI;
    this.projectList = document.querySelector(".project-list");
    this.projectDialog = document.getElementById("projectDialog");
    this.projectForm = document.getElementById("projectForm");
    this.newProject = document.querySelector(".new-project-btn");
    this.closeProjectBtn = document.getElementById("closeProjectBtn");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.newProject.onclick = () => {
      this.projectDialog.showModal();
      this.resetForm();
    };

    this.closeProjectBtn.onclick = () => {
      this.projectDialog.close();
    };

    this.projectForm.onsubmit = (event) => {
      event.preventDefault();
      const projectNameInput = document.getElementById("projectName");
      const projectName = projectNameInput.value.trim();

      if (!projectName) {
        alert("Project name cannot be empty.");
        return;
      }

      const project = new Project(projectName);
      this.projectManager.addProject(project);
      this.renderProjects();
      this.resetForm();
      this.projectDialog.close();
    };
  }

  renderProjects() {
    this.projectList.innerHTML = ""; // Consider using a safer approach
    this.projectManager.getProjects().forEach((project) => {
      const projectDiv = this.createProjectElement(project);
      this.projectList.appendChild(projectDiv);
    });
  }

  createProjectElement(project) {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.dataset.id = project.id; // Assuming project has a unique ID

    const nameElement = document.createElement("button");
    nameElement.className = "project-name";
    nameElement.textContent = project.projectName;
    nameElement.onclick = () => {
      this.taskUI.renderTasks(project.id); // Call renderTasks with project ID
    };
    projectDiv.appendChild(nameElement);

    const editProject = document.createElement("button");
    editProject.className = "edit-project";
    editProject.textContent = "edit";
    editProject.onclick = () => {
      this.projectManager.setEditIndex(project.id);
      this.populateForm(project);
      this.projectDialog.showModal();
    };
    projectDiv.appendChild(editProject);

    const deleteProject = document.createElement("button");
    deleteProject.className = "delete-project";
    deleteProject.textContent = "delete";
    deleteProject.onclick = () => {
      this.projectManager.deleteProject(project.id);
      this.renderProjects();
    };
    projectDiv.appendChild(deleteProject);

    return projectDiv;
  }

  populateForm(project) {
    document.getElementById("projectName").value = project.projectName;
  }

  resetForm() {
    this.projectForm.reset();
    this.projectManager.resetEditIndex();
  }
}
