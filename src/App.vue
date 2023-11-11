<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';
import AppButton from './components/AppButton.vue';
// firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(import.meta.env.VITE_API_KEY);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// firebase end

// can not call actions
// import { storeToRefs } from 'pinia';
// const { products } = storeToRefs(useProductStore());
const productStore = useProductStore();
productStore.fill(); // .e.g. calling API?
const cartStore = useCartStore();

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
    <AppButton @click="cartStore.undo">Undo</AppButton>
    <AppButton @click="cartStore.redo">Redo</AppButton>
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
