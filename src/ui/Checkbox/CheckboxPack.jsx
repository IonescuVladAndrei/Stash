import styled from "styled-components";
import Checkbox from "./Checkbox";

const TextP = styled.p`
	font-weight: 500;
	color: var(--color-grey-0);
	cursor: pointer;
	user-select: none;
`;

const SubTextP = styled.p`
	font-weight: 400;
	color: var(--color-grey-400);
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const OutsideBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const InsideBox = styled.div`
	display: grid;
	grid-template-columns: 2rem 1fr;
	column-gap: 0.4rem;
`;

const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	height: 2.1rem;
`;

/**
 * @typedef {Object} CheckboxPack
 * @property {{text: string, subText: string, onClick: function, isSelected: boolean}[]} options - Array with options
 * - text: Main text.
 * - subText: Secondary text with a lighter shade of grey.
 * - onClick: The function called when the checkbox is clicked.
 * - isSelected: The state of the checkbox.
 */

/**
 * Documentation
 * @param {CheckboxPack} checkboxPack - {@link checkboxPack} object
 */
function CheckboxPack({ options }) {
	return (
		<OutsideBox>
			{options.map((option, index) => (
				<InsideBox key={index}>
					<CheckboxContainer>
						<Checkbox
							onClick={(e) => {
								e.preventDefault();
								option.onClick();
							}}
							isSelected={option.isSelected}
						/>
					</CheckboxContainer>
					<TextBox>
						<TextP
							onClick={(e) => {
								e.preventDefault();
								option.onClick();
							}}
						>
							{option.text}
						</TextP>
						<SubTextP>{option.subText}</SubTextP>
					</TextBox>
				</InsideBox>
			))}
		</OutsideBox>
	);
}

export default CheckboxPack;
