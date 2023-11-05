import { defineStore } from 'pinia';

interface IState {
  userName: string;
}

export const useAuthUserStore = defineStore('AuthUserStore', {
  state: (): IState => {
    return {
      userName: 'TEST NAME',
    };
  },
});
