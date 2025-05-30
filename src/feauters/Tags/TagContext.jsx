import { createContext, useReducer, useContext, useCallback } from "react";
import { TagActionType as TAP } from "./tagEnum";
import { swapByIndex } from "../../utils/swapByIndex";

const ID_NEW_PARENT_TAG = 0;
const ID_NO_PARENT = 0;

const initialState = {
	tags: [],
};

const TagsContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case TAP.INIT: {
			return { ...state, tags: action.payload };
		}
		case TAP.TAG_UPDATED: {
			const { tag: newTagVal, id } = action.payload;

			const updateTag = (tags) => {
				return tags.map((tag) => {
					if (tag.id === id) return { ...tag, value: newTagVal };
					else if (tag.tags.length > 0) return { ...tag, tags: updateTag(tag.tags) };
					return tag;
				});
			};

			return { ...state, tags: updateTag(state.tags) };
		}
		case TAP.TAG_ADD: {
			const id = action.payload;

			const newInitialTag = {
				id: Date.now(),
				value: "",
				tags: [],
			};

			if (id === ID_NEW_PARENT_TAG) return { ...state, tags: [...state.tags, newInitialTag] };

			const addTag = (tags) => {
				return tags.map((tag) => {
					if (tag.id === id) return { ...tag, tags: [...tag.tags, newInitialTag] };
					else if (tag.tags.length > 0) return { ...tag, tags: addTag(tag.tags) };
					return tag;
				});
			};

			return { ...state, tags: addTag(state.tags) };
		}
		case TAP.TAG_MOVE_UP: {
			const { parentId, id } = action.payload;

			if (parentId === ID_NO_PARENT) {
				const tagIndex = state.tags.findIndex((t) => t.id === id);
				if (tagIndex > 0) return { ...state, tags: swapByIndex(state.tags, tagIndex, tagIndex - 1) };
				return { ...state };
			}

			const moveUpTag = (tags) => {
				return tags.map((tag) => {
					if (tag.id === parentId) {
						const tagIndex = tag.tags.findIndex((t) => t.id === id);
						if (tagIndex > 0) return { ...tag, tags: swapByIndex(tag.tags, tagIndex, tagIndex - 1) };
						else return tag;
					} else if (tag.tags.length > 0) return { ...tag, tags: moveUpTag(tag.tags) };
					return tag;
				});
			};

			return { ...state, tags: moveUpTag(state.tags) };
		}
		case TAP.TAG_MOVE_DOWN: {
			const { parentId, id } = action.payload;

			if (parentId === ID_NO_PARENT) {
				const tagIndex = state.tags.findIndex((t) => t.id === id);
				if (tagIndex < state.tags.length - 1) return { ...state, tags: swapByIndex(state.tags, tagIndex, tagIndex + 1) };
				return { ...state };
			}

			const moveDownTag = (tags) => {
				return tags.map((tag) => {
					if (tag.id === parentId) {
						const tagIndex = tag.tags.findIndex((t) => t.id === id);
						if (tagIndex < tag.tags.length - 1) return { ...tag, tags: swapByIndex(tag.tags, tagIndex, tagIndex + 1) };
						else return tag;
					} else if (tag.tags.length > 0) return { ...tag, tags: moveDownTag(tag.tags) };
					return tag;
				});
			};

			return { ...state, tags: moveDownTag(state.tags) };
		}
		case TAP.TAG_REMOVE: {
			const id = action.payload;

			const deleteTag = (tags) => {
				return tags
					.filter((tag) => tag.id !== id)
					.map((tag) => ({
						...tag,
						tags: deleteTag(tag.tags),
					}));
			};

			return { ...state, tags: deleteTag(state.tags) };
		}
		default:
			throw new Error("Unkown action type!");
	}
}

function TagsProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { tags } = state;

	const setInitialTags = useCallback(function setInitialTags(tags) {
		dispatch({ type: TAP.INIT, payload: tags });
	}, []);

	function editTag({ tag, id }) {
		dispatch({ type: TAP.TAG_UPDATED, payload: { tag, id } });
	}

	function addTag(id) {
		dispatch({ type: TAP.TAG_ADD, payload: id });
	}

	function moveUpTag({ parentId, id }) {
		dispatch({ type: TAP.TAG_MOVE_UP, payload: { parentId, id } });
	}

	function moveDownTag({ parentId, id }) {
		dispatch({ type: TAP.TAG_MOVE_DOWN, payload: { parentId, id } });
	}

	function deleteTag(id) {
		dispatch({ type: TAP.TAG_REMOVE, payload: id });
	}

	return (
		<TagsContext.Provider
			value={{
				tags,
				setInitialTags,
				editTag,
				addTag,
				moveUpTag,
				moveDownTag,
				deleteTag,
			}}
		>
			{children}
		</TagsContext.Provider>
	);
}

function useTagsEdit() {
	const context = useContext(TagsContext);
	if (context === undefined) throw new Error("TagsContext was used outside of the TagsProvider");

	return context;
}

export { TagsProvider, useTagsEdit };
