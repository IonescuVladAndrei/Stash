import styled from "styled-components";
import { useKeyEdit } from "../../context/KeyContext";
import Button from "../../ui/Buttons/Button";
import ButtonGroup from "../../ui/Buttons/ButtonGroup";
import ButtonSvg from "../../ui/Buttons/ButtonSvg";
import Form from "../../ui/Form/Form";
import FormRow from "../../ui/Form/FormRow";
import Input from "../../ui/Input";
import { getParentId, groupByDepthWithParentId } from "../../utils/dataFormat";
import { useNewDataEdit } from "./NewDataContext";
import TagMultiSelect from "./TagMultiSelect";
import { useEffect } from "react";

const OutsideBox = styled.div`
	width: 90dvw;
	max-width: 120rem;
	overflow-y: auto;
`;

const ButtonsBox = styled.div`
	display: flex;
	align-items: center;
	gap: 0.4rem;
	margin-left: 0.4rem;
	padding-left: 1rem;
`;

const TagMultiSelectBox = styled.div`
	height: 20dvh;
	max-height: 40rem;

	overflow-y: auto;
	padding-right: 1rem;

	padding-top: 2rem;
	padding-bottom: 2rem;
`;

const OtherBox = styled.div`
	height: 30dvh;
	max-height: 60rem;

	overflow-y: auto;
	padding-right: 1rem;
`;

const FormBox = styled.div`
	display: grid;
	grid-template-columns: 1fr min-content;

	@media (max-width: 800px) {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		& > *:nth-child(2) {
			align-self: flex-end;
		}
	}
`;

const StyledButtonGroup = styled(ButtonGroup)`
	margin-top: 3rem;
`;

function NewData({ tags, onCloseModal, addUpdateData, isAnEdit = false, initialData = {} }) {
	const { id: id_, name: name_, other: other_, tags: tags_ } = initialData;
	const { key } = useKeyEdit();

	const {
		id,
		name,
		other,
		selectedTags,
		setSelectedTags,
		removeSelectedTagIds,
		setName,
		setOther,
		addOther,
		moveDownOther,
		moveUpOther,
		removeOther,
		setInitialState,
	} = useNewDataEdit();

	useEffect(() => {
		setInitialState({ isAnEdit, name: name_, other: other_, selectedTags: isAnEdit ? getParentId(tags, tags_) : [], id: id_ });
	}, [tags, name_, other_, tags_, id_, isAnEdit, setInitialState]);

	const allGroupedTags = groupByDepthWithParentId(tags);

	const selectedTagIds = selectedTags.map((tag) => tag.value);

	function handleSubmit(e) {
		e.preventDefault();
		addUpdateData({ key, newData: { id, name, other, tags: selectedTagIds }, isAnEdit });
		onCloseModal();
	}

	return (
		<OutsideBox>
			<Form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
				<FormRow label={"Name"} htmlFor={"name"}>
					<Input id={"name"} required value={name} onChange={(e) => setName(e.target.value)} />
				</FormRow>

				<FormRow label={"Tags (optional)"}>
					<TagMultiSelectBox>
						<TagMultiSelect
							allGroupedTags={allGroupedTags}
							selectedTagIds={selectedTagIds}
							setSelectedTags={setSelectedTags}
							removeSelectedTagIds={removeSelectedTagIds}
							placeholder={""}
						/>
					</TagMultiSelectBox>
				</FormRow>

				<OtherBox>
					{other.map((otherVal, index) => (
						<FormRow
							key={index}
							label={`Additional value ${index + 1}`}
							htmlFor={`other-${index}-${otherVal}`}
							noBorderChild={index !== 0}
						>
							<FormBox>
								<Input
									id={`other-${index}-${otherVal}`}
									required
									value={otherVal}
									onChange={(e) => setOther({ newOther: e.target.value, index })}
								/>
								<ButtonsBox>
									<ButtonSvg
										type={"add"}
										onClick={(e) => {
											e.preventDefault();
											addOther(index);
										}}
									/>
									<ButtonSvg
										type={"up"}
										disabled={index === 0}
										onClick={(e) => {
											e.preventDefault();
											moveUpOther(index);
										}}
									/>
									<ButtonSvg
										type={"down"}
										disabled={index === other.length - 1}
										onClick={(e) => {
											e.preventDefault();
											moveDownOther(index);
										}}
									/>
									<ButtonSvg
										disabled={index === 0}
										type={"trash"}
										onClick={(e) => {
											e.preventDefault();
											removeOther(index);
										}}
									/>
								</ButtonsBox>
							</FormBox>
						</FormRow>
					))}
				</OtherBox>

				<StyledButtonGroup>
					<Button size={"large"} kind={"danger"} type="submit">
						<span>Submit</span>
					</Button>
					<Button
						size={"large"}
						kind={"secondary"}
						onClick={(e) => {
							e.preventDefault();
							onCloseModal();
						}}
					>
						Cancel
					</Button>
				</StyledButtonGroup>
			</Form>
		</OutsideBox>
	);
}

export default NewData;
