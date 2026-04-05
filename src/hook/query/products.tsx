import { productServices } from "@/services/producutServices"
import { ProductResponse } from "@/types/product.type"
import { useInfiniteQuery } from "@tanstack/react-query"

const LIMIT = 10
export const useProductQuery = () => {

    return useInfiniteQuery<ProductResponse, Error, ProductResponse, string[], number>({
        queryKey: ['products'],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) =>
            productServices.getAllProducts(LIMIT, pageParam),
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.limit

            if (nextSkip >= lastPage.total) {
                return undefined
            }

            return nextSkip
        }
    })
}
