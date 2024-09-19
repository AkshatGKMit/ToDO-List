import { appendChildren, setAttributes } from "../helpers/helpers.js";
import { renderTable } from "./tasks.js";

export const searchWrapper = document.createElement("div");

const inputField = document.createElement("input");
setAttributes(
	{
		type: "text",
		placeholder: "Search by name, dates or description",
	},
	inputField
);
inputField.onkeyup = function (ev) {
	const searchValue = ev.target.value;
	const searchList = window.tasks.search(searchValue);
	renderTable(searchList);
};

appendChildren([inputField], searchWrapper);
