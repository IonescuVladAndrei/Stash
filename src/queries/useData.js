import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getDataApi } from "../services/api";
import { DATA_QUERY_KEY, URL_NAME_PARAM, URL_TAG_PARAM } from "./queryKeys";

export function useData(key) {
	const [searchParams] = useSearchParams();
	const toastIdRef = useRef();

	const nameParam = searchParams.get(URL_NAME_PARAM);
	const name = !nameParam ? "" : nameParam;

	const tagsParam = searchParams.get(URL_TAG_PARAM);
	const tags = !tagsParam ? [] : tagsParam.split(",");

	const { data, isLoading, error, status, fetchNextPage, isFetchingNextPage, hasNextPage, isRefetching } = useInfiniteQuery({
		queryKey: [DATA_QUERY_KEY, name, tags],
		queryFn: ({ pageParam = 1 }) => getDataApi({ page: pageParam, key, tags, name }),
		getNextPageParam: (firstPage) => firstPage.nextPage ?? undefined,
		retry: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (status === "error") {
			toast.error(error.message);
			return;
		}
	}, [status, error?.message]);

	useEffect(() => {
		if (isRefetching) {
			if (!toastIdRef.current) {
				toastIdRef.current = toast.loading("Refetching data");
			}
		} else {
			if (toastIdRef.current) {
				toast.dismiss(toastIdRef.current);
				toastIdRef.current = undefined;
			}
		}
	}, [isRefetching]);

	return { data, isLoading, error, status, fetchNextPage, isFetchingNextPage, hasNextPage };
}
