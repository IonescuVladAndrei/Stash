import styled from "styled-components";

const StyledSpinner = styled.div`
	width: 2.4rem;
	height: 2.4rem;

	&::after {
		content: " ";

		width: 2.4rem;
		height: 2.4rem;
		display: block;

		border-radius: 50%;
		border: 3px solid var(--color-grey-200);
		border-color: var(--color-grey-200) transparent var(--color-grey-200) transparent;
		animation: spinnerAnimation 1.2s linear infinite;
	}

    @keyframes spinnerAnimation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
`;

function SpinnerMini() {
	return <StyledSpinner></StyledSpinner>;
}

export default SpinnerMini;
