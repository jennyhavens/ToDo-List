import { Project } from "./projects.js";

export class ProjectUI {
  constructor(projectManager, taskManager, taskUI) {
    this.projectManager = projectManager;
    this.taskManager = taskManager;
    this.taskUI = taskUI;
    this.projectList = document.querySelector(".project-list");
    this.projectDialog = document.getElementById("projectDialog");
    this.projectForm = document.getElementById("projectForm");
    this.newProjectBtn = document.getElementById("newProjectBtn");
    this.closeProjectBtn = document.getElementById("closeProjectBtn");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.newProjectBtn.onclick = () => {
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
      if (this.isProjectNameDuplicate(projectName)) {
        alert("Project with this name already exists.");
        return;
      }

      const projectObject = new Project(projectName);
      this.projectManager.addProject(projectObject);
      this.renderProjects();
      this.resetForm();
      this.projectDialog.close();
    };
  }

  isProjectNameDuplicate(projectName) {
    return this.projectManager
      .getProjects()
      .some((project) => project.projectName === projectName);
  }

  renderProjects() {
    this.projectList.innerHTML = "";
    this.projectManager.getProjects().forEach((project) => {
      const projectDiv = this.createProjectElement(project);
      this.projectList.appendChild(projectDiv);
    });
  }

  createProjectElement(project) {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.dataset.id = project.id;

    const nameElement = document.createElement("button");
    nameElement.className = "project-name";
    nameElement.textContent = project.projectName;
    nameElement.onclick = () => {
      this.taskUI.renderTasks(project.id);
    };
    projectDiv.appendChild(nameElement);

    const editProject = document.createElement("button");
    editProject.className = "edit-project";
    editProject.onclick = () => {
      this.projectManager.setEditIndex(project.id);
      this.populateForm(project);
      this.projectDialog.showModal();
    };
    projectDiv.appendChild(editProject);

    const deleteProject = document.createElement("button");
    deleteProject.className = "delete-project";
    deleteProject.onclick = () => {
      const userConfirmed = confirm(
        "Are you sure you want to delete this project?"
      );
      if (userConfirmed) {
        this.projectManager.deleteProject(project.id);
        this.renderProjects();
      }
    };
    projectDiv.appendChild(deleteProject);

    return projectDiv;
  }

  populateForm(project) {
    document.getElementById("projectName").value = project.projectName;
  }

  resetForm() {
    this.projectForm.reset();
    this.projectManager.resetEditId();
  }
}
