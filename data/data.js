import Task from "../models/task.js";

window.tasks = {
	list: [],
	getAll: function () {
		return this.list;
	},
	push: function (task) {
		this.list.push(task);
	},
};

window.data = {
	isDialogOpen: false,
	toggleDialog: function () {
		this.isDialogOpen = !this.isDialogOpen;
		renderDialog()
	},
};

window.addTaskData = {
	title: "",
	setTitle: function (title) {
		this.title = title;
	},
	deadlineToggle: false,
	toggleDeadline: function () {
		this.deadlineToggle = !this.deadlineToggle;
	},
	deadline: "",
	setDeadline: function (deadline) {
		this.deadline = deadline;
	},
	description: "",
	setDescription: function (description) {
		this.description = description;
	},
	resetData: function () {
		this.title = "";
		this.deadline = "";
		this.description = "";
	},
	appendTask: function () {
		tasks.push(
			new Task({
				title: this.title,
				deadline: this.deadlineToggle ? this.deadline : "none",
				description: this.description,
			})
		);
		this.resetData();
	},
};
