"use strict";

import {
	showModal,
	hideModal,
	appendChildren,
	formatDateReversed,
	formatDate,
	createElement,
} from "../helpers/helpers.js";
import { DeleteIcon, EditIcon, ErrorIcon } from "../assets/icons.js";
import { modal } from "../components/modal.js";
import { tasksTb, headCells, tbHeadRow } from "../components/tasks.js";
import * as style from "../styles/style.js";
import { addUpdateTaskDialogBox } from "../components/add_task_dialog.js";

export const renderDialog = function () {
	addUpdateTaskDialogBox.innerHTML = "";

	const dialogHeading = createElement({
		type: "h2",
		innerText: window.data.isDialogForUpdate ? "Update Task" : "Add Task",
		styles: {
			display: "flex",
			justifyContent: "center",
		},
	});

	const inputList = createElement({
		type: "ul",
		styles: {
			listStyle: "none",
			display: "flex",
			flexDirection: "column",
			gap: "0.8rem",
		},
	});

	const nameInpWrapper = createElement({ type: "li" });

	const taskNameLabel = createElement({ type: "label", innerText: "Title" });

	const taskNameInp = createElement({
		type: "input",
		attrs: {
			type: "text",
			autocomplete: true,
			placeholder: "*required",
			value: window.data.isDialogForUpdate
				? window.tasks.list[window.tasks.updatingTaskIdx].title
				: "",
		},
		styles: style.addTaskInputStyle,
	});

	const deadlineInpWrapper = createElement({
		type: "li",
		styles: { display: "flex", flexDirection: "column", gap: "2px" },
	});

	const taskDeadlineRow = createElement({
		type: "div",
		styles: { display: "flex", flexDirection: "row", gap: "0.5rem" },
	});

	const deadlineLabel = createElement({ type: "label", innerText: "Deadline" });

	const deadlineCheckbox = createElement({
		type: "input",
		attrs: { type: "checkbox" },
		onchange: function (ev) {
			window.addTaskData.toggleDeadline(ev.target.checked);
			taskDeadlineInp.disabled = !ev.target.checked;
		},
	});
	deadlineCheckbox.checked = window.data.isDialogForUpdate
		? window.tasks.list[window.tasks.updatingTaskIdx].deadline !== "None"
			? true
			: false
		: false;
	window.addTaskData.toggleDeadline(deadlineCheckbox.checked);

	const taskDeadlineInp = createElement({
		type: "input",
		attrs: {
			type: "date",
			autocomplete: true,
			disabled: !deadlineCheckbox.checked,
		},
		styles: style.addTaskInputStyle,
		onchange: function (ev) {
			if (new Date(ev.target.value) < new Date()) {
				alert(
					"Please note that deadlines cannot be set in the past. The deadline has been updated to today."
				);
				taskDeadlineInp.value = formatDateReversed(new Date());
			}
		},
	});
	taskDeadlineInp.disabled = !deadlineCheckbox.checked;
	if (window.data.isDialogForUpdate && deadlineCheckbox.checked)
		taskDeadlineInp.value = formatDateReversed(
			window.tasks.list[window.tasks.updatingTaskIdx].deadline
		);

	const descriptionInpWrapper = createElement({ type: "li" });

	const taskDescriptionLabel = createElement({
		type: "label",
		innerText: "Description",
	});

	const taskDescriptionInp = createElement({
		type: "textarea",
		attrs: {
			rows: 5,
			placeholder: "(optional)",
		},
		styles: style.addTaskInputStyle,
	});
	taskDescriptionInp.value = window.data.isDialogForUpdate
		? window.tasks.list[window.tasks.updatingTaskIdx].description
		: "";

	const addTaskBtns = createElement({
		type: "div",
		styles: {
			display: "flex",
			justifyContent: "center",
			gap: "1rem",
		},
	});

	const cancelBtn = createElement({
		type: "button",
		innerText: "Cancel",
		styles: {
			...style.addTaskDialogBtnsStyle,
			backgroundColor: "black",
		},
		onclick: () => hideModal(modal),
	});

	const addBtn = createElement({
		type: "button",
		innerText: window.data.isDialogForUpdate ? "Update" : "Add",
		styles: {
			...style.addTaskDialogBtnsStyle,
			backgroundColor: window.data.isDialogForUpdate ? "blue" : "orange",
		},
		onclick: function () {
			const data = window.addTaskData;
			data.setTitle(taskNameInp.value);
			data.setDeadline(data.deadlineToggle ? taskDeadlineInp.value : "None");
			data.setDescription(taskDescriptionInp.value);

			if (window.data.isDialogForUpdate) data.updateTask();
			else data.appendTask();

			renderTable();
			hideModal(modal);
		},
	});

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
		const newTask = createElement({ type: "tr" });

		const cells = [
			task.status,
			task.title,
			formatDate(task.date),
			task.deadline === "None" ? task.deadline : formatDate(task.deadline),
			task.description,
		].map((text) => {
			const td = createElement({
				type: "td",
				innerText: text,
				styles: style.tbCellStyle,
			});
			if (text === task.status && task.status === "incomplete") {
				const statusCheckbox = createElement({
					type: "input",
					attrs: { type: "checkbox" },
					onchange: function (ev) {
						window.tasks.updateStatus(idx);
						renderTable();
					},
				});

				appendChildren([statusCheckbox], td);
			}
			return td;
		});

		const editCell = createElement({ type: "td", styles: style.tbCellStyle });

		const editBtnElem = createElement({
			type: "button",
			innerHTML: EditIcon,
			styles: style.editDelIconStyle,
			onclick: function () {
				showModal(modal, idx);
				renderDialog();
			},
		});

		const delCell = createElement({ type: "td", styles: style.tbCellStyle });

		const delBtnElem = createElement({
			type: "button",
			innerHTML: DeleteIcon,
			styles: style.editDelIconStyle,
			onclick: function () {
				tasksObj.delete(idx);
				renderTable();
			},
		});

		if (task.status.toLowerCase() === "incomplete")
			appendChildren([editBtnElem], editCell);
		appendChildren([delBtnElem], delCell);
		appendChildren([...cells, editCell, delCell], newTask);
		return newTask;
	});

	const emptyTasks = createElement({ type: "tr" });
	const emptyTd = createElement({
		type: "td",
		attrs: { colspan: headCells.length },
	});

	const emptyDiv = createElement({
		type: "div",
		styles: style.emptyTasksStyle,
	});

	const emptyIcon = createElement({
		type: "div",
		innerHTML: ErrorIcon,
		styles: style.emptyIconStyle,
	});

	const emptyLabel = createElement({
		type: "label",
		innerHTML: "No Task to display",
	});

	const loadingDiv = createElement({
		type: "div",
		styles: style.loaderDivStyle,
	});

	const loadingIcon = createElement({
		type: "div",
		styles: style.loadingIconStyle,
	});

	const loadingLabel = createElement({
		type: "label",
		innerText: "Loading...",
	});

	appendChildren([loadingIcon, loadingLabel], loadingDiv);
	appendChildren([emptyIcon, emptyLabel], emptyDiv);

	appendChildren([window.data.isLoading ? loadingDiv : emptyDiv], emptyTd);
	appendChildren([emptyTd], emptyTasks);

	if (!tasks.length) appendChildren([tbHeadRow, emptyTasks], tasksTb);
	else appendChildren([tbHeadRow, ...taskElements], tasksTb);
};
