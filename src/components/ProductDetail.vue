<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { ref, watch, watchEffect } from 'vue';
import { Product } from '@/domains/product';
import { VSwitch } from 'vuetify/components';
import { computed, toRefs } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import { storeToRefs } from 'pinia';

const productStore = useProductStore();
const { updateProduct } = productStore;
const { productsWithId: products } = storeToRefs(productStore);

interface Props {
  id: string;
}

const props = defineProps<Props>();
const { id } = toRefs(props);

const product = computed<Product | null>(() => {
  return products.value.find((p) => p.id === id.value) ?? null;
});

const newName = ref<string | null>('');
const newPrice = ref<number | null>(product.value?.price ?? 0);
const newIsStock = ref<boolean | null>(product.value?.isStock ?? false);

watchEffect(() => {
  newName.value = product.value?.name ?? '';
  newPrice.value = product.value?.price ?? 0;
  newIsStock.value = product.value?.isStock ?? false;
});

const updateNewProduct = () => {
  if (product.value && id.value) {
    updateProduct(id.value, {
      name: newName.value,
      price: newPrice.value,
      isStock: newIsStock.value,
    });
  }
};
</script>

<template>
  <div>
    <VTextField v-model="newName" label="Product Name" />
    <VNumberInput
      v-model="newPrice"
      :min="0"
      control-variant="stacked"
      label="Product Price"
    />
    <VSwitch v-model="newIsStock" :label="`isStock: ${newIsStock}`" />

    <VBtn color="primary" @click="updateNewProduct()"> Update </VBtn>
    <br />
    <br />
    <div>prev: {{ product?.name ?? 'no name' }}, new: {{ newName }}</div>
    <br />
    <div>prev: {{ product?.price ?? 'no price' }}, new: {{ newPrice }}</div>
    <br />
    <div>prev: {{ product?.isStock ?? 'no bool' }}, new: {{ newIsStock }}</div>
  </div>
</template>
