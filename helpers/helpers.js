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

export const showModal = function (modal, forUpdate) {
	document.body.style.overflowY = "hidden";
	if (forUpdate !== undefined) {
		window.data.toggleDialogForUpdate();
		window.tasks.setUpdatingTask(forUpdate);
	} else {
		window.tasks.setUpdatingTask(-1);
	}

	appendChildren([modal], document.body);
};

export const hideModal = function (modal) {
	if (window.data.isDialogForUpdate) window.data.toggleDialogForUpdate();
	document.body.removeChild(modal);
	document.body.style.overflowY = "scroll";
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
			task.status.toLowerCase() === sortMethods.status[sortType]
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
		case 0:
			sortByStatus();
			break;
		case 1:
			sortByName();
			break;
		case 2:
			sortByDate();
			break;
		case 3:
			sortByDeadline();
		default:
			break;
	}
};

export const formatDate = function (date) {
	return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getFullYear()}`;
};

export const formatDateReversed = function (date) {
	return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

export const createElement = function ({
	type,
	styles,
	attrs,
	innerHTML,
	innerText,
	onclick,
	onkeyup,
	onchange,
	onmouseover,
}) {
	const elem = document.createElement(type);
	if (innerHTML) elem.innerHTML = innerHTML ?? "";
	else elem.innerText = innerText ?? "";
	setStyles(styles ?? {}, elem);
	setAttributes(attrs ?? {}, elem);
	elem.onclick = onclick;
	elem.onkeyup = onkeyup;
	elem.onchange = onchange;
	elem.onmouseover = onmouseover;

	return elem;
};
