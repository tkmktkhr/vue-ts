<script setup lang="ts">
import ProductId from '@/views/ProductId.vue';
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
  VSpacer,
} from 'vuetify/components';

const db = useFirestore();
const product = useDocument(() => doc(db, `products`, 'PA'));
const productCollection = useCollection(() => collection(db, `products`));
console.log(product);
console.log(productCollection);

const products = ref<Product[]>([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const res = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), ...{ id: doc.id } };
  });
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
    <div>-------------------- list --------------------</div>
    <VList lines="two">
      <VListItem
        v-for="p in products"
        :key="p.id"
        ripple
        :value="p"
        color="primary"
        :to="`products/${p.id}`"
      >
        <VListItemTitle>{{ p.name ? p.name : 'no name' }}</VListItemTitle>
        <VListItemSubtitle> price: {{ p.price }} </VListItemSubtitle>
        <VSpacer />
        <!-- <ProductId :product="product" :productCollection="productCollection" /> -->
        <div>
          --------------------------------------------------------------
        </div>
      </VListItem>
    </VList>
    <br />
    <div>=========== bellow ProductsList Sample vue ===============</div>
    <ProductsListSample
      :product="product"
      :productCollection="productCollection"
      @updateProductName="nameUpdateLog"
      @updateProductPrice="priceUpdateLog"
    />
    <br />
    <br />
    <div>=========== bellow parent vue ===============</div>
    <div>{{ product }}</div>
    <div>{{ productCollection }}</div>
  </div>
</template>

<style scoped></style>
