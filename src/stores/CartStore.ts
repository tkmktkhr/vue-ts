import { defineStore } from 'pinia';
import { IProduct } from '@/stores/ProductStore';

interface State {
  items: IProduct[];
  count: number;
}

// Another expression
export const useCartStore = defineStore('CartStore', {
  // state
  state: (): State => {
    return {
      items: [],
      count: 0,
    };
  },

  // getters
  getters: {
    count: (state): number => state.items.length,
    // count(): number {
    //   return this.items.length;
    // },
    isEmpty: (state): boolean => state.count === 0,
    /**
     * Returns the count value times two plus one.
     *
     * @returns {boolean}
     */
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
