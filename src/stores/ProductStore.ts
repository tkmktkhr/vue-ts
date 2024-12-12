import { collection, getFirestore, setDoc, doc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useCollection } from 'vuefire';

import { Product } from '@/domains/product';

export const useProductStore = defineStore('ProductStore', () => {
  const db = getFirestore();

  const products = useCollection<Product>(
    computed(() => {
      return collection(db, `products`);
    }),
  );

  const productsWithId = computed(() => {
    if (!products.value) return [];
    return products.value.map(
      (product) =>
        ({
          ...product,
          id: product.id,
        }) as Product,
    );
  });

  const updateProduct = async (data: Product): Promise<void> => {
    await setDoc(doc(db, `products`), data, { merge: true });
  };

  return {
    products,
    productsWithId,
    updateProduct,
  };
});
