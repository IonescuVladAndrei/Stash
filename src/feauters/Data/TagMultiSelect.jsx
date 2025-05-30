import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import MultiSelect from "../../ui/MultiSelect/MultiSelect";

const MultiSelectBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

function TagMultiSelect({ allGroupedTags, selectedTagIds, setSelectedTags, removeSelectedTagIds, placeholder }) {
	return (
		<MultiSelectBox>
			{allGroupedTags.map((tags, index) => {
				if (index === 0)
					return (
						<MultiSelect
							key={index}
							refClickOutside={useOutsideClick}
							options={tags}
							selectedOptions={tags.filter((tag) => selectedTagIds.includes(tag.value))}
							placeholder={placeholder}
							setOption={setSelectedTags}
							removeAllOptions={removeSelectedTagIds}
						/>
					);
				else {
					const childTags = [];
					for (const tag of tags) {
						if (selectedTagIds.includes(tag.parentId)) childTags.push(tag);
					}

					if (childTags.length !== 0)
						return (
							<MultiSelect
								key={index}
								refClickOutside={useOutsideClick}
								options={childTags}
								selectedOptions={tags.filter((tag) => selectedTagIds.includes(tag.value))}
								placeholder={placeholder}
								setOption={setSelectedTags}
								removeAllOptions={removeSelectedTagIds}
							/>
						);
				}
			})}
		</MultiSelectBox>
	);
}

export default TagMultiSelect;
