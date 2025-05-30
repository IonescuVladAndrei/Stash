import jsonServer from "json-server";
import express from "express";
import CryptoJS from "crypto-js";

/************
 * ENCR/DECR
 ***********/

/**
 * Encrypts a given value using AES encryption with a password-derived key.
 *
 * @param {Object} params - The encryption parameters.
 * @param {string} params.val - The plaintext string to encrypt.
 * @param {string} params.password - The password used to derive the encryption key.
 * @returns {Object} An object containing:
 *   @property {string} ciphertext - The Base64-encoded encrypted string.
 *   @property {string} iv - The Base64-encoded initialization vector used in encryption.
 *   @property {string} salt - The Base64-encoded salt used for key derivation.
 */
function encrypt({ val, password }) {
	const salt = CryptoJS.lib.WordArray.random(128 / 8);
	const key = CryptoJS.PBKDF2(password, salt, {
		keySize: 256 / 32,
		iterations: 10000,
	});

	const iv = CryptoJS.lib.WordArray.random(128 / 8);

	const encrypted = CryptoJS.AES.encrypt(val, key, { iv });

	return {
		ciphertext: encrypted.toString(),
		iv: iv.toString(CryptoJS.enc.Base64),
		salt: salt.toString(CryptoJS.enc.Base64),
	};
}

/**
 * Decrypts datat using AES and a key derived from the provided password and salt.
 *
 * @param {Object} params - The decryption parameters.
 * @param {string} params.ciphertext - The encrypted string to decrypt.
 * @param {string} params.iv - The Base64-encoded initialization vector used during encryption.
 * @param {string} params.salt - The Base64-encoded salt used for key derivation.
 * @param {string} params.password - The password used to derive the encryption key.
 * @returns {string} The decrypted string, or the original ciphertext if decryption fails.
 */
function decrypt({ ciphertext, iv, salt, password }) {
	let decryptedVal = "";

	const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Base64.parse(salt), {
		keySize: 256 / 32,
		iterations: 10000,
	});

	try {
		const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
			iv: CryptoJS.enc.Base64.parse(iv),
		});
		decryptedVal = decrypted.toString(CryptoJS.enc.Utf8);
	} catch {
		// thrown when the key is incorrect
	}

	if (decryptedVal === "") decryptedVal = ciphertext;

	return decryptedVal;
}

/*********
 * HELPER
 ********/

function getOldTagIds(tags, ids = []) {
	for (const tag of tags) {
		ids.push(tag.id);
		if (tag.tags.length > 0) getOldTagIds(tag.tags, ids);
	}

	return ids;
}

/*********
 * JSON S
 ********/

const server = jsonServer.create();
const router = jsonServer.router("backend/data.json");
const middlewares = jsonServer.defaults();

server.use(express.json());

const TAGS = "tags";
const TAGS_LAST_SAVE = "tagsDate";
const DATA = "data";
const DATA_LAST_SAVE = "dataDate";
const PAGE_LIM = 5;

server.use(middlewares);

/*******
 * TAGS
 ******/

/**
 * Handles the request that decrypts and returns all stored tags using the password provided in the request.
 *
 * @route GET /tags
 * @param {Object} req - The request object.
 * @param {string} req.body.key - The secret key.
 * @param {Object} res - The response object.
 *
 * @returns {200 | 400} - Returns 200 and the decrypted data or 
 * 						  400 if the connection to the json fails or the key is undefined.
 *                        
 */
server.get("/tags", async (req, res) => {
	const key = req.query.key;
	const data = await router.db.get(TAGS).value();

	if (key === undefined) res.status(400).json({ errors: [{ message: "Encryption key is undefined!" }] });
	else if (data === undefined) res.status(400).json({ errors: [{ message: "Something went wrong" }] });
	else {
		const decrTags = (tags) => {
			return tags.map((tag) => {
				const encryptedTag = {
					tags: tag.tags,
					value: decrypt({ ciphertext: tag.value, iv: tag.iv, password: key, salt: tag.salt }),
					id: tag.id,
				};

				if (tag.tags.length > 0) encryptedTag.tags = decrTags(tag.tags);
				return encryptedTag;
			});
		};
		res.json(decrTags(data));
	}
});

