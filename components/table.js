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

function showTableData() {}

export const renderTable = function (isLoading) {
	table.innerHTML = "";

	const tasks = window.tasks.getAll();

	appendChildren(
		[
			tbHeadRow,
			isLoading
				? loadingData()
				: tasks.length === 0
				? emptyTableData()
				: showTableData(),
		],
		table
	);
};

renderTable();
