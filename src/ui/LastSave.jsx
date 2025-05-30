import styled from "styled-components";
import { formatDate } from "../utils/formatDate";
import SpinnerMini from "./Spinners/SpinnerMini";

const LastSaveBox = styled.div`
	display: flex;
	gap: 0.7rem;

	@media (max-width: 400px) {
		flex-direction: column;
		gap: 0;
		align-items: center;
	}
`;

const LastSaveP = styled.p`
	color: var(--color-grey-400);
`;

const LastSaveValP = styled.p`
	font-weight: 500;
	color: var(--color-grey-200);
`;


/**
 * @typedef {Object} Button
 * @property {number} val - Numerical value used for date.
 * @property {boolean} isLoading - If data is being fetched.
 */

/**
 * Documentation
 * @param {Button} button - {@link button} object
 */
function LastSave({ val, isLoading }) {
	return (
		<LastSaveBox>
			{isLoading ? (
				<SpinnerMini />
			) : (
				<>
					<LastSaveP>Last save on</LastSaveP>
					<LastSaveValP>{formatDate(new Date(+val))}</LastSaveValP>
				</>
			)}
		</LastSaveBox>
	);
}

export default LastSave;
