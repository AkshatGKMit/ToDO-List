import {
	modal,
	floatingActionBtn,
	modalBarrier,
	modalCloseBtn,
	modalCancelBtn,
} from "../html_elements.js";

let isDialogForAdd = true;

function showModal() {
	modal.style.display = "block";
	document.body.style.overflowY = "hidden";
}

function closeModal() {
	modal.style.display = "none";
	document.body.style.overflowY = "scroll";
}

floatingActionBtn.addEventListener("click", showModal);
modalBarrier.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);
modalCancelBtn.addEventListener("click", closeModal);
