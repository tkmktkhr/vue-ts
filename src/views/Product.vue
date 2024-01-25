<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue';
import { doc } from 'firebase/firestore';
import { useDocument, useFirestore } from 'vuefire';

const db = useFirestore()
const product = useDocument(() => doc(db, `products`, 'PA'))

const nameUpdateLog = (n: string) => {
  console.log(n);
  console.log('name was updated.');
};
const priceUpdateLog = () => {
  console.log('price was updated.');
};
</script>

<template>
  <div>
    <ProductsList @updateProductName="nameUpdateLog" @updateProductPrice="priceUpdateLog" />
    <div>==========================</div>
    <div> {{ product }}</div>
  </div>
</template>

<style scoped></style>
