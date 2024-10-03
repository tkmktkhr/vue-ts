<script setup lang="ts">
import { mdiChevronUpCircle, mdiChevronDownCircle } from '@mdi/js';

import { ref, onMounted, computed } from 'vue';
import { map, filter } from 'lodash-es';

const mockedData = ref<TData[]>([]);

onMounted(() => {
  mockedData.value = data;
});

type TData = {
  id: string;
  name: string;
  type: string;
  arr: number[] | null;
  isDropDown: boolean;
  details: Detail[];
};

interface Detail {
  id: string;
  name: string;
  arr: string[];
}

const data: TData[] = [
  {
    id: '1',
    name: 'name1',
    type: 'type1',
    arr: [1, 2, 3],
    isDropDown: true,
    details: [
      {
        id: '1-1',
        name: '1-1',
        arr: ['1-1-1', '1-1-2', '1-1-3'],
      },
      {
        id: '1-2',
        name: '1-2',
        arr: ['1-2-1', '1-2-2', '1-2-3'],
      },
      {
        id: '1-3',
        name: '1-3',
        arr: ['1-3-1', '1-3-2', '1-3-3'],
      },
      {
        id: '1-4',
        name: '1-4',
        arr: ['1-4-1', '1-4-2', '1-4-3'],
      },
    ],
  },
  {
    id: '2',
    name: 'name2',
    type: 'type2',
    arr: [2],
    isDropDown: false,
    details: [],
  },
  {
    id: '3',
    name: 'name3',
    type: 'type3',
    arr: [1, 2, 3],
    isDropDown: true,
    details: [
      {
        id: '3-1',
        name: '3-1',
        arr: ['3-1-1', '3-1-2', '3-1-3'],
      },
      {
        id: '3-2',
        name: '3-2',
        arr: ['3-2-1', '3-2-2', '3-2-3'],
      },
    ],
  },
  {
    id: '4',
    name: 'name4',
    type: 'type4',
    arr: null,
    isDropDown: false,
    details: [],
  },
];

const selected = ref([]);

const options = ref({
  sortBy: [{ key: 'id', order: 'desc' }],
  page: 1,
  itemsPerPage: 10,
});

interface DataTableHeader {
  title: string;
  key: string;
  align?: 'start' | 'end' | 'center' | undefined;
  sortable: boolean;
}

const headers: DataTableHeader[] = [
  { title: '', key: 'isDropDown', sortable: false },
  { title: 'id', key: 'id', sortable: true },
  { title: 'name', key: 'name', sortable: true },
  { title: 'type', key: 'type', sortable: true },
  { title: 'arr', key: 'arr', sortable: true },
];

const searchableKeys = computed(() => {
  return map(filter(headers, 'searchable'), 'key');
});

const openId = ref<string | null>(null);
const isOpen = ref(false);

const open = (item: TData) => {
  openId.value = item.id;
  isOpen.value = !isOpen.value;
  console.log(item);
};
</script>

<template>
  <div>
    <p>Practice {{ openId }}</p>
    <VDataTableServer
      :headers="headers"
      :items="data"
      item-key="id"
      item-value="id"
    >
      <template #[`item.isDropDown`]="{ item }">
        <VBtn
          v-if="item.isDropDown"
          variant="outlined"
          size="small"
          @click="open(item)"
        >
          <VIcon :icon="isOpen ? mdiChevronDownCircle : mdiChevronUpCircle" />
        </VBtn>
      </template>
    </VDataTableServer>
  </div>
</template>
