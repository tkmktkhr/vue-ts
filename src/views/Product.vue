<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue';

const nameUpdateLog = () => {
  console.log('name was updated.');
};
const priceUpdateLog = () => {
  console.log('price was updated.');
};
</script>

<template>
  <div>
    <ProductsList
      @updateProductName="nameUpdateLog"
      @updateProductPrice="priceUpdateLog"
    />
  </div>
</template>

<style scoped></style>
