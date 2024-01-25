<script setup lang="ts">
import { addDoc, collection, getDoc, getDocs, doc, updateDoc } from '@firebase/firestore';
import { useCollection, useDocument, useFirestore } from 'vuefire';
import { onMounted, ref, watch } from 'vue';

interface Product {
  name: string | null,
  price: number | null
}

interface Props {
  product: Product | null,
  productCollection: Product[] | null
}

const props = withDefaults(defineProps<Props>(), {
  product: null,
  productCollection: null
})

// props is `null` when first init rendering.
console.log('list inside ----------------')
console.log(props) // Proxy with data but data can not be taken on setup.
console.log(props.product) // null
console.log(props.product?.name) // undefined
console.log(props.productCollection) // Empty Array

// const name = ref(props.product?.name)
// console.log(name) // RefImpl data is null
// console.log(name.value) // Empty Array
console.log('list inside ---------------- here end')

const name = ref<string | null>(null)
onMounted(async () => {
  try {
    const docRef = doc(db, `products`, 'PA')
    const docSnapData = (await getDoc(docRef)).data()
    console.log({ onMoutedSnap: docSnapData })
    if (!docSnapData) throw new Error(`no data: ${docSnapData}`)
    name.value = docSnapData['name']
  } catch (error) {
    throw new Error(`${JSON.stringify(error)}`)
  }
})

watch(name, async () => {
  const updateData = { name: name.value }
  await updateDoc(doc(db, 'products', 'PA'), updateData)
})

const db = useFirestore();

// document
const productPA = useDocument<Product>(doc(db, `products`, 'PA')).data
console.log({ productPA });
console.log({ productPAVal: productPA.value }); // undefined
// const pname = ref(productPA.value?.name) // not  work as an init value
const pname = ref<string | null>(null)
console.log({ pname })
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
  });
  console.log(docRef);
};

// product input
const productName = ref('');
const productPrice = ref(0);
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
      <input :value="productName" type="string" @input="updateValueString(inputValueCheckString($event))" />
    </div>
    <div>productName: {{ productName }}</div>

    <div>
      <input :value="productPrice" type="number" min="0" @input="updateValueNumber(inputValueCheckNumber($event))" />
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
    <VTextField v-model="pname" label="Pname not working" />
    <!-- this does not work. -->
    <!-- <VTextField v-model="productPA?.name" label="Pname" /> -->
    <VTextField v-model="name" label="name from onMounted" />
    <div>{{ productPA?.name }}</div>
    <br />
    <div>{{ props.product?.name }}</div>
    <br />
    <div>{{ props.product?.price }}</div>
    <br />
    <div>{{ props.productCollection }}</div>
  </div>
</template>
