import { DeleteIcon, EditIcon, ErrorIcon } from "../assets/icons.js";
import {
	appendChildren,
	formatDate,
	setAttributes,
	setStyles,
	showModal,
} from "../helpers/helpers.js";
import * as style from "../styles/style.js";
import { renderDialog } from "./add_task_dialog.js";
import { modal } from "./modal.js";

export const tasksTb = document.createElement("table");
setStyles(style.tbStyle, tasksTb);

export const tbHeadRow = document.createElement("tr");
const headCells = window.data.tableHeadCellNames.map((text, idx) => {
	const td = document.createElement("th");
	td.innerText = text;
	setStyles(style.tbHeadStyle, td);
	td.onclick = function () {
		window.tasks.sort(idx);
		renderTable();
	};
	return td;
});
appendChildren(headCells, tbHeadRow);

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

	appendChildren([emptyIcon, emptyLabel], emptyDiv);
	appendChildren([emptyDiv], emptyTd);
	appendChildren([emptyTd], emptyTasks);

	if (!tasks.length) appendChildren([tbHeadRow, emptyTasks], tasksTb);
	else appendChildren([tbHeadRow, ...taskElements], tasksTb);
};

renderTable();
