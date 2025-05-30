import styled from "styled-components";

const Button = styled.button`
	width: 1.6rem;
	height: 1.6rem;
	border-width: 1px;
	border-radius: 0.4rem;

	background-color: ${(props) => (props.$isSelected ? "var(--color-blue-700)" : "rgb(255 255 255 / 0.05)")};
	border-color: rgb(255 255 255 / 0.1);

	&:focus {
		outline: none;
	}

	&:hover {
		box-shadow: 0 0 0 2px var(--color-blue-700);
		outline: 2px solid var(--color-primary-bg);
		outline-offset: -2px;
	}
`;

/**
 * @typedef {Object} Checkbox
 * @property {function} onClick - The function called when the checkbox is clicked.
 * @property {boolean} isSelected - The state of the checkbox. Default: true.
 */

/**
 * Documentation
 * @param {Checkbox} checkbox - {@link checkbox} object
 */
function Checkbox({ isSelected = true, onClick, ...props }) {
	return (
		<Button onClick={onClick} {...props} $isSelected={isSelected}>
			{isSelected && (
				<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
				</svg>
			)}
		</Button>
	);
}

export default Checkbox;
