import { defineStore, acceptHMRUpdate, _GettersTree } from 'pinia';
// import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { IProduct } from '@/stores/ProductStore';
import groupBy from 'lodash-es/groupBy';
import { useAuthUserStore } from './AuthUserStore';

interface IState {
  // items: RemovableRef<IProduct[]>; // try to use vueuse/core but not work
  items: IProduct[];
  // count: number;
  // grouped: { [key: string]: IProduct[] };
}

type TGrouped = { [key: string]: IProduct[] };

// interface GettersFunc {
//   count: (state: IState) => number;
//   isEmpty: (state: IState) => boolean;
//   grouped: (state: IState) => TGrouped;
//   groupCount: (state: IState) => (name: string) => number;
//   total: (state: IState) => number;
// }

interface Getters extends _GettersTree<IState> {
  count: (state: IState) => number;
  isEmpty: (state: IState) => boolean;
  grouped: (state: IState) => TGrouped;
  groupCount: (state: IState) => (name: string) => number;
  total: (state: IState) => number;
}

interface Actions {
  // addBork: (bork: string) => void;
  checkout: () => void;
  addItems: (count: number, item: IProduct) => void;
  clearItem: (itemName: string) => void;
  setItemCount: (item: IProduct, count: number) => void;
}

// Option API type expression
export const useCartStore = defineStore<'CartStore', IState, Getters, Actions>(
  'CartStore',
  {
    historyEnabled: true,
    // state
    state: (): IState => {
      return {
        // items: useLocalStorage('CartStore:items', [] as IProduct[]),
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
      // isEmpty: (state): boolean => state.count === 0,
      /**
       * Returns the boolean: count is empty or not.
       *
       * @returns {boolean}
       */
      isEmpty(): boolean {
        return this.count === 0; // access to getter.
      },

      grouped: (state): TGrouped => {
        const grouped: TGrouped = groupBy(
          state.items,
          (item: IProduct) => item.name,
        );
        console.log({ grouped });
        const sorted = Object.keys(grouped).sort();
        let inOrder: TGrouped = {};
        sorted.forEach((key) => {
          inOrder[key] = grouped[key];
        });
        console.log({ inOrder });
        return inOrder;
      },

      // Try1 no
      // groupCount(state): {
      //   return (name: string): number => this.grouped[name].length;
      // },
      // Try2 ok
      // why state can be accessed here?
      // the bellow does not work TypeScript. Also, arrow func done not handle `this`.
      groupCount:
        (state) =>
        (name): number =>
          state.grouped[name].length,
      // ??
      // Try3 no
      // groupCount: (): ((name: string) => number) => (name: string) =>
      //   this.grouped[name].length,

      total: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
    },

    // actions: not get sth, mutation.
    actions: {
      checkout() {
        const authUserStore = useAuthUserStore();
        alert(
          `${authUserStore.userName} bought ${this.count} items for a total of ${this.total}`,
        );
      },
      addItems(count: number, item: IProduct) {
        // throw new Error('NEW ERROR!!!!!!!!!!');
        for (let i = 0; i < count; i++) {
          // mutations?
          this.items.push({ ...item }); // not `.push(item)`. if one item is changed, it will not affect other object(same type object).
        }
      },
      // Use getter
      // calcTotalPrice(): number {
      //   return this.items.reduce((acc, item) => acc + item.price, 0);
      // },
      clearItem(itemName: string) {
        this.items = this.items.filter((item) => item.name !== itemName);
      },
      setItemCount(item: IProduct, count: number) {
        this.clearItem(item.name);
        this.addItems(count, item);
      },
    },
  },
);

// https://pinia.vuejs.org/cookbook/hot-module-replacement.html#HMR-Hot-Module-Replacement-
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
