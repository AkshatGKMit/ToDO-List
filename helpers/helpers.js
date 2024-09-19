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

export const showModal = function (modal) {
	setStyles({ display: "block" }, modal);
};

export const hideModal = function (modal) {
	setStyles({ display: "none" }, modal);
};
