import { Api } from "@/lib/api"
import { ProductResponse } from "@/types/product.type"

export const productServices = {
    getAllProducts: async (limit = 30, skip = 0): Promise<ProductResponse> => {
        const res = await Api.get(`/products?limit=${limit}&skip=${skip}`)
        return res.data
    }
}
