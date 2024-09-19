import { formatDate, sortList } from "../helpers/helpers.js";
import Task from "../models/task.js";

window.tasks = {
	list: [],
	getAll: function () {
		return this.list.filter((task) => {
			const isIncomplete = task.status.toLowerCase() === "incomplete";
			const isCompleted = task.status.toLowerCase() === "completed";
			const isForgotten = task.status.toLowerCase() === "forgotten";

			if (isIncomplete) return true;

			if (this.showCompleted && this.showForgotten) return true;

			if (!this.showCompleted && !this.showForgotten && !isIncomplete)
				return false;

			if (!this.showCompleted && !isCompleted) return true;

			if (!this.showForgotten && !isForgotten) return true;

			return false;
		});
	},
	loadAll: function () {
		this.list = JSON.parse(localStorage.getItem("tasks")) ?? [];
		this.list.forEach((task) => (task.date = new Date(task.date)));
		window.data.toggleLoading(false);
	},
	save: function () {
		localStorage.setItem("tasks", JSON.stringify(this.list));
	},
	add: function (task) {
		this.list.push(task);
		this.save();
	},
	delete: function (idx) {
		this.list = this.list.filter((_, id) => id !== idx);
		this.save();
	},
	update: function (updatedValue) {
		this.list[this.updatingTaskIdx] = updatedValue;
		this.save();
	},
	updateStatus: function (idx) {
		this.list[idx].status = "Completed";
		this.save();
	},
	sort: function (sortBy) {
		sortList(this.list, sortBy);
		this.save();
	},
	search: function (value) {
		value = value.toLowerCase();
		return this.list.reduce((acc, task) => {
			if (
				task.title.toLowerCase().includes(value) ||
				formatDate(task.date).includes(value) ||
				(task.deadline.toString().toLowerCase() === "none"
					? "none".includes(value)
					: formatDate(task.deadline).includes(value)) ||
				task.description.toLowerCase().includes(value)
			)
				acc.push(task);

			return acc;
		}, []);
	},
	showCompleted: true,
	toggleCompleted: function () {
		this.showCompleted = !this.showCompleted;
	},
	showForgotten: true,
	toggleForgotten: function () {
		this.showForgotten = !this.showForgotten;
	},
	updatingTaskIdx: -1,
	setUpdatingTask: function (newIdx) {
		this.updatingTaskIdx = newIdx;
	},
};

window.data = {
	isLoading: true,
	toggleLoading: function (value) {
		this.isLoading = value ?? !this.isLoading;
	},
	isDialogOpen: false,
	toggleDialog: function () {
		this.isDialogOpen = !this.isDialogOpen;
		renderDialog();
	},
	isDialogForUpdate: false,
	toggleDialogForUpdate: function () {
		this.isDialogForUpdate = !this.isDialogForUpdate;
	},
	tableHeadCellNames: [
		"Status",
		"Name",
		"Date Created",
		"Deadline",
		"Description",
		"Edit",
		"Delete",
	],
	sortMethods: {
		status: ["Completed", "Incomplete", "Forgotten"],
		name: ["Ascending", "Descending"],
		date: ["Ascending", "Descending"],
		deadline: ["Closest", "Farthest"],
	},
	sortOrder: {
		status: 0,
		name: 0,
		date: 0,
		deadline: 0,
	},
};

window.addTaskData = {
	title: "",
	setTitle: function (title) {
		this.title = title;
	},
	deadlineToggle: false,
	toggleDeadline: function (value) {
		this.deadlineToggle = value;
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
		window.tasks.add(
			new Task({
				title: this.title,
				deadline: this.deadlineToggle ? this.deadline : "None",
				description: this.description,
			})
		);
		this.resetData();
	},
	updateTask: function () {
		window.tasks.update(
			new Task({
				title: this.title,
				deadline: this.deadlineToggle ? this.deadline : "None",
				description: this.description,
			})
		);
	},
};
