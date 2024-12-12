<script setup lang="ts">
import ProductsListSample from '@/components/ProductsListSample.vue';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import {
  VHover,
  VList,
  VListItem,
  VListItemSubtitle,
  VListItemTitle,
  VRow,
  VSpacer,
} from 'vuetify/components';
import { useProductStore } from '@/stores/ProductStore';
import { mdiMenuOpen } from '@mdi/js';

const productStore = useProductStore();
const { productsWithId: products } = storeToRefs(productStore);

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
            <VMenu
              open-on-hover
              transition="slide-x-reverse-transition"
              location="start"
            >
              <template #activator="{ props }">
                <VBtn size="small" :icon="mdiMenuOpen" v-bind="props" />
              </template>

              <!-- not use VHover -->
              <!-- <VList>
                <VListItem
                  v-for="(i, index) in products"
                  :key="index"
                  color="primary"
                >
                  <VHover v-slot="{ isHovering }">
                    <VListItemTitle :class="{ 'on-hover': isHovering }">
                      {{ i.name ? i.name : 'no name' }}
                    </VListItemTitle>
                  </VHover>
                </VListItem>
              </VList> -->

              <!-- TODO add class for hover. -->
              <VList border>
                <VHover v-slot="{ isHovering }">
                  <VListItem
                    v-for="(i, index) in products"
                    :key="index"
                    :class="{ 'on-hover': isHovering }"
                    color="primary"
                  >
                    <VListItemTitle>
                      {{ i.name ? i.name : 'no name' }}
                    </VListItemTitle>
                  </VListItem>
                </VHover>
              </VList>
            </VMenu>
          </VCol>
        </VRow>
      </VListItem>
    </VList>
    <br />
    <div>=========== ProductsList Sample vue ===============</div>
    <!-- <ProductsListSample
      :product="product"
      :productCollection="productCollection"
      @updateProductName="nameUpdateLog"
      @updateProductPrice="priceUpdateLog"
    /> -->
    <br />
    <div>=========== parent vue ===============</div>
    <div>{{ products }}</div>
  </div>
</template>

<style scoped>
/* .v-list-item-title.on-hover {
  background-color: red;
} */
/* .v-list-item:hover {
  background-color: red;
} */
</style>
