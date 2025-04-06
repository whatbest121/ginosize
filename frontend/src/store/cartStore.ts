import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addItem: (item: CartItem) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            totalItems: 0,
            totalPrice: 0,

            addItem: (item: CartItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.id === item.id);

                if (existingItem) {
                    const updatedItems = currentItems.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    );
                    updateTotals(set, updatedItems);
                } else {
                    const updatedItems = [...currentItems, item];
                    updateTotals(set, updatedItems);
                }
            },

            removeItem: (itemId: string) => {
                const updatedItems = get().items.filter((item) => item.id !== itemId);
                updateTotals(set, updatedItems);
            },

            updateQuantity: (itemId: string, quantity: number) => {
                if (quantity <= 0) {
                    const updatedItems = get().items.filter((item) => item.id !== itemId);
                    updateTotals(set, updatedItems);
                } else {
                    const updatedItems = get().items.map((item) =>
                        item.id === itemId ? { ...item, quantity } : item
                    );
                    updateTotals(set, updatedItems);
                }
            },

            clearCart: () => {
                set({ items: [], totalItems: 0, totalPrice: 0 });
            },
        }),
        {
            name: 'cart-storage', 
            partialize: (state) => ({
                items: state.items,
                totalItems: state.totalItems,
                totalPrice: state.totalPrice,
            }),
        }
    )
);

function updateTotals(
    set: (state: Partial<CartState>) => void,
    items: CartItem[]
) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    set({ items, totalItems, totalPrice });
} 