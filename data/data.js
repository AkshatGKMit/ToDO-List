import { sortList } from "../helpers/helpers.js";
import Task from "../models/task.js";

window.tasks = {
	list: [
		{
			idx: 1,
			status: "Incomplete",
			title: "Internal Response Agent",
			date: new Date("2024-05-19"),
			deadline: new Date("2024-02-31"),
			description:
				"Sit possimus quod quas laboriosam et sed corporis ipsa. Corrupti omnis qui ea dicta.",
		},
		{
			idx: 2,
			title: "Chief Branding Manager",
			description: "Dolores impedit nostrum eum quod. Aut doloribus eum.",
			status: "Forgotten",
			deadline: new Date("2025-03-18"),
			date: new Date("2023-07-19"),
		},
		{
			idx: 3,
			title: "Lead Accounts Analyst",
			description:
				"Facere harum est officia et et quia. Enim fugit qui voluptas est molestiae corrupti.",
			status: "Incomplete",
			deadline: new Date("2025-08-23"),
			date: new Date("2024-07-19"),
		},
		{
			idx: 4,
			title: "District Operations Director",
			description: "Cum recusandae et. Minima distinctio tempore.",
			status: "Completed",
			deadline: new Date("2024-11-05"),
			date: new Date("2025-03-19"),
		},
	],
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
	add: function (task) {
		this.list.push(task);
	},
	delete: function (idx) {
		this.list = this.list.filter((_, id) => id !== idx);
	},
	sort: function (sortBy) {
		sortList(this.list, sortBy);
	},
	search: function (value) {
		return this.list.reduce((acc, task) => {
			if (
				task.title.toLowerCase().includes(value) ||
				`${task.date.getDate().toString().padStart(2, "0")}-${(
					task.date.getMonth() + 1
				)
					.toString()
					.padStart(2, "0")}-${task.date.getFullYear()}`.includes(value) ||
				`${task.deadline.getDate().toString().padStart(2, "0")}-${(
					task.deadline.getMonth() + 1
				)
					.toString()
					.padStart(2, "0")}-${task.deadline.getFullYear()}`.includes(value) ||
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
};

window.data = {
	isDialogOpen: false,
	toggleDialog: function () {
		this.isDialogOpen = !this.isDialogOpen;
		renderDialog();
	},
	tableHeadCellNames: [
		"Sr.No.",
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
		window.tasks.push(
			new Task({
				title: this.title,
				deadline: this.deadlineToggle ? this.deadline : "none",
				description: this.description,
			})
		);
		this.resetData();
	},
};
