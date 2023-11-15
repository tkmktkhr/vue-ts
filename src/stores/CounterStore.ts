import { defineStore } from 'pinia';
import { ref } from 'vue';

// Options API
// interface IState {
//   count: number;
// }

// not working
// interface Getters<S> {
//   count: (state: IState) => S;
// }

// interface Actions {
//   increment: () => void;
// }

// export const useCounterStore = defineStore<
//   'Counter',
//   IState,
//   Getters<IState>,
//   Actions
// >('Counter', {
//   state: (): IState => {
//     return { count: 0 };
//   },
//   // could also be defined as
//   // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
// });

// Setup store expression: Composition API's style
// this type is not necessary type definition.
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
