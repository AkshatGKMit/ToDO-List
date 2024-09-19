export const setStyles = function (styles, element) {
	Object.assign(element.style, styles);
};

export const setAttributes = function (attrs, element) {
	Object.keys(attrs).forEach((key) => element.setAttribute(key, attrs[key]));
};

export const appendChildren = function (children, parent) {
	children.forEach((child) => {
		parent.appendChild(child);
	});
};

export const renderElement = function (element, newContent) {
	element.innerHTML = "";
	element.appendChild(newContent);
};

export const showModal = function (modal) {
	appendChildren([modal], document.body);
};

export const hideModal = function (modal) {
	document.body.removeChild(modal);
};

export const sortList = function (list, sortBy) {
	const sortOrder = window.data.sortOrder;
	const sortMethods = window.data.sortMethods;

	function sortByStatus() {
		const sortType = (window.data.sortOrder.status =
			(sortOrder.status + 1) % 3);

		const topOfList = [];
		const bottomOfList = [];
		list.forEach((task) => {
			task.status === sortMethods.status[sortType]
				? topOfList.push(task)
				: bottomOfList.push(task);
		});
		window.tasks.list = [...topOfList, ...bottomOfList];
	}

	function sortByName() {
		const sortType = (window.data.sortOrder.name = (sortOrder.name + 1) % 2);
		window.tasks.list = list.sort((a, b) => {
			return sortType
				? a.title.localeCompare(b.title)
				: b.title.localeCompare(a.title);
		});
	}

	function sortByDate() {
		const sortType = (window.data.sortOrder.date = (sortOrder.date + 1) % 2);
		window.tasks.list = list.sort((a, b) => {
			return sortType ? a.date - b.date : b.date - a.date;
		});
	}

	function sortByDeadline() {
		const sortType = (window.data.sortOrder.date = (sortOrder.date + 1) % 2);
		const upcoming = [];
		const passed = [];
		list.forEach((task) => {
			task.status === sortMethods.status[1]
				? upcoming.push(task)
				: passed.push(task);
		});

		const newUpcoming = upcoming.sort((a, b) => {
			return sortType ? a.date - b.date : b.date - a.date;
		});
		window.tasks.list = [...newUpcoming, ...passed];
	}

	switch (sortBy) {
		case 1:
			sortByStatus();
			break;
		case 2:
			sortByName();
			break;
		case 3:
			sortByDate();
			break;
		case 4:
			sortByDeadline();
		default:
			break;
	}
};