/**
 * Handles the request that post tags.
 *
 * @route POST /data/:id
 * @param {Object} req - The request object.
 * @param {string[]} req.body.tags - The array of tags
 * @param {string} req.body.key - The secret key.
 * @param {Object} res - The response object.
 *
 * @returns {200 | 400} - Returns 200 and id or 
 * 						  400 if the connection to the json server DB fails or if no data has been deleted.
 *                        
 */
server.post("/tags", async (req, res) => {
	const { tags: newTags, key } = req.body;

	if (key === undefined || key.length === 0) res.status(400).json({ errors: [{ message: "Encryption key is empty!" }] });
	else if (!Array.isArray(newTags)) {
		res.status(400).json({ errors: [{ message: "Error: query param newTags is not an array!" }] });
	} else {
		const db = router.db;

		// getting old tag ids
		const oldTags = await router.db.get(TAGS).value();
		const oldTagIds = getOldTagIds(oldTags);
		const keptTagIds = [];

		// encrypting
		const encrTags = (tags) => {
			return tags.map((tag) => {
				const { ciphertext: value, iv, salt } = encrypt({ val: tag.value, password: key });
				const encryptedTag = { ...tag, id: Number(tag.id), value, iv, salt };

				if (oldTagIds.includes(Number(tag.id))) keptTagIds.push(Number(tag.id));

				if (tag.tags.length > 0) encryptedTag.tags = encrTags(tag.tags);
				return encryptedTag;
			});
		};

		// saving new tags
		await db.set(TAGS, encrTags(newTags)).write();
		await db.set(TAGS_LAST_SAVE, { value: Date.now().toString() }).write();

		// removing deleted tags from data
		const data = await router.db.get(DATA).value();
		const newData = data.map((obj) => {
			return { ...obj, tags: obj.tags.filter((tagId) => keptTagIds.includes(tagId)) };
		});

		// saving data
		await db.set(DATA, newData).write();

		res.status(200).json({});
	}
});

/**
 * Handles the request that returns the date of the last edit made to tags.
 *
 * @route GET /tags-last-save
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @returns {200 | 400} - Returns 200 and date or 
 * 						  400 if the connection to the json server DB fails.
 *                        
 */
server.get("/tags-last-save", async (req, res) => {
	const data = await router.db.get(TAGS_LAST_SAVE).value();

	if (data === undefined) res.status(400).json({ errors: [{ message: "Something went wrong" }] });
	else res.json(data);
});

/*******
 * DATA
 ******/

/**
 * Handles the request that decrypts and returns some of the stored data using the password and other params provided in the request.
 *
 * @route GET /tags
 * @param {Object} req - The request object.
 * @param {number[]} req.body.queryTags - The tag IDs.
 * @param {string} req.body.key - The secret key.
 * @param {string} req.body.queryName - The data name.
 * @param {string} req.body.page - The page.
 * @param {Object} res - The response object.
 *
 * @returns {200 | 400} - Returns 200 and the decrypted data or 
 * 						  400 if the connection to the json fails or the params are not correctly formatted.
 *                        
 */
