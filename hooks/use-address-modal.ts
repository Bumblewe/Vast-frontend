import { create } from 'zustand';

import { Address } from '@/types';

interface AddressModalStore {
  isOpen: boolean;
  data?: Address;
  onOpen: (data: Address) => void;
  onClose: () => void;
  setData: (data:Address) => void
}

const useAddressModal = create<AddressModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Address) => {   
    set({ isOpen: true, data });
  },
  setData:(data:Address)=>{
    set({ isOpen: false, data });
  },
  onClose: () => set({ isOpen: false }),
}));

export default useAddressModal;
