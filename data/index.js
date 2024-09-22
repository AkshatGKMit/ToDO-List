window.tasks = {
	list: [],
	getAll: function () {
		return this.list;
	},
	add: function (newTask) {
		this.list.push(newTask);
		console.log(this.list);
	},
};

window.data = {
	priorities: ["low", "medium", "high"],
	status: ["incomplete", "finished", "forgotten"],
};
