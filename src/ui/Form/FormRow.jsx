import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr;
	gap: 2.4rem;
	padding: 2.4rem 0;

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
		gap: 1.2rem;
	}

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:first-child) {
		${(props) =>
			!props.$noBorderChild &&
			css`
				border-top: 0.1rem solid var(--color-red-primary-800);
			`}
	}
`;

const Label = styled.label`
	font-weight: 500;
	width: fit-content;
	color: var(--color-grey-0);
`;

/**
 * @typedef {Object} FormRow
 * @property {string} label - Form label.
 * @property {string} htmlFor - Should be unique and match the component passed as child.
 * @property {boolean} noBorderChild - If true, will remove top border. Default: false.
 */

/**
 * Documentation
 * @param {FormRow} formRow - {@link formRow} object
 */
function FormRow({ label, htmlFor, children, noBorderChild = false }) {
	return (
		<StyledFormRow $noBorderChild={noBorderChild}>
			{label && <Label htmlFor={htmlFor}>{label}</Label>}
			{children}
		</StyledFormRow>
	);
}

export default FormRow;
