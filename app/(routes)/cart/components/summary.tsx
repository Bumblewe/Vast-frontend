"use client";

import axios from "axios";
import { MouseEventHandler, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import Payment from "@/components/payment";
import Button from "@/components/ui/button";
import useAddressModal from "@/hooks/use-address-modal";
import { useAuth } from "@/app/_providers/Auth";

const Summary = () => {
  const searchParams = useSearchParams();
  const cart = useCart();
  const removeAll = useCart((state) => state.removeAll);
  const addressModal = useAddressModal();
  const { user } = useAuth()

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

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    let addressObject= addressModal?.data;
    let savedAddress =
      addressObject?.line1 &&
      `${addressObject?.line1},${addressObject?.city},${addressObject?.state},${addressObject?.pincode}`;
    let address:any =  (savedAddress || user?.address || ",,,").split(",");
    addressModal.onOpen({
      line1: address[0].replaceAll("_",","),
      pincode: address[3],
      city: address[1],
      state: address[2]
    });
    
  };
 
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
        <div>
          {Object.values(addressModal.data || {}).join() == "" ||
          Object.values(addressModal.data || {}).join() == ",,," ? (
            <Button onClick={onPreview} className="w-full mt-6">
              Add Address
            </Button>
          ) : (
            <Payment />
          )}
        </div>
      </div>
    </>
  );
}
 
export default Summary;
