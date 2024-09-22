import "./data/index.js";
import "./html_elements.js";
import "./components/modal.js";
import "./components/table.js";
import "./components/search.js";
import { renderTable } from "./components/table.js";

async function loadAsyncData() {
	try {
		await loadTasks();
	} catch (error) {
		console.error("Error loading tasks:", error);
	}
}

function loadTasks() {
	renderTable(true);
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(window.tasks.loadAll());
			renderTable();
		}, 2000);
	});
}

loadAsyncData();
