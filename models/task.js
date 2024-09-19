class Task {
	constructor({ title, description, deadline }) {
		this.title = title;
		this.description = description;
		this.status = window.data.sortMethods.status[1];
		this.deadline = deadline === "None" ? "None" : new Date(deadline);
		this.date = new Date();
	}
}

export default Task;
