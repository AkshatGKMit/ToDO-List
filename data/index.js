import { sortList } from "../helpers/helpers.js";

window.tasks = {
	list: [],
	getAll: function () {
		return this.list;
	},
	loadAll: function () {
		this.list = JSON.parse(localStorage.getItem("tasks")) ?? [];
	},
	save: function () {
		localStorage.setItem("tasks", JSON.stringify(this.list));
	},
	add: function (newTask) {
		this.list.push(newTask);
		this.save();
	},
	update: function (task, idx) {
		this.list[idx] = task;
		this.save();
	},
	updateStatus: function (idx) {
		this.list[idx].status = window.data.status[1];
		this.save();
	},
	delete: function (idx) {
		this.list = this.list.filter((_, i) => i !== idx);
		this.save();
	},
	sort: function (sortBy) {
		sortList(sortBy);
		this.save();
	},
	searchValue: "",
	searchList: [],
};

window.data = {
	priorities: ["low", "medium", "high"],
	status: ["incomplete", "finished", "forgotten"],
	sortBy: [
		"Priority (High to Low)",
		"Priority (Low to High)",
		"Name(Asc)",
		"Name(Dsc)",
	],
};
