// const addButton = document.querySelector(".add-task");
// const submitButton = document.querySelector("submit");

// const taskDialog = document.createElement("dialog");

const mainStage = document.createElement("div");
mainStage.classList.add("main-stage");
mainStage.textContent = "Main Stage";

// class Task {
//   title = "";
//   description = "";
//   dueDate = "";
//   priority = "";
//   notes = "";

//   constructor(title, description, dueDate, priority, notes) {
//     this.title = title;
//     this.description = description;
//     this.dueDate = dueDate;
//     this.priority = priority;
//     this.notes = notes;
//   }
// }

// class TaskList {
//   constructor() {
//     this.myTaskList = [];
//   }

//   addTask(task) {
//     this.myTaskList.push(task);
//     this.taskCards();
//   }

//   taskCards() {
//     array.forEach((task) => {
//       const taskCard = createElement("div");
//       const taskTitle = createElement("h3");
//       taskTitle.textContent = `${task.title}`;

//       taskCard.appendChild(taskTitle);
//     });
//   }
// }

// const tasks = new Task();

// addButton.addEventListener("click", () => {
//   taskDialog.showModal();
// });

// addButton.appendChild(taskDialog);

// submitButton.addEventListener("click", (event) => {
//   event.preventDefault();
//   let taskTitle = titleInput.value;
//   let taskDescription = descriptionInput.value;
//   let taskDueDate = dueDateInput.value;
//   let taskPriority = priorityInput.value;
//   let taskNotes = notesInput.value;
//   tasks.addTask(
//     new Task(taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes)
//   );

//   /* input reset */
//   titleInput.value = "";
//   descriptionInput.value = "";
//   dueDateInput.value = "";
//   priorityInput.value = "";
//   notesInput.checked = "";

//   /* make hidden */
//   taskCards();
//   dialogForm.close();
// });

// //Example task
// library.addTask(
//   new Task(
//     "Groceries",
//     "buy groceries",
//     "date here",
//     "high",
//     "I really need to buy groceries"
//   )
// );
export { mainStage };
