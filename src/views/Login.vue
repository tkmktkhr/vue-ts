<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const fullName = computed(() => firstName.value + lastName.value);
</script>

<template>
  <div>Login</div>
  <p>{{ fullName }}</p>
</template>

<style scoped></style>
