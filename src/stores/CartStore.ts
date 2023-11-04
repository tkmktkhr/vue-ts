import { defineStore } from 'pinia';
import { IProduct } from '@/stores/ProductStore';

interface State {
  items: IProduct[];
}

// Another expression
export const useCartStore = defineStore('CartStore', {
  // state
  state: (): State => {
    return {
      items: [],
    };
  },

  // actions
  actions: {
    addItems(count: number, item: IProduct) {
      for (let i = 0; i < count; i++) {
        // mutations?
        this.items.push(item);
      }
    },
  },
});
