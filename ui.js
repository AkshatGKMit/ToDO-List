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

const modals = document.createElement("div");
const barrier = document.createElement("div");
setStyles(
	{
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: "#333",
		opacity: 0.5,
		zIndex: 2,
	},
	barrier
);

barrier.onclick = function () {
	setStyles({ display: "none" }, modals);
	setStyles({ display: "block" }, addButtonElem);
};

const addTaskDialogBox = document.createElement("div");
{
	setStyles(
		{
			position: "absolute",
			zIndex: 3,
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			height: "fit-content",
			width: "fit-content",
			padding: "1rem",
			backgroundColor: "#fff",
			borderRadius: "10px",
			display: "flex",
			flexDirection: "column",
			gap: "0.75rem",
		},
		addTaskDialogBox
	);

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
			setStyles(
				{
					width: "100%",
					padding: "2px",
					minWidth: "15rem",
				},
				taskNameInp
			);
			nameInpWrapper.appendChild(taskNameInp);
		}

		inputList.appendChild(nameInpWrapper);
	}
	{
		const nameInpWrapper = document.createElement("li");
		{
			const taskNameLabel = document.createElement("label");
			taskNameLabel.innerText = "Description";
			nameInpWrapper.appendChild(taskNameLabel);

			const taskNameInp = document.createElement("textarea");
			taskNameInp.setAttribute("rows", "5");
			setStyles(
				{
					width: "100%",
					padding: "2px",
					minWidth: "15rem",
				},
				taskNameInp
			);
			nameInpWrapper.appendChild(taskNameInp);
			taskNameInp.setAttribute("placeholder", "(optional)");
		}

		inputList.appendChild(nameInpWrapper);
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
					border: "none",
					borderRadius: "12px",
					backgroundColor: "black",
					color: "white",
					padding: "5px 10px",
					fontSize: "1.2rem",
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
					border: "none",
					borderRadius: "12px",
					backgroundColor: "orange",
					color: "white",
					padding: "5px 10px",
					fontSize: "1.2rem",
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
setStyles(
	{
		position: "fixed",
		bottom: 0,
		right: 0,
		zIndex: 1,
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
