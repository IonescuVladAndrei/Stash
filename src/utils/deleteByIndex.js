/**
 * Function which deletes an object from an immutable array. 
 * Used inside contexts.
 *
 * @param {object[]} arr - The initial array.
 * @param {number} index - The obj's index that needs to be removed.
 * @returns {object[]} - A new array.
 */
export function deleteByIndex(arr, index) {
	if (index >= arr.length || index < 0) {
		console.error("deleteByIndex: attempted to access value outside of array");
		return arr;
	}
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
