import * as style from "../style.js";
import { setStyles, showModal } from "../helpers.js";
import { AddBtn } from "../icons.js";
import { modal } from "./modal.js";
import { headerTag } from "./header.js";

export const body = document.body;
body.style.backgroundColor = "#00ffaa";

export const addButtonElem = document.createElement("button");
addButtonElem.innerHTML = AddBtn;
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

body.appendChild(headerTag);
body.appendChild(addButtonElem);
