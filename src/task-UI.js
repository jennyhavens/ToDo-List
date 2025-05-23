import { TaskManager } from "./task-manager.js";
import { Task } from "./task-manager.js";

export class TaskUI {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.taskList = document.getElementById("taskList");
    this.taskDialog = document.getElementById("taskDialog");
    this.taskForm = document.getElementById("taskForm");
    this.openDialogBtn = document.getElementById("openDialog");
    this.closeDialogBtn = document.getElementById("closeDialog");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.openDialogBtn.onclick = () => {
      this.taskDialog.showModal();
      this.resetForm();
    };

    this.closeDialogBtn.onclick = () => {
      this.taskDialog.close();
    };

    this.taskForm.onsubmit = (event) => {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const dueDate = document.getElementById("dueDate").value;
      const priority = document.getElementById("priority").value;
      const notes = document.getElementById("notes").value;

      const task = new Task(title, description, dueDate, priority, notes);
      this.taskManager.addTask(task);
      this.renderTasks();
      this.resetForm();
      this.taskDialog.close();
    };
  }

  renderTasks() {
    this.taskList.innerHTML = "";
    this.taskManager.getTasks().forEach((task, index) => {
      const taskDiv = this.createTaskElement(task, index);
      this.taskList.appendChild(taskDiv);
    });
  }

  createTaskElement(task, index) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.dataset.index = index;

    const titleElement = document.createElement("h3");
    titleElement.textContent = task.title;
    taskDiv.appendChild(titleElement);

    const descriptionElement = document.createElement("h4");
    descriptionElement.textContent = task.description;
    taskDiv.appendChild(descriptionElement);

    const dueDateElement = document.createElement("p");
    dueDateElement.textContent = task.dueDate;
    taskDiv.appendChild(dueDateElement);

    const notesElement = document.createElement("p");
    notesElement.textContent = task.notes;
    taskDiv.appendChild(notesElement);

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "edit";
    editButton.onclick = () => {
      this.taskManager.setEditIndex(index);
      this.populateForm(task);
      this.taskDialog.showModal();
    };
    taskDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "delete";
    deleteButton.onclick = () => {
      this.taskManager.deleteTask(index);
      this.renderTasks();
    };
    taskDiv.appendChild(deleteButton);

    return taskDiv;
  }

  populateForm(task) {
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("priority").value = task.priority;
    document.getElementById("notes").value = task.notes;
  }

  resetForm() {
    this.taskForm.reset();
    this.taskManager.resetEditIndex();
  }
}
