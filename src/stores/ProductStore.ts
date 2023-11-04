import { defineStore } from 'pinia'
import products from '@/data/products.json'

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

// Another expression
export const useProductStore = defineStore('ProductStore', {
  // state
  state: () => {
    return {
      products,
    };
  },
});