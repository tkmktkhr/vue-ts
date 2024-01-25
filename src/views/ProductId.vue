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

interface Props {
  product: Product | null;
  productCollection: Product[] | null;
}

const props = withDefaults(defineProps<Props>(), {
  product: null,
  productCollection: null,
});

const name = ref<string | null>(null);
const price = ref<number | null>(null);
const isStock = ref<boolean>(false);
onMounted(async () => {});

watch(name, async () => {
  const updateData = { name: name.value };
  await updateDoc(doc(db, 'products', 'PA'), updateData);
});

const db = useFirestore();

// document
const productPA = useDocument<Product>(doc(db, `products`, 'PA')).data;
console.log({ productPA });
console.log({ productPAVal: productPA.value }); // undefined
// const pname = ref(productPA.value?.name) // not  work as an init value
const pname = ref<string | null>(null);
console.log({ pname });
// collection
const productsRef = collection(db, 'products');
const productsDb = useCollection(productsRef);
console.log({ productsDb });
console.log({ productsDbVal: productsDb.value });

const fetchDataFromFB = async () => {
  console.log('fetching...');

  const querySnapshot = await getDocs(collection(db, 'products'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    console.dir(doc.data());
  });
};

const saveDataToFB = async (name: string, price: number) => {
  console.log('saving');

  // add id by yourself
  // await setDoc(doc(db, 'products', 'PA'), {
  //   name: 'Pineapple',
  //   price: 5,
  // });

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'products'), {
    name,
    price,
    isStock,
  });
  console.log(docRef);
};
</script>

<template>
  <div>
    <VTextField v-model="name" label="Product Name" />
    <VTextField v-model="price" type="number" label="Product Price" />
    <VSwitch v-model="isStock" :label="`isStock: ${isStock}`" />
    <br />
    <div>{{ props.product?.name }}</div>
    <br />
    <div>{{ props.product?.price }}</div>
  </div>
</template>
