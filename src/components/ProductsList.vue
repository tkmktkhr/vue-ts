<script setup lang="ts">
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { useCollection, useFirestore } from 'vuefire';
import { ref } from 'vue';

const db = useFirestore();

// collection
console.log('loading products ...');
const productsRef = collection(db, 'products');
const productsDb = useCollection(productsRef);
console.log({ value: productsDb });
console.log('loaded products ...');

const fetchDataFromFB = async () => {
  console.log('fetching...');

  const querySnapshot = await getDocs(collection(db, 'products'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    console.dir(doc.data());
  });
};

// const saveDataToFB = async (name: string, price: number) => {
const saveDataToFB = async () => {
  console.log('saving');

  // add id by yourself
  // await setDoc(doc(db, 'products', 'PA'), {
  //   name: 'Pineapple',
  //   price: 5,
  // });

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'products'), {
    name: 'test',
    price: 1,
    // name,
    // price,
  });
  console.log(docRef);
};

// product input
const productName = ref('');
// const productPrice = ref(0);
const emit = defineEmits(['update:productName', 'input']);
// const emit = defineEmits(['update:productName', 'input']);

// REFACTOR move it to util function
const inputValueCheck = (event: any): string => {
  if (!(event.target instanceof HTMLInputElement)) return '';
  const value = event.target.value;
  productName.value = value;
  return value;
};
const updateValue = (value: string) => {
  emit('update:productName', value);
};
</script>

<template>
  <div>
    <button @click="fetchDataFromFB">GET DATA FROM FIRESTORE</button>
    {{ productsDb }}
    <input
      :value="productName"
      type="string"
      @input="updateValue(inputValueCheck($event))"
    />
    <!-- <input
      :value="productName"
      type="string"
      @input="updateValue(inputValueCheck($event))"
      ref="productName" // if use ref.
    /> -->
    <div>productName: {{ productName }}</div>
    <button @click="saveDataToFB">POST DATA INTO FIRESTORE</button>
  </div>
</template>
