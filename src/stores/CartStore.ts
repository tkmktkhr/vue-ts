import { defineStore } from 'pinia';

interface State {
  carts: ICart[];
}

export interface ICart {
  name: string;
  image: string;
  price: number;
}

// Another expression
export const useCartStore = defineStore('CartStore', {
  // state
  state: (): State => {
    return {
      carts: [],
    };
  },
  // actions
  actions: {
    async fill() {
      // this.carts = (await import('@/data/carts.json')).default;
      // this.carts = (await axious.get('http://localhost:3000/carts')).data;
    },
  },
});
