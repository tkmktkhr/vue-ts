<script setup lang="ts">
import { getDoc, doc, updateDoc } from '@firebase/firestore';
import { useFirestore } from 'vuefire';
import { onMounted, ref, watch } from 'vue';
import { Product } from '@/domains/product';
import { VSwitch } from 'vuetify/components';

const db = useFirestore();

interface Props {
  id: string;
  product: Product | null;
}

const props = withDefaults(defineProps<Props>(), {
  product: null,
});

// watch data from props.
watch(
  () => props.product,
  (val) => {
    console.log('watch the data from a parent component.');
    console.log(val);
    if (!val) return;
    console.log(val.name);
    name.value = val.name;
    price.value = val.price;
    isStock.value = val.isStock;
  },
);

const name = ref<string | null>(null);
const price = ref<number | null>(null);
const isStock = ref<boolean>(false);

onMounted(async () => {
  console.log({ propsId: props.id });
  const querySnapshotData = (
    await getDoc(doc(db, `products/${props.id}`))
  ).data() as Product;
  console.log({ querySnapshotData });
  name.value = querySnapshotData['name'];
  price.value = querySnapshotData['price'];
  isStock.value = querySnapshotData['isStock'] ?? false; // default value
});

watch(name, async () => {
  const updateData = { name: name.value };
  await updateDoc(doc(db, 'products', props.id), updateData);
});
watch(price, async () => {
  const updateData = { price: price.value };
  await updateDoc(doc(db, 'products', props.id), updateData);
});
watch(isStock, async () => {
  const updateData = { isStock: isStock.value };
  await updateDoc(doc(db, 'products', props.id), updateData);
});
</script>

<template>
  <div>
    <VTextField v-model="name" label="Product Name" />
    <VTextField v-model="price" type="number" label="Product Price" />
    <VSwitch v-model="isStock" :label="`isStock: ${isStock}`" />
    <br />
    <!-- <div>data from fire store: {{ productOnDB }}</div> -->
    <div>data from props: {{ props.product?.name }}</div>
    <br />
    <div>data from props: {{ props.product?.price }}</div>
    <br />
    <div>data from props: {{ props.product?.isStock }}</div>
  </div>
</template>
