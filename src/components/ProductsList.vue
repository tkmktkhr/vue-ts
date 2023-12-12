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
// const emit = defineEmits<{
//   (e: 'update:productName', value: string): void;
//   (e: 'update:productPrice', value: number): void;
// }>();
const emit = defineEmits<{
  updateProductName: [name: string];
  updateProductPrice: [price: number];
}>();

// REFACTOR move it to util function
const inputValueCheckString = (event: any): string => {
  if (!(event.target instanceof HTMLInputElement)) return '';
  const value = event.target.value;
  productName.value = value;
  return value;
};
const updateValueString = (name: string) => {
  emit('updateProductName', name);
};
const inputValueCheckNumber = (event: any): number => {
  if (!(event.target instanceof HTMLInputElement)) {
    productPrice.value = 0;
    return 0;
  }
  const value = event.target.value;
  if (isNaN(value)) {
    productPrice.value = 0;
    return 0;
  }
  productPrice.value = value;
  // convert to number?
  return value;
};
const updateValueNumber = (price: number) => {
  emit('updateProductPrice', price);
};
</script>

<template>
  <div>
    <button @click="fetchDataFromFB">GET DATA FROM FIRESTORE</button>
    {{ productsDb }}
    <div>
      <input
        :value="productName"
        type="string"
        @input="updateValueString(inputValueCheckString($event))"
      />
    </div>
    <div>productName: {{ productName }}</div>

    <div>
      <input
        :value="productPrice"
        type="number"
        min="0"
        @input="updateValueNumber(inputValueCheckNumber($event))"
      />
    </div>
    <div>productPrice: {{ productPrice }}</div>
    <!-- <input
      :value="productName"
      type="string"
      @input="updateValue(inputValueCheck($event))"
      ref="productName" // if use ref.
    /> -->
    <button @click="saveDataToFB(productName, productPrice)">
      POST DATA INTO FIRESTORE
    </button>
  </div>
</template>
