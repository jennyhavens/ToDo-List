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
    this.projects = [];
    this.currentEditId = null;
  }

  addProject(projectName) {
    if (this.currentEditId != null) {
      const index = this.projects.findIndex((p) => p.id === this.currentEditId);
      if (index !== -1) {
        this.projects[index] = projectName;
        this.resetEditId();
      } else {
        throw new Error("Project to edit not found.");
      }
    } else {
      this.projects.push(projectName);
    }
  }

  //   const project = new Project(projectName);
  //   if (this.currentEditIndex !== null) {
  //     this.projects[this.currentEditIndex] = project;
  //   } else {
  //     this.projects.push(project);
  //   }
  //   this.resetEditIndex();

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

  getProjectById(id) {
    return this.tasks.find((project) => project.id === id);
  }

  setEditIndex(projectId) {
    this.currentEditId = projectId;
  }

  resetEditId() {
    this.currentEditId = null;
  }
}
