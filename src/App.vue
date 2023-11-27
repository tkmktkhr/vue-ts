<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';
import AppButton from './components/AppButton.vue';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useCollection, useFirestore } from 'vuefire';

const db = useFirestore();

// collection
console.log('loading products ...');
const productsRef = collection(db, 'products');
const productsDb = useCollection(productsRef);
console.log({ value: productsDb });
console.log('loaded products ...');

// document
// import { useDocument } from 'vuefire'
// import { doc } from 'firebase/firestore'
// const settings = useDocument(doc(db, 'settings', 'some_id'))

// Transfer to ProductsList.vue from here
// const fetchDataFromFB = async () => {
//   console.log('fetching...');

//   const querySnapshot = await getDocs(collection(db, 'products'));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
//     console.dir(doc.data());
//   });
// };

// const saveDataToFB = async () => {
// console.log('saving');

// This is another expression
// add id by yourself
// await setDoc(doc(db, 'products', 'PA'), {
//   name: 'Pineapple',
//   price: 5,
// });

// Add a new document with a generated id.
//   const docRef = await addDoc(collection(db, 'products'), {
//     name: 'Pineapple',
//     price: 5,
//   });
//   console.log(docRef);
// };
// Transfer to ProductsList.vue until here

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
  <button @click="fetchDataFromFB">GET DATA FROM FIRESTORE</button>
  {{ productsDb }}
  <button @click="saveDataToFB">POST DATA INTO FIRESTORE</button>
  <!-- <ul>
    <li v-for="p in productsDb" :key="p.name">
      <span>{{ p.name }}: ${{ p.price }}</span>
    </li>
  </ul> -->
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
