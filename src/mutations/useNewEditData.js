import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDataApi } from "../services/api";
import toast from "react-hot-toast";
import { DATA_LAST_SAVE_QUERY_KEY, DATA_QUERY_KEY } from "../queries/queryKeys";

export function useNewEditData() {
	const queryClient = useQueryClient();

	const { mutate: addUpdateData, isPending } = useMutation({
		mutationFn: ({ key, newData, isAnEdit }) => setDataApi({ key, newData, isAnEdit }),
		onSuccess: () => {
			toast.success("Data updated successfully");
			queryClient.invalidateQueries({ queryKey: [DATA_QUERY_KEY] });
			queryClient.invalidateQueries({ queryKey: [DATA_LAST_SAVE_QUERY_KEY] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { addUpdateData, isPending };
}
