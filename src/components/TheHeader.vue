<!-- Options API -->
<!-- <script>
// imports
import { useAuthUserStore } from '@/stores/AuthUserStore';
import { mapState } from 'pinia';
import CartWidget from './CartWidget.vue';

export default {
  components: { CartWidget },
  computed: {
    ...mapState(useAuthUserStore, { user: 'userName' }),
  },
};
</script> -->

<!-- with setup: Composition API -->
<script setup lang="ts">
// imports
import { useAuthUserStore } from '@/stores/AuthUserStore';
import CartWidget from './CartWidget.vue';

const userStore = useAuthUserStore();
const userName = userStore.userName;
</script>

<template>
  <header class="flex justify-between p-6 mb-10 items-center">
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
      <span class="mr-5"> name: {{ userName }} </span>
      <CartWidget class="inline-block" />
    </div>
  </header>
</template>
