import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setTagsApi } from "../services/api";
import toast from "react-hot-toast";
import { DATA_QUERY_KEY, TAGS_LAST_SAVE_QUERY_KEY, TAGS_QUERY_KEY } from "../queries/queryKeys";

export function useUpdateTags() {
	const queryClient = useQueryClient();

	const { mutate: updateTags, isPending } = useMutation({
		mutationFn: ({ tags, key }) => setTagsApi({ tags, key }),
		onSuccess: () => {
			toast.success("Tags updated successfully");
			queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] });
			queryClient.invalidateQueries({ queryKey: [DATA_QUERY_KEY] });
			queryClient.invalidateQueries({ queryKey: [TAGS_LAST_SAVE_QUERY_KEY] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateTags, isPending };
}
