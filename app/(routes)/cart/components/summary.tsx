"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import Payment from "@/components/payment";
import { AnyTxtRecord } from "dns";

const Summary = () => {
  const searchParams = useSearchParams();
  const cart = useCart();
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams?.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams?.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = cart.items.reduce((total, item:any) => {    
    return total + Number(item?.product?.price*item?.quantity)
  }, 0);  
 
  return (
    <>
      <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              Order total
            </div>
            <Currency value={totalPrice} />
          </div>
        </div>
       <Payment />
      </div>
    </>
  );
}
 
export default Summary;
