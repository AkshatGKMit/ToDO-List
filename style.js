export const addTaskDialogBtnsStyle = {
	border: "none",
	borderRadius: "12px",
	color: "white",
	padding: "5px 10px",
	fontSize: "1.2rem",
};

export const floatingButtonStyle = {
	position: "fixed",
	bottom: 0,
	right: 0,
	zIndex: 1,
	margin: "1.5rem",
	display: "block",
	height: "3rem",
	width: "3rem",
	padding: "0.25rem",
	border: 0,
	borderRadius: "10px",
	backgroundColor: "#ffff00",
	boxShadow: "0px 0px 10px 0px #999",
};

export const addTaskInputStyle = {
	width: "100%",
	padding: "2px",
	minWidth: "15rem",
};

export const addTaskDialogStyle = {
	position: "absolute",
	zIndex: 3,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	height: "fit-content",
	width: "fit-content",
	padding: "1rem",
	backgroundColor: "#fff",
	borderRadius: "10px",
	display: "flex",
	flexDirection: "column",
	gap: "0.75rem",
};

export const barrierStyle = {
	position: "absolute",
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	backgroundColor: "#333",
	opacity: 0.5,
	zIndex: 2,
};