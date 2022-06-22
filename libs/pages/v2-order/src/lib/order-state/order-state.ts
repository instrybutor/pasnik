import create from 'zustand';

interface OrderState {
  shippingCents: number;
  setShippingCents: (shippingCents: number) => void;
}

export const useOrderState = create<OrderState>((set) => ({
  shippingCents: 0,
  setShippingCents: (shippingCents: number) => {
    set({ shippingCents });
  },
}));
