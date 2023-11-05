import { defineStore } from 'pinia';
import { IProduct } from '@/stores/ProductStore';
import { groupBy } from 'lodash';

interface IState {
  items: IProduct[];
  // count: number;
  // grouped: { [key: string]: IProduct[] };
}

// Another expression
export const useCartStore = defineStore('CartStore', {
  // state
  state: (): IState => {
    return {
      items: [] as IProduct[],
      // count: 0,
      // grouped: {},
    };
  },

  // getters
  getters: {
    count: (state): number => state.items.length,
    // count(): number {
    //   return this.items.length;
    // },

    // why state can be accessed here?
    isEmpty: (state): boolean => state.count === 0,
    /**
     * Returns the boolean: count is empty or not.
     *
     * @returns {boolean}
     */
    // isEmpty(): boolean {
    //   return this.count === 0; // access to getter.
    // },

    grouped: (state): { [key: string]: IProduct[] } =>
      groupBy(state.items, (item: IProduct) => item.name),

    // Try1 no
    // groupCount(state): {
    //   return (name: string): number => this.grouped[name].length;
    // },
    // Try2 ok
    // why state can be accessed here?
    // the bellow does not work TypeScript. Also, arrow func done not handle `this`.
    groupCount: (state) => (name: string) => state.grouped[name].length,
    // ??
    // Try3 no
    // groupCount: (): ((name: string) => number) => (name: string) =>
    //   this.grouped[name].length,
  },

  // actions: not get sth, mutation.
  actions: {
    addItems(count: number, item: IProduct) {
      for (let i = 0; i < count; i++) {
        // mutations?
        this.items.push({ ...item }); // not `.push(item)`. if one item is changed, it will not affect other object(same type object).
      }
    },
    calcTotalPrice(): number {
      return this.items.reduce((acc, item) => acc + item.price, 0);
    },
  },
});
