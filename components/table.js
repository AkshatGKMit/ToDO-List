import { DeleteIcon, EditIcon } from "../assets/icons.js";
import { appendChildren, createElement } from "../helpers/helpers.js";
import { table, tbHeadRow } from "../html_elements.js";
import { renderDialog } from "./dialog.js";
import { showModal } from "./modal.js";

function loadingData() {
	const loadingRow = createElement({
		type: "tr",
		attrs: {
			id: "loading-row",
		},
		innerHTML: `
            <td colspan="6">
                <div class="loader-wrapper">
                    <div class="loader-icon"></div>
                    <label class="loader-label"> Loading... </label>
                </div>
            </td>
        `,
	});

	return loadingRow;
}

function emptyTableData() {
	const emptyRow = createElement({
		type: "tr",
		attrs: {
			id: "empty-row",
		},
		innerHTML: `
            <td colspan="6">
                <label class="empty-text"> !No task to display! </label>
            </td>
        `,
	});

	return emptyRow;
}

function showTableData(tasks) {
	const allTasksElem = [];

	tasks.forEach((task, idx) => {
		const taskEle = createElement({
			type: "tr",
			attrs: {
				class: "data-rows",
			},
		});

		const cells = [
			task.priority === 0 ? "high" : task.priority === 1 ? "medium" : "low",
			task.status,
			task.name,
			task.deadline,
		].map((text, idx) => {
			const td = createElement({
				type: "td",
				attrs: { class: "row-data" },
				innerText:
					idx === 3 ? (text ? task.date + " " + task.time : "none") : text,
			});

			if (window.tasks.searchValue && idx >= 2 && idx <= 3) {
				const content = td.innerHTML;
				const highlightedContent = content.replace(
					new RegExp(window.tasks.searchValue, "gi"),
					`<span style="background-color: yellow; font-weight: 900">$&</span>`
				);

				td.innerHTML = highlightedContent;
			} else {
				td.innerHTML = td.textContent;
			}

			return td;
		});

		const editCell = createElement({
			type: "td",
			attrs: {
				class: "row-data",
			},
			innerHTML: `
                <button class="cell-icon">${EditIcon}</button>
            `,
			onclick: function () {
				showModal(idx);
				renderTable();
			},
		});

		const delCell = createElement({
			type: "td",
			attrs: {
				class: "row-data",
			},
			innerHTML: `
            <button class="cell-icon">${DeleteIcon}</button>
            `,
			onclick: function () {
				window.tasks.delete(idx);
				renderTable();
			},
		});

		appendChildren([...cells, editCell, delCell], taskEle);

		allTasksElem.push(taskEle);
	});

	return allTasksElem;
}

export const renderTable = function (isLoading) {
	table.innerHTML = "";

	const tasks =
		window.tasks.searchList.length === 0
			? window.tasks.searchValue === ""
				? window.tasks.getAll()
				: []
			: window.tasks.searchList;

	if (isLoading) {
		appendChildren([tbHeadRow, loadingData()], table);
	} else if (tasks.length === 0) {
		appendChildren([tbHeadRow, emptyTableData()], table);
	} else {
		const elements = showTableData(tasks);
		appendChildren([tbHeadRow, ...elements], table);
	}
};

renderTable();
