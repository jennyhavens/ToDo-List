// import editImg from "./images/pencil.svg";

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
    taskDisplay.innerHTML = this.myTasks
      .map(
        (task) =>
          `<div class="taskCards">
            <h4 class="task-title">${task.title}<h4>
            <h4 class="task-description">${task.description}<h4>
            <h4 class="task-dueDate">${task.dueDate}<h4>
            <h4 class="task-priority">${task.priority}<h4>
            <h4 class="task-notes">${task.notes}<h4>
            <div id='${task.uuid}' class="taskCardButtons">
                <button class="editButton" onclick="dashboard.editTask('${task.uuid}')">Edit Task</button>
            </div>
        </div>`
      )
      .join("");
  }

  const dashboard = new Tasks();


  export { displayCards() };

  //   editTask(id) {
  //     const taskIdIndex = this.myTasks.findIndex((obj) => obj.uuid === id);
  //     if (taskIdIndex !== -1) {
  //         this.myTasks[taskIdIndex].read =
  //             !this.myLibrary[bookIdIndex].read;
  //         this.displayCards();
  //     }
  // }
}

//   constructor(task) {
//     this.task = task;
//     this.card = this.createCard();
//     Card.cards.push(this);
//   }

//   createCard() {
//     const cardContainer = document.createElement("div");

//     const taskCard = document.createElement("div");
//     taskCard.classList.add("task-card");
//     taskCard.id = this.task.id;

//     taskCard.appendChild(this.cardHeader());
//     taskCard.appendChild(this.cardContent());

//     cardContainer.appendChild(taskCard);
//   }

//   cardHeader() {
//     const taskHeader = document.createElement("div");
//     taskHeader.classList.add("task-header");

//     const titleContainer = document.createElement("div");
//     titleContainer.classList.add("title-container");

//     const taskTitle = document.createElement("h2");
//     taskTitle.textContent = this.task.title;

//     const editTask = this.editTask();

//     //const closeTask =

//     //priority color

//     titleContainer.appendChild(taskTitle);
//     titleContainer.appendChild(editTask);

//     cardHeader.appendChild(titleContainer);

//     return cardHeader;
//   }

//   editTask() {
//     const editButton = document.createElement("button");
//     editButton.id = "edit";

//     const editIcon = document.createElement("img");
//     editIcon.src = editImg;
//     editButton.appendChild(editIcon);

//     return editButton;
//   }

//   cardContent() {
//     const taskContent = document.createElement("div");
//     taskContent.classList.add("task-content");

//     const dueDate = document.createElement("h3");
//     dueDate.textContent = "Due: " + this.task.dueDate;

//     taskContent.appendChild(dueDate);

//     taskContent.appendChild(taskContainer);
//     return taskContent;
//   }
// }
