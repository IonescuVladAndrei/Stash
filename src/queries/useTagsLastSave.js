import { useQuery } from "@tanstack/react-query";
import { TAGS_LAST_SAVE_QUERY_KEY } from "./queryKeys";
import { getTagsLastSaveApi } from "../services/api";

export function useTagsLastSave() {
	const { data: tagsLastSave, isLoading } = useQuery({
		queryKey: [TAGS_LAST_SAVE_QUERY_KEY],
		queryFn: () => getTagsLastSaveApi(),
		retry: false,
		refetchOnWindowFocus: false,
	});

	return { tagsLastSave, isLoading };
}
