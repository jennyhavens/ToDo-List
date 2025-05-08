import { mainStage } from "./main-stage.js";
import { sideBar } from "./sidebar.js";

import "./styles.css";

const cont = document.querySelector(".content");

cont.appendChild(mainStage);
cont.appendChild(sideBar);

console.log("I'm working");
