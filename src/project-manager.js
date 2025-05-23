export class Project {
  constructor(projectName) {
    this.projectName = projectName;
  }
}

export class ProjectManager {
  constructor(projectName) {
    this.projectName = projectName;
    this.currentEditIndex = null;
    this.projects = [];
  }

  addProject(project) {
    if (this.currentEditIndex !== null) {
      this.projects[this.currentEditIndex] = project;
    } else {
      this.projects.push(project);
    }
    this.currentEditIndex = null;
  }

  deleteProject(index) {
    this.projects.splice(index, 1);
  }

  getProjects() {
    return this.projects;
  }

  setEditIndex(index) {
    this.currentEditIndex = index;
  }

  resetEditIndex() {
    this.currentEditIndex = null;
  }
}
