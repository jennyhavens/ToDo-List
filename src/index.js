import { sideBar } from "./sidebar.js";
import { mainStage } from "./main-stage.js";
import { Card } from "./task-card.js";
import { Tasks } from "./task-card.js";
import { dashboard } from "./task-card.js";

import "./styles.css";

const cont = document.querySelector(".content");

cont.appendChild(sideBar);
cont.appendChild(mainStage);
cont.appendChild(Card);
cont.appendChild(Tasks);
cont.appendChild(dashboard);

console.log("I'm working");
