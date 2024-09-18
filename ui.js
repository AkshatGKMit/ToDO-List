import { setStyles } from "./helpers.js";
import { AddBtn } from "./icons.js";
import * as style from "./style.js";

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

const modals = document.createElement("div");
const barrier = document.createElement("div");
setStyles(style.barrierStyle, barrier);

barrier.onclick = function () {
	setStyles({ display: "none" }, modals);
	setStyles({ display: "block" }, addButtonElem);
};

const addTaskDialogBox = document.createElement("div");
{
	setStyles(style.addTaskDialogStyle, addTaskDialogBox);

	{
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
	}

	const inputList = document.createElement("ul");
	setStyles(
		{
			listStyle: "none",
			display: "flex",
			flexDirection: "column",
			gap: "0.5rem",
		},
		inputList
	);
	{
		const nameInpWrapper = document.createElement("li");
		{
			const taskNameLabel = document.createElement("label");
			taskNameLabel.innerText = "Title";
			nameInpWrapper.appendChild(taskNameLabel);

			const taskNameInp = document.createElement("input");
			taskNameInp.setAttribute("type", "text");
			taskNameInp.setAttribute("autocomplete", "true");
			taskNameInp.setAttribute("required", "true");
			taskNameInp.setAttribute("placeholder", "*required");
			setStyles(style.addTaskInputStyle, taskNameInp);
			nameInpWrapper.appendChild(taskNameInp);
		}

		inputList.appendChild(nameInpWrapper);
	}
	{
		const descriptionInpWrapper = document.createElement("li");
		{
			const taskNameLabel = document.createElement("label");
			taskNameLabel.innerText = "Description";
			descriptionInpWrapper.appendChild(taskNameLabel);

			const taskNameInp = document.createElement("textarea");
			taskNameInp.setAttribute("rows", "5");
			setStyles(style.addTaskInputStyle, taskNameInp);
			descriptionInpWrapper.appendChild(taskNameInp);
			taskNameInp.setAttribute("placeholder", "(optional)");
		}

		inputList.appendChild(descriptionInpWrapper);
	}
	addTaskDialogBox.appendChild(inputList);

	{
		const addTaskBtns = document.createElement("div");
		setStyles(
			{
				display: "flex",
				justifyContent: "center",
				gap: "1rem",
			},
			addTaskBtns
		);
		{
			const cancelBtn = document.createElement("button");
			cancelBtn.innerText = "Cancel";
			setStyles(
				{
					...style.addTaskDialogBtnsStyle,
					backgroundColor: "black",
				},
				cancelBtn
			);
			addTaskBtns.appendChild(cancelBtn);
		}
		{
			const addBtn = document.createElement("button");
			addBtn.innerText = "Add";
			setStyles(
				{
					...style.addTaskDialogBtnsStyle,
					backgroundColor: "orange",
				},
				addBtn
			);
			addTaskBtns.appendChild(addBtn);
		}
		addTaskDialogBox.appendChild(addTaskBtns);
	}
}

modals.appendChild(barrier);
modals.append(addTaskDialogBox);

const addButtonElem = document.createElement("button");
addButtonElem.innerHTML = AddBtn;
setStyles(style.floatingButtonStyle, addButtonElem);

addButtonElem.onclick = function (ev) {
	setStyles({ scale: 0.95, display: "none" }, this);
	setStyles({ display: "block" }, modals);
	const scaleTO = setTimeout(() => {
		setStyles({ scale: 1 }, this);
	}, 60);
};

body.appendChild(headerTag);
body.append(modals);
body.appendChild(addButtonElem);

export { body, headerTag };
