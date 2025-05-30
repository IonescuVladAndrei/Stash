import { useEffect, useState } from "react";
import { useTags } from "../../queries/useTags";
import Form from "../../ui/Form/Form";
import TagContainer from "./TagContainer";
import { TagsProvider, useTagsEdit } from "./TagContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import CheckboxPack from "../../ui/Checkbox/CheckboxPack";
import styled from "styled-components";
import Button from "../../ui/Buttons/Button";
import LastSave from "../../ui/LastSave";
import { useTagsLastSave } from "../../queries/useTagsLastSave";
import { useUpdateTags } from "../../mutations/useUpdateTags";
import { useKeyEdit } from "../../context/KeyContext";
import SpinnerMini from "../../ui/Spinners/SpinnerMini";
import Spinner from "../../ui/Spinners/Spinner";

const CheckboxPackContainer = styled.div`
	margin-bottom: 6rem;
`;

const NewTagBox = styled.div`
	margin-bottom: 2rem;
	margin-top: 2rem;
`;

const SaveButtonBox = styled.div`
	padding-top: 2rem;
	border-top: 1px solid var(--color-grey-500);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2rem;
`;

const InfoP = styled.p`
	font-size: 2rem;
	font-weight: 600;
	color: var(--color-grey-100);
	margin-bottom: 3.6rem;
`;

const TagsBox = styled.div`
	overflow-x: auto;
	padding-bottom: 1rem;

	& > div {
		min-width: 80rem;
	}
`;

function Tags() {
	const { key } = useKeyEdit();
	const { tags: initialTags, isLoading: isLoadingTags } = useTags(key);
	const { tagsLastSave, isLoading: isLoadingTagsLastSave } = useTagsLastSave();

	if (isLoadingTags) return <Spinner />;

	return (
		<TagsProvider>
			<TagsForm initialTags={initialTags} tagsLastSave={tagsLastSave} isLoadingTagsLastSave={isLoadingTagsLastSave} />
		</TagsProvider>
	);
}

function TagsForm({ initialTags, tagsLastSave, isLoadingTagsLastSave }) {
	const { updateTags, isPending: isPendingUpdateTags } = useUpdateTags();
	const { key } = useKeyEdit();
	const { tags, setInitialTags, addTag } = useTagsEdit();
	const [highlightedTagIds, setHighlightedTagIds] = useState([]);
	const [isEditMode, setIsEditMode] = useLocalStorage({ initialState: true, key: "IsDisabledTagsEditMode" });
	const [isKeepHighlight, setIsKeepHighlight] = useLocalStorage({ initialState: false, key: "IsDisabledTagsKeepHighlightMode" });

	useEffect(() => setInitialTags(initialTags), [setInitialTags, initialTags]);

	const checkboxOptions = [
		{ text: "Edit mode", subText: "Enable edit mode", onClick: () => setIsEditMode((iem) => !iem), isSelected: isEditMode },
		{ text: "Keep highlighting tags", onClick: () => setIsKeepHighlight((iem) => !iem), isSelected: isKeepHighlight },
	];

	function handleHoveredTag(targetId) {
		let result = [];

		if (targetId !== "") {
			function search(obj, path = []) {
				const currentPath = [...path, obj.id];

				if (obj.id === targetId) result = currentPath;

				if (obj.tags) {
					for (let tag of obj.tags) search(tag, currentPath);
				}
			}

			for (let tag of tags) search(tag);

			setHighlightedTagIds(result);
		} else {
			if (!isKeepHighlight) setHighlightedTagIds([]);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		updateTags({ tags, key });
	}

	return (
		<>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<CheckboxPackContainer>
					<CheckboxPack options={checkboxOptions} />
				</CheckboxPackContainer>

				{typeof tags === "undefined" ? (
					<InfoP>Encryption key cannot be empty.</InfoP>
				) : tags.length === 0 ? (
					<InfoP>Start by adding a new tag.</InfoP>
				) : (
					<TagsBox>
						<div>
							{tags.map((tag, index) => (
								<TagContainer
									key={index}
									tag={tag}
									parentId={0}
									onMouse={handleHoveredTag}
									highlightedTagIds={highlightedTagIds}
									isEditMode={isEditMode}
								/>
							))}
						</div>
					</TagsBox>
				)}

				<NewTagBox>
					<Button
						onClick={(e) => {
							e.preventDefault();
							addTag(0);
						}}
						size={"large"}
						kind={"primary"}
					>
						<span>Add new tag</span>
					</Button>
				</NewTagBox>
				<SaveButtonBox>
					<LastSave val={tagsLastSave} isLoading={isLoadingTagsLastSave} />
					{isEditMode && (
						<Button type="submit" size={"large"} kind={"primary"} disabled={isPendingUpdateTags}>
							{isPendingUpdateTags ? <SpinnerMini /> : <span>Save</span>}
						</Button>
					)}
				</SaveButtonBox>
			</Form>
		</>
	);
}

export default Tags;
