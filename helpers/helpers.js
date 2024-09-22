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

export const sortList = function (sortBy) {
	const tasks =
		window.tasks.searchValue === ""
			? window.tasks.list
			: window.tasks.searchList;

	let sortedList = [];

	switch (sortBy) {
		case 0:
			sortedList = tasks.sort((a, b) => a.priority - b.priority);
			break;
		case 1:
			sortedList = tasks.sort((a, b) => b.priority - a.priority);
			break;
		case 2:
			sortedList = tasks.sort((a, b) => a.name.localeCompare(b.name));
			break;
		case 3:
			sortedList = tasks.sort((a, b) => b.name.localeCompare(a.name));
		default:
			break;
	}

	if (window.tasks.searchValue === "") {
		window.tasks.searchList = sortedList;
	} else {
		window.tasks.list = sortedList;
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

export const dateDaysDiff = function (deadline, start) {
	const startDate = start === undefined ? new Date() : new Date(start);
	const endDate = new Date(deadline);
	const diffInMs = endDate - startDate;
	const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

	return diffInDays;
};
