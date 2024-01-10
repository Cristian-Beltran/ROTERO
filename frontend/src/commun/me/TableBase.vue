<template>
  <div class="relative overflow-x-auto sm:rounded-lg mt-4">
    <table class="w-full text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-zinc-400">
        <tr>
          <th v-if="check" class="px-4 py-3">Seleccionar</th>
          <th scope="col" v-for="column in columns" :key="column.key" class="px-4 py-3">
            {{ column.title }}
          </th>
          <th v-if="options.length > 0" class="px-4 py-3">
            <span>Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-xs text-gray-800 bg-white border-b hover:bg-zinc-200"
          v-for="item in itemsDisplay"
          :key="item.id"
        >
          <td v-if="check" class="px-4 py-3">
            <input type="checkbox" v-model="item.check" />
          </td>
          <td class="px-4 py-4" v-for="column in columns" :key="column.key">
            <span v-if="column.type == 'date'">
              {{ item[column.key] ? dateFormat(new Date(item[column.key])) : '' }}
            </span>
            <span v-else-if="column.type == 'dateTime'">
              {{ item[column.key] ? dateTimeFormat(new Date(item[column.key])) : '' }}
            </span>
            <span
              v-else-if="column.type == 'boolean'"
              class="p-2 rounded-lg text-zinc-100"
              :class="[item[column.key] ? 'bg-green-400' : 'bg-red-400']"
            >
              {{ item[column.key] ? 'Si' : 'No' }}
            </span>
            <span v-else-if="column.type == 'file'">
              <a :href="item[column.key]" target="_blank" class="text-blue-500 underline"
                >Ver archivo</a
              >
            </span>
            <span v-else> {{ item[column.key] }} </span>
          </td>
          <td v-if="options.length > 0" class="px-4 py-2 flex justify-center pt-4">
            <DropdownMenu>
              <DropdownMenuTrigger><v-icon name="fa-bars" /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  v-for="option in options"
                  :key="option.id"
                  @click="action(option.id, item)"
                >
                  <v-icon :name="option.icon" />
                  {{ option.name }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="flex items-center justify-between pt-4 pb-8" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500"
        >Pagina
        <span class="font-semibold text-gray-600">{{ currentPage }}</span>
        de
        <span class="font-semibold text-gray-600">{{ totalPages }}</span></span
      >
      <ul class="inline-flex -space-x-px text-sm h-8">
        <li class="mr-4 flex">
          <label class="flex items-center text-gray-500 px-3 h-8 ml-0" for="itemsPerPage"
            >Filas por pagina</label
          >
          <select
            name="itemsPerPage"
            v-model="itemsPerPage"
            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <option selected value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            @click="currentPage--"
            :disabled="currentPage === 1"
          >
            <v-icon name="fa-arrow-left" class="h-4 mt-1" /> Previous
          </button>
        </li>
        <li>
          <button
            type="button"
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Next <v-icon name="fa-arrow-right" class="h-4 mt-1" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/commun/ui/dropdown-menu'
import { ref, computed } from 'vue'
import { dateFormat, dateTimeFormat } from '@/lib/dateFormat'
const emit = defineEmits(['action'])

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  check: {
    type: Boolean,
    default: false
  }
})

const currentPage = ref(1)
const itemsPerPage = ref(5)
const totalPages = computed(() => {
  return Math.ceil(props.items.length / itemsPerPage.value)
})

const itemsDisplay = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.items.slice(start, end)
})

function action(action, item) {
  const data = {
    action: action,
    ...item
  }
  emit('action', data)
}
</script>
