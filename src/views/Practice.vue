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

const rootData = [
  {
    col1: 'root1-1',
    col2: 'root1-2',
    col3: 'root1-3',
    col4: ['1-1', '1-2', '1-3', '1-4'],
  },
  {
    col1: 'root2-1',
    col2: 'root2-2',
    col3: 'root2-3',
    col4: ['2-1', '2-2', '2-3', '2-4'],
  },
  {
    col1: 'root3-1',
    col2: 'root3-2',
    col3: 'root3-3',
    col4: ['3-1', '3-2', '3-3', '3-4'],
  },
];

const data: TData[] = [
  {
    bid: rootData[0], // groupByKey - item-key, item-value
    id: '1',
    name: 'name1',
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
    bid: rootData[0],
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
    bid: rootData[1],
    id: '2',
    name: 'name2',
    type: 'type2',
    arr: [2],
    isDropDown: false,
    amount: 2,
    details: [],
  },
  {
    bid: rootData[2],
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
    bid: rootData[2],
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

const groupBy = [
  {
    key: 'bid',
    order: 'asc',
  },
];
</script>

<template>
  <div>
    <p>Group Table</p>
    <VDataTable
      :group-by="groupBy"
      :headers="headers"
      :items="data"
      return-object
    >
      <template
        v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }"
      >
        <!-- item -->
        <!-- {
            "depth": 0,
            "id": "root_bid_b-1",
            "key": "bid",
            "value": {
                "col1": "root1-1",
                "col2": "root1-2",
                "col3": "root1-3",
                "col4": [
                    "1-1",
                    "1-2",
                    "1-3",
                    "1-4"
                ]
            },
            "items": [
                  {
                    "type": "item",
                    "key": "1",
                    "index": 0,
                    "value": {
                        "bid": "b-1",
                        "id": "1",
                        "name": "name1",
                        "type": "type1",
                        "arr": [
                            1,
                            2,
                            3
                        ],
                        "isDropDown": true,
                        "amount": 1,
                        "details": [
                            {
                                "id": "1-1",
                                "name": "1-1",
                                "arr": [
                                    "1-1-1",
                                    "1-1-2",
                                    "1-1-3"
                                ]
                            }
                        ]
                    },
                    "selectable": true,
                    "columns": {
                        "isDropDown": true,
                        "id": "1",
                        "name": "name1",
                        "type": "type1",
                        "amount": 1,
                        "arr": [
                            1,
                            2,
                            3
                        ]
                    },
                    "raw": {
                        "bid": "b-1",
                        "id": "1",
                        "name": "name1",
                        "type": "type1",
                        "arr": [
                            1,
                            2,
                            3
                        ],
                        "isDropDown": true,
                        "amount": 1,
                        "details": []
                    }
                  },
                  {
                    "type": "item",
                    "key": "1-1",
                    "index": 1,
                    "value": {
                        "bid": "b-1",
                        "id": "1-1",
                        "name": "name1",
                        "type": "type1-1",
                        "arr": [
                            1,
                            2,
                            3
                        ],
                        "isDropDown": true,
                        "amount": 5,
                        "details": []
                    },
                    "selectable": true,
                    "columns": {
                        "isDropDown": true,
                        "id": "1-1",
                        "name": "name1",
                        "type": "type1-1",
                        "amount": 5,
                        "arr": [
                            1,
                            2,
                            3
                        ]
                    },
                    "raw": {
                        "bid": "b-1",
                        "id": "1-1",
                        "name": "name1",
                        "type": "type1-1",
                        "arr": [
                            1,
                            2,
                            3
                        ],
                        "isDropDown": true,
                        "amount": 5,
                        "details": []
                    }
                  }
            ],
            "type": "group"
        } -->

        <!-- columns -->
        <!-- [
          {
              "title": "",
              "sortable": false,
              "key": "data-table-group",
              "value": "data-table-group"
          },
          {
              "title": "bool",
              "key": "isDropDown",
              "sortable": false,
              "value": "isDropDown"
          },
        ] -->
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
          <td>{{ item.value.col1 }}</td>
          <td>{{ item.value.col2 }}</td>
          <td>{{ item.value.col3 }}</td>
          <td>小計：{{ item.items.map((c) => c.value.amount) }}</td>
          <td>group_parent:</td>
          <td>group_parent:</td>
        </tr>
      </template>
    </VDataTable>
  </div>
</template>