server.get("/data", async (req, res) => {
	const queryTags = req.query.tags ?? [];
	const key = req.query.key;
	const queryName = req.query.name;
	let page = req.query.page;

	if (!Array.isArray(queryTags)) {
		res.status(400).json({ errors: [{ message: "Error: query param tags is not an array!" }] });
	} else if (key === undefined) {
		res.status(400).json({ errors: [{ message: "Encryption key is undefined!" }] });
	} else if (queryName === undefined) {
		res.status(400).json({ errors: [{ message: "Error: query param name is undefined!" }] });
	} else if (isNaN(Number(page)) || Number(page) < 1) {
		res.status(400).json({ errors: [{ message: "Error: query param page is not a number!" }] });
	} else {
		page = Number(page);
		const data = await router.db.get(DATA).value();
		let decrData = [];

		if (data === undefined) res.status(400).json({ errors: [{ message: "Something went wrong" }] });
		else {
			const totalNrOfRes = data.length;
			let customNrOfRes = 0;
			let nextPage = null;

			if (queryTags.length === 0) {
				if (queryName.length !== 0) {
					decrData = data.map((obj) => {
						return {
							id: obj.id,
							name: decrypt({ ciphertext: obj.name.value, iv: obj.name.iv, salt: obj.name.salt, password: key }),
							other: obj.other,
							tags: obj.tags,
						};
					});
					decrData = decrData.filter((obj) => obj.name.toLowerCase().includes(queryName.toLowerCase()));
					customNrOfRes = decrData.length;
					nextPage = page * PAGE_LIM < customNrOfRes ? page + 1 : null;
					decrData = decrData.slice((page - 1) * PAGE_LIM, page * PAGE_LIM);
					decrData = decrData.map((obj) => {
						return {
							...obj,
							other: obj.other.map((other) => decrypt({ ciphertext: other.value, iv: other.iv, salt: other.salt, password: key })),
						};
					});
				} else {
					customNrOfRes = data.length;
					nextPage = page * PAGE_LIM < customNrOfRes ? page + 1 : null;
					decrData = data.slice((page - 1) * PAGE_LIM, page * PAGE_LIM);
					decrData = decrData.map((obj) => {
						return {
							id: obj.id,
							name: decrypt({ ciphertext: obj.name.value, iv: obj.name.iv, salt: obj.name.salt, password: key }),
							other: obj.other.map((other) => decrypt({ ciphertext: other.value, iv: other.iv, salt: other.salt, password: key })),
							tags: obj.tags,
						};
					});
				}
			} else {
				decrData = data.reduce((acc, obj) => {
					let nrOfTags = 0; // the number of queryTags that are included in obj

					for (const tagId of queryTags) {
						if (obj.tags.includes(Number(tagId))) nrOfTags++;
					}

					if (nrOfTags === queryTags.length) acc.push(obj);

					return acc;
				}, []);

				if (queryName.length !== 0) {
					decrData = decrData.map((obj) => {
						return {
							id: obj.id,
							name: decrypt({ ciphertext: obj.name.value, iv: obj.name.iv, salt: obj.name.salt, password: key }),
							other: obj.other,
							tags: obj.tags,
						};
					});
					decrData = decrData.filter((obj) => obj.name.toLowerCase().includes(queryName.toLowerCase()));
					customNrOfRes = decrData.length;
					nextPage = page * PAGE_LIM < customNrOfRes ? page + 1 : null;
					decrData = decrData.slice((page - 1) * PAGE_LIM, page * PAGE_LIM);
					decrData = decrData.map((obj) => {
						return {
							...obj,
							other: obj.other.map((other) => decrypt({ ciphertext: other.value, iv: other.iv, salt: other.salt, password: key })),
						};
					});
				} else {
					customNrOfRes = decrData.length;
					nextPage = page * PAGE_LIM < customNrOfRes ? page + 1 : null;
					decrData = decrData.slice((page - 1) * PAGE_LIM, page * PAGE_LIM);
					decrData = decrData.map((obj) => {
						return {
							id: obj.id,
							name: decrypt({ ciphertext: obj.name.value, iv: obj.name.iv, salt: obj.name.salt, password: key }),
							other: obj.other.map((other) => decrypt({ ciphertext: other.value, iv: other.iv, salt: other.salt, password: key })),
							tags: obj.tags,
						};
					});
				}
			}

			res.json({ data: decrData, totalNrOfRes, res: customNrOfRes, nextPage });
		}
	}
});

