import { ref, reactive } from 'vue';

export const PiniaHistoryPlugin = ({ pinia, app, store, options }) => {
  if (!options.historyEnabled) return;
  const history = reactive([]);
  const future = reactive([]);
  const doingHistory = ref(false);
  history.push(JSON.stringify(store.$state));

  // const redo = () => {
  //   const latestState = future.pop();
  //   if (!latestState) return;
  //   doingHistory.value = true;
  //   history.push(latestState);
  //   store.$state = JSON.parse(latestState);
  //   doingHistory.value = false;
  // };
  // const undo = () => {
  //   if (history.length === 1) return;
  //   doingHistory.value = true;
  //   future.push(history.pop());
  //   store.$state = JSON.parse(history.at(-1));
  //   // cartStore.$patch(() => state);
  //   doingHistory.value = false;
  // };
  // subscribe state

  store.$subscribe((mutation, state) => {
    // console.log({ mutation }, { state });
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      future.splice(0, future.length);
    }
  });

  // all Store can keep the track of these histories.
  return {
    history,
    future,
    undo: () => {
      if (history.length === 1) return;
      doingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1));
      // cartStore.$patch(() => state);
      doingHistory.value = false;
    },
    redo: () => {
      const latestState = future.pop();
      if (!latestState) return;
      doingHistory.value = true;
      history.push(latestState);
      store.$state = JSON.parse(latestState);
      doingHistory.value = false;
    },
  };
};
