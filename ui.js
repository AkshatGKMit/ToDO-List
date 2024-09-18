import { setStyles } from "./helpers.js";
import { AddBtn } from "./icons.js";

const body = document.body;
body.style.backgroundColor = "#00ffaa";

const headerTag = document.createElement("header");
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

const addButtonElem = document.createElement("button");
addButtonElem.innerHTML = AddBtn;
setStyles(
	{
		position: "fixed",
		bottom: 0,
		right: 0,
		margin: "1.5rem",
		display: "block",
		height: "3rem",
		width: "3rem",
		padding: "0.25rem",
		border: 0,
		borderRadius: "10px",
		backgroundColor: "#ffff00",
		boxShadow: "0px 0px 10px 0px #999",
	},
	addButtonElem
);

addButtonElem.onclick = function (ev) {
	setStyles({ scale: 0.95 }, this);
	const scaleTO = setTimeout(() => {
		setStyles({ scale: 1 }, this);
	}, 60);
};

body.appendChild(headerTag);
body.appendChild(addButtonElem);

export { body, headerTag };
