import {
	taskDeadlineCb,
	dialogHeading,
	taskNameInp,
	taskPrioritySelector,
	taskDeadlineDateInp,
	taskDeadlineTimeInp,
	taskDescriptionInp,
	dialogActionBtn,
} from "../html_elements.js";
import Task from "../models/task.js";
import { closeModal } from "./modal.js";
import { renderTable } from "./table.js";

export const renderDialog = function (updateIdx = -1) {
	const updatingTask = updateIdx < 0 ? null : window.tasks.list[updateIdx];

	dialogHeading.innerText = updatingTask === null ? "Add Task" : "Update Task";

	taskNameInp.value = updatingTask === null ? "" : updatingTask.name;
	taskPrioritySelector.value =
		updatingTask === null
			? taskPrioritySelector.options[0].value
			: updatingTask.priority;
	taskDeadlineCb.checked =
		updatingTask === null ? false : updatingTask.deadline;

	taskDeadlineCb.addEventListener("click", function (ev) {
		taskDeadlineDateInp.disabled = !ev.target.checked;
		taskDeadlineTimeInp.disabled = !ev.target.checked;
	});

	taskDeadlineDateInp.value = updatingTask === null ? "" : updatingTask.date;
	taskDeadlineTimeInp.value = updatingTask === null ? "" : updatingTask.time;

	taskDescriptionInp.value =
		updatingTask === null ? "" : updatingTask.description;

	function appendTask() {
		const priority = taskPrioritySelector.value;
		const name = taskNameInp.value;
		const deadline = taskDeadlineCb.checked;
		const date = taskDeadlineCb.checked ? taskDeadlineDateInp.value : "none";
		const time = taskDeadlineCb.checked ? taskDeadlineTimeInp.value : "none";
		const description = taskDescriptionInp.value;

		Task.add({
			priority,
			name,
			deadline,
			date,
			time,
			description,
		});
		closeModal();
		renderTable();
	}

	function updateTask() {
		const priority = taskPrioritySelector.value;
		const name = taskNameInp.value;
		const deadline = taskDeadlineCb.checked;
		const date = taskDeadlineCb.checked ? taskDeadlineDateInp.value : "none";
		const time = taskDeadlineCb.checked ? taskDeadlineTimeInp.value : "none";
		const description = taskDescriptionInp.value;

		Task.update({
			idx: updateIdx,
			priority,
			name,
			deadline,
			date,
			time,
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
