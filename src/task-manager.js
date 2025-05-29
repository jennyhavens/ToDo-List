export class Task {
  constructor(projectID, title, description, dueDate, priority, notes) {
    this.id = crypto.randomUUID();
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
    this.currentEditId = null;
  }

  addTask(task) {
    if (!(task instanceof Task)) {
      throw new Error("Invalid task: must be an instance of Task.");
    }

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
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id); // Filter out the task with the given ID
  }

  getTasks(projectID) {
    return projectID !== undefined
      ? this.tasks.filter((task) => task.projectID === projectID)
      : this.tasks; // Return filtered or all tasks
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id); // Return the task object
  }

  setEditIndex(id) {
    this.currentEditId = id;
  }

  resetEditId() {
    this.currentEditId = null;
  }
}
