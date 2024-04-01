import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';
import getCart from '@/actions/get-cart';

interface CartStore {
  items: Product[];
  getItems: () => void;
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  changeCount: (id: string, step:string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      async getItems() {
        const data: any = await getCart();
        set({ items: data?.cart?.cartItem || [] });
      },
      addItem: async (data: Product) => {
        let details = {
          colorId: data?.colorId,
          sizeId: data?.sizeId,
          quantity: "1",
          id: data.id,
        };
        const currentItems: any = await getCart();
        const existingItem = currentItems?.cart?.cartItem?.find(
          (item: any) => item.productId === data.id
        );

        if (existingItem) {
          return toast("Item already in cart.");
        }
        let res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          method: "POST",
          body: JSON.stringify({ data: details }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        res = await res.json();
        set({ items: res?.cart?.cartItem });
        toast.success("Item added to cart.");
      },
      removeItem: async (id: string) => {
        let res: any = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        res = await res.json();
        set({ items: res?.cart?.cartItem || [] });
        toast.success("Item removed from cart.");
      },
      changeCount: async (data:any,step:string) => {
        data.step = step;
        let res: any = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart`,
          {
            method: "PATCH",
            body: JSON.stringify({ data: data }),  
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );        
        res = await res.json();
        set({ items: res?.cart?.cartItem || [] });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
