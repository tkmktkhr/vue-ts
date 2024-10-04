<script setup lang="ts">
import { Detail } from '@/domains/sampleData';
import { toRefs } from 'vue';

interface Props {
  details: Detail[];
}

const props = withDefaults(defineProps<Props>(), {
  details: () => [],
});
const { details } = toRefs(props);
</script>

<template>
  <VDataTable :items="details" :items-per-page="-1">
    <template #bottom />
  </VDataTable>
</template>