/**
 * Handles the request that posts new data.
 *
 * @route POST /data
 * @param {Object} req - The request object.
 * @param {string} req.params.key - The secret key.
 * @param {object} req.params.newData - New data object
 * @param {boolean} req.params.isAnEdit - If the new data is an edit.
 * @param {Object} res - The response object.
 *
 * @returns {200 | 400} - Returns 200 and newData or 
 * 						  400 if the connection to the json server DB fails or if newData is not correctly formatted.
 *                        
 */
server.post("/data", async (req, res) => {
	const key = req.body.key;
	const newData = req.body.newData;
	const isAnEdit = req.body.isAnEdit;

	const db = router.db;
	const data = await db.get(DATA);

	if (data.value() === undefined) res.status(400).json({ errors: [{ message: "Something went wrong" }] });
	else if (key === undefined || key.length === 0) {
		res.status(400).json({ errors: [{ message: "Encryption key is empty!" }] });
	} else if (typeof isAnEdit !== "boolean") {
		res.status(400).json({ errors: [{ message: "Error: variable isAnEdit is not a boolean!" }] });
	} else if (typeof newData?.name === "undefined" || typeof newData.name !== "string" || newData.name.length === 0) {
		res.status(400).json({ errors: [{ message: "Error: variable newData.name is undefined, not of type string or empty!" }] });
	} else if (
		typeof newData?.other === "undefined" ||
		!Array.isArray(newData.other) ||
		!newData.other.every((other) => typeof other === "string" && other.length !== 0)
	) {
		res.status(400).json({
			errors: [{ message: "Error: variable newData.other is undefined, not an array of strings or contains an empty string!" }],
		});
	} else if (typeof newData?.tags === "undefined" || !Array.isArray(newData.tags) || !newData.tags.every((tag) => typeof tag === "number")) {
		res.status(400).json({
			errors: [{ message: "Error: variable newData.tags is undefined or not an array of numbers!" }],
		});
	} else {
		if (isAnEdit) {
			let objHasBeenEdited = false;

			const encrNewData = data.value().map((obj) => {
				if (obj.id === Number(newData.id)) {
					objHasBeenEdited = true;

					const { ciphertext: name, iv, salt } = encrypt({ val: newData.name, password: key });
					return {
						id: Number(newData.id),
						name: { value: name, iv, salt },
						other: newData.other.map((other) => {
							const { ciphertext: otherEncr, iv, salt } = encrypt({ val: other, password: key });

							return { value: otherEncr, iv, salt };
						}),
						tags: newData.tags.map((t) => Number(t)),
					};
				} else {
					return obj;
				}
			});
			if (!objHasBeenEdited) res.status(400).json({ errors: [{ message: "Failed to edit" }] });
			else {
				// saving
				await db.set(DATA, encrNewData).write();
				await db.set(DATA_LAST_SAVE, { value: Date.now().toString() }).write();
				res.status(201).json(newData);
			}
		} else {
			// encrypting

			const { ciphertext: name, iv, salt } = encrypt({ val: newData.name, password: key });

			const encrNewData = {
				id: Date.now(),
				name: { value: name, iv, salt },
				other: newData.other.map((other) => {
					const { ciphertext: otherEncr, iv, salt } = encrypt({ val: other, password: key });

					return { value: otherEncr, iv, salt };
				}),
				tags: newData.tags.map((t) => Number(t)),
			};

			// saving
			await data.push(encrNewData).write();
			await db.set(DATA_LAST_SAVE, { value: Date.now().toString() }).write();

			res.status(201).json(newData);
		}
	}
});

/**
 * Handles the request that deletes data based on id.
 *
 * @route DELETE /data/:id
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The id of the data object to be deleted.
 * @param {Object} res - The response object.
 *
 * @returns {200 | 400} - Returns 200 and id or 
 * 						  400 if the connection to the json server DB fails or if no data has been deleted.
 *                        
 */
