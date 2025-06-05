export class Task {
  constructor(projectID, title, description, dueDate, priority, notes) {
    this.id = crypto.randomUUID();
    this.projectID = projectID;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = false;
  }
}

export class TaskManager {
  constructor() {
    this.tasks = this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.currentEditId = null;
  }

  addTask(task) {
    if (this.currentEditId !== null) {
      const index = this.tasks.findIndex((t) => t.id === this.currentEditId);
      if (index !== -1) {
        this.tasks[index] = task;
        this.resetEditId();
      } else {
        throw new Error("Task to edit not found.");
      }
    } else {
      this.tasks.push(task);
    }
    this.saveToLocalStorage();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToLocalStorage();
  }

  completeTask(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index].completed = task.completed; // Update the completed status
      this.saveToLocalStorage(); // Persist the updated task list
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getTasks(projectID) {
    return projectID !== undefined
      ? this.tasks.filter((task) => task.projectID === projectID)
      : this.tasks;
  }

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  setEditIndex(id) {
    this.currentEditId = id;
  }

  resetEditId() {
    this.currentEditId = null;
  }
}
