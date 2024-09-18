import { addButtonElem, modal } from "./ui.js";

export const setStyles = function (styles, element) {
	Object.assign(element.style, styles);
};

export const showModal = function () {
	setStyles({ display: "block" }, modal);
};

export const hideModal = function () {
	setStyles({ display: "none" }, modal);
};
