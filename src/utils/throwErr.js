/**
 * Function which throws an error.
 *
 * @param {object} err - The error object which should be a nested object.
 * @param {string} genericMessage - Generic error message in case err.response.data.error is undefined.
 */
export function throwErr(err, genericMessage) {
	console.log(err);

	if (!err.response?.data?.errors || !Array.isArray(err.response.data.errors) || err.response.data.errors.length === 0) {
		console.error(genericMessage);
		throw new Error(err);
	} else throw new Error(err.response.data.errors.map((error) => error.message).join(". "));
}
