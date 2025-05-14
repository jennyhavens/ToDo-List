// import { parseISO, format } from "date-fns";
// import { Card } from "./task-card.js";

// export class Task {
//   // private variables
//   #id;
//   #title;
//   #description;
//   #dueDate;
//   #priority;
//   #notes;
//   #completed;

//   static tasks = [];

//   constructor(title, description, dueDate, priority, notes) {
//     this.#id = crypto.randomUUID();
//     this.#title = title;
//     this.#description = description;
//     this.#dueDate = dueDate;
//     this.#priority = priority;
//     this.#notes = notes;
//     this.#completed = false;

//     Task.tasks.push(this);
//   }

//   // give json access to private properties
//   toJSON() {
//     return {
//       id: this.#id,
//       title: this.#title,
//       description: this.#description,
//       dueDate: this.#dueDate,
//       priority: this.#priority,
//       notes: this.#notes,
//       completed: this.#completed,
//     };
//   }

//   // reconstruct the task objects
//   static fromJSON(obj) {
//     const task = new Task(
//       obj.id,
//       obj.title,
//       obj.description,
//       obj.dueDate,
//       obj.priority,
//       obj.notes,
//       obj.completed
//     );

//     task.#id = obj.id;
//     task.#title = obj.title;
//     task.#description = obj.description;
//     task.#dueDate = obj.dueDate;
//     task.#priority = obj.priority;
//     task.#notes = obj.notes;
//     task.#completed = obj.completed;

//     return task;
//   }

//   toggleComplete() {
//     this.#completed = !this.#completed;
//   }

//   // getters
//   get id() {
//     return this.#id;
//   }
//   get title() {
//     return this.#title;
//   }
//   get description() {
//     return this.#description;
//   }
//   get dueDate() {
//     return this.#dueDate;
//   }
//   get priority() {
//     return this.#priority;
//   }
//   get notes() {
//     return this.#notes;
//   }
//   get completed() {
//     return this.#completed;
//   }
//   get tasks() {
//     return Task.tasks;
//   }

//   // setters
//   set title(title) {
//     this.#title = title;
//   }
//   set description(description) {
//     this.#description = description;
//   }
//   set dueDate(dueDate) {
//     this.#dueDate = dueDate;
//   }
//   set priority(priority) {
//     this.#priority = priority;
//   }
//   set notes(notes) {
//     this.#notes = notes;
//   }
// }

import { Card } from "./task-card";
import { displayCards } from "./task-card";

const taskDialog = document.querySelector(".task-dialog");
const addTaskButton = document.querySelector(".add-task");
const closeDialog = document.querySelector("#closeDialog");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const dueDate = document.querySelector("#dueDate");
const priority = document.querySelector("#priority");
const notes = document.querySelector("#notes");

function createNewTask() {
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
    let taskDescription = description.value;
    let taskDueDate = dueDate.value;
    let taskPriority = priority.value;
    let taskNotes = notes.value;
    dashboard.addTask(
      new Card(taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes)
    );

    /* input reset */
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";
    notes.value = "";

    /* make hidden */
    displayCards();
    dialogForm.close();
  });
}

// submitButton.addEventListener("click", (event) => {
//   event.preventDefault();
//   //   displayCards();
//   taskDialog.close();
// });

export { createNewTask };
