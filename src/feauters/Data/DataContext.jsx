import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { URL_NAME_PARAM, URL_TAG_PARAM } from "../../queries/queryKeys";
import { getParentId } from "../../utils/dataFormat";
import { removeTagValues } from "../../utils/removeTagValues";

const DataContext = createContext();

function DataProvider({ children, tags }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [name, setName] = useState(searchParams.get(URL_NAME_PARAM) ?? "");
	const [selectedTags, setSelectedTags] = useState(
		typeof tags !== "undefined" && searchParams.get(URL_TAG_PARAM)
			? getParentId(
					tags,
					searchParams
						.get(URL_TAG_PARAM)
						.split(",")
						.map((t) => +t)
			  )
			: []
	);

	function handleNameParam(name) {
		if (name.length !== 0) {
			searchParams.set(URL_NAME_PARAM, name);
			setSearchParams(searchParams);
		} else {
			setName("");
			searchParams.delete(URL_NAME_PARAM);
			setSearchParams(searchParams);
		}
	}

	function handleTagParam({ tagId, parentId }) {
		if (!selectedTags.some((tag) => tag.value === tagId)) {
			const oldTagIds = searchParams.get(URL_TAG_PARAM)?.split(",") || [];
			oldTagIds.push(tagId.toString());
			searchParams.set(URL_TAG_PARAM, oldTagIds.join(","));
			setSearchParams(searchParams);
			setSelectedTags([...selectedTags, { value: tagId, parentId }]);
		} else {
			const updatedTags = removeTagValues(selectedTags, [tagId]);
			if (updatedTags.length !== 0) {
				searchParams.set(
					URL_TAG_PARAM,
					updatedTags.map((t) => t.value)
				);
			} else {
				searchParams.delete(URL_TAG_PARAM);
			}

			setSearchParams(searchParams);
			setSelectedTags(updatedTags);
		}
	}

	function handleMultipleTags(tags) {
		const tagIds = tags.map((t) => t.value);
		const updatedTags = removeTagValues(selectedTags, tagIds);
		if (updatedTags.length !== 0) {
			searchParams.set(
				URL_TAG_PARAM,
				updatedTags.map((t) => t.value)
			);
		} else {
			searchParams.delete(URL_TAG_PARAM);
		}

		setSearchParams(searchParams);
		setSelectedTags(updatedTags);
	}

	return (
		<DataContext.Provider value={{ name, setName, handleNameParam, selectedTags, handleTagParam, handleMultipleTags }}>
			{children}
		</DataContext.Provider>
	);
}

function useDataEdit() {
	const context = useContext(DataContext);

	if (context === undefined) throw new Error("DataContext was used outside of the DataProvider");

	return context;
}

export { DataProvider, useDataEdit };
