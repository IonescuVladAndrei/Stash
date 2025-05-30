/**
 * Function which formats a date object.
 *
 * @param {Date} dateObj - The date object.
 * @returns {string} Returns the date formatted as DD/MM/YEAR hh/mm
 */
export function formatDate(dateObj) {
	return `${dateObj.getDate()} ${new Intl.DateTimeFormat("en-US", { month: "short" }).format(
		dateObj
	)} ${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes() <= 9 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()}`;
}
