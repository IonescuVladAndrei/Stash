import { useQueryClient } from "@tanstack/react-query";

function useInvalidateQuery() {
	const queryClient = useQueryClient();

	function handleClick(queryKey) {
		queryClient.invalidateQueries({ queryKey: [...queryKey] });
	}

	return { handleClick };
}

export default useInvalidateQuery;
