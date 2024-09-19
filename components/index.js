import * as style from "../styles/style.js";
import { appendChildren, setStyles, showModal } from "../helpers/helpers.js";
import { AddIcon } from "../assets/icons.js";
import { modal } from "./modal.js";
import { headerTag } from "./header.js";
import { tasksTb } from "./tasks.js";

export const body = document.body;
body.style.backgroundColor = "#00ffaa";

export const addButtonElem = document.createElement("button");
addButtonElem.innerHTML = AddIcon;
setStyles(style.floatingButtonStyle, addButtonElem);

addButtonElem.onclick = function () {
	showModal(modal);
	setStyles({ scale: 0.95 }, this);
	setTimeout(() => {
		setStyles({ scale: 1 }, this);
	}, 60);
};

addButtonElem.onmouseover = function () {
	setStyles(
		{
			...style.floatingButtonStyle,
			cursor: "pointer",
		},
		this
	);
};

appendChildren([headerTag, addButtonElem, tasksTb], body);
