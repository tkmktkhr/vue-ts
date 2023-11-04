<script setup lang="ts">
import { ref } from 'vue';
import { useCounterStore } from '@/stores/CounterStore.ts';
import { IProduct } from '@/stores/ProductStore.ts';

const counter = useCounterStore();

counter.count++;
// with autocompletion ✨
counter.$patch({ count: counter.count + 1 });
// or using an action instead
counter.increment();

interface Props {
  msg: string;
  num?: number;
  products: IProduct[];
}

// type-based declaration NOT runtime declaration
withDefaults(defineProps<Props>(), {
  msg: 'default message',
  num: 0,
});

const num = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>{{ products }}</p>
  <p>num: {{ num }}</p>
  <p>num: {{ num === 0 ? 'no input' : num }}</p>
  <div>Pinia Current Count: {{ counter.count }}</div>
  <div class="card">
    <button type="button" @click="num++">num is {{ num }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
@/stores/CounterStore
