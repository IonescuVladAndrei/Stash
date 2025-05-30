import { useNewEditData } from "../../mutations/useNewEditData";
import Modal from "../../ui/Modal";
import { OptionButton } from "./DataItem";
import NewData from "./NewData";
import { useNewDataEdit } from "./NewDataContext";

const OPENS_EDIT = "edit-data";

function EditDataModal({ data, tags, onClick }) {
	const { addUpdateData, isPending: isPendingEdit } = useNewEditData();
	const { reset } = useNewDataEdit();

	const selectedTags = data.tags;

	return (
		<Modal>
			<Modal.Open opens={OPENS_EDIT}>
				<OptionButton
					onClick={() => {
						reset();
						onClick();
					}}
					disabled={isPendingEdit}
				>
					<span>{isPendingEdit ? "Editing" : "Edit"}</span>
				</OptionButton>
			</Modal.Open>
			<Modal.Window name={OPENS_EDIT}>
				<NewData tags={tags} addUpdateData={addUpdateData} isAnEdit={true} initialData={{ ...data, selectedTags }} />
			</Modal.Window>
		</Modal>
	);
}

export default EditDataModal;
