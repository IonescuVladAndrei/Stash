import { useState } from "react";
import styled, { css } from "styled-components";
import MSButton from "./MSButton";

const OutsideBox = styled.div`
	padding: 0.8rem 1.2rem;
	background-color: var(--color-secondary-1);
	border: 0.1rem solid var(--color-red-primary-800);
	border-radius: var(--border-radius-sm);
	display: flex;
	flex-direction: column;
	box-shadow: var(--shadow-sm);
`;

const SecondBox = styled.div`
	display: flex;
	gap: 1rem;
`;

const RelativeBox = styled.div`
	position: relative;
	width: 100%;
	height: 0;
`;

const OptionsBox = styled.div`
	display: flex;
	flex: 1 1 0%;
	flex-wrap: wrap;
	gap: 0.8rem;

	${(props) =>
		props.$withPointer &&
		css`
			cursor: pointer;
		`};
`;

const OptionSelected = styled.div`
	display: flex;
	align-items: center;
	border-left: 0.1rem solid;
	background-color: var(--color-red-primary-800);
	border-radius: var(--border-radius-sm);
	width: fit-content;
`;

const SelectedOptionTextBox = styled.div`
	color: var(--color-grey-0);
	padding: 0.15rem 0.8rem;
	border-left: 0.1rem solid transparent;
	border-top-left-radius: var(--border-radius-sm);
	border-bottom-left-radius: var(--border-radius-sm);
	border: transparent;
	display: flex;
	user-select: none;
`;

const UnselectedOptionsBox = styled.div`
	position: absolute;
	color: var(--color-grey-0);
	background-color: var(--color-secondary-1);
	z-index: 10;
	width: calc(100% + 2.7rem);
	height: minmax(fit-content, 10rem);
	left: -1.3rem;
	top: 1.2rem;
	padding-top: 0.8rem;
	padding-bottom: 0.8rem;
	border: 0.1rem solid var(--color-red-primary-800);
	border-radius: var(--border-radius-sm);
	max-height: 15rem;
	overflow-y: auto;
`;

const PlaceholderDiv = styled.div`
	background-color: transparent;
	color: var(--color-grey-300);
	padding: 0.15rem 0.8rem;
	user-select: none;
`;

const RemoveOptionButton = styled.button`
	background-color: var(--color-brand-500);
	width: 2.4rem;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 0.1rem solid transparent;
	border-top-right-radius: var(--border-radius-sm);
	border-bottom-right-radius: var(--border-radius-sm);
	border: transparent;

	&:hover {
		background-color: var(--color-red-800);
	}

	&:focus {
		outline: none;
		border: none;
	}

	&:active {
		outline: none;
		border: none;
	}
`;

const OperationsBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.4rem;
`;

const Span = styled.span`
	align-self: stretch;
	margin-top: 0.4rem;
	margin-bottom: 0.4rem;
	width: 0.1rem;
	background-color: var(--color-red-primary-800);
`;

const UnselectedOptionButton = styled.button`
	font-weight: 500;
	font-size: 1.4rem;
	width: 100%;
	text-align: left;
	padding: 0.8rem 1rem;

	color: var(--color-grey-0);
	background-color: var(--color-secondary-1);
	border: none;
	transition: color 0.1s, background-color 0.1s;

	&:focus {
		outline: none;
		border: none;
	}

	&:active {
		outline: none;
		border: none;
	}

	&:hover {
		background-color: var(--color-red-primary-800);
	}
`;

/**
 * @typedef {Object} MultiSelect
 * @property {{label: string, value: string}} options - Options to select from.
 * @property {{label: string, value: string}} selectedOptions - Selected options.
 * @property {function} setOption - Function called when pressing on an option.
 * @property {function} setOremoveAllOptionsption - Function called to remove all selected options.
 * @property {function} refClickOutside - Function called a click is detected outside the multiselect.
 */

/**
 * Documentation
 * @param {MultiSelect} MultiSelect - {@link MultiSelect} object
 */
function MultiSelect({ options, selectedOptions, setOption, removeAllOptions, refClickOutside, placeholder = "Select..." }) {
	const [showOptions, setShowOptions] = useState(false);

	function handleShowOptions() {
		setShowOptions((so) => !so);
	}

	return (
		<OutsideBox ref={refClickOutside(() => setShowOptions(false))}>
			<SecondBox>
				<OptionsBox
					onClick={() => (!selectedOptions || selectedOptions.length === 0) && setShowOptions(true)}
					$withPointer={!selectedOptions || selectedOptions.length === 0}
				>
					{(!selectedOptions || selectedOptions.length === 0) && <PlaceholderDiv>{placeholder}</PlaceholderDiv>}
					{Array.isArray(selectedOptions) &&
						selectedOptions.map((op, index) => (
							<OptionSelected key={index}>
								<SelectedOptionTextBox>{op.label}</SelectedOptionTextBox>
								<RemoveOptionButton
									onClick={(e) => {
										e.preventDefault();
										setOption({ value: op.value, parentId: op.parentId });
									}}
								>
									<svg
										width="14"
										height="14"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										focusable="false"
									>
										<path
											fill={`var(--color-grey-0)`}
											d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
										/>
									</svg>
								</RemoveOptionButton>
							</OptionSelected>
						))}
				</OptionsBox>
				<OperationsBox>
					<MSButton
						onClick={(e) => {
							e.preventDefault();
							setShowOptions(false);
							removeAllOptions(selectedOptions);
						}}
						isDelete={true}
					/>
					<Span />
					<MSButton
						showOptions={showOptions}
						onClick={(e) => {
							e.preventDefault();
							handleShowOptions();
						}}
					/>
				</OperationsBox>
			</SecondBox>
			<RelativeBox>
				{showOptions && (
					<UnselectedOptionsBox>
						{options.map((op, index) => {
							if (!Array.from(selectedOptions, (so) => so.value).includes(op.value))
								return (
									<UnselectedOptionButton
										key={index}
										onClick={(e) => {
											e.preventDefault();
											setOption({ value: op.value, parentId: op.parentId });
										}}
									>
										{op.label}
									</UnselectedOptionButton>
								);
						})}
						{options.length === selectedOptions.length && <PlaceholderDiv>No options left to select from</PlaceholderDiv>}
					</UnselectedOptionsBox>
				)}
			</RelativeBox>
		</OutsideBox>
	);
}

export default MultiSelect;
