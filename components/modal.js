import {
	hideModal,
	appendChildren,
	createElement,
} from "../helpers/helpers.js";
import * as style from "../styles/style.js";
import { addUpdateTaskDialogBox } from "./add_task_dialog.js";

export const modal = createElement({ type: "div" });
const barrier = createElement({
	type: "div",
	styles: style.barrierStyle,
	onclick: () => hideModal(modal),
});

appendChildren([barrier, addUpdateTaskDialogBox], modal);
