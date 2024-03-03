<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';
import AppButton from '@/components/AppButton.vue';
import { computed } from 'vue';
import { ref } from 'vue';

// document
// import { useDocument } from 'vuefire'
// import { doc } from 'firebase/firestore'
// const settings = useDocument(doc(db, 'settings', 'some_id'))

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
      console.log('Error________', error);
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
const count = ref<number | null>(null);

const total = computed(() => cartStore.total);
const testPlusOne = computed(() => {
  const val = total.value;
  count.value = val + 100;
  return calc(val);
});

const calc = (count: number) => {
  return count + 10;
};
</script>

<template>
  <!-- <VAppNavigation />
  <RouterView />
  <AppFooter /> -->
  <div class="container">
    <TheHeader />
    {{ count }}
    {{ testPlusOne }}
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
  <!-- <ul>
    <li v-for="p in productsDb" :key="p.name">
      <span>{{ p.name }}: ${{ p.price }}</span>
    </li>
  </ul> -->
</template>

<style scoped></style>
