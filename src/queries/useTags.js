import { useQuery } from "@tanstack/react-query";
import { TAGS_QUERY_KEY } from "./queryKeys";
import { getTagsApi } from "../services/api";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export function useTags(key) {
	const toastIdRef = useRef();

	const {
		data: tags,
		isLoading,
		isRefetching,
	} = useQuery({
		queryKey: [TAGS_QUERY_KEY],
		queryFn: () => getTagsApi(key),
		retry: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (isRefetching) {
			if (!toastIdRef.current) {
				toastIdRef.current = toast.loading("Refetching tags");
			}
		} else {
			if (toastIdRef.current) {
				toast.dismiss(toastIdRef.current);
				toastIdRef.current = undefined;
			}
		}
	}, [isRefetching]);

	return { tags, isLoading };
}
