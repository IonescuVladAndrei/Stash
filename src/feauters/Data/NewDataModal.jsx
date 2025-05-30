import styled from "styled-components";
import Button from "../../ui/Buttons/Button";
import ButtonGroup from "../../ui/Buttons/ButtonGroup";
import Modal from "../../ui/Modal";
import NewData from "./NewData";
import { useNewDataEdit } from "./NewDataContext";
import LastSave from "../../ui/LastSave";
import { useNewEditData } from "../../mutations/useNewEditData";
import SpinnerMini from "../../ui/Spinners/SpinnerMini";

const OPENS_NEW = "new-data";

const StyledButtonGroup = styled(ButtonGroup)`
	margin-bottom: 4rem;
	align-items: center;
`;

const LastSaveBox = styled.div`
	display: flex;
	align-items: center;
`;

function NewDataModal({ tags, dataLastSave, isLoadingDataLastSave }) {
	const { addUpdateData, isPending } = useNewEditData();
	const { reset } = useNewDataEdit();

	return (
		<StyledButtonGroup>
			<LastSaveBox>
				<LastSave val={dataLastSave} isLoading={isLoadingDataLastSave} />
			</LastSaveBox>

			<Modal>
				<Modal.Open opens={OPENS_NEW}>
					<Button size="large" kind="danger" onClick={() => reset()} disabled={isPending}>
						{isPending ? <SpinnerMini /> : "New entry"}
					</Button>
				</Modal.Open>
				<Modal.Window name={OPENS_NEW}>
					<NewData tags={tags} addUpdateData={addUpdateData} />
				</Modal.Window>
			</Modal>
		</StyledButtonGroup>
	);
}

export default NewDataModal;
