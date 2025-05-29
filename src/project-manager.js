import "./task-manager";

export class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.tasks = [];
    this.id = crypto.randomUUID();
  }

  toString() {
    return `${this.projectName}`;
  }
}

export class ProjectManager {
  constructor() {
    this.currentEditIndex = null;
    this.projects = [];
  }

  addProject(projectName) {
    const project = new Project(projectName);
    if (this.currentEditIndex !== null) {
      this.projects[this.currentEditIndex] = project;
    } else {
      this.projects.push(project);
    }
    this.resetEditIndex();
  }

  deleteProject(index) {
    if (index >= 0 && index < this.projects.length) {
      this.projects.splice(index, 1);
    } else {
      console.error("Invalid index provided for deletion");
    }
  }

  getProjects() {
    return this.projects;
  }

  setEditIndex(projectId) {
    this.currentEditIndex = projectId;
  }

  resetEditIndex() {
    this.currentEditIndex = null;
  }
}
