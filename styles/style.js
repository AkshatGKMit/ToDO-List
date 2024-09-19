export const bodyStyle = {
	backgroundColor: "#00ffaa",
	padding: "1rem",
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
};

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

export const taskDialogStyle = {
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

export const tbStyle = {
	border: "1px solid black",
	borderCollapse: "collapse",
};

export const tbCellStyle = {
	border: "1px solid black",
	padding: "0.1rem 0.5rem",
};

export const tbHeadStyle = {
	...tbCellStyle,
	textAlign: "center",
	color: "white",
	backgroundColor: "black",
	padding: "0.1rem 1rem",
	borderColor: "grey",
};

export const editDelIconStyle = {
	display: "block",
	height: "1.75rem",
	width: "1.75rem",
	backgroundColor: "transparent",
	border: "none",
	margin: "auto",
};

export const emptyTasksStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: "1rem",
	margin: "3rem",
	fontSize: "2rem",
	fontWeight: "900",
	color: "#808080",
};

export const loaderDivStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: "1rem",
	margin: "3rem",
	fontSize: "2rem",
	fontWeight: "900",
	color: "black",
};

export const emptyIconStyle = {
	display: "block",
	height: "9rem",
	width: "9rem",
};

export const loadingIconStyle = {
	height: "6rem",
	width: "6rem",
	border: "10px solid black",
	borderTop: "10px solid transparent",
	borderRadius: "10rem",
	animation: "spin 2s linear infinite",
};
