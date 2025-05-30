import styled from "styled-components";

const Button = styled.button`
	padding: 0;
	border: none;
	border-radius: 100%;
	background-color: transparent;
	height: fit-content;

	transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;

	&:active:not(:disabled) {
		outline: none;
		border: none;
		border-radius: 100%;
		background: color-mix(in srgb, var(--color-silver-700) 40%, transparent);
	}

	&:hover:not(:disabled):not(:active) {
		outline: none;
		border: none;
		border-radius: 100%;
		background: color-mix(in srgb, var(--color-grey-400) 40%, transparent);
	}

	&:focus {
		outline: none;
		border: none;
		border-radius: 100%;
	}
`;


/**
 * @typedef {Object} ButtonSvg
 * @property { "add" | "trash" | "down" | "up" | "search" | "visible" | "n-visible" | "more"} type - The type of button.
 * @property {function} onClick - The function called when the button is pressed.
 * @property {boolean} disabled - If true, will disable the button. Default: false.
 */

/**
 * Documentation
 * @param {ButtonSvg} buttonSvg - {@link buttonSvg} object
 */
function ButtonSvg({ type, onClick, disabled = false, ...props }) {
	return (
		<Button onClick={onClick} disabled={disabled} {...props}>
			{type === "add" ? (
				<PlusSvg disabled={disabled} />
			) : type === "trash" ? (
				<TrashSvg disabled={disabled} />
			) : type === "up" ? (
				<UpSvg disabled={disabled} />
			) : type === "down" ? (
				<DownSvg disabled={disabled} />
			) : type === "search" ? (
				<SearchSvg disabled={disabled} />
			) : type === "visible" ? (
				<VisibleSvg disabled={disabled} />
			) : type === "n-visible" ? (
				<NotVisibleSvg disabled={disabled} />
			) : type === "more" ? (
				<MoreSvg disabled={disabled} />
			) : (
				<span>Invalid type prop</span>
			)}
		</Button>
	);
}

function PlusSvg({ disabled = false }) {
	let color;

	if (disabled) color = "var(--color-grey-500)";
	else color = "var(--color-green-700)";

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill={color}>
			<path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
		</svg>
	);
}

function TrashSvg({ disabled = false }) {
	let color;

	if (disabled) color = "var(--color-grey-500)";
	else color = "var(--color-red-700)";

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill={color}>
			<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
		</svg>
	);
}

function UpSvg({ disabled = false }) {
	let color;

	if (disabled) color = "var(--color-grey-500)";
	else color = "var(--color-blue-700)";

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill={color}>
			<path d="M440-320h80v-168l64 64 56-56-160-160-160 160 56 56 64-64v168Zm40 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
		</svg>
	);
}

function DownSvg({ disabled = false }) {
	let color;

	if (disabled) color = "var(--color-grey-500)";
	else color = "var(--color-blue-700)";

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill={color}>
			<path d="m480-320 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
		</svg>
	);
}

function SearchSvg({ disabled = false }) {
	let color;

	if (disabled) color = "var(--color-grey-500)";
	else color = "var(--color-blue-700)";

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill={color}>
			<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
		</svg>
	);
}

function VisibleSvg({ disabled = false }) {
	let color;

	if (disabled) color = "var(--color-grey-500)";
	else color = "var(--color-red-700)";

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill={color}>
			<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
		</svg>
	);
}

function NotVisibleSvg({ disabled = false }) {
	let color;

	if (disabled) color = "var(--color-grey-500)";
	else color = "var(--color-red-700)";

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill={color}>
			<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
		</svg>
	);
}

function MoreSvg({ disabled = false }) {
	let color;

	if (disabled) color = "var(--color-grey-500)";
	else color = "var(--color-grey-300)";

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill={color}>
			<path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
		</svg>
	);
}

export default ButtonSvg;
