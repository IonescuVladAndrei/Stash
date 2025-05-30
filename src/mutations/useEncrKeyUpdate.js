import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setKeyApi } from "../services/api";
import toast from "react-hot-toast";
import { DATA_QUERY_KEY, TAGS_QUERY_KEY } from "../queries/queryKeys";

export function useEncrKey() {
	const queryClient = useQueryClient();

	const { mutate: updateKey, isPending } = useMutation({
		mutationFn: ({ oldKey, newKey }) => setKeyApi({ oldKey, newKey }),
		onSuccess: () => {
			toast.success("Encryption key updated successfully");
			queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] });
			queryClient.invalidateQueries({ queryKey: [DATA_QUERY_KEY] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateKey, isPending };
}
