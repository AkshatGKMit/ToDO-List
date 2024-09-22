import {
	modal,
	floatingActionBtn,
	modalBarrier,
	modalCloseBtn,
	modalCancelBtn,
} from "../html_elements.js";
import { renderDialog } from "./dialog.js";

export function showModal(idx) {
	modal.style.display = "block";
	document.body.style.overflowY = "hidden";
	renderDialog(idx);
}

export function closeModal() {
	modal.style.display = "none";
	document.body.style.overflowY = "scroll";
}

floatingActionBtn.addEventListener("click", () => showModal());
modalBarrier.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);
modalCancelBtn.addEventListener("click", closeModal);
