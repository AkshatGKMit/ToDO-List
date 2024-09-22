class Task {
	constructor(priority, name, deadline, description, date, time) {
		this.priority = priority;
		this.status = window.data.status[0];
		this.name = name;
		this.date = new Date();
		this.deadline = deadline;
		this.dlDate = date;
		this.dlTime = time;
		this.description = description;
	}

	static add({ priority, name, description, deadline, date, time }) {
		const newTask = new Task(priority, name, deadline, description, date, time);
		window.tasks.add(newTask);
	}

	static update({ idx, priority, name, description, deadline, date, time }) {
		const newTask = new Task(priority, name, deadline, description, date, time);
		window.tasks.update(newTask, idx);
	}
}

export default Task;
