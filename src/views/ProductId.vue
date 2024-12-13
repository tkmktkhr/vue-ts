<script setup lang="ts">
import { useRoute } from 'vue-router';
import ProductDetail from '@/components/ProductDetail.vue';

const route = useRoute();

const urlId = route.params['id'];
if (!urlId || Array.isArray(urlId)) {
  console.error(`id: ${urlId} does not exist.`);
  throw new Error();
}
</script>

<template>
  <div>
    <div>{{ urlId }}</div>
    <ProductDetail :id="urlId" />
    <br />
  </div>
</template>
