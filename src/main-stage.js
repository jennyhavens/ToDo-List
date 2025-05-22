import "./task-card.js";

const mainStage = document.createElement("div");
mainStage.className = "main-stage";
mainStage.textContent = "Your Tasks";

mainStage.appendChild(taskList);

export { mainStage };
