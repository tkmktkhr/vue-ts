import { defineStore } from 'pinia';
import { ref } from 'vue';

// Options API
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

// interface Getters {
//   count: (state: IState) => number;
//   isEmpty: (state: IState) => boolean;
//   grouped: (state: IState) => TGrouped;
//   groupCount: (state: IState) => (name: string) => number;
//   total: (state: IState) => number;
// }

// interface Actions {
//   addBork: (bork: string) => void;
//   checkout: () => void;
//   addItems: (count: number, item: IProduct) => IProduct[];
//   clearItem: (itemName: string) => void;
//   setItemCount: (item: IProduct, count: number) => void;
// }

// Another expression: Composition API's style
// ref()s become state properties
// computed()s become getters
// function()s become actions
export const useCounterStore = defineStore('CounterStore', () => {
  // state
  const count = ref(0);
  // actions
  function increment() {
    count.value++;
  }

  return { count, increment };
});
