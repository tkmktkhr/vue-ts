<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue';
import { collection, doc } from 'firebase/firestore';
import { useCollection, useDocument, useFirestore } from 'vuefire';

const db = useFirestore()
const product = useDocument(() => doc(db, `products`, 'PA'))
const productCollection = useCollection(() => collection(db, `products`))

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
    <div> {{ productCollection }}</div>
  </div>
</template>

<style scoped></style>
