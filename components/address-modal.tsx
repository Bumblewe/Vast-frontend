"use client";
import Modal from "@/components/ui/modal";
import useAddressModal from "@/hooks/use-address-modal";
import { useForm } from "react-hook-form";
import { Input } from "./ui/Input";
import React, { useEffect, useMemo } from "react";
import { Message } from "./ui/Message";
import Button from "./ui/button";
import classes from './index.module.scss'
import { Checkbox } from "./ui/checkbox";
import { Address } from "@/types";
import toast from "react-hot-toast";
import { useAuth } from "@/app/_providers/Auth";

type FormData = {
  line1: string
  city: string
  state: string
  pincode: string
}

const AddressModal = () => {
  const {isOpen,data,onClose,setData} = useAddressModal();
  const [isDefault, setIsDefault] = React.useState(false);
  const { setUser, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset
  } = useForm<FormData>({
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [reset,data]);

  const onSubmit = async(data:Address)=>{
    let details = data;
    details.line1 = details.line1.replaceAll(",", "_");
    if (isDefault) {
      let response: any = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
        {
          method: "POST",
          body: JSON.stringify(details),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      response = await response.json();
      user && setUser({ ...user, address: response.address });
      setData(details);
      toast.success("Address Added.");
    } else {
      setData(details);
      toast.success("Address Added.");
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className="w-full">
          <div className="sm:col-span-4 lg:col-span-5">
            <div className="pb-2">
              <Input
                name="line1"
                label="Line 1"
                required
                register={register}
                error={errors.line1}
                type="text"
              />
            </div>
            <div className="flex flex-row gap-2 pb-2">
              <Input
                name="city"
                label="City"
                required
                register={register}
                error={errors.city}
                type="text"
              />
              <Input
                name="state"
                label="State"
                required
                register={register}
                error={errors.state}
                type="text"
              />
            </div>

            <Input
              name="pincode"
              label="Pincode"
              required
              register={register}
              error={errors.pincode}
              type="text"
            />
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            checked={isDefault}
            onCheckedChange={()=>setIsDefault(!isDefault)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Set as default address
            </label>
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className={classes.submit}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}
 
export default AddressModal;
