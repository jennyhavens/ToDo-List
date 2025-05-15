import { sideBar } from "./sidebar.js";
import { mainStage } from "./main-stage.js";

import "./task-card.js";
import "./styles.css";

const cont = document.querySelector(".content");

cont.appendChild(sideBar);
cont.appendChild(mainStage);

console.log("I'm working");
