/**
 * Function which swaps 2 objects from an immutable array. 
 * Used inside contexts.
 *
 * @param {object[]} arr - The initial array.
 * @param {number} index_1 - The first index.
 * @param {number} index_2 - The second index.
 * @returns {object[]} - A new array with swapped elements.
 */
export function swapByIndex(arr, index_1, index_2) {
    if (index_1 >= arr.length || index_2 >= arr.length || index_1 < 0 || index_2 < 0) {
        console.error('swapByIndex: attempted to access value outside of array');
        return arr;
    }

    const copyArr = arr.slice();

    const copyItem = arr[index_1];
    copyArr[index_1] = arr[index_2];
    copyArr[index_2] = copyItem;

    return copyArr;
}
