import { useState } from "react";
import styled from "styled-components";

const StyledMSButton = styled.button`
	width: 2rem;
	height: 2rem;
	background-color: var(--color-secondary-1);
	border: none;

	&:focus {
		outline: none;
	}
`;

/**
 * @typedef {Object} MSButton
 * @property {boolean} showOptions - If true, will show options.
 * @property {boolean} isDelete - Should be unique and match the component passed as child.
 */

/**
 * Documentation
 * @param {MSButton} msButton - {@link msButton} object
 */
function MSButton({ showOptions, isDelete = false, ...props }) {
	const [hover, setHover] = useState(false);

	return (
		<StyledMSButton {...props} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				{isDelete && (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path
							d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
							fill={hover ? "var(--color-grey-0)" : "var(--color-grey-300)"}
						/>
					</svg>
				)}
				{!isDelete &&
					(showOptions ? (
						<path
							d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
							fill={hover ? "var(--color-grey-0)" : "var(--color-grey-300)"}
						/>
					) : (
						<path
							d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
							fill={hover ? "var(--color-grey-0)" : "var(--color-grey-300)"}
						/>
					))}
			</svg>
		</StyledMSButton>
	);
}
export default MSButton;
