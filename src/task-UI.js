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

  renderTasks(projectId) {
    this.taskList.innerHTML = "";
    const tasks = this.taskManager.getTasks(projectId);

    if (tasks.length === 0) {
      const noTasksMessage = document.createElement("div");
      noTasksMessage.textContent = "No tasks available for this project.";
      this.taskList.appendChild(noTasksMessage);
      return;
    }

    tasks.forEach((task, index) => {
      const taskDiv = this.createTaskElement(task, index);
      this.taskList.appendChild(taskDiv);
    });
  }
  //   renderTasks() {
  //     this.taskList.innerHTML = "";
  //     this.taskManager.getTasks().forEach((task, index) => {
  //       const taskDiv = this.createTaskElement(task, index);
  //       this.taskList.appendChild(taskDiv);
  //     });
  //   }

  createTaskElement(task, index) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.dataset.index = index;

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
    taskDiv.appendChild(this.createEditButton(index));
    taskDiv.appendChild(this.createDeleteButton(index));

    return taskDiv;
  }

  createElementWithText(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
  }

  createEditButton(index) {
    const editButton = document.createElement("button");
    editButton.className = "edit-task";
    editButton.textContent = "edit";
    editButton.onclick = () => {
      this.showTaskModal(index);
    };
    return editButton;
  }

  showTaskModal(editIndex = -1, clone = false) {
    if (clone) {
      //We don't support cloning yet bruv, but if we did just grab the existing task info and clone it.
      this.populateForm(this.taskManager.getTasks()[editIndex]);
    } else if (editIndex > -1) {
      //If this is trying to edit an existing task, do so.
      this.taskManager.setEditIndex(editIndex);
      this.populateForm(this.taskManager.getTasks()[editIndex]);
    } else {
      //If it's a new task, reset the form.
      this.resetForm();
    }
    //Always refresh the project list and show the actual UI.
    this.refreshProjectList();
    this.taskDialog.showModal();
  }

  createDeleteButton(index) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.textContent = "delete";
    deleteButton.onclick = () => {
      this.taskManager.deleteTask(index);
      this.renderTasks(this.taskManager.getTasks()[index].project);
    };
    return deleteButton;
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
