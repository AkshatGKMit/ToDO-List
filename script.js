"use strict";

import { body } from "./components/index.js";
import { renderTable } from "./renders/render.js";

window.onload = function () {
	renderTable();
	setTimeout(() => {
		window.tasks.loadAll();
		console.log(window.tasks.list);

		renderTable();
	}, 0);
};
