class Task {
	constructor({ title, description, status, deadline }) {
		this.title = title;
		this.description = description;
		this.status = status;
		this.deadline = deadline;
		this.date = Date.now();
	}
}

export default Task;
