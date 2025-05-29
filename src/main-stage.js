import { allTasks } from "./sidebar";

const mainStage = document.createElement("div");
mainStage.className = "main-stage";
mainStage.textContent = "Your Tasks";

allTasks.onclick = () => {
  alert("I'm working");
};

mainStage.appendChild(taskList);

export { mainStage };
