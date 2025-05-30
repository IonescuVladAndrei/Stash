import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DATA_LAST_SAVE_QUERY_KEY, DATA_QUERY_KEY } from "../queries/queryKeys";
import { deleteDataApi } from "../services/api";

export function useDeleteData() {
	const queryClient = useQueryClient();

	const { mutate: deleteData, isPending } = useMutation({
		mutationFn: ({ id }) => deleteDataApi({ id }),
		onSuccess: () => {
			toast.success("Data deleted successfully");
			queryClient.invalidateQueries({ queryKey: [DATA_QUERY_KEY] });
			queryClient.invalidateQueries({ queryKey: [DATA_LAST_SAVE_QUERY_KEY] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { deleteData, isPending };
}
