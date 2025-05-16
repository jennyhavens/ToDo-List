// Get DOM elements
const openDialogBtn = document.getElementById("openDialog");
const closeDialogBtn = document.getElementById("closeDialog");
const taskDialog = document.getElementById("taskDialog");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Open dialog
if (openDialogBtn) {
  openDialogBtn.onclick = () => {
    taskDialog.showModal();
  };
}

// Close dialog
if (closeDialogBtn) {
  closeDialogBtn.onclick = () => {
    taskDialog.close();
  };
}

// Add task event listener
taskForm.onsubmit = (event) => {
  event.preventDefault(); // Prevent form submission

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;
  const notes = document.getElementById("notes").value;

  // Validate form inputs
  if (!title || !description || !dueDate || !priority) {
    alert("Please fill in all required fields.");
    return;
  }

  function createTaskElement(title, description, dueDate, priority, notes) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.dataset.title = title;
    taskDiv.dataset.description = description;
    taskDiv.dataset.dueDate = dueDate;
    taskDiv.dataset.priority = priority;
    taskDiv.dataset.notes = notes;

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    taskDiv.appendChild(titleElement);

    const descriptionElement = document.createElement("h4");
    descriptionElement.textContent = description;
    taskDiv.appendChild(descriptionElement);

    const dueDateElement = document.createElement("p");
    dueDateElement.textContent = dueDate;
    taskDiv.appendChild(dueDateElement);

    const notesElement = document.createElement("p");
    notesElement.textContent = notes;
    taskDiv.appendChild(notesElement);

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "edit";
    taskDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "delete";
    taskDiv.appendChild(deleteButton);

    return taskDiv;
  }

  const taskDiv = createTaskElement(
    title,
    description,
    dueDate,
    priority,
    notes
  );
  //   const taskDiv = document.createElement("div");
  //   taskDiv.className = "task";
  //   taskDiv.innerHTML = ""; // Clear existing content

  //   const titleElement = document.createElement("h3");
  //   titleElement.textContent = title; // Safely add title
  //   taskDiv.appendChild(titleElement);

  //   const descriptionElement = document.createElement("h4");
  //   descriptionElement.textContent = description; // Safely add title
  //   taskDiv.appendChild(descriptionElement);

  //   const dueDateElement = document.createElement("p");
  //   dueDateElement.textContent = dueDate; // Safely add title
  //   taskDiv.appendChild(dueDateElement);

  //   const notesElement = document.createElement("p");
  //   notesElement.textContent = notes; // Safely add title
  //   taskDiv.appendChild(notesElement);

  //   const editButton = document.createElement("button");
  //   editButton.className = "edit";
  //   editButton.textContent = "edit";
  //   taskDiv.appendChild(editButton);

  //   const deleteButton = document.createElement("button");
  //   deleteButton.className = "delete";
  //   deleteButton.textContent = "delete";
  //   taskDiv.appendChild(deleteButton);

  // Add event listener for delete buttons
  taskDiv.querySelector(".delete").onclick = () => {
    taskDiv.remove();
  };

  // Add event listener for edit button
  taskDiv.querySelector(".edit").onclick = () => {
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("dueDate").value = dueDate;
    document.getElementById("priority").value = priority;
    document.getElementById("notes").value = notes;
    taskDialog.showModal(); // Open dialog for editing
  };

  // Append task to the task list
  taskList.appendChild(taskDiv);

  // Reset form and close dialog
  taskForm.reset();
  taskDialog.close();
};

export { taskList };
