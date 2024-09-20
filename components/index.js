import * as style from "../styles/style.js";
import {
	appendChildren,
	createElement,
	setStyles,
	showModal,
} from "../helpers/helpers.js";
import { AddIcon } from "../assets/icons.js";
import { modal } from "./modal.js";
import { headerTag } from "./header.js";
import { tasksTb } from "./tasks.js";
import { topWrapper } from "./search.js";
import { renderDialog } from "../renders/render.js";

export const body = document.body;
setStyles(style.bodyStyle, body);

export const addButtonElem = createElement({
	type: "button",
	styles: style.floatingButtonStyle,
	innerHTML: AddIcon,
	onclick: function () {
		showModal(modal);
		renderDialog();
		setStyles({ scale: 0.95 }, this);
		setTimeout(() => {
			setStyles({ scale: 1 }, this);
		}, 60);
	},
	onmouseover: function () {
		setStyles(
			{
				...style.floatingButtonStyle,
				cursor: "pointer",
			},
			this
		);
	},
});

appendChildren([headerTag, addButtonElem, topWrapper, tasksTb], body);
