<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { onMounted, ref, watch } from 'vue';
import { Product, productSchema } from '@/domains/product';
import { VSpacer, VSwitch } from 'vuetify/components';
import { useField, useForm } from 'vee-validate';
// import { toTypedSchema } from '@vee-validate/zod';
// import { computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore';

const productStore = useProductStore();
const { createProduct } = productStore;

// const name = defineModel<string>('name', { default: '', required: true });
// const price = defineModel<number>('price', { default: 0, required: true });
const props = defineProps({
  name: String,
  price: Number,
});

const isStock = defineModel<boolean>('isStock', {
  default: false,
  required: true,
});

const {
  value: name,
  errors: nameErrs,
  errorMessage: nameErr,
  resetField: resetName,
  setValue: setName,
} = useField<string>(
  'name',
  (value) => {
    // setFieldValue('name', value);
    if (!value || value === '') {
      return 'Name is required';
    }
    return true;
  },
  {
    initialValue: props.name ?? '',
    validateOnMount: true,
  },
);

const {
  value: price,
  errors: priceErrs,
  errorMessage: priceErr,
  resetField: resetPrice,
  setValue: setPrice,
} = useField<number>(
  'price',
  (value) => {
    // setFieldValue('price', value);
    if (value > 0) {
      return true;
    } else {
      return 'Price must be greater than 0';
    }
    // return value > 0 ? true : 'Price must be greater than 0';
  },
  {
    initialValue: props.price ?? 0,
    validateOnMount: true,
  },
);

// TODO useForm
// interface ProductForm {
//   name: string;
//   price: number;
//   isStock: boolean;
// }
// const { values, errors, setErrors, setFieldValue, resetForm, handleSubmit } =
//   useForm<ProductForm>({
//     validationSchema: toTypedSchema(productSchema),
//     initialValues: {
//       name: props.name ?? '',
//       price: props.price ?? 0,
//       isStock: isStock.value,
//     },
//     validateOnMount: true,
//   });

// const createNewProduct = handleSubmit(async (values, errors) => {
const createNewProduct = async () => {
  if (name.value === '' || price.value === 0)
    console.error('createProduct', {
      name: name.value,
      price: price.value,
    });

  // TODO useForm
  // setErrors({
  //   name: nameErrs.value,
  //   price: priceErrs.value,
  // });

  await createProduct({
    name: name.value,
    price: price.value,
    isStock: isStock.value,
  });

  manualReset();
};

const manualReset = () => {
  setName('');
  setPrice(0);
};
</script>

<template>
  <div>
    <VTextField
      v-model="name"
      label="Product Name"
      :error="!!nameErr"
      :error-messages="nameErr ?? null"
    />
    <VNumberInput
      v-model="price"
      :min="0"
      control-variant="stacked"
      label="Product Price"
      :error="!!priceErr"
      :error-messages="priceErr ?? null"
    />
    <VSwitch v-model="isStock" :label="`isStock: ${isStock}`" />
  </div>
  validatedName: {{ name }}
  <br />
  nameErrs: {{ nameErrs }}
  <br />
  nameErr: {{ nameErr }}
  <br />
  validatedPrice: {{ price }}
  <br />
  priceErrs: {{ priceErrs }}
  <br />
  priceErr: {{ priceErr }}
  <!-- <br />
  values: {{ values }}
  <br />
  errors: {{ errors }} -->
  <VContainer>
    <VSpacer />
    <VBtn
      :disabled="[...nameErrs, ...priceErrs].length > 0"
      color="primary"
      @click="createNewProduct()"
    >
      Create
    </VBtn>
  </VContainer>
</template>
