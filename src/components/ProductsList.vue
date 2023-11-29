<script setup lang="ts">
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { useCollection, useFirestore } from 'vuefire';

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

const saveDataToFB = async () => {
  console.log('saving');

  // add id by yourself
  // await setDoc(doc(db, 'products', 'PA'), {
  //   name: 'Pineapple',
  //   price: 5,
  // });

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'products'), {
    name: 'Pineapple',
    price: 5,
  });
  console.log(docRef);
};
</script>

<template>
  <div>
    <button @click="fetchDataFromFB">GET DATA FROM FIRESTORE</button>
    {{ productsDb }}
    <button @click="saveDataToFB">POST DATA INTO FIRESTORE</button>
  </div>
</template>
