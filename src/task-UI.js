import { Task } from "./task-manager.js";
import { ProjectManager } from "./project-manager.js";

export class TaskUI {
  constructor(taskManager, projectManager) {
    this.taskManager = taskManager;
    this.taskList = document.getElementById("taskList");
    this.taskDialog = document.getElementById("taskDialog");
    this.taskForm = document.getElementById("taskForm");
    this.openDialogBtn = document.getElementById("openDialog");
    this.closeDialogBtn = document.getElementById("closeDialog");
    console.error(`${this.taskList} -- ${projectManager}`);
    this.projectManager = projectManager;
    console.error(`${this.projectManager}`);

    this.setupEventListeners();
    this.refreshProjectList();
    this.renderTasks(); // Initial render of tasks
  }

  refreshProjectList() {
    //Get the latest projects array from the project manager to ensure we're up to date.
    this.projects = this.projectManager.getProjects();
    //Then popuplate the drop down.
    this.populateProjectDropdown();
  }

  setupEventListeners() {
    this.openDialogBtn.onclick = () => {
      this.showTaskModal();
    };

    this.closeDialogBtn.onclick = () => {
      this.taskDialog.close();
    };

    this.taskForm.onsubmit = (event) => {
      event.preventDefault();
      const task = this.createTaskFromForm();
      this.taskManager.addTask(task);
      this.renderTasks();
      this.resetForm();
      this.taskDialog.close();
    };
  }

  createTaskFromForm() {
    const projectID = document.getElementById("projectDropdown").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value;

    return new Task(projectID, title, description, dueDate, priority, notes);
  }

  populateProjectDropdown() {
    const projectDropdown = document.getElementById("projectDropdown");
    projectDropdown.innerHTML = ""; // Clear existing options

    if (this.projects.length === 0) {
      const option = document.createElement("option");
      option.textContent = "No projects available";
      projectDropdown.appendChild(option);
      return;
    }

    this.projects.forEach((projectObject) => {
      const option = document.createElement("option");
      option.value = projectObject.id; //id must be set on the project for this to work.
      option.textContent = projectObject.projectName;
      projectDropdown.appendChild(option);
    });
  }

  renderTasks(projectId = null) {
    this.taskList.innerHTML = "";
    const tasks = this.taskManager.getTasks(projectId);

    if (tasks.length === 0) {
      const noTasksMessage = document.createElement("div");
      noTasksMessage.textContent = "No tasks available for this project.";
      this.taskList.appendChild(noTasksMessage);
      return;
    }

    tasks.forEach((task) => {
      //removed index
      const taskDiv = this.createTaskElement(task);
      this.taskList.appendChild(taskDiv);
    });
  }

  createTaskElement(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.dataset.id = task.id; //need a unique id for the tasks

    const titleElement = this.createElementWithText("h3", task.title);
    const priorityElement = this.createElementWithText("h4", task.priority);
    const descriptionElement = this.createElementWithText(
      "p",
      task.description
    );
    const dueDateElement = this.createElementWithText("p", task.dueDate);
    const notesElement = this.createElementWithText("p", task.notes);

    taskDiv.append(
      titleElement,
      priorityElement,
      descriptionElement,
      dueDateElement,
      notesElement
    );
    taskDiv.appendChild(this.createEditButton(task.id)); //pass id
    taskDiv.appendChild(this.createDeleteButton(task.id)); //pass id

    return taskDiv;
  }

  createElementWithText(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
  }

  createEditButton(taskId) {
    //changed from index to taskId
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
      this.renderTasks(); //re-render after deletion  //(this.taskManager.getTasks()[index].project)
    };
    return deleteButton;
  }

  populateForm(task) {
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("priority").value = task.priority;
    document.getElementById("notes").value = task.notes;
    document.getElementById("projectDropdown").value = task.projectID; //Set project dropdown
  }

  resetForm() {
    this.taskForm.reset();
    // this.taskManager.resetEditIndex();
    document.getElementById("projectDropdown").value = ""; //reset project selection
  }
}
