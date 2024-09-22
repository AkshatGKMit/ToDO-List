import {
	dialogHeading,
	taskNameInp,
	taskPrioritySelector,
	taskDescriptionInp,
	dialogActionBtn,
} from "../html_elements.js";
import Task from "../models/task.js";
import { closeModal } from "./modal.js";
import { renderTable } from "./table.js";

export const renderDialog = function (updateIdx = -1) {
	const updatingTask = updateIdx < 0 ? null : window.tasks.list[updateIdx];
	console.log(updateIdx);

	dialogHeading.innerText = updatingTask === null ? "Add Task" : "Update Task";

	taskNameInp.value = updatingTask === null ? "" : updatingTask.name;
	taskPrioritySelector.value =
		updatingTask === null
			? taskPrioritySelector.options[0].value
			: updatingTask.priority;

	taskDescriptionInp.value =
		updatingTask === null ? "" : updatingTask.description;

	function appendTask() {
		const priority = taskPrioritySelector.value;
		const name = taskNameInp.value;
		const description = taskDescriptionInp.value;

		Task.add({
			priority,
			name,
			description,
		});
		closeModal();
		renderTable();
	}

	function updateTask() {
		const priority = taskPrioritySelector.value;
		const name = taskNameInp.value;
		const description = taskDescriptionInp.value;

		Task.update({
			idx: updateIdx,
			priority,
			name,
			description,
		});

		closeModal();
		renderTable();
	}

	dialogActionBtn.innerText = updatingTask === null ? "Add" : "Update";
	dialogActionBtn.addEventListener("click", () => {
		updatingTask === null ? appendTask() : updateTask();
	});
};
