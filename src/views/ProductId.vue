<script setup lang="ts">
import { doc } from '@firebase/firestore';
import { useDocument, useFirestore } from 'vuefire';
import { useRoute } from 'vue-router';
import ProductDetail from '@/components/ProductDetail.vue';

const db = useFirestore();
const route = useRoute();

// when using id from url.
const urlId = route.params['id'];
if (!urlId || Array.isArray(urlId)) {
  console.error(`id: ${urlId} does not exist.`);
  throw new Error();
}

const productDbSync = useDocument(() => doc(db, `products`, urlId)).data;
</script>

<template>
  <div>
    <div>{{ urlId }}</div>
    <ProductDetail :id="urlId" :productDbSync="productDbSync" />
    <br />
  </div>
</template>
