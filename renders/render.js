"use strict";

import {
	setStyles,
	setAttributes,
	showModal,
	hideModal,
	appendChildren,
	formatDateReversed,
	formatDate,
} from "../helpers/helpers.js";
import { DeleteIcon, EditIcon, ErrorIcon } from "../assets/icons.js";
import { modal } from "../components/modal.js";
import { tasksTb, headCells, tbHeadRow } from "../components/tasks.js";
import * as style from "../styles/style.js";
import { addUpdateTaskDialogBox } from "../components/add_task_dialog.js";

export const renderDialog = function () {
	addUpdateTaskDialogBox.innerHTML = "";

	const dialogHeading = document.createElement("h2");
	dialogHeading.innerText = window.data.isDialogForUpdate
		? "Update Task"
		: "Add Task";
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
			value: window.data.isDialogForUpdate
				? window.tasks.list[window.tasks.updatingTaskIdx].title
				: "",
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
	deadlineCheckbox.checked = window.data.isDialogForUpdate
		? window.tasks.list[window.tasks.updatingTaskIdx].deadline !== "None"
			? true
			: false
		: false;
	window.addTaskData.toggleDeadline(deadlineCheckbox.checked);
	deadlineCheckbox.onchange = function (ev) {
		window.addTaskData.toggleDeadline(ev.target.checked);
		taskDeadlineInp.disabled = !ev.target.checked;
	};

	const taskDeadlineInp = document.createElement("input");
	setAttributes(
		{
			type: "date",
			autocomplete: true,
			disabled: !deadlineCheckbox.checked,
		},
		taskDeadlineInp
	);
	taskDeadlineInp.disabled = !deadlineCheckbox.checked;
	if (window.data.isDialogForUpdate && deadlineCheckbox.checked)
		taskDeadlineInp.value = formatDateReversed(
			window.tasks.list[window.tasks.updatingTaskIdx].deadline
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
	taskDescriptionInp.value = window.data.isDialogForUpdate
		? window.tasks.list[window.tasks.updatingTaskIdx].description
		: "";
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
	addBtn.innerText = window.data.isDialogForUpdate ? "Update" : "Add";
	setStyles(
		{
			...style.addTaskDialogBtnsStyle,
			backgroundColor: "orange",
		},
		addBtn
	);

	addBtn.onclick = function () {
		const data = window.addTaskData;
		data.setTitle(taskNameInp.value);
		data.setDeadline(data.deadlineToggle ? taskDeadlineInp.value : "None");
		data.setDescription(taskDescriptionInp.value);

		if (window.data.isDialogForUpdate) data.updateTask();
		else data.appendTask();

		renderTable();
		hideModal(modal);
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
	appendChildren(
		[dialogHeading, inputList, addTaskBtns],
		addUpdateTaskDialogBox
	);
};

export const renderTable = function (obj) {
	tasksTb.innerHTML = "";

	const tasksObj = window.tasks;
	const tasks = obj ?? tasksObj.getAll();

	const taskElements = tasks.map((task, idx) => {
		const newTask = document.createElement("tr");

		const cells = [
			task.status,
			task.title,
			formatDate(task.date),
			task.deadline === "None" ? task.deadline : formatDate(task.deadline),
			task.description,
		].map((text) => {
			const td = document.createElement("td");
			td.innerText = text;
			setStyles(style.tbCellStyle, td);
			if (text === task.status && task.status === "Incomplete") {
				const statusCheckbox = document.createElement("input");
				setAttributes({ type: "checkbox" }, statusCheckbox);
				statusCheckbox.onchange = function (ev) {
					window.tasks.updateStatus(idx);
					renderTable();
				};

				appendChildren([statusCheckbox], td);
			}
			return td;
		});

		const editCell = document.createElement("td");
		setStyles(style.tbCellStyle, editCell);

		const editBtnElem = document.createElement("button");
		editBtnElem.innerHTML = EditIcon;
		setStyles(style.editDelIconStyle, editBtnElem);
		editBtnElem.onclick = function () {
			showModal(modal, idx);
			renderDialog();
		};

		const delCell = document.createElement("td");
		setStyles(style.tbCellStyle, delCell);

		const delBtnElem = document.createElement("button");
		delBtnElem.innerHTML = DeleteIcon;
		setStyles(style.editDelIconStyle, delBtnElem);
		delBtnElem.onclick = function () {
			tasksObj.delete(idx);
			renderTable();
		};

		appendChildren([editBtnElem], editCell);
		appendChildren([delBtnElem], delCell);
		appendChildren([...cells, editCell, delCell], newTask);
		return newTask;
	});

	const emptyTasks = document.createElement("tr");
	const emptyTd = document.createElement("td");
	setAttributes({ colspan: headCells.length }, emptyTd);

	const emptyDiv = document.createElement("div");
	setStyles(style.emptyTasksStyle, emptyDiv);

	const emptyIcon = document.createElement("div");
	emptyIcon.innerHTML = ErrorIcon;
	setStyles(style.emptyIconStyle, emptyIcon);

	const emptyLabel = document.createElement("label");
	emptyLabel.innerHTML = "No Task to display";

	const loadingDiv = document.createElement("div");
	setStyles(style.loaderDivStyle, loadingDiv);

	const loadingIcon = document.createElement("div");
	setStyles(style.loadingIconStyle, loadingIcon);

	const loadingLabel = document.createElement("label");
	loadingLabel.innerText = "Loading...";

	appendChildren([loadingIcon, loadingLabel], loadingDiv);
	appendChildren([emptyIcon, emptyLabel], emptyDiv);

	appendChildren([window.data.isLoading ? loadingDiv : emptyDiv], emptyTd);
	appendChildren([emptyTd], emptyTasks);

	if (!tasks.length) appendChildren([tbHeadRow, emptyTasks], tasksTb);
	else appendChildren([tbHeadRow, ...taskElements], tasksTb);
};
