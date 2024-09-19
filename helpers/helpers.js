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
