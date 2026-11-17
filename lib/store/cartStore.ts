import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductFeedback {
  rate: number;
  description?: string;
}

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: {
    value: number;
    currency: string;
  };
  rating: number;
  feedbackCount: number;
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string, size?: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, quantity: number, size?: string) => void;
}

export const calculateRating = (feedbacks: ProductFeedback[] = []): number => {
  if (feedbacks.length === 0) return 0;
  const totalRate = feedbacks.reduce((sum, item) => sum + item.rate, 0);
  return Number((totalRate / feedbacks.length).toFixed(1));
};

export const MAX_QUANTITY = 99;

const clampQuantity = (quantity: number): number =>
  Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity) || 1));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item._id === newItem._id && item.size === newItem.size,
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item._id === newItem._id && item.size === newItem.size
                  ? { ...item, quantity: clampQuantity(item.quantity + newItem.quantity) }
                  : item,
              ),
            };
          }
          return {
            items: [...state.items, { ...newItem, quantity: clampQuantity(newItem.quantity) }],
          };
        }),
      removeItem: (itemId, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item._id === itemId && item.size === size),
          ),
        })),

      clearCart: () => set({ items: [] }),

      updateQuantity: (itemId, quantity, size) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === itemId && item.size === size
              ? { ...item, quantity: clampQuantity(quantity) }
              : item,
          ),
        })),
    }),

    { name: "clothica-basket" },
  ),
);
