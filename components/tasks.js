import { DeleteIcon, EditIcon } from "../assets/icons.js";
import { appendChildren, setStyles } from "../helpers/helpers.js";
import * as style from "../styles/style.js";

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

export const renderTable = function () {
	tasksTb.innerHTML = "";

	const tasksObj = window.tasks;
	const tasks = tasksObj.getAll();

	const taskElements = tasks.map((task, idx) => {
		const newTask = document.createElement("tr");

		const cells = [
			idx + 1,
			task.status,
			task.title,
			`${task.date.getDate().toString().padStart(2, "0")}-${(
				task.date.getMonth() + 1
			)
				.toString()
				.padStart(2, "0")}-${task.date.getFullYear()}`,
			`${task.deadline.getDate().toString().padStart(2, "0")}-${(
				task.deadline.getMonth() + 1
			)
				.toString()
				.padStart(2, "0")}-${task.deadline.getFullYear()}`,
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
