const openDialogBtn = document.getElementById("openDialog");
const closeDialogBtn = document.getElementById("closeDialog");
const taskDialog = document.getElementById("taskDialog");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = [];
let currentEditIndex = null;

if (openDialogBtn) {
  openDialogBtn.onclick = () => {
    taskDialog.showModal();
    resetForm();
  };
}

if (closeDialogBtn) {
  closeDialogBtn.onclick = () => {
    taskDialog.close();
  };
}

if (taskForm) {
  taskForm.onsubmit = (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value;

    if (currentEditIndex !== null) {
      tasks[currentEditIndex] = {
        title,
        description,
        dueDate,
        priority,
        notes,
      };
    } else {
      tasks.push({ title, description, dueDate, priority, notes });
    }

    renderTasks();
    resetForm();
    taskDialog.close();
  };
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = createTaskElement(task, index);
    taskList.appendChild(taskDiv);
  });
}

function createTaskElement(task, index) {
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
    currentEditIndex = index;
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("priority").value = task.priority;
    document.getElementById("notes").value = task.notes;
    taskDialog.showModal();
  };
  taskDiv.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "delete";
  deleteButton.onclick = () => {
    tasks.splice(index, 1);
    renderTasks();
  };
  taskDiv.appendChild(deleteButton);

  return taskDiv;
}

function resetForm() {
  taskForm.reset();
  currentEditIndex = null;
}

export { taskList };
