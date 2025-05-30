import styled from "styled-components";
import Button from "./Buttons/Button";
import ButtonGroup from "./Buttons/ButtonGroup";

const StyledConfirmAction = styled.div`
	width: 90dvw;
	max-width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
`;

const StyledDescriptionP = styled.p`
	color: var(--color-grey-400);
	margin-bottom: 1.2rem;
`;

const StyledHeading = styled.h3`
	font-size: 2.4rem;
	color: var(--color-grey-0);
	font-weight: 600;

	@media (max-width: 600px) {
		font-size: 2rem;
	}
`;

/**
 * @typedef {Object} ConfirmAction
 * @property {string} heading - The heading.
 * @property {string} description - The description.
 * @property {string} confirmActionText - The text for the confirm button.
 * @property {function} onCloseModal - Function called to close modal.
 * @property {function} onClickConfirmAction - Function called when clicking the confirm button
 */

/**
 * Documentation
 * @param {ConfirmAction} ConfirmAction - {@link ConfirmAction} object
 */
function ConfirmAction({ heading, description, confirmActionText, onCloseModal, onClickConfirmAction, closeModalOnConfirm = true }) {
	return (
		<StyledConfirmAction>
			<StyledHeading>{heading}</StyledHeading>
			<StyledDescriptionP>{description}</StyledDescriptionP>
			<ButtonGroup>
				<Button
					size={"large"}
					kind={"danger"}
					onClick={(e) => {
						e.preventDefault();
						onClickConfirmAction();
						if (closeModalOnConfirm) onCloseModal();
					}}
				>
					{confirmActionText}
				</Button>
				<Button size={"large"} kind={"secondary"} onClick={onCloseModal}>
					Cancel
				</Button>
			</ButtonGroup>
		</StyledConfirmAction>
	);
}

export default ConfirmAction;
