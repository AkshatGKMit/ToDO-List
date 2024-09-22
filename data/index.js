import { sortList } from "../helpers/helpers.js";

window.tasks = {
	list: [
		{
			priority: 0,
			status: "incomplete",
			name: "Exercise",
			deadline: false,
			description: "00 min workout",
		},
		{
			priority: 2,
			status: "incomplete",
			name: "Read Book",
			deadline: false,
			description: "Read 10 pages",
		},
		{
			priority: 1,
			status: "incomplete",
			name: "Meditate",
			deadline: false,
			description: "10 min meditation",
		},
		{
			priority: 0,
			status: "incomplete",
			name: "Clean Room",
			deadline: false,
			description: "Tidy up and vacuum",
		},
		{
			priority: 2,
			status: "incomplete",
			name: "Call Mom",
			deadline: false,
			description: "Weekly call",
		},
		{
			priority: 1,
			status: "incomplete",
			name: "Grocery Shopping",
			deadline: false,
			description: "Buy essentials",
		},
		{
			priority: 0,
			status: "incomplete",
			name: "Laundry",
			deadline: false,
			description: "Wash, dry, fold",
		},
		{
			priority: 2,
			status: "incomplete",
			name: "Meal Prep",
			deadline: false,
			description: "Cook for the week",
		},
		{
			priority: 1,
			status: "incomplete",
			name: "Pay Bills",
			deadline: false,
			description: "Utilities, rent, etc.",
		},
		{
			priority: 0,
			status: "incomplete",
			name: "Floss Teeth",
			deadline: false,
			description: "Daily flossing",
		},
	],
	getAll: function () {
		return this.list;
	},
	add: function (newTask) {
		this.list.push(newTask);
	},
	update: function (task, idx) {
		this.list[idx] = task;
	},
	delete: function (idx) {
		this.list = this.list.filter((_, i) => i !== idx);
	},
	sort: function (sortBy) {
		sortList(sortBy);
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
