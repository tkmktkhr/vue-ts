<script setup lang="ts">
defineProps({
  // modelValue: { type: [Number, String], default: 0 },
  modelValue: { type: [Number], default: 0 },
});

const emit = defineEmits(['update:modelValue', 'input']);
const updateValue = (value: number) => {
  // if (value !== '') {
  //   emit('update:modelValue', value);
  // }
  emit('update:modelValue', value);
};

const inputValueCheck = (event: any): number => {
  if (!(event.target instanceof HTMLInputElement)) return 0;
  const value = event.target.value;
  console.log({ value });
  return value === '' ? 0 : parseInt(value);
};
</script>

<template>
  <span>
    <button
      class="cursor-pointer bg-gray-200 px-2 rounded-l"
      @click="updateValue(modelValue > 0 ? modelValue - 1 : 0)"
    >
      -
    </button>
    <input
      :value="modelValue"
      type="number"
      min="0"
      @input="updateValue(inputValueCheck($event))"
    />
    <!-- <input
      :value="modelValue"
      type="number"
      min="0"
      @input="updateValue($event.target.value)"
    /> -->
    <button
      class="bg-gray-200 px-2 rounded-r cursor-pointer"
      @click="updateValue(modelValue + 1)"
    >
      +
    </button>
  </span>
</template>

<style scoped>
input[type='number'] {
  appearance: none;
  -moz-appearance: textfield;
  border: 1px solid gray;
  @apply border-gray-500 w-10 text-center;
}
button {
  border: 1px solid gray;
}
</style>
