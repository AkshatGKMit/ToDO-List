import {
	setAttributes,
	setStyles,
	hideModal,
	appendChildren,
} from "../helpers/helpers.js";
import * as style from "../styles/style.js";
import { modal } from "./modal.js";

export const addTaskDialogBox = document.createElement("div");
setStyles(style.addTaskDialogStyle, addTaskDialogBox);

const dialogHeading = document.createElement("h2");
dialogHeading.innerText = "Add Task";
setStyles(
	{
		display: "flex",
		justifyContent: "center",
	},
	dialogHeading
);

const inputList = document.createElement("ul");
setStyles(
	{
		listStyle: "none",
		display: "flex",
		flexDirection: "column",
		gap: "0.8rem",
	},
	inputList
);

const nameInpWrapper = document.createElement("li");

const taskNameLabel = document.createElement("label");
taskNameLabel.innerText = "Title";

const taskNameInp = document.createElement("input");
setAttributes(
	{
		type: "text",
		autocomplete: true,
		placeholder: "*required",
	},
	taskNameInp
);
setStyles(style.addTaskInputStyle, taskNameInp);

taskNameInp.addEventListener("focus", (ev) => alert);

const deadlineInpWrapper = document.createElement("li");
setStyles(
	{ display: "flex", flexDirection: "column", gap: "2px" },
	deadlineInpWrapper
);

const taskDeadlineRow = document.createElement("div");
setStyles(
	{ display: "flex", flexDirection: "row", gap: "0.5rem" },
	taskDeadlineRow
);

const deadlineLabel = document.createElement("label");
deadlineLabel.innerText = "Deadline";

const deadlineCheckbox = document.createElement("input");
setAttributes({ type: "checkbox" }, deadlineCheckbox);
deadlineCheckbox.onchange = function (ev) {
	window.addTaskData.toggleDeadline(ev.target.checked);
	taskDeadlineInp.disabled = !ev.target.checked;
};

const taskDeadlineInp = document.createElement("input");
setAttributes(
	{
		type: Date,
		autocomplete: true,
		disabled: deadlineCheckbox.value,
	},
	taskDeadlineInp
);
setStyles(style.addTaskInputStyle, taskDeadlineInp);

const descriptionInpWrapper = document.createElement("li");

const taskDescriptionLabel = document.createElement("label");
taskDescriptionLabel.innerText = "Description";

const taskDescriptionInp = document.createElement("textarea");
setAttributes(
	{
		rows: 5,
		placeholder: "(optional)",
	},
	taskDescriptionInp
);
setStyles(style.addTaskInputStyle, taskDescriptionInp);

const addTaskBtns = document.createElement("div");
setStyles(
	{
		display: "flex",
		justifyContent: "center",
		gap: "1rem",
	},
	addTaskBtns
);

const cancelBtn = document.createElement("button");
cancelBtn.innerText = "Cancel";
setStyles(
	{
		...style.addTaskDialogBtnsStyle,
		backgroundColor: "black",
	},
	cancelBtn
);
cancelBtn.onclick = () => hideModal(modal);

const addBtn = document.createElement("button");
addBtn.innerText = "Add";
setStyles(
	{
		...style.addTaskDialogBtnsStyle,
		backgroundColor: "orange",
	},
	addBtn
);

addBtn.onclick = function () {
	window.addTaskData.setTitle(taskNameInp.value);
	// window.addTaskData.dea;
};

appendChildren([taskNameLabel, taskNameInp], nameInpWrapper);
appendChildren([deadlineLabel, deadlineCheckbox], taskDeadlineRow);
appendChildren([taskDeadlineRow, taskDeadlineInp], deadlineInpWrapper);
appendChildren(
	[taskDescriptionLabel, taskDescriptionInp],
	descriptionInpWrapper
);
appendChildren(
	[nameInpWrapper, deadlineInpWrapper, descriptionInpWrapper],
	inputList
);
appendChildren([cancelBtn, addBtn], addTaskBtns);
appendChildren([dialogHeading, inputList, addTaskBtns], addTaskDialogBox);
