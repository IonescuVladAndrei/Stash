import { useQuery } from "@tanstack/react-query";
import { DATA_LAST_SAVE_QUERY_KEY } from "./queryKeys";
import { getDataLastSaveApi } from "../services/api";

export function useDataLastSave() {
	const { data: dataLastSave, isLoading } = useQuery({
		queryKey: [DATA_LAST_SAVE_QUERY_KEY],
		queryFn: () => getDataLastSaveApi(),
		retry: false,
		refetchOnWindowFocus: false,
	});

	return { dataLastSave, isLoading };
}
