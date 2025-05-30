import styled from "styled-components";
import { useKeyEdit } from "../../context/KeyContext";
import useInvalidateQuery from "../../hooks/useInvalidateQuery";
import { DATA_QUERY_KEY, TAGS_QUERY_KEY } from "../../queries/queryKeys";
import Button from "../../ui/Buttons/Button";
import Form from "../../ui/Form/Form";
import FormRow from "../../ui/Form/FormRow";
import Input from "../../ui/Input";

const ReloadButtonBox = styled.div`
	margin-top: 5rem;
	padding-top: 2rem;
	border-top: 1px solid var(--color-grey-500);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2rem;
`;

function Auth() {
	const { key, setKey } = useKeyEdit();
	const { handleClick } = useInvalidateQuery();

	return (
		<Form>
			<FormRow htmlFor={"key"} label={"Key"}>
				<Input id={"key"} value={key} onChange={(e) => setKey(e.target.value)} type="password" />
			</FormRow>
			<ReloadButtonBox>
				<Button
					kind={"primary"}
					size={"large"}
					onClick={(e) => {
						e.preventDefault();
						handleClick([TAGS_QUERY_KEY]);
						handleClick([DATA_QUERY_KEY]);
					}}
				>
					Reload data
				</Button>
			</ReloadButtonBox>
		</Form>
	);
}

export default Auth;
