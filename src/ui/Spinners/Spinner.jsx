import styled from "styled-components";

const StyledSpinner = styled.div`
	margin: 5rem auto;
	width: 9.5rem;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	gap: 0.5rem;
`;

const Bar = styled.div`
	width: 2rem;
	height: 5rem;
	background-color: var(--color-red-primary-800);
	border-radius: var(--border-radius-sm);
	animation: loading 1s ease-in-out infinite;
	animation-delay: ${(props) => `${0.1 * props.$index}s`};

	@keyframes loading {
		0% {
			height: 0rem;
		}

		50% {
			height: 5rem;
		}

		100% {
			height: 0rem;
		}
	}
`;

function Spinner() {
	const nrOfBars = 4;

	return (
		<StyledSpinner>
			{Array.from({ length: nrOfBars }, (_, index) => (
				<Bar key={index} $index={index} />
			))}
		</StyledSpinner>
	);
}

export default Spinner;
