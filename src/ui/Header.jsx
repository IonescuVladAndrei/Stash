import styled, { css } from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useKeyEdit } from "../context/KeyContext";
import { useRef, useState } from "react";
import Button from "./Buttons/Button";

const StyledHeader = styled.header`
	background-color: var(--color-primary-bg);

	padding: 0rem 3rem 0rem 5rem;
	z-index: 1;
	box-shadow: var(--shadow-md);
	height: 5.6rem;
	display: flex;

	position: relative;

	& > *:first-child {
		display: none;
	}

	@media (max-width: 600px) {
		padding-left: 1rem;

		& > *:first-child {
			display: block;
			align-self: center;
		}
	}
`;

const NavBox = styled.div`
	margin-left: 4rem;
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--color-grey-300);
	font-weight: 600;
	border-bottom: 0.2rem solid var(--color-primary-bg);

	${(props) =>
		props.$isSelected &&
		css`
			border-bottom: 0.2rem solid var(--color-red-primary-800);
			color: var(--color-grey-0);
		`}
`;

const LinksBox = styled.div`
	max-height: 5.6rem;
	display: flex;
	justify-content: center;
	overflow: hidden;

	@media (max-width: 600px) {
		position: absolute;
		max-height: 0;
		top: 5.6rem;

		background-color: inherit;

		border-radius: var(--border-radius-sm);

		flex-direction: column;

		transition: max-height 0.5s ease-in, padding-right 0.5s ease-in, padding-bottom 0.5s ease-in;
		${(props) =>
			props.$isOpen &&
			css`
				max-height: ${props.$maxHeight};
				padding-right: 1rem;
				padding-bottom: 1rem;
			`}

		& > * {
			margin-left: 1.6rem !important;
		}
	}
`;

const LockBox = styled.div`
	margin-left: 4rem;
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 600px) {
		margin-left: auto;
	}
`;

const URLS = [
	{ to: "auth", text: "Auth" },
	{ to: "data", text: "Data" },
	{ to: "tags", text: "Tags" },
	{ to: "decrypt-encrypt", text: "Decrypt & Encrypt" },
];

function Header() {
	const { key } = useKeyEdit();
	const { pathname } = useLocation();

	const [maxHeight, setMaxHeight] = useState("0px");
	const [isOpen, setIsOpen] = useState(false);
	const boxRef = useRef(null);

	function handleClick() {
		setIsOpen((io) => !io);
		if (!isOpen) {
			if (boxRef.current) {
				setMaxHeight(`${boxRef.current.scrollHeight + 1 + 63}px`);
				// +1px to round up
			}
		}
	}

	return (
		<StyledHeader>
			{isOpen ? (
				<Button kind="transparent" onClick={handleClick}>
					<Close />
				</Button>
			) : (
				<Button kind="transparent" onClick={handleClick}>
					<Menu />
				</Button>
			)}
			<LinksBox $maxHeight={maxHeight} ref={boxRef} $isOpen={isOpen}>
				{URLS.map((url, index) => (
					<NavBox $isSelected={pathname.includes(url.to)} $isOpen={isOpen} key={index}>
						<NavLink to={`/${url.to}`} onClick={() => setIsOpen(false)}>
							{url.text}
						</NavLink>
					</NavBox>
				))}
			</LinksBox>

			<LockBox>
				<Lock isEmpty={key.length === 0} />
			</LockBox>
		</StyledHeader>
	);
}

function Lock({ isEmpty }) {
	if (isEmpty)
		return (
			<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill={"var(--color-grey-300)"}>
				<path d="M819.52-250.35 417.7-652.17h179.73v-82.57q0-50.35-36.04-85.17-36.04-34.83-85.39-34.83-50.35 0-85.89 33.98t-35.54 84.89v19.44l-69.79-68.66q11.57-68.61 66.09-111T476-938.48q84.3 0 144.46 59.15 60.15 59.16 60.15 143.46v83.7h55.17q34.96 0 59.35 24.39t24.39 59.35v318.08ZM879.04 29.7 776.13-71.65q-9.13 6.26-19.39 8.82-10.26 2.57-20.96 2.57H224.22q-34.96 0-59.07-24.39t-24.11-58.79v-424.99q0-29.4 16.79-51.22 16.78-21.83 44.6-26.26L-14.61-863.39l49.74-49.87L928.22-19.04 879.04 29.7ZM427.96-421.39q-10.87 9.87-16.59 25.3-5.72 15.44-5.72 30.31 0 31.74 22.31 54.04 22.3 22.3 54.61 22.3 15.86 0 30.02-5.71 14.15-5.72 25.02-16.59L427.96-421.39Z" />
			</svg>
		);

	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill={"var(--color-red-primary-800)"}>
			<path d="M224.22-60.26q-34.16 0-58.67-24.51-24.51-24.51-24.51-58.67v-424.99q0-35.18 24.51-59.46t58.67-24.28h55.17v-83.57q0-84.69 58.68-143.71 58.68-59.03 141.77-59.03 83.08 0 141.93 59.03 58.84 59.02 58.84 143.71v83.57h55.17q34.39 0 59.07 24.28 24.67 24.28 24.67 59.46v424.99q0 34.16-24.67 58.67-24.68 24.51-59.07 24.51H224.22ZM480.25-276.3q33.05 0 55.86-22.71 22.8-22.7 22.8-54.57 0-30.94-23.05-56.03t-56.11-25.09q-33.05 0-55.86 25.09-22.8 25.08-22.8 56.41 0 31.55 23.05 54.22 23.05 22.68 56.11 22.68ZM362.57-652.17h234.86v-83.44q0-50.96-34.11-85.05-34.12-34.08-83.19-34.08-49.06 0-83.31 34.08-34.25 34.09-34.25 85.05v83.44Z" />
		</svg>
	);
}

function Menu() {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height="24px" width="24px">
			<path
				d="M4 6H20M4 12H20M4 18H20"
				stroke={"var(--color-red-primary-800)"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
}

function Close() {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height="24px" width="24px">
			<path
				d="M8.00191 9.41621C7.61138 9.02569 7.61138 8.39252 8.00191 8.002C8.39243 7.61147 9.0256 7.61147 9.41612 8.002L12.0057 10.5916L14.5896 8.00771C14.9801 7.61719 15.6133 7.61719 16.0038 8.00771C16.3943 8.39824 16.3943 9.0314 16.0038 9.42193L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.004C15.6133 16.3945 14.9802 16.3945 14.5896 16.004L12.0057 13.42L9.42192 16.0038C9.03139 16.3943 8.39823 16.3943 8.00771 16.0038C7.61718 15.6133 7.61718 14.9801 8.00771 14.5896L10.5915 12.0058L8.00191 9.41621Z"
				fill={"var(--color-red-primary-800)"}
			></path>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
				fill={"var(--color-red-primary-800)"}
			></path>
		</svg>
	);
}

export default Header;
