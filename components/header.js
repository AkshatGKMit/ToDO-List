import { appendChildren, createElement } from "../helpers/helpers.js";

export const headerTag = createElement({ type: "header" });
const headingElem = createElement({
	type: "h1",
	innerText: "ToDo List",
	styles: {
		display: "flex",
		justifyContent: "center",
		margin: "0.25rem 1rem",
	},
});
appendChildren([headingElem], headerTag);
