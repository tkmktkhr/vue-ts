import { defineStore } from 'pinia'
// import products from '@/data/products.json'

// export const useCounterStore = defineStore('counter', {
//   state: () => {
//     return { count: 0 }
//   },
//   // could also be defined as
//   // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })

interface State {
  products: IProduct[];
}

export interface IProduct {
  name: string;
  image: string;
  price: number;
}

// Another expression
export const useProductStore = defineStore('ProductStore', {
  // state
  state: (): State => {
    return {
      products: []
    };
  },
  // actions
  actions: {
    async fill(){
      this.products = (await import('@/data/products.json')).default;
    }
  }
});