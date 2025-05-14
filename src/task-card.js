import editImg from "./images/pencil.svg";

export class Card {
  static cards = [];

  constructor(task) {
    this.task = task;
    this.card = this.createCard();
    Card.cards.push(this);
  }

  createCard() {
    const cardContainer = document.createElement("div");

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.id = this.task.id;

    taskCard.appendChild(this.cardHeader());
    taskCard.appendChild(this.cardContent());

    cardContainer.appendChild(taskCard);
  }

  cardHeader() {
    const taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");

    const taskTitle = document.createElement("h2");
    taskTitle.textContent = this.task.title;

    const editTask = this.editTask();

    //const closeTask =

    //priority color

    titleContainer.appendChild(taskTitle);
    titleContainer.appendChild(editTask);

    cardHeader.appendChild(titleContainer);

    return cardHeader;
  }

  editTask() {
    const editButton = document.createElement("button");
    editButton.id = "edit";

    const editIcon = document.createElement("img");
    editIcon.src = editImg;
    editButton.appendChild(editIcon);

    return editButton;
  }

  cardContent() {
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const dueDate = document.createElement("h3");
    dueDate.textContent = "Due: " + this.task.dueDate;

    taskContent.appendChild(dueDate);

    taskContent.appendChild(taskContainer);
    return taskContent;
  }
}
