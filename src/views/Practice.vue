<script setup lang="ts">
import { mdiChevronUpCircle, mdiChevronDownCircle } from '@mdi/js';

import { ref, onMounted, computed } from 'vue';
import { map, filter } from 'lodash-es';
import { TData } from '@/domains/sampleData';
import StaticDataTable from '@/components/StaticDataTable.vue';

const mockedData = ref<TData[]>([]);

onMounted(() => {
  mockedData.value = data;
});

const data: TData[] = [
  {
    bid: 'b-1',
    id: '1',
    name: 'name1', // groupByKey
    type: 'type1',
    arr: [1, 2, 3],
    isDropDown: true,
    amount: 1,
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
    bid: 'b-1',
    id: '1-1',
    name: 'name1',
    type: 'type1-1',
    arr: [1, 2, 3],
    isDropDown: true,
    amount: 5,
    details: [
      {
        id: '1-1',
        name: '1-1',
        arr: ['1-1-1', '1-1-2', '1-1-3'],
      },
    ],
  },
  {
    bid: 'b-2',
    id: '2',
    name: 'name2',
    type: 'type2',
    arr: [2],
    isDropDown: false,
    amount: 2,
    details: [],
  },
  {
    bid: 'b-3',
    id: '3',
    name: 'name3',
    type: 'type3',
    arr: [1, 2, 3],
    isDropDown: true,
    amount: 3,
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
    bid: 'b-3',
    id: '4',
    name: 'name4',
    type: 'type4',
    arr: null,
    isDropDown: false,
    amount: 4,
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
  { title: '', key: 'data-table-group', sortable: false },
  { title: 'bool', key: 'isDropDown', sortable: false },
  { title: 'id', key: 'id', sortable: true },
  { title: 'name', key: 'name', sortable: true },
  { title: 'type', key: 'type', sortable: true },
  { title: 'amount', key: 'amount', sortable: true },
  { title: 'arr', key: 'arr', sortable: true },
];

const searchableKeys = computed(() => {
  return map(filter(headers, 'searchable'), 'key');
});

const openId = ref<string | null>(null);
const isOpen = ref(false);

const panel = computed(() => {
  return isOpen.value ? [0] : [];
});

const open = (item: TData) => {
  openId.value = item.id;
  isOpen.value = !isOpen.value;
  console.log(item);
};

const groupBy = [
  {
    key: 'bid',
    order: 'asc',
  },
];
</script>

<template>
  <div>
    <p>Practice {{ openId }}</p>
    <VDataTable
      :group-by="groupBy"
      :headers="headers"
      :items="data"
      return-object
    >
      <template
        v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }"
      >
        <tr>
          <td :colspan="columns.length - 6">
            <template class="d-flex align-start">
              <VBtn
                :icon="isGroupOpen(item) ? '$expand' : '$next'"
                size="small"
                variant="text"
                @click="toggleGroup(item)"
              ></VBtn>
            </template>
          </td>
          <td>group_parent1</td>
          <td>group_parent: {{ item.items.map((c) => c.value.amount) }}</td>
          <td>group_parent: {{ item.items.map((c) => c.value.amount) }}</td>
          <td>小計：{{ item.items.map((c) => c.value.amount) }}</td>
          <td>group_parent:</td>
          <td>group_parent:</td>
        </tr>
      </template>
    </VDataTable>
  </div>
</template>
