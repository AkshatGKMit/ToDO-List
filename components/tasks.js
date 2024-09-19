import { DeleteIcon, EditIcon } from "../assets/icons.js";
import { appendChildren, setStyles } from "../helpers/helpers.js";
import * as style from "../styles/style.js";

export const tasksTb = document.createElement("table");
setStyles(style.tbStyle, tasksTb);

export const tbHeadRow = document.createElement("tr");
const headCells = [
	"Sr.No.",
	"Status",
	"Name",
	"Date Created",
	"Deadline",
	"Description",
	"Edit",
	"Delete",
].map((text) => {
	const td = document.createElement("th");
	td.innerText = text;
	setStyles(style.tbHeadStyle, td);
	return td;
});
appendChildren(headCells, tbHeadRow);

export const renderTable = function () {
	tasksTb.innerHTML = "";

	const tasks = window.tasks.getAll();

	const taskElements = tasks.map((task, idx) => {
		const newTask = document.createElement("tr");

		const cells = [
			idx,
			task.status,
			task.title,
			task.date,
			task.deadline,
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

		appendChildren([editBtnElem], editCell);
		appendChildren([delBtnElem], delCell);
		appendChildren([...cells, editCell, delCell], newTask);
		return newTask;
	});

	appendChildren([tbHeadRow, ...taskElements], tasksTb);
};

renderTable();
