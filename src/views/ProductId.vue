<script setup lang="ts">
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { useCollection, useDocument, useFirestore } from 'vuefire';
import { onMounted, ref, watch } from 'vue';
import { Product } from '@/domains/product';
import { VSwitch } from 'vuetify/components';
import { useRoute } from 'vue-router';

const db = useFirestore();
const route = useRoute();

const urlId = route.params['id'];
if (!urlId || Array.isArray(urlId)) {
  console.error(`id: ${urlId} does not exist.`);
  throw new Error();
}

// document for data sync
const productOnDB = useDocument<Product>(doc(db, `products`, urlId)).data;
console.log({ productOnDB });
console.log({ productPAVal: productOnDB.value }); // undefined

watch(productOnDB, () => {
  name.value = productOnDB.value?.name;
  price.value = productOnDB.value?.price;
  isStock.value = productOnDB.value?.isStock;
  console.log('watch');
  console.log(productOnDB.value?.name);
});

// interface Props {
//   product: Product | null;
//   productCollection: Product[] | null;
// }

// const props = withDefaults(defineProps<Props>(), {
//   product: null,
//   productCollection: null,
// });

const name = ref<string | null>(null);
const price = ref<number | null>(null);
const isStock = ref<boolean>(false);

onMounted(async () => {
  const querySnapshotData = (
    await getDoc(doc(db, `products/${urlId}`))
  ).data() as Product;
  console.log({ querySnapshotData });
  name.value = querySnapshotData['name'];
  price.value = querySnapshotData['price'];
  isStock.value = querySnapshotData['isStock'] ?? false;
});

watch(name, async () => {
  const updateData = { name: name.value };
  await updateDoc(doc(db, 'products', urlId), updateData);
});
watch(price, async () => {
  const updateData = { price: price.value };
  await updateDoc(doc(db, 'products', urlId), updateData);
});
watch(isStock, async () => {
  const updateData = { isStock: isStock.value };
  await updateDoc(doc(db, 'products', urlId), updateData);
});

// const fetchDataFromFB = async () => {
//   console.log('fetching...');
//   const querySnapshot = await getDocs(collection(db, 'products'));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
//     console.dir(doc.data());
//   });
// };

const saveDataToFB = async (name: string, price: number) => {
  console.log('saving');

  // add id by yourself
  // await setDoc(doc(db, 'products', urlId), {
  //   name: 'Pineapple',
  //   price: 5,
  // });

  // Add a new document with a generated id.
  // const docRef = await addDoc(collection(db, 'products'), {
  //   name,
  //   price,
  //   isStock,
  // });
  // console.log(docRef);
};
</script>

<template>
  <div>
    <div>{{ urlId }}</div>
    <br />
    <VTextField v-model="name" label="Product Name" />
    <VTextField v-model="price" type="number" label="Product Price" />
    <VSwitch v-model="isStock" :label="`isStock: ${isStock}`" />
    <br />
    <div>data from fire store: {{ productOnDB }}</div>
    <!-- <div>{{ props.product?.name }}</div> -->
    <br />
    <!-- <div>{{ props.product?.price }}</div> -->
  </div>
</template>
