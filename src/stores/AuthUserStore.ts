import { defineStore } from 'pinia';
import { ref } from 'vue';

// Options API like
// interface IState {
//   userName: string;
// }
// export const useAuthUserStore = defineStore('AuthUserStore', {
//   state: (): IState => {
//     return {
//       userName: 'TEST NAME',
//     };
//   },
// });

export const useAuthUserStore = defineStore('AuthUserStore', () => {
  const userName = ref('TEST NAME');
  //   function sample() {
  //     userName.value;
  //   }

  return { userName };
});
