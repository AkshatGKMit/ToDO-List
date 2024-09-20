import { appendChildren, createElement } from "../helpers/helpers.js";
import { renderTable } from "../renders/render.js";
import * as style from "../styles/style.js";

export const topWrapper = createElement({
	type: "div",
	styles: {
		display: "flex",
		flexDirection: "row",
		gap: "2rem",
	},
});

const searchField = createElement({
	type: "input",
	attrs: {
		type: "text",
		placeholder: "Search by name, dates or description",
	},
	styles: style.searchField,
	onkeyup: function (ev) {
		const searchValue = ev.target.value.toString().toLowerCase().trim();
		const searchList = window.tasks.search(searchValue);
		renderTable(searchList);
	},
});

const showCompletedWrapper = createElement({ type: "div" });
const completedLabel = createElement({
	type: "label",
	innerText: "Show completed",
});

const completedCheckbox = createElement({
	type: "input",
	attrs: { type: "checkbox", checked: true },
	onchange: function () {
		window.tasks.toggleCompleted();
		renderTable();
	},
});

const showForgottenWrapper = createElement({ type: "div" });
const forgottenLabel = createElement({
	type: "label",
	innerText: "Show forgotten",
});

const forgottenCheckbox = createElement({
	type: "input",
	attrs: { type: "checkbox", checked: true },
	onchange: function () {
		window.tasks.toggleForgotten();
		renderTable();
	},
});

appendChildren([completedLabel, completedCheckbox], showCompletedWrapper);
appendChildren([forgottenLabel, forgottenCheckbox], showForgottenWrapper);
appendChildren(
	[searchField, showCompletedWrapper, showForgottenWrapper],
	topWrapper
);
