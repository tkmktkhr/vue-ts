<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';
import { ref, reactive } from 'vue';
import AppButton from './components/AppButton.vue';
// can not call actions
// import { storeToRefs } from 'pinia';
// const { products } = storeToRefs(useProductStore());
const productStore = useProductStore();
productStore.fill(); // .e.g. calling API?
const cartStore = useCartStore();
const history = reactive([]);
const future = reactive([]);
const doingHistory = ref(false);
history.push(JSON.stringify(cartStore.$state));
const redo = () => {
  const latestState = future.pop();
  if (!latestState) return;
  doingHistory.value = true;
  history.push(latestState);
  cartStore.$state = JSON.parse(latestState);
  doingHistory.value = false;
};
const undo = () => {
  if (history.length === 1) return;
  doingHistory.value = true;
  future.push(history.pop());
  cartStore.$state = JSON.parse(history.at(-1));
  // cartStore.$patch(() => state);
  doingHistory.value = false;
};
// subscribe state
cartStore.$subscribe((mutation, state) => {
  // console.log({ mutation }, { state });
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
    future.splice(0, future.length);
  }
});

// subscribe actions
cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === 'addItems') {
    after(() => {
      // after((result) => {
      // can get result as a result of promise success.
      console.log(args[0]); // -> count: number
    });
    onError((error) => {
      console.log('Error________', error.message);
    });
  }
});
// to actions on CartStore
// const addToCart = (count: number, product: IProduct) => {
//   // count = parseInt(count);
//   cartStore.$patch((state) => {
//     for (let i = 0; i < count; i++) {
//       state.items.push(product);
//     }
//   });
// };
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end"></div>
    <AppButton @click="undo">Undo</AppButton>
    <AppButton @click="redo">Redo</AppButton>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld
    msg="this is a message"
    :num="0"
    :products="productStore.products"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
