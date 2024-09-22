class Task {
	constructor(priority, name, description, date, time) {
		this.priority = priority;
		this.status = window.data.status[0];
		this.name = name;
		this.date = new Date();
		this.dlDate = date;
		this.dlTime = time;
		this.description = description;
	}

	static add({ priority, name, description, date, time }) {
		const newTask = new Task(priority, name, description, date, time);
		window.tasks.add(newTask);
	}

	static update({ idx, priority, name, description, date, time }) {
		const newTask = new Task(priority, name, description, date, time);
		window.tasks.update(newTask, idx);
	}
}

export default Task;
