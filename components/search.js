import {
	appendChildren,
	setAttributes,
	setStyles,
} from "../helpers/helpers.js";
import { renderTable } from "../renders/render.js";

export const topWrapper = document.createElement("div");
setStyles(
	{
		display: "flex",
		flexDirection: "row",
		gap: "2rem",
	},
	topWrapper
);

const searchField = document.createElement("input");
setAttributes(
	{
		type: "text",
		placeholder: "Search by name, dates or description",
	},
	searchField
);
searchField.onkeyup = function (ev) {
	const searchValue = ev.target.value;
	const searchList = window.tasks.search(searchValue);
	renderTable(searchList);
};

const showCompletedWrapper = document.createElement("div");
const completedLabel = document.createElement("label");
completedLabel.innerText = "Show completed";

const completedCheckbox = document.createElement("input");
setAttributes({ type: "checkbox", checked: true }, completedCheckbox);
completedCheckbox.onchange = function () {
	window.tasks.toggleCompleted();
	renderTable();
};

const showForgottenWrapper = document.createElement("div");
const forgottenLabel = document.createElement("label");
forgottenLabel.innerText = "Show forgotten";

const forgottenCheckbox = document.createElement("input");
setAttributes({ type: "checkbox", checked: true }, forgottenCheckbox);
forgottenCheckbox.onchange = function () {
	window.tasks.toggleForgotten();
	renderTable();
};

appendChildren([completedLabel, completedCheckbox], showCompletedWrapper);
appendChildren([forgottenLabel, forgottenCheckbox], showForgottenWrapper);
appendChildren(
	[searchField, showCompletedWrapper, showForgottenWrapper],
	topWrapper
);
