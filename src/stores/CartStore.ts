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

  // getters
  getters: {
    count: (state) => state.items.length,
    // count(): number {
    //   return this.items.length;
    // },
    isEmpty: (state) => state.items.length === 0,
    // isEmpty(): boolean {
    //   return this.count === 0;
    // },
  },

  // actions
  actions: {
    addItems(count: number, item: IProduct) {
      for (let i = 0; i < count; i++) {
        // mutations?
        this.items.push({ ...item }); // if one item is changed, it will not affect other object(same type object).
      }
    },
  },
});
