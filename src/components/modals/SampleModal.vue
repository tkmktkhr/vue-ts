<script setup lang="ts">
import { mdiClose } from '@mdi/js';
import { ref, toRefs } from 'vue';

const emit = defineEmits(['update:model-value']);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  selectedData: {
    type: Object,
    default: () => ({}),
  },
});
const { isOpen, selectedData } = toRefs(props);
</script>

<template>
  <VDialog
    :model-value="isOpen"
    width="1800px"
    persistent
    no-click-animation
    @keydown.esc="emit('update:model-value', $event)"
    @update:model-value="emit('update:model-value', $event)"
    ><VCard>
      <VCardTitle>
        <VBtn
          :icon="mdiClose"
          variant="plain"
          color="primary"
          @click="emit('update:model-value', false)"
        />
        <span class="headline">Sample Modal</span>
      </VCardTitle>
      <VCardText> {{ selectedData }} </VCardText>
    </VCard>
  </VDialog>
</template>
