import {
  collection,
  getFirestore,
  setDoc,
  doc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  startAt,
  endAt,
} from 'firebase/firestore';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useCollection } from 'vuefire';

import { Product } from '@/domains/product';

export const useProductStore = defineStore('ProductStore', () => {
  const db = getFirestore();

  const products = useCollection<Product>(
    computed(() => {
      return query(
        collection(db, `products`),
        where('disabled', '==', false), // need indexes
        orderBy('detail.type.createdDate'), // no need indexes
        startAt('2023-01-01'),
        endAt('2023-12-31'),
      );
      // return query(collection(db, `products`), orderBy('created', 'asc'));
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

  const resolveProduct = (p: Partial<Product>): Product => ({
    name: p.name ?? null,
    price: p.price ?? 0,
    isStock: p.isStock ?? false,
  });

  const createProduct = async (data: Product): Promise<void> => {
    await addDoc(collection(db, `products`), {
      created: serverTimestamp(),
      updated: serverTimestamp(),
      disabled: false,
      detail: {
        type: { name: 'machine', createdDate: '2022-01-01', version: '1.0.0' },
      },
      ...resolveProduct(data),
    });
  };

  const updateProduct = async (id: string, data: Product): Promise<void> => {
    await setDoc(
      doc(db, `products/${id}`),
      {
        updated: serverTimestamp(),
        ...resolveProduct(data),
      },
      {
        merge: true,
      },
    );
  };

  return {
    products,
    productsWithId,
    createProduct,
    updateProduct,
  };
});
