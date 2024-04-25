<script setup lang="ts">
import ProductsListSample from '@/components/ProductsListSample.vue';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useCollection, useDocument, useFirestore } from 'vuefire';
import { ref, onMounted } from 'vue';
import { Product } from '@/domains/product';
import {
  VList,
  VListItem,
  VListItemSubtitle,
  VListItemTitle,
  VRow,
  VSpacer,
} from 'vuetify/components';
import { mdiMenuOpen } from '@mdi/js';

const db = useFirestore();
const product = useDocument<Product>(() => doc(db, `products`, 'PA'));
const productCollection = useCollection<Product[]>(() =>
  collection(db, `products`),
);
console.log(product);
console.log(productCollection);

const products = ref<Product[]>([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const res = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), ...{ id: doc.id } }) as Product,
  );
  console.log({ res });
  products.value = res;
});

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
    <br />
    <div>Product List</div>
    <VList lines="two">
      <VListItem
        v-for="p in products"
        :key="p.id"
        ripple
        :value="p"
        color="primary"
        :to="`products/${p.id}`"
      >
        <VRow>
          <VCol cols="10">
            <VListItemTitle>{{ p.name ? p.name : 'no name' }}</VListItemTitle>
            <VListItemSubtitle> price: {{ p.price }} </VListItemSubtitle>
            <VSpacer />
            <div>-------------------------------------------------</div>
          </VCol>
          <VCol cols="2">
            <VBtn size="small" :icon="mdiMenuOpen" />
          </VCol>
        </VRow>
      </VListItem>
    </VList>
    <br />
    <div>=========== ProductsList Sample vue ===============</div>
    <ProductsListSample
      :product="product"
      :productCollection="productCollection"
      @updateProductName="nameUpdateLog"
      @updateProductPrice="priceUpdateLog"
    />
    <br />
    <br />
    <div>=========== parent vue ===============</div>
    <div>{{ product }}</div>
    <div>{{ productCollection }}</div>
  </div>
</template>

<style scoped></style>
