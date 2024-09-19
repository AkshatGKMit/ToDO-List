import { setStyles } from "../helpers.js";
import * as style from "../style.js";
import { hideModal } from "../helpers.js";
import { modal } from "./modal.js";
import { addTaskData } from "../data.js";

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
addTaskDialogBox.appendChild(dialogHeading);

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
nameInpWrapper.appendChild(taskNameLabel);

const taskNameInp = document.createElement("input");
taskNameInp.setAttribute("type", "text");
taskNameInp.setAttribute("autocomplete", "true");
taskNameInp.setAttribute("required", "true");
taskNameInp.setAttribute("placeholder", "*required");
setStyles(style.addTaskInputStyle, taskNameInp);

taskNameInp.addEventListener("focus", (ev) => alert);
nameInpWrapper.appendChild(taskNameInp);

inputList.appendChild(nameInpWrapper);

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

const label = document.createElement("label");
label.innerText = "Deadline";
taskDeadlineRow.appendChild(label);

const checkbox = document.createElement("input");
checkbox.setAttribute("type", "checkbox");
checkbox.onchange = function (ev) {
	addTaskData.toggleDeadline(ev.target.checked);
	taskDeadlineInp.disabled = !ev.target.checked;
};
taskDeadlineRow.appendChild(checkbox);

deadlineInpWrapper.appendChild(taskDeadlineRow);

const taskDeadlineInp = document.createElement("input");
taskDeadlineInp.setAttribute("type", "date");
taskDeadlineInp.setAttribute("autocomplete", "true");
taskDeadlineInp.disabled = checkbox.value;
taskDeadlineInp.disabled = checkbox.value;
taskDeadlineInp.setAttribute("placeholder", "*required");
setStyles(style.addTaskInputStyle, taskDeadlineInp);
deadlineInpWrapper.appendChild(taskDeadlineInp);

inputList.appendChild(deadlineInpWrapper);

const descriptionInpWrapper = document.createElement("li");

const taskDescriptionLabel = document.createElement("label");
taskDescriptionLabel.innerText = "Description";
descriptionInpWrapper.appendChild(taskDescriptionLabel);

const taskDescriptionInp = document.createElement("textarea");
taskDescriptionInp.setAttribute("rows", "5");
setStyles(style.addTaskInputStyle, taskDescriptionInp);
descriptionInpWrapper.appendChild(taskDescriptionInp);
taskDescriptionInp.setAttribute("placeholder", "(optional)");

inputList.appendChild(descriptionInpWrapper);

addTaskDialogBox.appendChild(inputList);

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
addTaskBtns.appendChild(cancelBtn);

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
	addTaskData.setTitle(taskNameInp.value);
	addTaskData.dea;
};

addTaskBtns.appendChild(addBtn);

addTaskDialogBox.appendChild(addTaskBtns);
