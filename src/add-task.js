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

function createNewTask() {
  const taskDialog = document.querySelector(".task-dialog");

  const addTaskButton = document.querySelector(".add-task");
  addTaskButton.addEventListener("click", () => {
    taskDialog.showModal();
  });

  const closeDialog = document.querySelector("#closeDialog");
  closeDialog.addEventListener("click", (event) => {
    event.preventDefault();
    taskDialog.close();
  });

  const addTaskForm = document.getElementById("addTaskForm");
  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (event.target.closest("#addTaskForm")) {
      let title = document.getElementById("title").value;
      console.log(title);

      let description = document.getElementById("description").value;
      console.log(description);

      let dueDate = document.getElementById("dueDate").value;
      console.log(dueDate);

      let priority = document.getElementById("priority").value;
      console.log(priority);

      let notes = document.getElementById("notes").value;
      console.log(notes);

      const task = new Task(title, description, dueDate, priority, notes);
      const card = new Card(task);
    }

    newTaskForm.reset();
  });
}

export function formatDate(date) {
  date = parseISO(date);
  const formattedDate = format(date, "MMMM do");
  return formattedDate;
}

// submitButton.addEventListener("click", (event) => {
//   event.preventDefault();
//   //   displayCards();
//   taskDialog.close();
// });

export { createNewTask };
