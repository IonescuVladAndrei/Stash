import { useState } from "react";
import styled from "styled-components";
import { useEncrKey } from "../../mutations/useEncrKeyUpdate";
import Button from "../../ui/Buttons/Button";
import ButtonSvg from "../../ui/Buttons/ButtonSvg";
import Form from "../../ui/Form/Form";
import FormRow from "../../ui/Form/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/Spinners/SpinnerMini";

const InputBox = styled.div`
	display: grid;
	grid-template-columns: 1fr min-content;
	column-gap: 1rem;
`;

const SubmitButtonBox = styled.div`
	margin-top: 5rem;
	padding-top: 2rem;
	border-top: 1px solid var(--color-grey-500);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2rem;
`;

function DecryptEncryptForm() {
	const [oldKey, setOldKey] = useState("");
	const [showOldKey, setShowOldKey] = useState(false);
	const [newKey, setNewKey] = useState("");
	const [showNewKey, setShowNewKey] = useState(false);

	const { updateKey, isPending } = useEncrKey();

	function handleSubmit(e) {
		e.preventDefault();
		updateKey({ oldKey, newKey });
		setNewKey("");
		setOldKey("");
	}

	return (
		<Form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
			<FormRow label={"Old key"} htmlFor={"oldKey"}>
				<InputBox>
					<Input
						value={oldKey}
						onChange={(e) => setOldKey(e.target.value)}
						required={true}
						id={"oldKey"}
						type={showOldKey ? "text" : "password"}
					/>
					<ButtonSvg
						type={showOldKey ? "visible" : "n-visible"}
						onClick={(e) => {
							e.preventDefault();
							setShowOldKey((show) => !show);
						}}
					/>
				</InputBox>
			</FormRow>
			<FormRow label={"New key"} noBorderChild={true} htmlFor={"newKey"}>
				<InputBox>
					<Input
						value={newKey}
						onChange={(e) => setNewKey(e.target.value)}
						required
						id={"newKey"}
						type={showNewKey ? "text" : "password"}
					/>
					<ButtonSvg
						type={showNewKey ? "visible" : "n-visible"}
						onClick={(e) => {
							e.preventDefault();
							setShowNewKey((show) => !show);
						}}
					/>
				</InputBox>
			</FormRow>
			<SubmitButtonBox>
				<Button size="large" kind="primary" type="submit">
					{isPending ? <SpinnerMini /> : <span>Submit</span>}
				</Button>
			</SubmitButtonBox>
		</Form>
	);
}

export default DecryptEncryptForm;
