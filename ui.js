import { hideModal, setStyles, showModal } from "./helpers.js";
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

export const modal = document.createElement("div");
const barrier = document.createElement("div");
setStyles(style.barrierStyle, barrier);

barrier.onclick = hideModal;

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
			gap: "0.8rem",
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
		const deadlineInpWrapper = document.createElement("li");
		setStyles(
			{ display: "flex", flexDirection: "column", gap: "2px" },
			deadlineInpWrapper
		);
		{
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
			taskDeadlineRow.appendChild(checkbox);

			deadlineInpWrapper.appendChild(taskDeadlineRow);

			const taskNameInp = document.createElement("input");
			taskNameInp.setAttribute("type", "date");
			taskNameInp.setAttribute("autocomplete", "true");
			taskNameInp.setAttribute("required", "true");
			taskNameInp.setAttribute("placeholder", "*required");
			taskNameInp.setAttribute("disabled", checkbox.value);
			setStyles(style.addTaskInputStyle, taskNameInp);
			deadlineInpWrapper.appendChild(taskNameInp);
		}

		inputList.appendChild(deadlineInpWrapper);
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
			cancelBtn.onclick = hideModal;
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

modal.appendChild(barrier);
modal.append(addTaskDialogBox);

export const addButtonElem = document.createElement("button");
addButtonElem.innerHTML = AddBtn;
setStyles(style.floatingButtonStyle, addButtonElem);

addButtonElem.onclick = function (ev) {
	showModal();
	setStyles({ scale: 0.95 }, this);
	const scaleTO = setTimeout(() => {
		setStyles({ scale: 1 }, this);
	}, 60);
};

addButtonElem.onmouseover = function () {
	setStyles(
		{
			...style.floatingButtonStyle,
			cursor: "pointer",
		},
		this
	);
};

body.appendChild(headerTag);
body.append(modal);
body.appendChild(addButtonElem);

export { body, headerTag };
