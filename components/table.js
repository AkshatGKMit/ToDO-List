import { appendChildren, createElement } from "../helpers/helpers.js";
import { table, tbHeadRow } from "../html_elements.js";

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
			innerHTML: `
                <td class="row-data">${task.priority}</td>
                <td class="row-data">${task.status}</td>
                <td class="row-data">${task.name}</td>
                <td class="row-data">${
									task.deadline ? task.date + " " + task.time : "none"
								}</td>
                <td class="row-data">✏️</td>
                <td class="row-data">🗑️</td>
            `,
		});

		allTasksElem.push(taskEle);
	});

	return allTasksElem;
}

export const renderTable = function (isLoading) {
	table.innerHTML = "";

	const tasks = window.tasks.getAll();

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
