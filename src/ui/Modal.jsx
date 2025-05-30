import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-primary-bg);
	border-radius: var(--border-radius-lg);
	border: 0.1rem solid var(--color-red-primary-800);
	box-shadow: var(--shadow-lg);
	transition: all 0.5s;

	padding: 3.2rem 4rem;

	@media (max-width: 980px) {
		padding: 1.6rem 2rem;
	}

	@media (max-width: 500px) {
		padding: 1.2rem 1rem;
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(0.4rem);
	z-index: 1000;
	transition: all 0.5s;
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;

	return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);

	return cloneElement(children, {
		onClick: (e) => {
			e.preventDefault();

			if (children.props.onClick) {
				children.props.onClick(e);
			}

			open(opensWindowName);
		},
	});
}

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);

	const ref = useOutsideClick(close);

	if (name !== openName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
