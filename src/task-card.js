// Get DOM elements
const openDialogBtn = document.getElementById("openDialog");
const closeDialogBtn = document.getElementById("closeDialog");
const taskDialog = document.getElementById("taskDialog");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Open dialog
openDialogBtn.onclick = () => {
  taskDialog.showModal();
};

// Close dialog
closeDialogBtn.onclick = () => {
  taskDialog.close();
};

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

  // Create task element
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.innerHTML = `
        <h3>${title}</h3>
        <h4>${priority}</h4>
        <p>${description}</p>
        <p>Due: ${dueDate}</p>
        <p>Notes: ${notes}</p>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

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
    taskDiv.remove(); // Remove the task while editing
    taskDialog.showModal(); // Open dialog for editing
  };

  // Append task to the task list
  taskList.appendChild(taskDiv);

  // Reset form and close dialog
  taskForm.reset();
  taskDialog.close();
};
