"use strict";

import { body } from "./components/index.js";
import { renderTable } from "./renders/render.js";

window.onload = function () {
	renderTable();
	setTimeout(() => {
		window.tasks.loadAll();
		renderTable();
	}, 0);
};
