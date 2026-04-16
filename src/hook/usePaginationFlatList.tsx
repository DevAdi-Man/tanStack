import { Product } from "@/types/product.type";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

type usePaginationProps<TPage, TItem> = {
    query: UseInfiniteQueryResult<TPage,Error>,
    selectData: (page: TPage) => TItem[]
}

export function usePaginationFlatList<TPage, TItem>({
    query,
    selectData
}: usePaginationProps<TPage, TItem>) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isRefetching,
    } = query;

    console.log("Data",data)
    const listData = useMemo(
        () => data?.pages?.flatMap((page: TPage) => selectData(page)) ?? [],
        [data, selectData]
    ) as Product[];

    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage,fetchNextPage]);

    const onRefresh = useCallback(() => {
        refetch();
    }, []);

    return {
        listData,
        onEndReached,
        onRefresh,
        refreshing: isRefetching,
        isFetchingNextPage,
    };
}
