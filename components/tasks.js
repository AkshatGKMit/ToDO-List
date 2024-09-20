import { appendChildren, createElement } from "../helpers/helpers.js";
import { renderTable } from "../renders/render.js";
import * as style from "../styles/style.js";

export const tasksTb = createElement({ type: "table", styles: style.tbStyle });

export const tbHeadRow = createElement({ type: "tr" });
export const headCells = window.data.tableHeadCellNames.map((text, idx) => {
	const td = createElement({
		type: "th",
		innerText: text,
		styles: style.tbHeadStyle,
		onclick: function () {
			window.tasks.sort(idx);
			renderTable();
		},
	});
	return td;
});
appendChildren(headCells, tbHeadRow);

renderTable();
