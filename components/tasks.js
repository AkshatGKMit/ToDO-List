import { appendChildren, setStyles } from "../helpers/helpers.js";
import { renderTable } from "../renders/render.js";
import * as style from "../styles/style.js";

export const tasksTb = document.createElement("table");
setStyles(style.tbStyle, tasksTb);

export const tbHeadRow = document.createElement("tr");
export const headCells = window.data.tableHeadCellNames.map((text, idx) => {
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

renderTable();
