class Task {
	constructor({ title, description, deadline }) {
		this.title = title;
		this.description = description;
		this.status = window.data.sortMethods.status[1];
		this.deadline = deadline;
		this.date = Date.now();
	}
}

export default Task;
