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

    if (this.projects.length === 0) {
      this.addDefaultProject();
    }
  }

  addDefaultProject() {
    const defaultProject = new Project("General Tasks");
    defaultProject.tasks.push({
      id: crypto.randomUUID(),
      title: "Practice task 1",
      completed: false,
    });
    defaultProject.tasks.push({
      id: crypto.randomUUID(),
      title: "Practice task 2",
      completed: false,
    });

    this.projects.push(defaultProject);
    this.saveToLocalStorage();
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
      this.saveToLocalStorage();
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
