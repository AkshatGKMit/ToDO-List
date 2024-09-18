export const setStyles = function (styles, element) {
	Object.assign(element.style, styles);
};

export const showModal = function (modal) {
	setStyles({ display: "block" }, modal);
};

export const hideModal = function (modal) {
	setStyles({ display: "none" }, modal);
};
