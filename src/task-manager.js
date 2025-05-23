export class Task {
  constructor(title, description, dueDate, priority, notes) {
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

  getTasks() {
    return this.tasks;
  }

  setEditIndex(index) {
    this.currentEditIndex = index;
  }

  resetEditIndex() {
    this.currentEditIndex = null;
  }
}
