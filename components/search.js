import { searchField, sortBtn } from "../html_elements.js";
import { renderTable } from "./table.js";

function search(ev) {
	const searchValue = ev.target.value.toString().toLowerCase().trim();

	window.tasks.searchValue = searchValue;
	const searchList = window.tasks.getAll().reduce((acc, task) => {
		if (task.name.toLowerCase().includes(searchValue)) acc.push(task);

		return acc;
	}, []);

	window.tasks.searchList = searchList;
	renderTable();
}

searchField.addEventListener("keyup", search);

function sort(ev) {
	window.tasks.sort(parseInt(ev.target.value));
	renderTable();
}

sortBtn.addEventListener("change", sort);
