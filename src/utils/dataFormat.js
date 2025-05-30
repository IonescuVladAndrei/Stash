// various recursive functions

export function groupByDepth(arr, depth = 0, res = []) {
	if (!res[depth]) res[depth] = [];

	for (const tag of arr) {
		res[depth].push({ value: tag.id, label: tag.value });

		if (tag.tags && tag.tags.length > 0) {
			groupByDepth(tag.tags, depth + 1, res);
		}
	}

	return res;
}

export function groupByDepthWithParentId(arr, depth = 0, res = [], parentId = -1) {
	if (!res[depth]) res[depth] = [];

	for (const tag of arr) {
		res[depth].push({ value: tag.id, label: tag.value, parentId });

		if (tag.tags && tag.tags.length > 0) {
			groupByDepthWithParentId(tag.tags, depth + 1, res, tag.id);
		}
	}

	return res;
}

export function getParentId(fullTags, tagIds) {
	const res = [];

	function find(arr, parentId = -1) {
		for (const tag of arr) {
			if (tagIds.includes(tag.id)) res.push({ value: tag.id, parentId });

			if (tag.tags && tag.tags.length > 0) find(tag.tags, tag.id);
		}
	}

	find(fullTags);

	return res;
}

export function getTagValById(fullTags, tagIds) {
	const res = [];

	function find(arr) {
		for (const tag of arr) {
			if (tagIds.includes(tag.id)) res.push(tag.value);

			if (tag.tags && tag.tags.length > 0) find(tag.tags);
		}
	}

	find(fullTags);

	return res;
}
