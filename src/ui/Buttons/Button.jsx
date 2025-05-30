import styled, { css } from "styled-components";

const StyledButton = styled.button`
	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	height: fit-content;

	transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;

	${(props) =>
		props.$size === "large" &&
		css`
			font-size: 1.6rem;
			padding: 1.2rem 2.4rem;
			font-weight: 500;

			@media (max-width: 600px) {
				font-size: 1.2rem;
				padding: 0.8rem 1.6rem;
			}
		`}

	${(props) =>
		props.$kind === "primary"
			? css`
					color: var(--color-grey-200);
					background-color: var(--color-blue-700);

					&:hover&:not(:disabled) {
						background-color: var(--color-blue-cyan-500);
					}

					&:disabled {
						background-color: var(--color-blue-900);
					}

					&:focus {
						outline: none;
					}
			  `
			: props.$kind === "secondary"
			? css`
					color: var(--color-grey-600);
					background: var(--color-grey-0);
					border: 1px solid var(--color-grey-200);

					&:hover&:not(:disabled) {
						background-color: var(--color-grey-50);
					}

					&:focus {
						outline: none;
					}
			  `
			: props.$kind === "danger"
			? css`
					color: var(--color-red-100);
					background-color: var(--color-red-700);

					&:hover&:not(:disabled) {
						background-color: var(--color-red-800);
					}

					&:focus {
						outline: 2px solid var(--color-red-800);
					}
			  `
			: props.$kind === "transparent"
			? css`
					display: flex;
					justify-content: center;
					align-items: center;
					height: fit-content;
					background-color: transparent;
					border: none;

					border-radius: 100%;

					&:focus {
						outline: none;
					}
			  `
			: css``}
`;

/**
 * @typedef {Object} Button
 * @property {"large" | ''} size - The size of the button.
 * @property { "danger" | "secondary" | "primary" | "transparent"} kind - The kind of button.
 */

/**
 * Documentation
 * @param {Button} button - {@link button} object
 */
function Button({ size, kind, children, ...props }) {
	return (
		<StyledButton $size={size} $kind={kind} {...props}>
			{children}
		</StyledButton>
	);
}

export default Button;
