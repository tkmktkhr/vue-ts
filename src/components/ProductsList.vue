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
  });
  console.log(docRef);
};

// product input
const productName = ref('');
const productPrice = ref(0);
const emit = defineEmits<{
  (e: 'change', id: number): void;
  (e: 'update', value: string): void;
}>();
// const emit1 = defineEmits(['update:productName', 'input']);
// const emit2 = defineEmits(['update:productPrice', 'input']);

// REFACTOR move it to util function
const inputValueCheckString = (event: any): string => {
  if (!(event.target instanceof HTMLInputElement)) return '';
  const value = event.target.value;
  productName.value = value;
  return value;
};
const updateValueString = (value: string) => {
  emit1('update:productName', value);
};
const inputValueCheckNumber = (event: any): number => {
  if (!(event.target instanceof HTMLInputElement)) return 0;
  const value = event.target.value;
  productPrice.value = value;
  // convert to number?
  return value;
};
const updateValueNumber = (value: number) => {
  emit2('update:productPrice', value);
};
</script>

<template>
  <div>
    <button @click="fetchDataFromFB">GET DATA FROM FIRESTORE</button>
    {{ productsDb }}
    <input
      :value="productName"
      type="string"
      @input="updateValueString(inputValueCheckString($event))"
    />
    <input
      :value="productName"
      type="number"
      min="0"
      @input="updateValueNumber(inputValueCheckNumber($event))"
    />
    <!-- <input
      :value="productName"
      type="string"
      @input="updateValue(inputValueCheck($event))"
      ref="productName" // if use ref.
    /> -->
    <div>productName: {{ productName }}</div>
    <button @click="saveDataToFB(productName, productPrice)">
      POST DATA INTO FIRESTORE
    </button>
  </div>
</template>
