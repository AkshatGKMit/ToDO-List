import Task from "../models/task.js";

window.tasks = {
	list: [
		{
			idx: 1,
			status: "Incomplete",
			title: "Internal Response Agent",
			date: "Sep-19-2024",
			deadline: "Oct-31-2024",
			description:
				"Sit possimus quod quas laboriosam et sed corporis ipsa. Corrupti omnis qui ea dicta.",
		},
		{
			idx: 2,
			title: "Chief Branding Manager",
			description: "Dolores impedit nostrum eum quod. Aut doloribus eum.",
			status: "Incomplete",
			deadline: "Feb-18-2025",
			date: "Sep-19-2024",
		},
		{
			idx: 3,
			title: "Lead Accounts Analyst",
			description:
				"Facere harum est officia et et quia. Enim fugit qui voluptas est molestiae corrupti.",
			status: "Incomplete",
			deadline: "Aug-23-2025",
			date: "Sep-19-2024",
		},
		{
			idx: 4,
			title: "District Operations Director",
			description: "Cum recusandae et. Minima distinctio tempore.",
			status: "Incomplete",
			deadline: "Oct-05-2024",
			date: "Sep-19-2024",
		},
	],
	getAll: function () {
		return this.list;
	},
	add: function (task) {
		this.list.push(task);
	},
	delete: function (idx) {
		this.list = this.list.filter((_, id) => id !== idx);
	},
};

window.data = {
	isDialogOpen: false,
	toggleDialog: function () {
		this.isDialogOpen = !this.isDialogOpen;
		renderDialog();
	},
	taskStatusEnum: ["Completed", "Incompleted", "Forgotten"],
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
