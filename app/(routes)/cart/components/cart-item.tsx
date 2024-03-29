import Image from "next/image";
import { X } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

interface CartItemProps {
  data: any;
}

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const cart = useCart();
  const onRemove = () => {    
    cart.removeItem(data.id);
  };
  const increase = () => {    
    cart.changeCount(data,"increase");
  };  
  const decrease = () => {  
    if(data.quantity>1) cart.changeCount(data,"decrease");
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.product.name}
            </p>
            <form className="max-w-xs mx-auto">
              <div className="relative flex items-center max-w-[6rem]">
                <button
                  type="button"
                  id="decrement-button"
                  onClick={()=>decrease()}
                  data-input-counter-decrement="quantity-input"
                  className="dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-11"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="quantity-input"
                  data-input-counter
                  readOnly
                  value={data?.quantity}
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="999"
                />
                <button
                  type="button"
                  id="increment-button"
                  onClick={()=>increase()}
                  data-input-counter-increment="quantity-input"
                  className="border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-11"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.product.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.product.size.name}
            </p>
          </div>
          <Currency value={data.product.price} />
        </div>
      </div>
    </li>
  );
}
 
export default CartItem;
