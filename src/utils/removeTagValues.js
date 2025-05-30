/**
 * Function which removes tags recursively. 
 *
 * @param {{label: string, parentId: number, value: number}[]} tagsArr - The tag array
 * @param {string[]} valuesToRem - The values that get removed from tagsArr.
 * @returns {{label: string, parentId: number, value: number}[]} - A new tag array.
 */
export function removeTagValues(tagsArr, valuesToRem) {
	if (!Array.isArray(tagsArr)) {
		console.error("tagsArr is not of type array!");
		return tagsArr;
	}
	if (!Array.isArray(valuesToRem)) {
		console.error("valuesToRem is not of type array!");
		return tagsArr;
	}

	let newTagArr = tagsArr;
	valuesToRem.forEach((value) => {
		newTagArr = remove(newTagArr, value);
	});

	return newTagArr;
}

function findAllChildren(arr, parentVal) {
	return arr.filter((tag) => tag.parentId === parentVal).map((tag) => tag.value);
}

function remove(arr, val) {
	let newTagArr = arr.filter((tag) => tag.value !== val);

	const allChildren = findAllChildren(arr, val);

	allChildren.forEach((tag) => {
		newTagArr = remove(newTagArr, tag);
	});

	return newTagArr;
}
