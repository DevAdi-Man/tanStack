import {Product} from '@/types/product.type';
import { create } from 'zustand';

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  clearProducts: () => void;
};

export const useProductStore = create<ProductStore>((set)=>({
    products:[],

    setProducts:(products) => set({products}),

    clearProducts: ()=> set({products:[]})
}))