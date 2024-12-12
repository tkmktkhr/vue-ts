<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { onMounted, ref, watch } from 'vue';
import { Product } from '@/domains/product';
import { VSpacer, VSwitch } from 'vuetify/components';
// import { computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore';

const productStore = useProductStore();
const { createProduct } = productStore;

const name = defineModel<string>('name', { default: '', required: true });
const price = defineModel<number>('price', { default: 0, required: true });
const isStock = defineModel<boolean>('isStock', {
  default: false,
  required: true,
});

const createNewProduct = async () => {
  if (name.value === '' || price.value === 0)
    return console.error('createProduct', {
      name: name.value,
      price: price.value,
    });
  await createProduct({
    name: name.value,
    price: price.value,
    isStock: isStock.value,
  });
};
</script>

<template>
  <div>
    <VTextField v-model="name" label="Product Name" />
    <VNumberInput
      v-model="price"
      :min="0"
      control-variant="stacked"
      label="Product Price"
    />
    <VSwitch v-model="isStock" :label="`isStock: ${isStock}`" />
  </div>
  <VContainer>
    <VSpacer />
    <VBtn color="primary" @click="createNewProduct()">Create</VBtn>
  </VContainer>
</template>
