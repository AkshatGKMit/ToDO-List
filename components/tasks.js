import { DeleteIcon, EditIcon } from "../assets/icons.js";
import {
	appendChildren,
	formatDate,
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
			idx + 1,
			task.status,
			task.title,
			formatDate(task.date),
			task.deadline === "None" ? task.deadline : formatDate(task.deadline),
			task.description,
		].map((text) => {
			const td = document.createElement("td");
			td.innerText = text;
			setStyles(style.tbCellStyle, td);
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

	appendChildren([tbHeadRow, ...taskElements], tasksTb);
};

renderTable();
