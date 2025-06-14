import { TaskUI } from "./task-UI";

export class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = crypto.randomUUID();
  }

  toString() {
    return `${this.projectName}`;
  }
}

export class ProjectManager {
  constructor() {
    this.projects = JSON.parse(localStorage.getItem("projects")) || [];
    this.currentEditId = null;
  }
  addProject(projectObject) {
    if (this.currentEditId != null) {
      this.editProject(projectObject);
    } else {
      this.createProject(projectObject);
    }
  }

  createProject(projectObject) {
    this.projects.push(projectObject);
    this.saveToLocalStorage();
  }

  editProject(projectObject) {
    const index = this.projects.findIndex((p) => p.id === this.currentEditId);
    if (index !== -1) {
      this.projects[index].projectName = projectObject.projectName;
      this.resetEditId();
      this.saveToLocalStorage();
    } else {
      throw new Error("Project to edit not found.");
    }
  }

  deleteProject(id) {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
    } else {
      console.error("Project to delete not found.");
    }
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  getProjects() {
    return this.projects;
  }

  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }

  setEditIndex(projectId) {
    this.currentEditId = projectId;
  }

  resetEditId() {
    this.currentEditId = null;
  }
}
