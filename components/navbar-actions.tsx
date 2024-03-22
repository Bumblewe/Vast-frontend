"use client";

import { ShoppingBag, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/_providers/Auth";

const NavbarActions = (props:any) => {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-1 md:justify-end flex-col md:flex-row ">
      <div
        className={cn("flex items-center gap-x-4 md:shrink-1", props?.className)}
      >
        <Button
          onClick={() => router.push("/cart")}
          className="flex items-center rounded-full bg-white px-4 py-2"
        >
          <ShoppingBag size={20} color="black" />
          <span className="ml-2 text-sm font-semibold text-lg text-black">
            <span className="md:hidden">Cart </span>({cart.items.length})
          </span>
        </Button>
      </div>
      <div
        className={cn("flex items-center md:shrink-1 gap-x-4", props?.className)}
      >
        <Button
          onClick={() => user?router.push("/account"):router.push("/login")}
          className="flex items-center rounded-full bg-white px-4 py-2"
        >
          <UserIcon size={20} color="black" />
          <span className="md:hidden ml-2 font-semibold text-sm text-black">Account</span>
        </Button>
      </div>
    </div>
  );
}
 
export default NavbarActions;