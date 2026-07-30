import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VinylRecord } from '@/data/records';

interface CartItem {
  record: VinylRecord;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (record: VinylRecord) => void;
  removeItem: (recordId: number) => void;
  updateQuantity: (recordId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,
      
      addItem: (record) => {
        const items = get().items;
        const existingItem = items.find((item) => item.record.id === record.id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.record.id === record.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { record, quantity: 1 }] });
        }
        
        const newItems = get().items;
        set({
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: newItems.reduce((acc, item) => acc + item.record.price * item.quantity, 0),
        });
      },
      
      removeItem: (recordId) => {
        set({ items: get().items.filter((item) => item.record.id !== recordId) });
        const newItems = get().items;
        set({
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: newItems.reduce((acc, item) => acc + item.record.price * item.quantity, 0),
        });
      },
      
      updateQuantity: (recordId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(recordId);
          return;
        }
        
        set({
          items: get().items.map((item) =>
            item.record.id === recordId ? { ...item, quantity } : item
          ),
        });
        
        const newItems = get().items;
        set({
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: newItems.reduce((acc, item) => acc + item.record.price * item.quantity, 0),
        });
      },
      
      clearCart: () => {
        set({ items: [], itemCount: 0, total: 0 });
      },
    }),
    {
      name: 'grooves-cart',
    }
  )
);
