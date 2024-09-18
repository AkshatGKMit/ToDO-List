import { setStyles } from "../helpers.js";

export const headerTag = document.createElement("header");
const headingElem = document.createElement("h1");
headingElem.innerText = "ToDo List";

headerTag.appendChild(headingElem);

setStyles(
	{
		display: "flex",
		justifyContent: "center",
		margin: "0.5rem 1rem",
	},
	headerTag
);
