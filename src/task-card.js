import { format } from "date-fns";

const addTaskButton = document.querySelector(".add-task");
const taskDialog = document.querySelector(".task-dialog");
const closeDialog = document.querySelector("#closeDialog");
const submitButton = document.querySelector("#submitButton");
const contentBoard = document.querySelector(".content");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const dueDate = document.querySelector("#dueDate");
const priority = document.querySelector("#priority");
const notes = document.querySelector("#notes");

export class Card {
  title = "";
  description = "";
  dueDate = "";
  priority = "";
  notes = "";
  uuid = "-1";

  constructor(title, description, dueDate, priority, notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.uuid = crypto.randomUUID();
  }
}

export class Tasks {
  constructor() {
    this.myTasks = [];
  }

  addTask(task) {
    this.myTasks.push(task);
    this.displayCards();
  }

  displayCards() {
    contentBoard.innerHTML = this.myTasks
      .map(
        (task) =>
          `<div class="taskCards">
            <h4 class="task-title">${task.title}</h4>
            <h4 class="task-description">${task.description}</h4>
            <h4 class="task-dueDate">${task.dueDate}</h4>
            <h4 class="task-priority">${task.priority}</h4>
            <h4 class="task-notes">${task.notes}</h4>
            <div id='${task.uuid}' class="taskCardButtons">
                <button class="editButton" onclick="dashboard.editTask('${task.uuid}')">Edit Task</button>
            </div>
        </div>`
      )
      .join("");
  }

  editTask(id) {
    const taskIdIndex = this.myTasks.findIndex((obj) => obj.uuid === id);
    //code to open dialog to edit task\
    this.displayCards();
  }

  removeTask(id) {
    const objIdIndex = this.myTasks.findIndex((obj) => obj.uuid === id);
    if (objIdIndex !== -1) {
      this.myTasks.splice(objIdIndex, 1);
      this.displayCards();
    }
  }
}

const dashboard = new Tasks();

function createTask() {
  addTaskButton.addEventListener("click", () => {
    taskDialog.showModal();
  });

  closeDialog.addEventListener("click", (event) => {
    event.preventDefault();
    taskDialog.close();
  });

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let taskTitle = title.value;
    let taskDescription = description.value.trim();
    let taskDueDate = dueDate.value;
    let taskPriority = priority.value;
    let taskNotes = notes.value.trim();
    dashboard.addTask(
      new Card(taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes)
    );

    /* input reset */
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";
    notes.value = "";

    dashboard.displayCards();
    taskDialog.close();
  });
}

createTask();

export { dashboard };
