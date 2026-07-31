import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VinylRecord } from '@/data/records';
import { getFormatPrice, type Format } from '@/data/records';

export type CartItemKind = 'mixtape' | 'ticket';

interface CartItem {
  record: VinylRecord;
  format: Format;
  quantity: number;
  unitPrice?: number;
  kind?: CartItemKind;
  formatLabel?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (
    record: VinylRecord,
    format?: Format,
    unitPrice?: number,
    kind?: CartItemKind,
    formatLabel?: string,
  ) => void;
  removeItem: (recordId: number, format: Format) => void;
  updateQuantity: (recordId: number, format: Format, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

function linePrice(item: CartItem) {
  const unitPrice = item.unitPrice ?? getFormatPrice(item.record, item.format);
  return unitPrice * item.quantity;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (record, format = 'Vinyl', unitPrice, kind, formatLabel) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.record.id === record.id && item.format === format,
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.record.id === record.id && item.format === format
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    unitPrice: unitPrice ?? item.unitPrice,
                    kind: kind ?? item.kind,
                    formatLabel: formatLabel ?? item.formatLabel,
                  }
                : item,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { record, format, quantity: 1, unitPrice, kind, formatLabel },
            ],
          });
        }

        const newItems = get().items;
        set({
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: newItems.reduce((acc, item) => acc + linePrice(item), 0),
        });
      },

      removeItem: (recordId, format) => {
        set({
          items: get().items.filter(
            (item) => !(item.record.id === recordId && item.format === format),
          ),
        });
        const newItems = get().items;
        set({
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: newItems.reduce((acc, item) => acc + linePrice(item), 0),
        });
      },

      updateQuantity: (recordId, format, quantity) => {
        if (quantity <= 0) {
          get().removeItem(recordId, format);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.record.id === recordId && item.format === format
              ? { ...item, quantity }
              : item,
          ),
        });

        const newItems = get().items;
        set({
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: newItems.reduce((acc, item) => acc + linePrice(item), 0),
        });
      },

      clearCart: () => {
        set({ items: [], itemCount: 0, total: 0 });
      },
    }),
    {
      name: 'spotify-cart',
    },
  ),
);
