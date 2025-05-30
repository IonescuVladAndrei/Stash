import axios from "axios";
import { throwErr } from "../utils/throwErr";

const BASE_URL = "http://localhost:6969";

/*******
 * TAGS
 ******/

/**
 * Sends a POST request to update the encrypted tags on the server.
 *
 * @async
 * @function setTagsApi
 * @param {Object} params - The request parameters.
 * @param {Object[]} params.tags - An array of encrypted tag objects to be stored.
 * @param {string} params.key - The encryption key (or password) used to secure the tags.
 * @throws Will throw an error if the request fails.
 */
export async function setTagsApi({ tags, key }) {
	let response;

	try {
		response = await axios.post(`${BASE_URL}/tags`, { tags, key });
		response = response.data;
	} catch (err) {
		throwErr(err, "Could not update tags");
	}

	return response;
}

/**
 * Function that fetches decrypted tags based on key. 
 *
 * @param {string} key - The key aka password.
 * @returns {Promise<{ tags: object[], id: number, value: string }>} - API response which contains tags.
 */

/**
 * Sends a GET request to update the encrypted tags on the server.
 *
 * @async
 * @function getTagsApi
 * @param {Object} params - The request parameters.
 * @param {Object[]} params.tags - An array of encrypted tag objects to be stored.
 * @param {string} params.key - The encryption key (or password) used to secure the tags.
 * @returns {Promise<{tags:{}[], value: string, id: number}[]>} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export async function getTagsApi(key) {
	let response;

	try {
		response = await axios.get(`${BASE_URL}/tags`, { params: { key } });
		response = response.data;
	} catch (err) {
		throwErr(err, "Error getting tags");
	}

	return response;
}

/**
 * Sends a GET request that gets date of the last edit made to tags.
 * 
 * @async
 * @function getTagsLastSaveApi
 * @returns {Promise<Date>} The date of the last edit made to tags.
 * @throws Will throw an error if the request fails.
 */
export async function getTagsLastSaveApi() {
	let response;

	try {
		response = await axios.get(`${BASE_URL}/tags-last-save`);
		response = response.data.value;
	} catch (err) {
		throwErr(err, "Error getting tags last save date");
	}

	return response;
}

/*******
 * DATA
 ******/

/**
 * 
 * @async
 * @param {Object} params - The request parameters.
 * @param {string} params.key - The encryption key (or password) used to secure the tags.
 * @param {string} params.queryName - The data name.
 * @param {string} params.page - The page.
 * @param {string} params.tags - The tag IDs.
 * @returns {Promise<{tags: number[], id: number, other: string[], tags: number[]}[]>} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export async function getDataApi({ key, tags, name, page }) {
	let response;

	try {
		response = await axios.get(`${BASE_URL}/data`, { params: { key, tags, name, page } });
		response = response.data;
	} catch (err) {
		throwErr(err, "Error getting data");
	}

	return response;
}

/**
 * Sends a POST request to create or update data.
 * @async
 * @param {Object} params - The request parameters.
 * @param {string} params.key - The encryption key (or password) used to secure the tags.
 * @param {boolean} params.isAnEdit - If the new data is an edit.
 * @param {Object} params.newData - The new data object
 * @throws Will throw an error if the request fails.
 */
export async function setDataApi({ key, newData, isAnEdit }) {
	let response;

	try {
		response = await axios.post(`${BASE_URL}/data`, { key, newData, isAnEdit });
		response = response.data;
	} catch (err) {
		throwErr(err, "Could not update data");
	}

	return response;
}

/**
 * Sends a DELETE request that deletes data based on id.
 * 
 * @async
 * @param {Object} params - The request parameters.
 * @param {string} params.id - The id of the data object to be deleted.
 * @throws Will throw an error if the request fails.
 */
export async function deleteDataApi({ id }) {
	let response;

	try {
		response = await axios.delete(`${BASE_URL}/data/${id}`);
		response = response.data;
	} catch (err) {
		throwErr(err, "Could not delete data");
	}

	return response;
}

/**
 * Sends a GET request that gets date of the last edit made to data.
 * 
 * @async
 * @function getDataLastSaveApi
 * @returns {Promise<Date>} The date of the last edit made to data.
 * @throws Will throw an error if the request fails.
 */
export async function getDataLastSaveApi() {
	let response;

	try {
		response = await axios.get(`${BASE_URL}/data-last-save`);
		response = response.data.value;
	} catch (err) {
		console.error(err);
		throw new Error("Error getting data last save date");
	}

	return response;
}

/************
 * ENCR DECR
 ***********/

/**
 * Sends a POST request that decrypts and then encrypts both data and tags.
 * 
 * @async
 * @function setKeyApi
 * @param {string} params.oldKey - The current encryption key.
 * @param {string} params.newKey - The new encryption key.
 * @throws Will throw an error if the request fails.
 */
export async function setKeyApi({ oldKey, newKey }) {
	let response;

	try {
		response = await axios.post(`${BASE_URL}/decrypt-encrypt`, { oldKey, newKey });
		response = response.data;
	} catch (err) {
		throwErr(err, "Could not update key");
	}

	return response;
}
