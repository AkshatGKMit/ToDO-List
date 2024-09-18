import { setStyles, hideModal } from "../helpers.js";
import * as style from "../style.js";
import { addTaskDialogBox } from "./add_task_dialog.js";

export const modal = document.createElement("div");
const barrier = document.createElement("div");
setStyles(style.barrierStyle, barrier);

barrier.onclick = () => hideModal(modal);

modal.appendChild(barrier);
modal.appendChild(addTaskDialogBox);

document.body.appendChild(modal);
