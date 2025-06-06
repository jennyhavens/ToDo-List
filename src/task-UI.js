import { Task } from "./tasks.js";
import { allTasksBtn } from "./sidebar.js";

export class TaskUI {
  constructor(taskManager, projectManager) {
    this.taskManager = taskManager;
    this.taskList = document.getElementById("taskList");
    this.taskDialog = document.getElementById("taskDialog");
    this.taskForm = document.getElementById("taskForm");
    this.addTaskBtn = document.getElementById("addTaskButton");
    this.closeDialogBtn = document.getElementById("closeDialog");
    this.projectManager = projectManager;
    this.currentProjectId = null;

    this.addEventListeners();
    this.refreshProjectList();
    this.renderTasks();
  }

  refreshProjectList() {
    this.projects = this.projectManager.getProjects();
    this.populateProjectDropdown();
  }

  addEventListeners() {
    this.addTaskBtn.addEventListener("click", () => this.showTaskModal());
    this.closeDialogBtn.addEventListener("click", () =>
      this.taskDialog.close()
    );

    this.taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const task = this.createTaskFromForm();
      this.taskManager.addTask(task);
      this.renderTasks(this.currentProjectId);
      this.resetForm();
      this.taskDialog.close();
    });

    allTasksBtn.addEventListener("click", () => {
      this.currentProjectId = "all";
      this.renderTasks(this.currentProjectId);
    });

    document
      .getElementById("projectDropdown")
      .addEventListener("change", (event) => {
        this.currentProjectId = event.target.value;
        this.renderTasks(this.currentProjectId);
      });
  }

  createTaskFromForm() {
    const projectID = document.getElementById("projectDropdown").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = this.formatDate(document.getElementById("dueDate").value);
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value;

    return new Task(projectID, title, description, dueDate, priority, notes);
  }

  formatDate(dateString) {
    const date = new Date(dateString);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      alert("Date cannot be in the past");
    } else {
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  populateProjectDropdown() {
    const projectDropdown = document.getElementById("projectDropdown");
    projectDropdown.innerHTML = "";

    if (this.projects.length === 0) {
      const option = document.createElement("option");
      option.textContent = "No projects available";
      projectDropdown.appendChild(option);
      return;
    }

    this.projects.forEach((projectObject) => {
      const option = document.createElement("option");
      option.value = projectObject.id;
      option.textContent = projectObject.projectName;
      projectDropdown.appendChild(option);
    });

    projectDropdown.value = this.currentProjectId;
  }

  renderTasks(projectId = null) {
    this.currentProjectId = projectId || this.currentProjectId;
    this.taskList.innerHTML = "";

    const tasks =
      this.currentProjectId === "all"
        ? this.taskManager.getAllTasks()
        : this.taskManager.getTasks(this.currentProjectId);

    if (!tasks.length) {
      const noTasksMessage = document.createElement("div");
      noTasksMessage.textContent =
        projectId === "all"
          ? "No tasks available."
          : "No tasks available for this project.";
      this.taskList.appendChild(noTasksMessage);
      return;
    }

    tasks.forEach((task) => {
      const taskDiv = this.createTaskElement(task);
      taskDiv.className = `task-div ${
        task.completed ? "completed" : ""
      } priority-${task.priority}`;
      this.taskList.appendChild(taskDiv);
    });

    document.getElementById("projectDropdown").value = this.currentProjectId;
  }

  createTaskElement(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task-div ${
      task.completed ? "completed" : ""
    } priority-${task.priority}`;
    taskDiv.dataset.id = task.id;

    taskDiv.append(
      this.createCheckbox(task),
      this.createElementWithText("h3", task.title),
      this.createElementWithText("h4", task.priority),
      this.createElementWithText("p", task.description),
      this.createElementWithText("p", this.formatDate(task.dueDate)),
      this.createElementWithText("p", task.notes),
      this.createEditButton(task.id),
      this.createDeleteButton(task.id)
    );

    return taskDiv;
  }

  createCheckbox(task) {
    const completionCheckbox = document.createElement("input");
    completionCheckbox.type = "checkbox";
    completionCheckbox.checked = task.completed;

    completionCheckbox.addEventListener("change", () => {
      this.toggleTaskCompletion(task);
    });

    return completionCheckbox;
  }

  toggleTaskCompletion(task) {
    task.completed = !task.completed;
    this.taskManager.completeTask(task);
    this.renderTasks(this.currentProjectId);
  }

  createElementWithText(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
  }

  createEditButton(taskId) {
    const editButton = document.createElement("button");
    editButton.className = "edit-task";
    editButton.textContent = "edit";
    editButton.onclick = () => {
      this.showTaskModal(taskId);
    };
    return editButton;
  }

  showTaskModal(taskId) {
    if (taskId) {
      const task = this.taskManager.getTaskById(taskId);
      if (task) {
        this.populateForm(task);
        this.taskManager.setEditIndex(taskId);
      }
    } else {
      this.resetForm();
    }
    this.refreshProjectList();
    this.taskDialog.showModal();
  }

  createDeleteButton(taskId) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.textContent = "delete";
    deleteButton.onclick = () => {
      this.taskManager.deleteTask(taskId);
      this.renderTasks();
    };
    return deleteButton;
  }

  populateForm(task) {
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("dueDate").value = this.formatDate(task.dueDate);
    document.getElementById("priority").value = task.priority;
    document.getElementById("notes").value = task.notes;
    document.getElementById("projectDropdown").value = task.projectID;
  }

  resetForm() {
    this.taskForm.reset();
    document.getElementById("projectDropdown").value = this.currentProjectId;
  }
}
