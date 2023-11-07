<script setup lang="ts">
// imports
import { ref } from 'vue';
import AppCountInput from './AppCountInput.vue';
import { IProduct } from '@/stores/ProductStore.ts';

// props
defineProps<{
  product: IProduct;
}>();

// not necessary this expression.
// const props = defineProps<{
//   product: IProduct;
// }>();
// const product = ref(props.product);

// emits
defineEmits(['addToCart']);

// data
const count = ref(0);
</script>
<template>
  <li class="card">
    <img :src="`/images/${product.image}`" class="mb-3" width="300" />
    <div>
      {{ product.name }} -
      <span class="text-green-500">${{ product.price }}</span>
      <div class="text-center m-4">
        <AppCountInput v-model="count" />
      </div>
      <AppButton class="primary" @click="$emit('addToCart', count), (count = 0)"
        >Add to Cart</AppButton
      >
    </div>
  </li>
</template>
