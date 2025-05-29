export class Task {
  constructor(projectID, title, description, dueDate, priority, notes) {
    this.projectID = projectID;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }
}

export class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentEditIndex = null;
  }

  addTask(task) {
    if (this.currentEditIndex !== null) {
      this.tasks[this.currentEditIndex] = task;
    } else {
      this.tasks.push(task);
    }
    this.currentEditIndex = null;
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }

  getTasks(projectID) {
    if (projectID !== undefined) {
      let filteredTaskList = this.tasks.filter(
        (task) => task.projectID === projectID
      );
      return filteredTaskList;
    } else {
      return this.tasks;
    }

    return this.tasks;
  }

  setEditIndex(index) {
    this.currentEditIndex = index;
  }

  resetEditIndex() {
    this.currentEditIndex = null;
  }
}
