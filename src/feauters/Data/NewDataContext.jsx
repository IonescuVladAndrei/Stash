import { createContext, useCallback, useContext, useReducer } from "react";
import { NewDataActionType as NDAT } from "./newDataEnum";
import { deleteByIndex } from "../../utils/deleteByIndex";
import { removeTagValues } from "../../utils/removeTagValues";
import { swapByIndex } from "../../utils/swapByIndex";

const NewDataContext = createContext();

const initialState = {
	id: "",
	name: "",
	other: [""],
	selectedTags: [],
};

function reducer(state, action) {
	switch (action.type) {
		case NDAT.NAME_UPDATED: {
			return { ...state, name: action.payload };
		}
		case NDAT.OTHER_UPDATED: {
			const { newOther, index } = action.payload;
			if (index >= state.other.length || index < 0) {
				console.error("NewDataProvider reducer OTHER_UPDATED: attempted to access value outside of other array!");
				return { ...state };
			}
			return {
				...state,
				other: state.other.map((otherVal, otherIndex) => {
					if (otherIndex !== index) return otherVal;
					return newOther;
				}),
			};
		}
		case NDAT.OTHER_ADD: {
			const index = action.payload;
			if (index >= state.other.length || index < 0) {
				console.error("NewDataProvider reducer OTHER_ADD: attempted to access value outside of other array!");
				return { ...state };
			}

			return { ...state, other: [...state.other.slice(0, index + 1), "", ...state.other.slice(index + 1)] };
		}
		case NDAT.OTHER_MOVE_UP: {
			const index = action.payload;
			if (state.other.length === 1) return { ...state };

			return { ...state, other: swapByIndex(state.other, index, index - 1) };
		}
		case NDAT.OTHER_MOVE_DOWN: {
			const index = action.payload;
			if (state.other.length === 1) return { ...state };

			return { ...state, other: swapByIndex(state.other, index, index + 1) };
		}
		case NDAT.OTHER_REMOVE: {
			const index = action.payload;
			if (state.other.length === 1) return { ...state };

			if (index >= state.other.length || index < 0) {
				console.error("NewDataProvider reducer OTHER_REMOVE: attempted to access value outside of other array!");
				return { ...state };
			}

			return { ...state, other: deleteByIndex(state.other, index) };
		}
		case NDAT.SELECTED_TAG_UPDATED: {
			if (state.selectedTags.some((tag) => tag.value === action.payload.value))
				return {
					...state,
					selectedTags: removeTagValues(state.selectedTags, [action.payload.value]),
				};

			return { ...state, selectedTags: [...state.selectedTags, action.payload] };
		}
		case NDAT.REMOVE_TAGS: {
			const tagIdsToBeRem = action.payload.map((tag) => tag.value);

			return {
				...state,
				selectedTags: removeTagValues(state.selectedTags, tagIdsToBeRem),
			};
		}
		case NDAT.RESET: {
			return { ...initialState };
		}
		case NDAT.INIT: {
			const { id, name, other, selectedTags } = action.payload;
			return { ...state, id, name, other, selectedTags };
		}
		default:
			throw new Error();
	}
}

function NewDataProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { id, name, other, selectedTags } = state;

	function setName(name) {
		dispatch({ type: NDAT.NAME_UPDATED, payload: name });
	}

	function setOther({ newOther, index }) {
		dispatch({ type: NDAT.OTHER_UPDATED, payload: { newOther, index } });
	}

	function removeOther(index) {
		dispatch({ type: NDAT.OTHER_REMOVE, payload: index });
	}

	function moveUpOther(index) {
		dispatch({ type: NDAT.OTHER_MOVE_UP, payload: index });
	}

	function moveDownOther(index) {
		dispatch({ type: NDAT.OTHER_MOVE_DOWN, payload: index });
	}

	function addOther(index) {
		dispatch({ type: NDAT.OTHER_ADD, payload: index });
	}

	function setSelectedTags(tag) {
		dispatch({ type: NDAT.SELECTED_TAG_UPDATED, payload: tag });
	}

	function removeSelectedTagIds(tags) {
		dispatch({ type: NDAT.REMOVE_TAGS, payload: tags });
	}

	const setInitialState = useCallback(function setInitialTags({ id, name, other, selectedTags, isAnEdit }) {
		if (isAnEdit) {
			dispatch({ type: NDAT.INIT, payload: { id, name, other, selectedTags } });
		}
	}, []);

	function reset() {
		dispatch({ type: NDAT.RESET });
	}

	return (
		<NewDataContext.Provider
			value={{
				id,
				name,
				other,
				selectedTags,
				setName,
				setOther,
				addOther,
				moveDownOther,
				moveUpOther,
				removeOther,
				setSelectedTags,
				removeSelectedTagIds,
				setInitialState,
				reset,
			}}
		>
			{children}
		</NewDataContext.Provider>
	);
}

function useNewDataEdit() {
	const context = useContext(NewDataContext);

	if (context === undefined) throw new Error("NewDataContext was used outside of the NewDataProvider");

	return context;
}

export { NewDataProvider, useNewDataEdit };
