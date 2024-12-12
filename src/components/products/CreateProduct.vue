<script setup lang="ts">
import { getDoc, doc, updateDoc } from '@firebase/firestore';
// import { useDocument, useFirestore } from 'vuefire';
import { useFirestore } from 'vuefire';
import { onMounted, ref, watch } from 'vue';
import { Product } from '@/domains/product';
import { VSwitch } from 'vuetify/components';
// import { computed } from 'vue';

const name = defineModel<string>('name', { default: '', required: true });
const price = defineModel<number>('price', { default: 0, required: true });
const isStock = defineModel<boolean>('isStock', {
  default: false,
  required: true,
});
</script>

<template>
  <div>
    <VTextField v-model="name" label="Product Name" />
    <VNumberInput
      v-model="price"
      control-variant="stacked"
      label="Product Price"
    />
    <VSwitch v-model="isStock" :label="`isStock: ${isStock}`" />
  </div>
</template>
