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
    this.projects = JSON.parse(localStorage.getItem("projects")) || [];
    this.currentEditId = null;
  }

  //TODO: This is not the "projectName" but rather the project Object directly which has a reference to the name/other variables.
  //If you have other properties in the project object that need to be "updated" from edit mode you need to
  // update each property direcctly in this edit mode.
  addProject(projectObject) {
    if (this.currentEditId != null) {
      const index = this.projects.findIndex((p) => p.id === this.currentEditId);
      if (index !== -1) {
        this.projects[index].projectName = projectObject.projectName;
        //If you add more project vars, like "type" or "owner" etc that need to be updated, do so here
        //I.e.: this.projects[index].type = projectName.type.
        this.resetEditId();
      } else {
        throw new Error("Project to edit not found.");
      }
    } else {
      this.projects.push(projectObject);
    }
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  deleteProject(id) {
    if (id >= 0 && index < this.projects.length) {
      this.projects.splice(id, 1);
    } else {
      console.error("Invalid index provided for deletion");
    }
  }

  deleteProject(id) {
    this.projects = this.projects.filter((project) => project.id !== id);
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
