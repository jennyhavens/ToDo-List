import { Project } from "./project-manager.js";

export class ProjectUI {
  constructor(projectManager) {
    this.projectManager = projectManager;
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
      const projectName = document.getElementById("projectName").value;
      const project = new Project(projectName);
      this.projectManager.addProject(project);
      this.renderProjects();
      this.resetForm();
      this.projectDialog.close();
    };
  }

  renderProjects() {
    this.projectList.innerHTML = "";
    this.projectManager.getProjects().forEach((project, index) => {
      const projectDiv = this.createProjectElement(project, index);
      this.projectList.appendChild(projectDiv);
    });
  }

  createProjectElement(project, index) {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.dataset.index = index;

    const nameElement = document.createElement("button");
    nameElement.className = "project-name";
    nameElement.textContent = project.projectName;
    projectDiv.appendChild(nameElement);

    const editProject = document.createElement("button");
    editProject.className = "edit-project";
    editProject.textContent = "edit";
    editProject.onclick = () => {
      this.projectManager.setEditIndex(index);
      this.populateForm(project);
      this.projectDialog.showModal();
    };
    projectDiv.appendChild(editProject);

    const addTask = document.createElement("button");
    addTask.className = "add-task";
    addTask.textContent = "add task";
    addTask.onclick = () => {
      const taskDialog = document.getElementById("taskDialog");
      const taskForm = document.getElementById("taskForm");
      taskDialog.showModal();
      taskForm.reset();
    };
    projectDiv.appendChild(addTask);

    const deleteProject = document.createElement("button");
    deleteProject.className = "delete-project";
    deleteProject.textContent = "delete";
    deleteProject.onclick = () => {
      this.projectManager.deleteProject(index);
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