server.delete("/data/:id", async (req, res) => {
	const { id } = req.params;
	const db = router.db;

	if (id === undefined || id.length === 0) {
		res.status(400).json({ errors: [{ message: "Id cannot be empty!" }] });
	} else {
		const data = await db.get(DATA).value();
		if (data === undefined) res.status(400).json({ errors: [{ message: "Something went wrong" }] });
		else {
			const filteredData = data.filter((obj) => obj.id !== Number(id));
			if (filteredData.length === data.length) {
				res.status(400).json({ errors: [{ message: "Failed to delete" }] });
			} else {
				await db.set(DATA, filteredData).write();
				await db.set(DATA_LAST_SAVE, { value: Date.now().toString() }).write();
				res.json(id);
			}
		}
	}
});

/**
 * Handles the request that returns the date of the last edit made to data.
 *
 * @route GET /data-last-save
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @returns {200 | 400} - Returns 200 and date or 
 * 						  400 if the connection to the json server DB fails.
 *                        
 */
server.get("/data-last-save", async (req, res) => {
	const data = await router.db.get(DATA_LAST_SAVE).value();

	if (data === undefined) res.status(400).json({ errors: [{ message: "Something went wrong" }] });

	res.json(data);
});

/***********
 * DECR/ENCR
 **********/

/**
 * Handles the request that decrypts and then encrypts both data and tags.
 *
 * @route POST /decrypt-encrypt
 * @param {Object} req - The request object.
 * @param {string} req.body.oldKey - The current secret key.
 * @param {string} req.body.newKey - The new secret key.
 * @param {Object} res - The response object.
 *
 * @returns {200 | 400} - Returns 200 or 
 * 						  400 if the connection to the json server DB fails or if the current key or new key are undefined.
 *                        
 */
server.post("/decrypt-encrypt", async (req, res) => {
	const oldKey = req.body.oldKey;
	const newKey = req.body.newKey;

	const db = router.db;

	if (oldKey === undefined || oldKey.length === 0) {
		res.status(400).json({ errors: [{ message: "Old encryption key is empty!" }] });
	} else if (newKey === undefined || newKey.length === 0) {
		res.status(400).json({ errors: [{ message: "New encryption key is empty!" }] });
	} else {
		const data = await router.db.get(DATA).value();
		const tags = await router.db.get(TAGS).value();

		if (data === undefined || tags === undefined) res.status(400).json({ errors: [{ message: "Something went wrong" }] });
		else {
			// decrypting & encrypting data
			const decrEncrData = data.map((obj) => {
				const {
					ciphertext: name,
					iv,
					salt,
				} = encrypt({
					val: decrypt({ ciphertext: obj.name.value, iv: obj.name.iv, password: oldKey, salt: obj.name.salt }),
					password: newKey,
				});

				return {
					...obj,
					name: { value: name, iv, salt },
					other: obj.other.map((otherObj) => {
						const {
							ciphertext: other,
							iv,
							salt,
						} = encrypt({
							val: decrypt({ ciphertext: otherObj.value, iv: otherObj.iv, password: oldKey, salt: otherObj.salt }),
							password: newKey,
						});

						return { value: other, iv, salt };
					}),
				};
			});

			// decrypting & encrypting tags
			const decrEncrTagsFunc = (tags, shouldEncrypt) => {
				return tags.map((tag) => {
					let encryptedTag = {};

					if (shouldEncrypt) {
						const { ciphertext: value, iv, salt } = encrypt({ password: newKey, val: tag.value });
						encryptedTag = { ...tag, value, iv, salt };
					} else {
						encryptedTag = { ...tag, value: decrypt({ ciphertext: tag.value, iv: tag.iv, password: oldKey, salt: tag.salt }) };
					}

					if (tag.tags.length > 0) encryptedTag.tags = decrEncrTagsFunc(tag.tags, shouldEncrypt);
					return encryptedTag;
				});
			};

			const decrEncrTags = decrEncrTagsFunc(decrEncrTagsFunc(tags, false), true);

			// saving
			await db.set(DATA, decrEncrData).write();
			await db.set(TAGS, decrEncrTags).write();

			res.status(200).json({});
		}
	}
});

server.use(router);

server.listen(6969, () => {
	console.log("JSON Server is running on port 6969");
});
