window.tasks = {
	list: [
		{
			priority: "Low",
			status: "incomplete",
			name: "Eat",
			deadline: false,
			description: "Just Eat",
		},
		{
			priority: "Medium",
			status: "incomplete",
			name: "Sleep",
			deadline: false,
			description: "8hrs Sleep",
		},
	],
	getAll: function () {
		return this.list;
	},
	add: function (newTask) {
		this.list.push(newTask);
	},
	delete: function (idx) {
		this.list = this.list.filter((_, i) => i !== idx);
    },
    searchValue: "",
	searchList: [],
};

window.data = {
	priorities: ["low", "medium", "high"],
	status: ["incomplete", "finished", "forgotten"],
};
