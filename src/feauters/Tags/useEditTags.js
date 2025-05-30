import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setTagsApi } from "../../services/api";
import toast from "react-hot-toast";
import { TAGS_QUERY_KEY } from "../../queries/queryKeys";

export function useEditKeys() {
	const queryClient = useQueryClient();

	const { mutate: editKeys, isPending } = useMutation({
		mutationFn: ({ tags }) => setTagsApi({ tags }),
		onSuccess: (tags) => {
			toast.success("Tags updated successfully");
			queryClient.setQueryData([TAGS_QUERY_KEY], tags.data);
		},
		onError: (err) => toast.error(err.message),
	});

	return { editKeys, isPending };
}
