class Task {
	constructor(priority, title, deadline, description, date, time) {
		this.priority = priority;
		this.status = window.data.status[0];
		this.title = title;
		this.date = new Date();
		this.deadline = deadline;
		this.dlDate = date;
		this.dlTime = time;
		this.description = description;
	}

	static add({ priority, title, description, deadline, date, time }) {
		const newTask = new Task(
			priority,
			title,
			deadline,
			description,
			date,
			time
		);
		window.tasks.add(newTask);
	}
}

export default Task;
