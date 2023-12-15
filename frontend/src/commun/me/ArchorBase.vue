<template>
  <router-link :to="to" v-slot="{ href, navigate, isActive }">
    <a
      :href="href"
      @click="
        () => {
          navigate
          utilsStore.toggleSideBar()
        }
      "
      class="flex items-center py-2 rounded-lg hover:bg-zinc-700 group"
      :class="[isActive ? 'text-primary' : 'text-zinc-400']"
    >
      <span class="flex-1 ml-3 whitespace-nowrap">
        <v-icon :name="icon" class="flex-shrink-0 w-5 h-5 transition duration-75" />
        {{ name }}</span
      >
    </a>
  </router-link>
</template>
<script setup lang="ts">
import { useUtilsStore } from '@/stores/utils.stores'
const utilsStore = useUtilsStore()
defineProps({
  to: {
    type: String,
    default: '/'
  },
  icon: {
    type: String
  },
  name: {
    type: String
  }
})
</script>
