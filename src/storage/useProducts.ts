import { Product, ProductResponse } from '@/types/product.type';
import { create } from 'zustand';

type Pagination = {
    total: number
    skip: number
    limit: number
}

type ProductStore = {
    products: Product[];
    pagination: Pagination;
    setProducts: (products: ProductResponse) => void;
    appendProducts: (data: ProductResponse) => void;
    clearProducts: () => void;
};

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    pagination: {
        total: 0,
        skip: 0,
        limit: 0,
    },

    setProducts: (product) => set({
        products: product.products,
        pagination: {
            total: product.total,
            skip: product.skip,
            limit: product.limit,
        },
    }),
    appendProducts: (data) =>
        set((state) => ({
            products: [...state.products, ...data.products],
            pagination: {
                total: data.total,
                skip: data.skip,
                limit: data.limit,
            },
        })),

    clearProducts: () => set({ products: [] })
}))
